import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";

const ResearchPublicationsForm = ({ updateForm, formData }) => {
  const [numPublications, setNumPublications] = useState(0);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("researchPublicationsForm"));
    if (savedData) {
      setNumPublications(savedData.numPublications);
      setPublications(savedData.publications);
    } else if (formData.publications && formData.publications.length > 0) {
      setNumPublications(formData.publications.length);
      setPublications(formData.publications);
    }
  }, [formData]);

  const handleNumPublicationsChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setNumPublications(value);
    
    const newPublications = [...publications];
    while (newPublications.length < value) {
      newPublications.push({ 
        title: '', 
        coAuthors: '', 
        date: '', 
        description: '', 
        journalName: '',
        volumeIssue: '',
        doi: '',
        fundingSource: '',
        status: '',
        documents: null 
      });
    }
    while (newPublications.length > value) {
      newPublications.pop();
    }
    setPublications(newPublications);
  };

  const handlePublicationChange = (index, field, value) => {
    const updatedPublications = [...publications];
    updatedPublications[index][field] = value;
    setPublications(updatedPublications);
  };

  const handleFileChange = (index, e) => {
    const updatedPublications = [...publications];
    updatedPublications[index].documents = e.target.files;
    setPublications(updatedPublications);
  };

  const addPublication = () => {
    setPublications([...publications, { 
      title: '', 
      coAuthors: '', 
      date: '', 
      description: '', 
      journalName: '',
      volumeIssue: '',
      doi: '',
      fundingSource: '',
      status: '',
      documents: null 
    }]);
    setNumPublications(prev => prev + 1);
  };

  const handleSave = () => {
    const formToSave = { numPublications, publications };
    localStorage.setItem("researchPublicationsForm", JSON.stringify(formToSave));
    alert("Research publications form saved successfully!");
    updateForm({ publications });
  };

  const handleNext = (e) => {
    e.preventDefault();
    updateForm({ ...formData, publications });
    handleSave();
    navigate('/summary');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box className="container">
      <Typography variant="h4" sx={{ margin: 0, p: 0 }}>Research Publications</Typography>
      <form onSubmit={handleNext}>
        {publications.map((publication, index) => (
          <Paper key={index} sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h6" sx={{ margin: 0, p: 0 }}>Publication {index + 1}</Typography>
            <TextField
              label="Title"
              value={publication.title}
              onChange={(e) => handlePublicationChange(index, 'title', e.target.value)}
              fullWidth
              multiline
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Co-Authors"
              value={publication.coAuthors}
              onChange={(e) => handlePublicationChange(index, 'coAuthors', e.target.value)}
              fullWidth
              multiline
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              type="date"
              value={publication.date}
              onChange={(e) => handlePublicationChange(index, 'date', e.target.value)}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">Date:</InputAdornment>,
              }}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Journal Name"
              value={publication.journalName}
              onChange={(e) => handlePublicationChange(index, 'journalName', e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              sx={{ marginBottom: 2,  p: 0 }}
            />
            <TextField
              label="Volume and Issue Number"
              value={publication.volumeIssue}
              onChange={(e) => handlePublicationChange(index, 'volumeIssue', e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              sx={{ marginBottom: 2,}}
            />
            <TextField
              label="DOI"
              value={publication.doi}
              onChange={(e) => handlePublicationChange(index, 'doi', e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              sx={{ marginBottom: 2,}}
            />
            <TextField
              label="Funding Source"
              value={publication.fundingSource}
              onChange={(e) => handlePublicationChange(index, 'fundingSource', e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              sx={{ marginBottom: 2,  }}
            />
            <TextField
              label="Status"
              value={publication.status}
              onChange={(e) => handlePublicationChange(index, 'status', e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              sx={{ marginBottom: 2, }}
            />
            <TextField
              label="Description"
              value={publication.description}
              onChange={(e) => handlePublicationChange(index, 'description', e.target.value)}
              multiline
              rows={4}
              fullWidth
              
              variant="outlined"
              sx={{ marginBottom: 2,  }}
            />
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(index, e)}
              style={{ margin: 0, padding: 0 }}
            />
          </Paper>
        ))}

        <Button variant="contained" onClick={addPublication} sx={{ marginBottom: 2 }}>
          Add Research Publication
        </Button>

        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={handleSave} sx={{ marginRight: 2 }}>
            Save
          </Button>
          <Button variant="contained" onClick={handleBack} sx={{ marginRight: 2 }}>
            Back
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResearchPublicationsForm;
