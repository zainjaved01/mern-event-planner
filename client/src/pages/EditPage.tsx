import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import EventForm from "../components/EventForm";
import { EventItem } from "../types";

export default function EditPage(){
  const nav = useNavigate();
  const { id } = useParams();
  const [initial, setInitial] = useState<Partial<EventItem>>();

  useEffect(()=>{ (async()=>{
    if(id){ const { data } = await api.get(`/events/${id}`); setInitial(data.result); }
  })(); }, [id]);

  return (
    <div>
      <h3>{id ? "Edit Event" : "New Event"}</h3>
      <EventForm initial={initial} onSubmit={async (v)=>{
        if(id) await api.put(`/events/${id}`, v); else await api.post("/events", v);
        nav("/");
      }} />
    </div>
  );
}
