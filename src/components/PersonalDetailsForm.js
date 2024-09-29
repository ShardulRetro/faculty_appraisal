import React, { useState } from 'react';
import './PersonalDetailsForm.css'; // Import your CSS for global styling
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const PersonalDetailsForm = () => {
  // State for Education Details
  const [educationRows, setEducationRows] = useState([{ degree: "", institution: "", year: "", file: null }]);
  // State for Courses Taught
  const [courseRows, setCourseRows] = useState([{ courseName: "", semester: "", year: "" }]);
  // State for Professional Development
  const [developmentRows, setDevelopmentRows] = useState([{ program: "", organization: "", year: "" }]);
  // State for Awards & Honors
  const [awardRows, setAwardRows] = useState([{ awardName: "", awardingBody: "", year: "" }]);

  // Additional States for Faculty Details
  const [department, setDepartment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [researchInterests, setResearchInterests] = useState("");
  const [publications, setPublications] = useState("");
  const [professionalMemberships, setProfessionalMemberships] = useState("");

  // Function to add a new education row
  const handleAddEducationRow = () => {
    setEducationRows([...educationRows, { degree: "", institution: "", year: "", file: null }]);
  };

  // Function to remove an education row
  const handleRemoveEducationRow = (index) => {
    const updatedRows = [...educationRows];
    updatedRows.splice(index, 1);
    setEducationRows(updatedRows);
  };

  // Function to handle field changes in the education table
  const handleEducationChange = (index, field, value) => {
    const updatedRows = [...educationRows];
    updatedRows[index][field] = value;
    setEducationRows(updatedRows);
  };

  // Function to handle file upload in the education table
  const handleFileUpload = (index, file) => {
    const updatedRows = [...educationRows];
    updatedRows[index].file = file;
    setEducationRows(updatedRows);
  };

  // Functions for Courses Taught
  const handleAddCourseRow = () => {
    setCourseRows([...courseRows, { courseName: "", semester: "", year: "" }]);
  };

  const handleRemoveCourseRow = (index) => {
    const updatedRows = [...courseRows];
    updatedRows.splice(index, 1);
    setCourseRows(updatedRows);
  };

  const handleCourseChange = (index, field, value) => {
    const updatedRows = [...courseRows];
    updatedRows[index][field] = value;
    setCourseRows(updatedRows);
  };

  // Functions for Professional Development
  const handleAddDevelopmentRow = () => {
    setDevelopmentRows([...developmentRows, { program: "", organization: "", year: "" }]);
  };

  const handleRemoveDevelopmentRow = (index) => {
    const updatedRows = [...developmentRows];
    updatedRows.splice(index, 1);
    setDevelopmentRows(updatedRows);
  };

    const [resume, setResume] = useState(null);
  
    const handleResumeUpload = (file) => {
      setResume(file);
      console.log("Uploaded file:", file);
    };
  

  const handleDevelopmentChange = (index, field, value) => {
    const updatedRows = [...developmentRows];
    updatedRows[index][field] = value;
    setDevelopmentRows(updatedRows);
  };

  // Functions for Awards & Honors
  const handleAddAwardRow = () => {
    setAwardRows([...awardRows, { awardName: "", awardingBody: "", year: "" }]);
  };

  const handleRemoveAwardRow = (index) => {
    const updatedRows = [...awardRows];
    updatedRows.splice(index, 1);
    setAwardRows(updatedRows);
  };

  const handleAwardChange = (index, field, value) => {
    const updatedRows = [...awardRows];
    updatedRows[index][field] = value;
    setAwardRows(updatedRows);
  };

  return (
    <div className="container">
      <header>
        <h1>Faculty Self-Appraisal Form</h1>
      </header>
      <form>
        {/* Name Field with Start Adornment */}
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          required
          multiline
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        {/* Email Field with Start Adornment */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          required
          multiline
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Email Field with Start Adornment */}
        <TextField
          fullWidth
          label="Confirm Email"
          variant="outlined"
          margin="normal"
          type="email"
          required
          multiline
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Department Field */}
        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          margin="normal"
          required
          multiline
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Phone Number Field with Start Adornment */}
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          margin="normal"
          required
          type="tel"
          multiline
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        {/* Account Type Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Account Type</InputLabel>
          <Select
            label="Account Type"
            defaultValue="perso"
          >
            <MenuItem value="perso">Personal</MenuItem>
            <MenuItem value="business">Business</MenuItem>
          </Select>
        </FormControl>

        {/* Date of Appointment */}
        <TextField
          fullWidth
          label="Date of Appointment"
          variant="outlined"
          margin="normal"
          type="date"
          multiline
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
          required
        />

        {/* Teaching Experience */}
        <TextField
          fullWidth
          label="Teaching Experience in Undergraduate (in years)"
          variant="outlined"
          margin="normal"
          required
          type="number"
          multiline
        />

        {/* Research Interests */}
        <TextField
          fullWidth
          label="Research Interests"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={researchInterests}
          onChange={(e) => setResearchInterests(e.target.value)}
        />

        {/* Publications */}
        <TextField
          fullWidth
          label="Publications"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={publications}
          onChange={(e) => setPublications(e.target.value)}
        />

        {/* Professional Memberships */}
        <TextField
          fullWidth
          label="Professional Memberships"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={professionalMemberships}
          onChange={(e) => setProfessionalMemberships(e.target.value)}
        />

        {/* Education Details Table */}
        <h2>Education Details</h2>
        <TableContainer component={Paper}>
          <Table aria-label="education details table">
            <TableHead>
              <TableRow>
                <TableCell>Degree</TableCell>
                <TableCell>Institution</TableCell>
                <TableCell>Year of Passing</TableCell>
                <TableCell>Marksheet Upload</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educationRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadFileIcon />}
                    >
                      Upload
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleFileUpload(index, e.target.files[0])}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveEducationRow(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleAddEducationRow(index)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  

        {/* Courses Taught Table */}
        <h2>Courses Taught</h2>
        <TableContainer component={Paper}>
          <Table aria-label="courses taught table">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.courseName}
                      onChange={(e) => handleCourseChange(index, 'courseName', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.semester}
                      onChange={(e) => handleCourseChange(index, 'semester', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.year}
                      onChange={(e) => handleCourseChange(index, 'year', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveCourseRow(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleAddCourseRow(index)}>
                      <AddIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       

        {/* Professional Development Table */}
        <h2>Professional Development</h2>
        <TableContainer component={Paper}>
          <Table aria-label="professional development table">
            <TableHead>
              <TableRow>
                <TableCell>Program</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {developmentRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.program}
                      onChange={(e) => handleDevelopmentChange(index, 'program', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.organization}
                      onChange={(e) => handleDevelopmentChange(index, 'organization', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.year}
                      onChange={(e) => handleDevelopmentChange(index, 'year', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveDevelopmentRow(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleAddDevelopmentRow(index)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    

        {/* Awards & Honors Table */}
        <h2>Awards & Honors</h2>
        <TableContainer component={Paper}>
          <Table aria-label="awards and honors table">
            <TableHead>
              <TableRow>
                <TableCell>Award Name</TableCell>
                <TableCell>Awarding Body</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {awardRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.awardName}
                      onChange={(e) => handleAwardChange(index, 'awardName', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.awardingBody}
                      onChange={(e) => handleAwardChange(index, 'awardingBody', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={row.year}
                      onChange={(e) => handleAwardChange(index, 'year', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveAwardRow(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleAddAwardRow(index)}>
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    
        <Button
        variant="outlined"
        component="label"
        startIcon={<UploadFileIcon />}
        sx={{ marginTop: 2,width:"100%" }}
      >
        Upload Resume
        <input
          type="file"
          hidden
          accept=".pdf, .doc, .docx"
          onChange={(e) => handleResumeUpload(e.target.files[0])}
        />
      </Button>
      {resume && <p>Uploaded: {resume.name}</p>}
        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2,width:"100%" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
export default PersonalDetailsForm;
