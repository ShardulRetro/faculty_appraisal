// /src/components/Navigation.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsForm from "./ProjectsForm";
import SeminarsForm from "./SeminarsForm";
import EventParticipationForm from "./EventParticipationForm";
import ResearchPublicationsForm from "./ResearchPublicationsForm";
import './Navigation.css'; 

const Navigation = () => {
  return (
    <Router>
      <Routes>
      <Route path="/projects" element={<ProjectsForm />} />
    <Route path="/seminars" element={<SeminarsForm />} />
    <Route path="/events" element={<EventParticipationForm />} />
    <Route path="/publications" element={<ResearchPublicationsForm />} />
    <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
