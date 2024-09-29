import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import './PerformanceTables.css'; // Ensure you have a CSS file for styling

const PerformanceTables = () => {
  // State for handling form inputs and table data
  const [tableData, setTableData] = useState({
    lectures: [
      { id: 1, classCourse: "TE I", subjectsTaught: "BM", lecturesTarget: 30, lecturesEngaged: 33, targetAchieved: "100%", average: "100%", performance: "Excellent (1.0)", maxWeight: 25, weightAchieved: 25 },
      { id: 2, classCourse: "TE II", subjectsTaught: "BM", lecturesTarget: 30, lecturesEngaged: 31, targetAchieved: "100%", average: "100%", performance: "Excellent (1.0)", maxWeight: 25, weightAchieved: 25 },
    ],
    attendance: [
      { id: 1, classCourse: "TE I", subjectsTaught: "BM", studentsPresent: 52, lecturesEngaged: 33, studentsOnRoll: 77, averageAttendance: "82%", performance: "Excellent (1.0)", maxWeight: 25, weightAchieved: 25 },
    ],
    results: [
      { id: 1, classCourse: "TE I", subjectsTaught: "BM", studentsAppeared: 122, averageMarks: 46, studentsAboveAvg: 47, percentAboveAvg: "81%", average: "85%", performance: "Excellent (1.0)", maxWeight: 10, weightAchieved: 10 },
    ]
  });

  const [formData, setFormData] = useState({
    classCourse: '',
    subjectsTaught: '',
    lecturesTarget: '',
    lecturesEngaged: '',
    studentsPresent: '',
    studentsOnRoll: '',
    averageAttendance: '',
    studentsAppeared: '',
    averageMarks: '',
    studentsAboveAvg: '',
    percentAboveAvg: '',
    targetAchieved: '',
    average: '',
    performance: '',
    maxWeight: '',
    weightAchieved: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [currentTable, setCurrentTable] = useState('lectures');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to add or update data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId === null) {
      // Add new row
      const newEntry = { ...formData, id: tableData[currentTable].length + 1 };
      setTableData({
        ...tableData,
        [currentTable]: [...tableData[currentTable], newEntry]
      });
    } else {
      // Update existing row
      setTableData({
        ...tableData,
        [currentTable]: tableData[currentTable].map(row =>
          row.id === editingId ? { ...row, ...formData } : row
        )
      });
      setEditingId(null);
    }
    // Reset form
    setFormData({
      classCourse: '',
      subjectsTaught: '',
      lecturesTarget: '',
      lecturesEngaged: '',
      studentsPresent: '',
      studentsOnRoll: '',
      averageAttendance: '',
      studentsAppeared: '',
      averageMarks: '',
      studentsAboveAvg: '',
      percentAboveAvg: '',
      targetAchieved: '',
      average: '',
      performance: '',
      maxWeight: '',
      weightAchieved: ''
    });
  };

  // Handle editing a row
  const handleEdit = (id) => {
    const row = tableData[currentTable].find(row => row.id === id);
    setFormData(row);
    setEditingId(id);
  };

  // Handle deleting a row
  const handleDelete = (id) => {
    setTableData({
      ...tableData,
      [currentTable]: tableData[currentTable].filter(row => row.id !== id)
    });
  };

  return (
    <div className="tables-container">
      <Typography variant="h4" gutterBottom>Performance Tables</Typography>

      {/* Table Selector */}
      <Grid container spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" onClick={() => setCurrentTable('lectures')}>Lectures</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setCurrentTable('attendance')}>Attendance</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setCurrentTable('results')}>Results</Button>
        </Grid>
      </Grid>

      {/* Form to input new table data */}
      <form onSubmit={handleSubmit} className="performance-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Class/Course"
              name="classCourse"
              value={formData.classCourse}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subjects Taught"
              name="subjectsTaught"
              value={formData.subjectsTaught}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>

          {/* Conditional form fields based on selected table */}
          {currentTable === 'lectures' && (
            <>
              <Grid item xs={12} md={4}>
                <TextField
                  label="No. of Lectures Target"
                  name="lecturesTarget"
                  value={formData.lecturesTarget}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Lectures Actually Engaged"
                  name="lecturesEngaged"
                  value={formData.lecturesEngaged}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Percentage Target Achieved"
                  name="targetAchieved"
                  value={formData.targetAchieved}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
            </>
          )}
          {currentTable === 'attendance' && (
            <>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Students Present"
                  name="studentsPresent"
                  value={formData.studentsPresent}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="No. of Students on Roll"
                  name="studentsOnRoll"
                  value={formData.studentsOnRoll}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Average Attendance"
                  name="averageAttendance"
                  value={formData.averageAttendance}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
            </>
          )}
          {currentTable === 'results' && (
            <>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Students Appeared"
                  name="studentsAppeared"
                  value={formData.studentsAppeared}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Average Marks"
                  name="averageMarks"
                  value={formData.averageMarks}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Students Above Avg Marks"
                  name="studentsAboveAvg"
                  value={formData.studentsAboveAvg}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Percent Above Avg Marks"
                  name="percentAboveAvg"
                  value={formData.percentAboveAvg}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4}>
            <TextField
              label="Average"
              name="average"
              value={formData.average}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Performance & Multiplying Factors"
              name="performance"
              value={formData.performance}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Max Weight"
              name="maxWeight"
              value={formData.maxWeight}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Weight Achieved"
              name="weightAchieved"
              value={formData.weightAchieved}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid>
        </Grid>
      </form>
          <form onSubmit={handleSubmit}>
      <Button type="submit" variant="contained" color="primary">
          {editingId === null ? 'Add/Update' : 'Update'}
        </Button>
      {/* Table to display data */}
      </form>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class/Course</TableCell>
              <TableCell>Subjects Taught</TableCell>
              {currentTable === 'lectures' && (
                <>
                  <TableCell>No. of Lectures Target</TableCell>
                  <TableCell>Lectures Actually Engaged</TableCell>
                  <TableCell>Percentage Target Achieved</TableCell>
                </>
              )}
              {currentTable === 'attendance' && (
                <>
                  <TableCell>Students Present</TableCell>
                  <TableCell>No. of Students on Roll</TableCell>
                  <TableCell>Average Attendance</TableCell>
                </>
              )}
              {currentTable === 'results' && (
                <>
                  <TableCell>Students Appeared</TableCell>
                  <TableCell>Average Marks</TableCell>
                  <TableCell>Students Above Avg Marks</TableCell>
                  <TableCell>Percent Above Avg Marks</TableCell>
                </>
              )}
              <TableCell>Average</TableCell>
              <TableCell>Performance</TableCell>
              <TableCell>Max Weight</TableCell>
              <TableCell>Weight Achieved</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData[currentTable].map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.classCourse}</TableCell>
                <TableCell>{row.subjectsTaught}</TableCell>
                {currentTable === 'lectures' && (
                  <>
                    <TableCell>{row.lecturesTarget}</TableCell>
                    <TableCell>{row.lecturesEngaged}</TableCell>
                    <TableCell>{row.targetAchieved}</TableCell>
                  </>
                )}
                {currentTable === 'attendance' && (
                  <>
                    <TableCell>{row.studentsPresent}</TableCell>
                    <TableCell>{row.studentsOnRoll}</TableCell>
                    <TableCell>{row.averageAttendance}</TableCell>
                  </>
                )}
                {currentTable === 'results' && (
                  <>
                    <TableCell>{row.studentsAppeared}</TableCell>
                    <TableCell>{row.averageMarks}</TableCell>
                    <TableCell>{row.studentsAboveAvg}</TableCell>
                    <TableCell>{row.percentAboveAvg}</TableCell>
                  </>
                )}
                <TableCell>{row.average}</TableCell>
                <TableCell>{row.performance}</TableCell>
                <TableCell>{row.maxWeight}</TableCell>
                <TableCell>{row.weightAchieved}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PerformanceTables;
