import React, { useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { isArray, filter, isEmpty } from 'lodash';
import { useQueryParams, StringParam, ArrayParam } from 'use-query-params';
import styled from '@emotion/styled';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
// components
import ListCard from '../components/ListCard';
import { useFetchInfiniteScroll } from '../hooks/useFetch';
import DrawerCheckbox from '../components/DrawerCheckbox';
// data
import { filterKeys } from '../utils';

const Projects = () => {
  const [query, setQuery] = useQueryParams({
    Theme: ArrayParam,
    Sector: ArrayParam,
    Size: ArrayParam,
    Countries: ArrayParam,
    ResultAreas: ArrayParam,
    keyword: StringParam
  });
  const { loading, list: data, sendQuery } = useFetchInfiniteScroll(
    `/all`,
    query
  );

  const handleToggle = (title, value) => {
    const arr = query[title];

    // first filter
    if (!arr || !arr.length) {
      return setQuery({ ...query, [title]: [value] }, 'replace');
    }

    // uncheck
    if (arr.includes(value)) {
      const newArr = filter(arr, v => v !== value);
      return setQuery({ ...query, [title]: newArr }, 'replace');
    }
    // add check
    return setQuery({ ...query, [title]: [...arr, value] }, 'replace');
  };

  const Row = ({ index, style }) => {
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListCard data={data[index]} />
      </ListItem>
    );
  };

  const mainEl = document.getElementsByTagName('main');

  return (
    <WrapperBox>
      <InnerBox component="main">
        <Container>
          <Toolbar />
          <Box p={3}>
            {/* TODO: handle when keyword is in search url */}
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Project ID / ApprovedRef / BoardMeeting / Project Name / Theme / Sector / Size / Size / Risk Category / etc.."
              variant="outlined"
              onChange={e => {
                setQuery({ ...query, keyword: e.target.value }, 'replace');
              }}
            />
          </Box>
          <Box>
            {!data || isEmpty(data) ? (
              <Container>
                <Typography>No data found</Typography>
              </Container>
            ) : (
              <InfiniteLoader
                isItemLoaded={index => !!data[index]}
                itemCount={data.length + 1}
                loadMoreItems={sendQuery}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    className="List"
                    height={mainEl.length ? mainEl[0].offsetHeight : 1000}
                    itemCount={data.length + 1}
                    itemSize={274}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={'100%'}
                  >
                    {Row}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            )}
          </Box>
        </Container>
      </InnerBox>

      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: '270px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '270px',
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {Object.keys(filterKeys).map(title => {
            if (isArray(filterKeys[title])) {
              return (
                <DrawerCheckbox
                  key={title}
                  title={title}
                  query={query}
                  handleToggle={handleToggle}
                />
              );
            }

            return null;
          })}
        </Box>
      </Drawer>
    </WrapperBox>
  );
};

export default Projects;

const WrapperBox = styled(Box)`
  display: flex;
`;

const InnerBox = styled(Box)`
  flex-grow: 1;
  overflow: hidden;
  min-height: 100vh;
`;
