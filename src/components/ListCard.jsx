import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {
  purple,
  blue,
  lightGreen,
  orange,
  brown,
  green
} from '@mui/material/colors';

const ListCard = ({ data: fullData }) => {
  const navigate = useNavigate();

  if (!fullData) {
    return null;
  }

  const data = fullData.item || fullData; // data is in "item" when searched through fuse.js

  return (
    <StyledCard>
      <StyledCardAction
        onClick={() => {
          navigate(`/project/${data.ApprovedRef}`);
        }}
      >
        <StyledCardContent>
          <UpperBoxWrapper>
            <Typography>{data.ApprovedRef}</Typography>
            <StyledChip label={getResultAreaLabel(data.ResultAreas)} />
            <StyledChip label={data.Sector} />
            <StyledChip label={data.Size} />
          </UpperBoxWrapper>
          <BottomBoxWrapper>
            <Typography variant="h6">
              {getCountryName(data.Countries)}
            </Typography>
            <Typography>({getCountryRegion(data.Countries)})</Typography>
          </BottomBoxWrapper>
          <MidBoxWrapper>
            {getResultAreas(data.ResultAreas).map((t, i) => {
              return (
                <Typography color={getChipColor(t)} key={t}>
                  {i === 0 ? '' : '/ '}
                  {t}
                </Typography>
              );
            })}
          </MidBoxWrapper>
          <Typography>{data.ProjectName}</Typography>
        </StyledCardContent>
      </StyledCardAction>
    </StyledCard>
  );
};

export default ListCard;

/*
  styles
*/
const UpperBoxWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const MidBoxWrapper = styled(Box)`
  display: flex;
`;
const StyledChip = styled(Chip)`
  text-transform: uppercase;
  ${({ label }) => {
    return `background-color: ${getChipColor(label)};`;
  }}
`;
const StyledCard = styled(Card)`
  height: 260px;
  width: 100%;
`;
const BottomBoxWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
`;
const StyledCardAction = styled(CardActionArea)`
  height: 100%;
`;

/*
  utils
*/
const getCountryName = countries => {
  if (!countries) {
    return null;
  }
  if (countries.length > 1) {
    return 'multiple countries';
  }
  return countries[0].CountryName;
};

const getCountryRegion = countries => {
  if (!countries) {
    return null;
  }
  if (countries.length > 1) {
    return 'multiple countries';
  }
  return countries[0].Region;
};

const getResultAreaLabel = resultAreas => {
  if (!resultAreas) {
    return [];
  }
  const labels = resultAreas.reduce((prev, curr) => {
    const num = Number(curr.Value.replace('%', '', ''));
    if (num && !prev.includes(curr.Type)) {
      return [...prev, curr.Type];
    }
    return prev;
  }, []);
  if (labels.length > 1) {
    return 'cross-cutting';
  }
  return labels[0];
};

const getResultAreas = resultAreas => {
  if (!resultAreas) {
    return [];
  }
  const labels = resultAreas.reduce((prev, curr) => {
    const num = Number(curr.Value.replace('%', '', ''));
    if (num && !prev.includes(curr.Area)) {
      return [...prev, curr.Area];
    }
    return prev;
  }, []);

  return labels;
};

const getChipColor = value => {
  const obj = {
    Public: blue[100],
    Private: blue[300],

    Small: lightGreen[100],
    Micro: lightGreen[300],
    Medium: lightGreen[500],
    Large: lightGreen[700],

    'Cross-cutting': orange[100],
    Adaptation: orange[300],
    Mitigation: orange[500],

    Africa: brown[100],
    'Asia-Pacific': brown[100],
    'Eastern Europe': brown[100],
    'Latin America and the Caribbean': brown[100],

    'Energy generation and access': green[300],
    Transport: green[500],
    'Buildings, cities, industries, and appliances': green[700],
    'Forest and land use': green[900],
    'Livelihoods of people and communities': purple[300],
    'Health, food, and water security': purple[500],
    'Infrastructure and built environment': purple[700],
    'Ecosystems and ecosystem services': purple[900]
  };

  return obj[value] || 'primary';
};
