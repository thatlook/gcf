import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import qs from 'query-string';
import styled from '@emotion/styled';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import AppBarComponent from './components/AppBar';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#15a14a'
    },
    secondary: {
      main: '#084081'
    },
    success: {
      main: '#005a6e'
    },
    info: {
      main: '#17a2b8'
    }
  },
  /*
    h1
    h2
    h3
    h4
    h5
    h6
    subtitle1
    subtitle2
    body1
    body2
    button
    caption
    overline
  */
  typography: {
    h6: {
      textTransform: 'capitalize'
    }
  }
});

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <QueryParamProvider
          adapter={ReactRouter6Adapter}
          options={{
            searchStringToObject: qs.parse,
            objectToSearchString: qs.stringify
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Projects />} />
              <Route path="project/:id" element={<ProjectDetail />} />
              <Route
                path="countries/:id"
                element={
                  <PageWrapper>
                    <Container>
                      <Typography gutterBottom variant="h3">
                        Coming Soon
                      </Typography>
                      <Link to="/">Go to the home page</Link>
                    </Container>
                  </PageWrapper>
                }
              />

              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </QueryParamProvider>
      </ThemeProvider>
    </div>
  );
}

function Layout() {
  return (
    <BoxWrapper>
      <AppBarComponent />
      <Outlet />
    </BoxWrapper>
  );
}

function NoMatch() {
  return (
    <PageWrapper>
      <Container>
        <Typography gutterBottom variant="h3">
          Nothing to see here!
        </Typography>
        <Link to="/">Go to the home page</Link>
      </Container>
    </PageWrapper>
  );
}

const BoxWrapper = styled(Box)`
  background-color: #f6f7f8;
`;

const PageWrapper = styled(Box)`
  background-color: #f6f7f8;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
