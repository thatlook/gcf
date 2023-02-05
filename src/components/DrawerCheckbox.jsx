import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import { filterKeys } from '../utils';

const DrawerCheckbox = ({ title, query, handleToggle }) => {
  const mapArr = filterKeys[title];
  return (
    <Box p={2}>
      <Typography>{`Filter by ${title}`}</Typography>
      <List>
        {mapArr.map(value => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(title, value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={
                      query[title] && query[title].includes(value)
                        ? true
                        : false
                    }
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
};

export default DrawerCheckbox;
