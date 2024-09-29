import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";

const SeminarsForm = ({ updateForm, formData }) => {
  const [numSeminars, setNumSeminars] = useState(0);
  const [seminars, setSeminars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("seminarsForm"));
    if (savedData) {
      setNumSeminars(savedData.numSeminars);
      setSeminars(savedData.seminars);
    } else if (formData.seminars && formData.seminars.length > 0) {
      setNumSeminars(formData.seminars.length);
      setSeminars(formData.seminars);
    }
  }, [formData]);

  const handleNumSeminarsChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setNumSeminars(value);
    setSeminars((prevSeminars) => {
      const newSeminars = [...prevSeminars];
      while (newSeminars.length < value) {
        newSeminars.push({
          topic: '',
          date: '',
          location: '',
          participantCount: '',
          role: '',
          duration: '',
          level: '',
          outcome: '',
          feedback: '',
          documents: null,
        });
      }
      while (newSeminars.length > value) {
        newSeminars.pop();
      }
      return newSeminars;
    });
  };

  const handleSeminarChange = (index, field, value) => {
    const updatedSeminars = [...seminars];
    updatedSeminars[index][field] = value;
    setSeminars(updatedSeminars);
  };

  const handleFileChange = (index, e) => {
    const updatedSeminars = [...seminars];
    updatedSeminars[index].documents = e.target.files;
    setSeminars(updatedSeminars);
  };

  const handleAddSeminar = () => {
    setSeminars((prevSeminars) => [
      ...prevSeminars,
      {
        topic: '',
        date: '',
        location: '',
        participantCount: '',
        role: '',
        duration: '',
        level: '',
        outcome: '',
        feedback: '',
        documents: null,
      },
    ]);
    setNumSeminars(numSeminars + 1);
  };

  const handleSave = () => {
    const formToSave = { numSeminars, seminars };
    localStorage.setItem("seminarsForm", JSON.stringify(formToSave));
    alert("Seminars form saved successfully!");
  };

  const handleNext = (e) => {
    e.preventDefault();
    updateForm({ ...formData, seminars });
    handleSave();
    navigate('/events');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4">Seminars Self-Appraisal</Typography>
        <form onSubmit={handleNext}>
          <Box mb={3}>
            <TextField
              label="How many seminars have you attended this academic year?"
              type="number"
              value={numSeminars}
              onChange={handleNumSeminarsChange}
              min="0"
              fullWidth
            />
          </Box>

          {seminars.map((seminar, index) => (
            <Box key={index} mb={3}>
              <Typography variant="h6">Seminar {index + 1}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Topic"
                    value={seminar.topic}
                    onChange={(e) => handleSeminarChange(index, 'topic', e.target.value)}
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date"
                    type="date"
                    value={seminar.date}
                    onChange={(e) => handleSeminarChange(index, 'date', e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location"
                    value={seminar.location}
                    onChange={(e) => handleSeminarChange(index, 'location', e.target.value)}
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Role (Speaker/Participant)"
                    value={seminar.role}
                    onChange={(e) => handleSeminarChange(index, 'role', e.target.value)}
                    fullWidth

                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Duration (in hours/days)"
                    value={seminar.duration}
                    onChange={(e) => handleSeminarChange(index, 'duration', e.target.value)}
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Level (International/National/Local)"
                    value={seminar.level}
                    onChange={(e) => handleSeminarChange(index, 'level', e.target.value)}
                    fullWidth
                    multiline
                  >
                    <MenuItem value="">Select Level</MenuItem>
                    <MenuItem value="International">International</MenuItem>
                    <MenuItem value="National">National</MenuItem>
                    <MenuItem value="Local">Local</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Number of Participants"
                    type="number"
                    value={seminar.participantCount}
                    onChange={(e) => handleSeminarChange(index, 'participantCount', e.target.value)}
                    min="0"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Outcome of Seminar (learning/outcomes achieved)"
                    multiline
                    rows={4}
                    value={seminar.outcome}
                    onChange={(e) => handleSeminarChange(index, 'outcome', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Feedback Received"
                    multiline
                    rows={4}
                    value={seminar.feedback}
                    onChange={(e) => handleSeminarChange(index, 'feedback', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}

          <Button variant="contained" color="primary" onClick={handleAddSeminar} sx={{ mb: 2 }}>
            Add Seminar
          </Button>
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Box>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                Save
              </Button>
              <Button variant="contained" type="submit">
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default SeminarsForm;
