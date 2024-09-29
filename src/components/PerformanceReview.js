import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Box,
  TextField,
} from '@mui/material';
import "./PerformanceReview.css";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const PerformanceReview = () => {
  const [formData, setFormData] = useState({
    classCourse: '',
    subjectsTaught: '',
    lecturesTarget: 0,
    lecturesEngaged: 0,
    studentsPresent: 0,
    studentsOnRoll: 0,
    studentsAppeared: 0,
    averageMarks: 0,
    seminarsConducted: 0,
    conferencesAttended: 0,
    projectsInvolved: 0,
    researchPapersPublished: 0,
  });

  // Initialize dataEntries with dummy data
  const [dataEntries, setDataEntries] = useState([
    {
      classCourse: 'Class 10',
      subjectsTaught: 'Mathematics',
      lecturesTarget: 20,
      lecturesEngaged: 18,
      studentsPresent: 25,
      studentsOnRoll: 30,
      studentsAppeared: 28,
      averageMarks: 75,
      seminarsConducted: 2,
      conferencesAttended: 1,
      projectsInvolved: 3,
      researchPapersPublished: 1,
    },
    // Add more dummy entries as needed...
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name.includes('Target') || name.includes('Engaged') || name.includes('Present') || name.includes('On Roll') || name.includes('Appeared') || name.includes('Marks') || name.includes('Conducted') || name.includes('Attended') || name.includes('Involved') || name.includes('Published')
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataEntries((prevEntries) => [...prevEntries, formData]);
    setOpenSnackbar(true); // Open success message
    setFormData({
      classCourse: '',
      subjectsTaught: '',
      lecturesTarget: 0,
      lecturesEngaged: 0,
      studentsPresent: 0,
      studentsOnRoll: 0,
      studentsAppeared: 0,
      averageMarks: 0,
      seminarsConducted: 0,
      conferencesAttended: 0,
      projectsInvolved: 0,
      researchPapersPublished: 0,
    });
  };

  // Chart data
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Example labels
    datasets: [
      {
        label: 'Engaged Lectures',
        data: dataEntries.map(entry => entry.lecturesEngaged), // Using engaged lectures from entries
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // Function to generate recommendations based on data entries
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Check if there are entries to analyze
    if (dataEntries.length === 0) {
      return recommendations;
    }

    dataEntries.forEach((entry, index) => {
      if (entry.lecturesEngaged < entry.lecturesTarget) {
        recommendations.push({
          text: `Consider increasing engagement in lectures. Engaged: ${entry.lecturesEngaged}, Target: ${entry.lecturesTarget}.`,
          severity: 'warning',
        });
      }

      if (entry.studentsPresent < entry.studentsOnRoll) {
        recommendations.push({
          text: `More efforts needed to encourage students to attend classes. Present: ${entry.studentsPresent}, On Roll: ${entry.studentsOnRoll}.`,
          severity: 'warning',
        });
      }

      if (entry.averageMarks < 50) { // Assuming 50 is the passing mark
        recommendations.push({
          text: `Review teaching methods or student support for better performance. Average Marks: ${entry.averageMarks}.`,
          severity: 'error',
        });
      }

      // New checks for seminars, conferences, projects, and research papers
      if (entry.seminarsConducted < 1) {
        recommendations.push({
          text: `Consider conducting more seminars to enhance student engagement. Seminars Conducted: ${entry.seminarsConducted}.`,
          severity: 'warning',
        });
      }

      if (entry.conferencesAttended < 1) {
        recommendations.push({
          text: `Participate in more conferences to broaden academic exposure. Conferences Attended: ${entry.conferencesAttended}.`,
          severity: 'warning',
        });
      }

      if (entry.projectsInvolved < 1) {
        recommendations.push({
          text: `Involve in more projects to enhance practical experience. Projects Involved: ${entry.projectsInvolved}.`,
          severity: 'warning',
        });
      }

      if (entry.researchPapersPublished < 1) {
        recommendations.push({
          text: `Aim to publish more research papers to contribute to academic research. Papers Published: ${entry.researchPapersPublished}.`,
          severity: 'warning',
        });
      }
    });

    return recommendations.length > 0 ? recommendations : [{ text: 'No areas identified for improvement. Keep up the good work!', severity: 'success' }];
  };

  // Recommendations generated based on data analysis
  const recommendations = generateRecommendations();

  return (
    <div className='container'>
      <Typography variant="h4" gutterBottom>Performance Review</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Class/Course"
              name="classCourse"
              value={formData.classCourse}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Subjects Taught"
              name="subjectsTaught"
              value={formData.subjectsTaught}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Lectures Target"
              name="lecturesTarget"
              value={formData.lecturesTarget}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Lectures Engaged"
              name="lecturesEngaged"
              value={formData.lecturesEngaged}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Students Present"
              name="studentsPresent"
              value={formData.studentsPresent}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Students on Roll"
              name="studentsOnRoll"
              value={formData.studentsOnRoll}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Students Appeared"
              name="studentsAppeared"
              value={formData.studentsAppeared}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Average Marks"
              name="averageMarks"
              value={formData.averageMarks}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* New fields for additional metrics */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Seminars Conducted"
              name="seminarsConducted"
              value={formData.seminarsConducted}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Conferences Attended"
              name="conferencesAttended"
              value={formData.conferencesAttended}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Projects Involved"
              name="projectsInvolved"
              value={formData.projectsInvolved}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Research Papers Published"
              name="researchPapersPublished"
              value={formData.researchPapersPublished}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">Data submitted successfully!</Alert>
      </Snackbar>

      <Typography variant="h5" gutterBottom>Performance Data</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class/Course</TableCell>
              <TableCell>Subjects Taught</TableCell>
              <TableCell>Lectures Target</TableCell>
              <TableCell>Lectures Engaged</TableCell>
              <TableCell>Students Present</TableCell>
              <TableCell>Students on Roll</TableCell>
              <TableCell>Students Appeared</TableCell>
              <TableCell>Average Marks</TableCell>
              <TableCell>Seminars Conducted</TableCell>
              <TableCell>Conferences Attended</TableCell>
              <TableCell>Projects Involved</TableCell>
              <TableCell>Research Papers Published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEntries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.classCourse}</TableCell>
                <TableCell>{entry.subjectsTaught}</TableCell>
                <TableCell>{entry.lecturesTarget}</TableCell>
                <TableCell>{entry.lecturesEngaged}</TableCell>
                <TableCell>{entry.studentsPresent}</TableCell>
                <TableCell>{entry.studentsOnRoll}</TableCell>
                <TableCell>{entry.studentsAppeared}</TableCell>
                <TableCell>{entry.averageMarks}</TableCell>
                <TableCell>{entry.seminarsConducted}</TableCell>
                <TableCell>{entry.conferencesAttended}</TableCell>
                <TableCell>{entry.projectsInvolved}</TableCell>
                <TableCell>{entry.researchPapersPublished}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>Recommendations</Typography>
      <Box>
        {recommendations.map((rec, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: '1rem', backgroundColor: rec.severity === 'error' ? '#f8d7da' : rec.severity === 'warning' ? '#fff3cd' : '#d4edda' }}>
            <CardContent>
              <Typography color={rec.severity === 'error' ? 'error' : rec.severity === 'warning' ? 'warning' : 'success'}>
                {rec.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h5" gutterBottom>Engaged Lectures Chart</Typography>
      <Line data={chartData} />
    </div>
  );
};

export default PerformanceReview;
