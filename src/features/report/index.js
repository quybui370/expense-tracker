import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Chart from './Chart';

const Report = () => {

  return (
    <>
      <Helmet>
        <title>Report</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Chart />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Report;
