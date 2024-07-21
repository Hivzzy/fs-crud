import React from 'react';
import { Container, Typography, CssBaseline, Box } from '@mui/material';
import DataTable from './components/DataTable';

function App() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Data Table with Direct Manipulation
        </Typography>
        <DataTable />
      </Box>
    </Container>
  );
}

export default App;
