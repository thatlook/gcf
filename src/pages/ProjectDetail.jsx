import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Toolbar from '@mui/material/Toolbar';
// components
import ResultAreas from '../components/ResultAreas';
import BasicTimeline from '../components/BasicTimeline';
import { useFetch } from '../hooks/useFetch';
import FundingTable from '../components/FundingTable';
import DisbursementTable from '../components/DisbursementTable';
import { formatCurrency, formatNumber } from '../utils';

const ProjectDetail = () => {
  const { id } = useParams();
  const { isLoading, apiData: data } = useFetch(`/project/${id}`);

  if (!data) {
    return null;
  }

  return (
    <ContainerWrapper>
      <Toolbar />
      <TitleWrapper>
        <Typography variant="h2"> {data['ApprovedRef']}</Typography>
      </TitleWrapper>

      <TitleWrapper>
        <Link href={data['ProjectURL']}>
          <Typography variant="h2">{data['ProjectName']}</Typography>
        </Link>
      </TitleWrapper>

      <SectionWrapper>
        <Typography variant="h3">Overview</Typography>
        <Grid container direction="row" spacing="8">
          {[
            { title: 'status', value: 'approved' },
            {
              title: 'date approved',
              value: `${DateTime.fromISO(
                data['ApprovalDate']
              ).toLocaleString()} at ${data['BoardMeeting']}`
            },
            { title: 'ess category', value: data['RiskCategory'] }
          ].map(k => {
            return (
              <Grid item key={k.title} flexGrow="1">
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{k.title}</Typography>
                    <Typography color="primary">{k.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </SectionWrapper>

      <SectionWrapper>
        <Typography variant="h3">Impact</Typography>
        <Grid container direction="column" spacing="8">
          {[
            {
              title: 'total project value',
              value: formatNumber(data['TotalValue'])
            },
            {
              title: 'Tonnes of emissions avoided',
              value: formatNumber(data['LifeTimeCO2'])
            },
            {
              title: 'indirect beneficiaries',
              value: formatNumber(data['IndirectBeneficiaries'])
            },
            {
              title: 'direct beneficiaries',
              value: formatNumber(data['DirectBeneficiaries'])
            },
            { title: 'theme', value: data['Theme'] }
          ].map(k => {
            return (
              <Grid item key={k.title}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{k.title}</Typography>
                    <Typography color="primary">{k.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          <Grid item>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Result Areas</Typography>
                <ResultAreas data={data['ResultAreas']} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </SectionWrapper>

      <SectionWrapper>
        <Typography variant="h3">Details</Typography>
        <BasicTimeline
          data={{
            ApprovalDate: data['ApprovalDate'],
            DurationMonths: data['DurationMonths'],
            EndDate: data['EndDate'],
            StartDate: data['StartDate']
          }}
        />
        <Typography variant="h4">Countries</Typography>
        <Container>
          <List>
            {data['Countries']?.map(k => {
              return (
                <ListItem key={k.CountryID}>
                  <Link href={`/countries/${k.CountryID}`}>
                    {k.CountryName}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Typography variant="h3">Investment Info</Typography>
        <Grid container direction="column" spacing="8">
          {[
            { title: 'financing', value: data['Sector'] },
            {
              title: 'size',
              value: data['Size']
            },
            {
              title: 'total GCF funding',
              value: formatCurrency(data['TotalGCFFunding'])
            },
            {
              title: 'total co-financing',
              value: formatCurrency(data['TotalCoFinancing'])
            }
          ].map(k => {
            return (
              <Grid item key={k.title}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{k.title}</Typography>
                    <Typography color="primary">{k.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          <Grid item>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Disbursements</Typography>
                <DisbursementTable data={data['Disbursements'] || []} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Funding</Typography>
                <FundingTable data={data['Funding'] || []} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </SectionWrapper>
    </ContainerWrapper>
  );
};

export default ProjectDetail;

const TitleWrapper = styled(Box)``;

const SectionWrapper = styled.section`
  background-color: #fff;
  padding: 16px;
`;

const ContainerWrapper = styled(Container)`
  background-color: #f6f7f8;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
