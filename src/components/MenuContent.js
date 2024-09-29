import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';        // For Dashboard
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'; // For Projects
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';    // For Seminars
import EventRoundedIcon from '@mui/icons-material/EventRounded';      // For Events
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';  // For Research (Publications)
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';    // For Personal Details
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';  // For Performance Tables



const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, link: '/dashboard' },
  { text: 'Projects', icon: <WorkOutlineRoundedIcon />, link: '/projects' },
  { text: 'Seminars', icon: <SchoolRoundedIcon />, link: '/seminars' },
  { text: 'Events', icon: <EventRoundedIcon />, link: '/events' },
  { text: 'Research', icon: <ScienceRoundedIcon />, link: '/publications' },
  { text: 'Personal Details', icon: <PersonRoundedIcon />, link: '/personaldetails' },
  { text: 'Performance Tables', icon: <TableChartRoundedIcon />, link: '/performancetables' },
  { text: 'Performance Review', icon: <TableChartRoundedIcon />, link: '/performancereview' }
];

const secondaryListItems = [
  { text: 'Summary', icon: <SettingsRoundedIcon />, link: '/summary' },

];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={Link} to={item.link} selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={item.link ? Link : 'div'} to={item.link || '#'}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
