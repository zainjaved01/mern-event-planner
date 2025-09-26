import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { EventItem, Category } from "../types";
import EventCard from "../components/EventCard";

const CATEGORIES: (Category | "")[] = ["", "work", "personal", "study", "fitness", "travel"];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<"" | Category>("");

  async function load() {
    const params: any = {};
    if (q) params.q = q;
    if (category) params.category = category;
    const { data } = await api.get("/events", { params });
    setEvents(data.result.items);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="d-grid gap-3">
      <div className="card p-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-6">
            <input className="form-control" placeholder="Search title" value={q} onChange={(e)=> setQ(e.target.value)} />
          </div>
          <div className="col-8 col-md-3">
            <select className="form-select" value={category} onChange={(e)=> setCategory(e.target.value as any)}>
              {CATEGORIES.map(c=> <option key={c} value={c}>{c || "all"}</option>)}
            </select>
          </div>
          <div className="col-4 col-md-3 d-grid">
            <button className="btn btn-outline-primary" onClick={load}>Filter</button>
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-body-secondary py-5">No events.</div>
      ) : (
        <div className="row g-3">
          {events.map((e)=> (
            <div key={e._id} className="col-12 col-md-6 col-lg-4">
              <EventCard ev={e} onDelete={async(id)=>{ await api.delete(`/events/${id}`); load(); }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
