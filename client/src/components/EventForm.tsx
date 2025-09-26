import React, { useState } from "react";
import { EventItem, Category } from "../types";

const CATEGORIES: Category[] = ["work", "personal", "study", "fitness", "travel"];

export default function EventForm({ initial, onSubmit }: { initial?: Partial<EventItem>; onSubmit: (v: EventItem) => void; }) {
  const [form, setForm] = useState<EventItem>({
    title: initial?.title || "",
    description: initial?.description || "",
    date: initial?.date || new Date().toISOString().slice(0, 16),
    category: (initial?.category as Category) || "work",
    _id: initial?._id,
  } as EventItem);

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(form); }} className="card p-3 d-grid gap-3">
      <div className="form-floating">
        <input id="title" className="form-control" placeholder="Title" value={form.title} onChange={(e)=> setForm({ ...form, title: e.target.value })} required />
        <label htmlFor="title">Title</label>
      </div>
      <div className="form-floating">
        <textarea id="desc" className="form-control" style={{height:120}} placeholder="Description" value={form.description} onChange={(e)=> setForm({ ...form, description: e.target.value })} />
        <label htmlFor="desc">Description</label>
      </div>
      <div className="row g-2">
        <div className="col-12 col-md-6 form-floating">
          <input id="date" className="form-control" type="datetime-local" value={form.date.slice(0,16)} onChange={(e)=> setForm({ ...form, date: new Date(e.target.value).toISOString() })} required />
          <label htmlFor="date">Date & Time</label>
        </div>
        <div className="col-12 col-md-6 form-floating">
          <select id="category" className="form-select" value={form.category} onChange={(e)=> setForm({ ...form, category: e.target.value as Category })}>
            {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <label htmlFor="category">Category</label>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  );
}
