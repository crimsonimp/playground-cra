import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import AppHeader from '../../components/Header';
import AppList from '../../components/AppList';

const Home = () => {
  return (
    <>
      <AppHeader title="Playground Create React App" />

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
