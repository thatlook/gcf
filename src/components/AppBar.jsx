import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarComponent = () => {
  const navigate = useNavigate();

  return (
    <AppBarWrapper position="fixed">
      <Toolbar>
        <LogoImg
          onClick={() => {
            navigate('/');
          }}
          src="https://www.greenclimate.fund/sites/all/themes/gcf/img/logo-globe.png"
        />
        <Typography variant="h6" color={'#404040'}>
          Green Climate Fund
        </Typography>
      </Toolbar>
    </AppBarWrapper>
  );
};

export default AppBarComponent;

const AppBarWrapper = styled(AppBar)`
  background-color: #fff;
`;

const LogoImg = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`;
