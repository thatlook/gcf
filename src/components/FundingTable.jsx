import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const FundingTable = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">BM</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Instrument</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.ProjectBudgetID}>
              <TableCell component="th" scope="row">
                {row.ProjectBudgetID}
              </TableCell>
              <TableCell align="right">{row.BM}</TableCell>
              <TableCell align="right">{row.Source}</TableCell>
              <TableCell align="right">{row.Instrument}</TableCell>
              <TableCell align="right">{row.Budget}</TableCell>
              <TableCell align="right">{row.Currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FundingTable;
