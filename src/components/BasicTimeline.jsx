import React from 'react';
import { DateTime } from 'luxon';
// timeline
import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

/*
  reference: https://mui.com/material-ui/react-timeline/
*/
const BasicTimeline = ({ data }) => {
  const { ApprovalDate, DurationMonths, EndDate, StartDate } = data;
  const items = [
    {
      title: 'Pipeline',
      date: DateTime.fromISO(StartDate).toLocaleString()
    },
    {
      title: 'Approved',
      date: DateTime.fromISO(ApprovalDate).toLocaleString()
    },
    {
      title: 'Completed',
      date: DateTime.fromISO(EndDate).toLocaleString(),
      subText: `${DurationMonths} months`
    }
  ];
  return (
    <Box>
      <Typography variant="h4">Project Timeline</Typography>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0
          }
        }}
      >
        {items.map(({ title, date, subText }, i) => (
          <TimelineItem key={title}>
            <TimelineSeparator>
              <TimelineDot />
              {i + 1 === items.length ? null : <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <TimelineListItem title={title} date={date} subText={subText} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default BasicTimeline;

/*
  utils
*/
const TimelineListItem = ({ title, date, subText }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={title}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              color="text.primary"
            >
              {date}
            </Typography>
            <Typography>{subText}</Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
