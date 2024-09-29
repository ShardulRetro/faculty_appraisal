import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const data = [
  { label: 'Community Engagement', value: 20 },
  { label: 'Peer Collaboration', value: 25 },
  { label: 'Student Outcomes', value: 15 },
  { label: 'Innovative Teaching Methods', value: 30 },
  { label: 'Curriculum Development', value: 10 },
];

const factors = [
  {
    name: 'Community Engagement',
    value: 20,
    color: 'hsl(220, 25%, 65%)',
  },
  {
    name: 'Peer Collaboration',
    value: 25,
    color: 'hsl(220, 25%, 45%)',
  },
  {
    name: 'Student Outcomes',
    value: 15,
    color: 'hsl(180, 50%, 60%)',
  },
  {
    name: 'Innovative Teaching Methods',
    value: 30,
    color: 'hsl(90, 50%, 60%)',
  },
  {
    name: 'Curriculum Development',
    value: 10,
    color: 'hsl(60, 50%, 60%)',
  },
];

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

export default function FacultySelfAppraisalChart() {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Faculty Self-Appraisal Overview
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={factors.map((factor) => factor.color)}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[{
              data,
              innerRadius: 75,
              outerRadius: 100,
              paddingAngle: 0,
              highlightScope: { faded: 'global', highlighted: 'item' },
            }]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText="100%" secondaryText="Total Activities" />
          </PieChart>
        </Box>
        {factors.map((factor, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {factor.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {factor.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Faculty activity percentage"
                value={factor.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: factor.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
