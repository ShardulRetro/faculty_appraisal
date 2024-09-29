import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getMonths() {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

export default function FacultySelfAppraisalChart() {
  const theme = useTheme();
  const months = getMonths();

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Faculty Self-Appraisal Metrics
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
              85/100
            </Typography>
            <Chip size="small" color="success" label="Improvement +10%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Average performance rating over the past year
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: months,
              tickInterval: (index, i) => (i + 1) % 1 === 0, // Show every month
            },
          ]}
          series={[
            {
              id: 'teachingEffectiveness',
              label: 'Teaching Effectiveness Rating',
              showMark: true,
              curve: 'linear',
              area: true,
              stackOrder: 'ascending',
              data: [75, 78, 80, 82, 84, 86, 88, 90, 92, 91, 93, 94],
              lineWidth: 2,
              strokeDasharray: '0', // Solid line
            },
            {
              id: 'curriculumDevelopment',
              label: 'Curriculum Development Initiatives',
              showMark: true,
              curve: 'linear',
              area: true,
              stackOrder: 'ascending',
              data: [3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 12],
              lineWidth: 2,
              strokeDasharray: '4 2', // Dashed line
            },
            {
              id: 'mentorshipEngagement',
              label: 'Mentorship & Student Engagement Activities',
              showMark: true,
              curve: 'linear',
              area: true,
              stackOrder: 'ascending',
              data: [50, 55, 60, 65, 70, 75, 78, 80, 82, 84, 86, 90],
              lineWidth: 2,
              strokeDasharray: '2 2', // Dotted line
            },
          ]}
          height={300} // Increased height for better visibility
          margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-teachingEffectiveness': {
              fill: "url('#teachingEffectiveness')",
            },
            '& .MuiAreaElement-series-curriculumDevelopment': {
              fill: "url('#curriculumDevelopment')",
            },
            '& .MuiAreaElement-series-mentorshipEngagement': {
              fill: "url('#mentorshipEngagement')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="teachingEffectiveness" />
          <AreaGradient color={theme.palette.success.main} id="curriculumDevelopment" />
          <AreaGradient color={theme.palette.warning.main} id="mentorshipEngagement" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
