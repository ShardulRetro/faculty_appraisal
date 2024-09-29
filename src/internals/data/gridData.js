import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 200}
        height={64}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status) {
  const colors = {
    Completed: 'success',
    'In Progress': 'default',
    'Not Started': 'error',
  };

  const styles = {
    'In Progress': {
      backgroundColor: 'rgba(128, 128, 128, 0.1)', 
      color: '#000',
    },
  };

  return (
    <Chip
      label={status}
      color={colors[status] === 'default' ? undefined : colors[status]}
      size="small"
      style={colors[status] === 'default' ? styles['In Progress'] : {}}
    />
  );
}

export const columns = [
  { field: 'pageTitle', headerName: 'Title', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'users',
    headerName: 'Contributors',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'eventCount',
    headerName: 'Submissions',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'viewsPerUser',
    headerName: 'Engagement',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'averageTime',
    headerName: 'Duration',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'conversions',
    headerName: 'Impact Trends',
    flex: 1,
    minWidth: 200,
    renderCell: renderSparklineCell,
  },
];
export const rows = [
  {
    id: 1,
    pageTitle: 'Research Paper Submission',
    status: 'Completed',
    eventCount: 10,
    users: 5,
    viewsPerUser: 2,
    averageTime: '1h',
    conversions: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
  },
  {
    id: 2,
    pageTitle: 'Patent Application',
    status: 'In Progress',
    eventCount: 5,
    users: 3,
    viewsPerUser: 3,
    averageTime: '30m',
    conversions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  },
  {
    id: 3,
    pageTitle: 'Seminar Presentation',
    status: 'Not Started',
    eventCount: 0,
    users: 0,
    viewsPerUser: 0,
    averageTime: '0m',
    conversions: [],
  },
  {
    id: 4,
    pageTitle: 'Conference Workshop',
    status: 'Completed',
    eventCount: 8,
    users: 12,
    viewsPerUser: 6,
    averageTime: '2h',
    conversions: [8, 12, 15, 18, 20, 24, 30, 32, 35, 40],
  },
  {
    id: 5,
    pageTitle: 'Grant Proposal Submission',
    status: 'In Progress',
    eventCount: 3,
    users: 2,
    viewsPerUser: 4,
    averageTime: '1.5h',
    conversions: [1, 3, 5, 8, 10, 12, 15, 18, 20, 22],
  },
  {
    id: 6,
    pageTitle: 'Webinar Series',
    status: 'Completed',
    eventCount: 15,
    users: 50,
    viewsPerUser: 5,
    averageTime: '1h',
    conversions: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
  },
  {
    id: 7,
    pageTitle: 'Collaborative Research Project',
    status: 'In Progress',
    eventCount: 12,
    users: 6,
    viewsPerUser: 7,
    averageTime: '2h',
    conversions: [15, 18, 20, 22, 25, 28, 30, 33, 35, 38],
  },
  {
    id: 8,
    pageTitle: 'International Symposium',
    status: 'Not Started',
    eventCount: 0,
    users: 0,
    viewsPerUser: 0,
    averageTime: '0m',
    conversions: [],
  },
  {
    id: 9,
    pageTitle: 'Thesis Defense',
    status: 'Completed',
    eventCount: 2,
    users: 1,
    viewsPerUser: 10,
    averageTime: '1.5h',
    conversions: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    id: 10,
    pageTitle: 'Innovation Challenge',
    status: 'Completed',
    eventCount: 4,
    users: 20,
    viewsPerUser: 3,
    averageTime: '1h',
    conversions: [5, 10, 15, 20, 30, 35, 40, 45, 50, 55],
  },
  {
    id: 11,
    pageTitle: 'Industry Collaboration Meeting',
    status: 'In Progress',
    eventCount: 6,
    users: 8,
    viewsPerUser: 4,
    averageTime: '1h',
    conversions: [3, 6, 9, 12, 15, 18, 20, 22, 24, 26],
  },
  {
    id: 12,
    pageTitle: 'Poster Presentation',
    status: 'Completed',
    eventCount: 7,
    users: 10,
    viewsPerUser: 8,
    averageTime: '1h',
    conversions: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  },
  {
    id: 13,
    pageTitle: 'Research Fellowship Application',
    status: 'In Progress',
    eventCount: 3,
    users: 2,
    viewsPerUser: 2,
    averageTime: '1.5h',
    conversions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 14,
    pageTitle: 'Hackathon Participation',
    status: 'Not Started',
    eventCount: 0,
    users: 0,
    viewsPerUser: 0,
    averageTime: '0m',
    conversions: [],
  },
  {
    id: 15,
    pageTitle: 'Research Networking Event',
    status: 'Completed',
    eventCount: 10,
    users: 15,
    viewsPerUser: 9,
    averageTime: '2h',
    conversions: [5, 7, 10, 12, 15, 18, 20, 23, 25, 28],
  },
];
