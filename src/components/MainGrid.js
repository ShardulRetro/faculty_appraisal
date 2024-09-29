import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';

import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';

const data = [
  {
    title: 'Citations of Research Papers (over time)',
    value: '1.4k',  // 1,400 citations in total
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      50, 70, 80, 90, 85, 100, 95, 105, 110, 120, 130, 140, 145, 150, 160, 170,
      180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310,
    ],
  },
  {
    title: 'Participation in National/International Conferences',
    value: '12',  // Participated in 12 conferences
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      8, 7, 6, 5, 6, 7, 4, 5, 6, 3, 4, 5, 5, 4, 3, 4,
      2, 3, 4, 3, 4, 3, 3, 2, 3, 2, 2, 1, 1, 1,
    ],
  },
  {
    title: 'Research Grants/Projects Secured',
    value: '$50k',  // $50,000 secured
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      5000, 4500, 4700, 4800, 4900, 5000, 5200, 5300, 5100, 5200, 5100, 5000, 4900, 5300, 5400, 5500,
      5100, 5200, 5300, 5400, 5100, 5200, 5300, 5400, 5000, 5200, 5100, 5000, 4800, 4900,
    ],
  },
];


export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '2000px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }} >
            <StatCard {...card} />
          </Grid>
        ))}
       
        <Grid size={{ sm: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
