import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Trader Education Platform
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered learning platform for traders of all levels.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Features
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="/courses" color="inherit">
                AI-Generated Courses
              </Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="/simulator" color="inherit">
                Trading Simulator
              </Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="/dashboard" color="inherit">
                Personalized Dashboard
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">
                Privacy Policy
              </Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">
                Terms of Service
              </Link>
            </Typography>
            <Typography variant="body2" component="p">
              <Link href="#" color="inherit">
                Risk Disclosure
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" component="p">
              Email: support@traderedu.ai
            </Typography>
            <Typography variant="body2" component="p">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="/">
              Trader Education Platform
            </Link>
            {'. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 