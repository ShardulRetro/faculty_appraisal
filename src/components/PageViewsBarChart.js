import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function ResourceAllocationBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Faculty Resource Allocation Metrics
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              Resource Overview
            </Typography>
            <Chip size="small" color="success" label="+10%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Metrics assessed over the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            },
          ]}
          series={[
            {
              id: 'publications',
              label: 'Publications',
              data: [10, 15, 12, 20, 18, 14, 22], // Example data for number of publications
              stack: 'A',
            },
            {
              id: 'professional-development',
              label: 'Professional Development Initiatives',
              data: [2, 3, 1, 4, 2, 5, 3], // Example data for initiatives taken
              stack: 'A',
            },
            {
              id: 'courses-completed',
              label: 'Courses Completed',
              data: [3, 4, 5, 2, 6, 3, 4], // Example data for courses completed
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
