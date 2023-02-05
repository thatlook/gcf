import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const DisbursementTable = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Entity</TableCell>
            <TableCell align="right">Date Effective</TableCell>
            <TableCell align="right">Amount Disbursed</TableCell>
            <TableCell align="right">Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.ProjectDisbursementID}>
              <TableCell component="th" scope="row">
                {row.ProjectDisbursementID}
              </TableCell>
              <TableCell align="right">{row.Entity}</TableCell>
              <TableCell align="right">{row.DateEffective}</TableCell>
              <TableCell align="right">{row.AmountDisbursed}</TableCell>
              <TableCell align="right">{row.Currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisbursementTable;
