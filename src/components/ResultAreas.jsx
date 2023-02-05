import React from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';
import styled from '@emotion/styled';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/*
  reference: https://recharts.org/en-US/api/PieChart
*/

const ResultAreas = ({ data }) => {
  const parsedData = data.map(d => ({
    ...d,
    Value: Number(d.Value.replace('%', ''))
  }));

  return (
    <StyledContainer>
      <PieChart width={400} height={400}>
        <Pie
          data={parsedData}
          dataKey="Value"
          nameKey="Area"
          cx="50%"
          cy="50%"
          fill="#8884d8"
          label={renderCustomLabel}
          labelLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </StyledContainer>
  );
};

export default ResultAreas;

/*
  utils
*/
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <StyledTooltip>
        <Typography gutterBottom variant="h6">
          {data.payload.Type}
        </Typography>
        <Typography>{data.payload.Area}</Typography>
      </StyledTooltip>
    );
  }

  return null;
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/*
  styles
*/
const StyledTooltip = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  max-width: 200px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;
