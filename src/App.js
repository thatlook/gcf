import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Container from '@mui/material/Container';

import ProjectDetail from './pages/ProjectDetail';
import AppBarComponent from './components/AppBar';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#15a14a'
    },
    secondary: {
      // This is green.A700 as hex.
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
    subtitle1: {
      textTransform: 'uppercase'
    },
    body2: {
      textTransform: 'capitalize'
    }
  }
});

export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Project />} />
            <Route path="project/:id" element={<ProjectDetail />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <AppBarComponent />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Project() {
  return (
    <div>
      <h2>Projects</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
