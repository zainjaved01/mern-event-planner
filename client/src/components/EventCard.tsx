import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { EventItem } from "../types";

export default function EventCard({ ev, onDelete }: { ev: EventItem; onDelete: (id: string) => void }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-grid gap-2">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-0">{ev.title}</h5>
          <span className="badge text-bg-secondary text-capitalize">{ev.category}</span>
        </div>
        {ev.description && <p className="card-text text-body-secondary mb-1">{ev.description}</p>}
        <small className="text-body-tertiary">{dayjs(ev.date).format("YYYY-MM-DD HH:mm")}</small>
      </div>
      <div className="card-footer bg-transparent border-0 d-flex gap-2 p-3 pt-0">
        <Link className="btn btn-sm btn-outline-primary" to={`/edit/${ev._id}`}>Edit</Link>
        <button className="btn btn-sm btn-outline-danger" onClick={()=> onDelete(ev._id!)}>Delete</button>
      </div>
    </div>
  );
}
