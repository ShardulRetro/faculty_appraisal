import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";

const EventParticipationForm = ({ updateForm, formData }) => {
  const [numEvents, setNumEvents] = useState(0);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Load formData or saved data from localStorage when returning to the form
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("eventParticipationForm"));
    if (savedData) {
      setNumEvents(savedData.numEvents);
      setEvents(savedData.events);
    } else if (formData.events && formData.events.length > 0) {
      setNumEvents(formData.events.length);
      setEvents(formData.events);
    }
  }, [formData]);

  // Adjust the number of event input fields dynamically
  const handleNumEventsChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setNumEvents(value);

    const newEvents = Array.from({ length: value }, (_, index) => ({
      eventName: '',
      date: '',
      role: '',
      documents: null,
      eventType: '',
      organizer: '',
      location: '',
      duration: '',
      participationLevel: ''
    }));
    setEvents(newEvents);
  };

  // Update event fields in state
  const handleEventChange = useCallback((index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  }, [events]);

  // Handle file input for each event
  const handleFileChange = useCallback((index, e) => {
    const updatedEvents = [...events];
    updatedEvents[index].documents = e.target.files;
    setEvents(updatedEvents);
  }, [events]);

  // Save form data to localStorage without navigating
  const handleSave = () => {
    const formToSave = { numEvents, events };
    localStorage.setItem("eventParticipationForm", JSON.stringify(formToSave));
    alert("Event participation form saved successfully!");
  };

  // Proceed to the next form, saving the current data
  const handleNext = (e) => {
    e.preventDefault();
    updateForm({ ...formData, events });
    handleSave(); // Save the form data
    navigate('/publications'); // Navigate to next page
  };

  // Go back to the previous page
  const handleBack = () => {
    navigate(-1); // Navigate back
  };

  // Add new event
  const handleAddEvent = () => {
    setEvents([...events, { eventName: '', date: '', role: '', documents: null }]);
    setNumEvents(prev => prev + 1);
  };

  return (
    <Container sx={{ width: "70%", marginLeft: "350px" }}>
      <Typography variant="h4" gutterBottom>
        Event Participation
      </Typography>
      <form onSubmit={handleNext}>
        <Grid container spacing={2} marginBottom={3}>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="How many events have you participated in?"
              value={numEvents}
              onChange={handleNumEventsChange}
              min="0"
              variant="outlined"
              fullWidth
              multiline
            />
          </Grid>
        </Grid>

        {events.map((event, index) => (
          <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Event {index + 1}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Event Name"
                  value={event.eventName}
                  onChange={(e) => handleEventChange(index, 'eventName', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="date"
                  label="Date"
                  value={event.date}
                  onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Role"
                  value={event.role}
                  onChange={(e) => handleEventChange(index, 'role', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Event Type"
                  value={event.eventType}
                  onChange={(e) => handleEventChange(index, 'eventType', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Organizer"
                  value={event.organizer}
                  onChange={(e) => handleEventChange(index, 'organizer', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Location"
                  value={event.location}
                  onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Duration"
                  value={event.duration}
                  onChange={(e) => handleEventChange(index, 'duration', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Participation Level"
                  value={event.participationLevel}
                  onChange={(e) => handleEventChange(index, 'participationLevel', e.target.value)}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="contained" component="label">
                  Upload documents
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
        
        <Button variant="contained" onClick={handleAddEvent} sx={{ marginBottom: 2 }}>
          Add Event
        </Button>

        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" onClick={handleSave} sx={{ marginRight: 1 }}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleBack} sx={{ marginRight: 1 }}>
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EventParticipationForm;
