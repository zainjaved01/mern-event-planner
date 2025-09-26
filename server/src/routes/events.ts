import { Router } from "express";
import { z } from "zod";
import { Event } from "../models/Event.js";
import { CATEGORIES } from "../utils/categories.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const EventSchema = z.object({
  title: z.string().min(1).max(140),
  description: z.string().max(2000).optional().default(""),
  date: z.coerce.date(), // ISO string accepted
  category: z.enum(CATEGORIES as unknown as [string, ...string[]]),
});

// Create
router.post("/", validate(EventSchema), async (req, res) => {
  const ev = await Event.create(req.body);
  res.status(201).json({ success: true, result: ev });
});

// List with filters: category, from, to, q (title contains)
router.get("/", async (req, res) => {
  const { category, from, to, q, page = "1", limit = "10" } = req.query as Record<string, string>;
  const filter: any = {};
  if (category) filter.category = category;
  if (from || to) filter.date = { ...(from ? { $gte: new Date(from) } : {}), ...(to ? { $lte: new Date(to) } : {}) };
  if (q) filter.title = { $regex: q, $options: "i" };

  const p = Math.max(1, parseInt(page));
  const l = Math.max(1, Math.min(50, parseInt(limit)));

  const [items, total] = await Promise.all([
    Event.find(filter).sort({ date: 1 }).skip((p - 1) * l).limit(l),
    Event.countDocuments(filter),
  ]);
  res.json({ success: true, result: { items, total, page: p, limit: l } });
});

// Get by id
router.get("/:id", async (req, res) => {
  const ev = await Event.findById(req.params.id);
  if (!ev) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, result: ev });
});

// Update
router.put("/:id", validate(EventSchema.partial()), async (req, res) => {
  const ev = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!ev) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, result: ev });
});

// Delete
router.delete("/:id", async (req, res) => {
  const ev = await Event.findByIdAndDelete(req.params.id);
  if (!ev) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, result: { _id: ev._id } });
});

// Public categories endpoint
router.get("/meta/categories", (_req, res) => {
  res.json({ success: true, result: CATEGORIES });
});

export default router;
