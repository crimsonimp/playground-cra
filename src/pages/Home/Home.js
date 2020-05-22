import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import AppHeader from '../../components/AppHeader';
import AppList from '../../components/AppList';

const Home = () => {
  return (
    <>
      <AppHeader title="Welcome" />

      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AppList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
