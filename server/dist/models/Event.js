import mongoose, { Schema } from "mongoose";
import { CATEGORIES } from "../utils/categories.js";
const EventSchema = new Schema({
    title: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, trim: true, maxlength: 2000 },
    date: { type: Date, required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const Event = mongoose.model("Event", EventSchema);
