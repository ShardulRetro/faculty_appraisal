import './App.css';
import Login from './Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import PersonalDetailsForm from './components/PersonalDetailsForm.js';
import ProjectsForm from './components/ProjectsForm';
import SeminarsForm from './components/SeminarsForm';
import EventParticipationForm from './components/EventParticipationForm';
import ResearchPublicationsForm from './components/ResearchPublicationsForm';
import { useState } from 'react';
import SideMenu from './components/SideMenu.js';
import PerformanceTables from './components/PerformanceTables.js';
import PerformanceReview from './components/PerformanceReview.js';
import Layout from './Layout';
import Userpage from './UserPage.js';
function App() {
  // Customize the theme
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#333', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3f51b5', // Border color when focused
              },
            },
          },
        },
      },
    },
  });

  const [formData, setFormData] = useState({
    projects: [],
    seminars: [],
    events: [],
    publications: []
  });

  const updateFormData = (section, data) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: data
    }));
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectsForm
                  updateForm={(data) => updateFormData('projects', data)}
                  formData={formData}
                />
              }
            />
            <Route
              path="/seminars"
              element={
                <SeminarsForm
                  updateForm={(data) => updateFormData('seminars', data)}
                  formData={formData}
                />
              }
            />
            <Route
              path="/events"
              element={
                <EventParticipationForm
                  updateForm={(data) => updateFormData('events', data)}
                  formData={formData}
                />
              }
            />
            <Route
              path="/publications"
              element={
                <ResearchPublicationsForm
                  updateForm={(data) => updateFormData('publications', data)}
                  formData={formData}
                />
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/personaldetails" element={<PersonalDetailsForm />} />
            <Route path="/performancetables" element={<PerformanceTables />} />
            <Route path="/userpage" element={<Userpage />} />
            <Route path="/performancereview" element={<PerformanceReview />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
