import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material"; // Import Material UI components
import "./ProjectsForm.css";

const ProjectsForm = ({ updateForm, formData }) => {
  const [numProjects, setNumProjects] = useState(0);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Load formData if it's passed in, or load saved data from localStorage if returning
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("projectsForm"));
    if (savedData) {
      setNumProjects(savedData.numProjects);
      setProjects(savedData.projects);
    } else if (formData.projects && formData.projects.length > 0) {
      setNumProjects(formData.projects.length);
      setProjects(formData.projects);
    }
  }, [formData]);

  // Adjust the number of project input fields dynamically
  const handleNumProjectsChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // Ensure non-negative number
    setNumProjects(value);

    const newProjects = [...projects];
    while (newProjects.length < value) {
      newProjects.push({
        title: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
        field: '',
        collaborators: '',
        goals: '',
        outcomes: '',
        projectType: '',  // New field for project type
        status: '',       // New field for project status
        documents: null,
      });
    }
    while (newProjects.length > value) {
      newProjects.pop();
    }
    setProjects(newProjects);
  };

  // Update project fields in state
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  // Handle file input for each project
  const handleFileChange = (index, e) => {
    const updatedProjects = [...projects];
    updatedProjects[index].documents = e.target.files; // Save file input as FileList
    setProjects(updatedProjects);
  };

  // Save form data to localStorage without navigating
  const handleSave = () => {
    const formToSave = { numProjects, projects };
    localStorage.setItem("projectsForm", JSON.stringify(formToSave));
    alert("Projects form saved successfully!");
  };

  // Proceed to the next form, saving the current data
  const handleNext = (e) => {
    e.preventDefault();
    updateForm({ ...formData, projects }); // Merge with existing formData
    handleSave(); // Save the form data
    navigate('/seminars'); // Navigate to next page
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Add a new project
  const handleAddProject = () => {
    setNumProjects(numProjects + 1);
    setProjects([...projects, {
      title: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      field: '',
      collaborators: '',
      goals: '',
      outcomes: '',
      projectType: '',  // New field for project type
      status: '',       // New field for project status
      documents: null,
    }]);
  };

  return (
    <Box className="container" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      {projects.map((project, index) => (
        <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.title}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Title:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.role}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Role:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'role', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">  {/* Change to outlined */}
                <InputLabel>Description</InputLabel>
                <Select
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  label="Description"
                >
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="AI/ML">AI/ML</MenuItem>
                  <MenuItem value="Blockchain">Blockchain</MenuItem>
                  <MenuItem value="IOT">IOT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.field}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Field:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'field', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.collaborators}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Collaborators:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'collaborators', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.goals}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Goals:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'goals', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.outcomes}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Outcomes:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'outcomes', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.projectType}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Project Type:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'projectType', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"  // Change to outlined
                fullWidth
                multiline
                sx={{ p: 0, m: 0 }}
                value={project.status}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Status:</InputAdornment>,
                }}
                onChange={(e) => handleProjectChange(index, 'status', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                variant="outlined"  // Change to outlined
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={project.startDate}
                onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Start:</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                variant="outlined"  // Change to outlined
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={project.endDate}
                onChange={(e) => handleProjectChange(index, 'endDate', e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">End:</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                multiple
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        variant="contained"
        onClick={handleAddProject}
        sx={{ marginBottom: 2 }}
      >
        Add Project
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Number of Projects"
            variant="outlined"  // Change to outlined
            fullWidth
            value={numProjects}
            onChange={handleNumProjectsChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">Count:</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={handleBack} sx={{ marginRight: 2 }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectsForm;
