import React from "react";
import Avatar from "react-avatar";
import {
  AppBar,
  Container,
  Button,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    marginBottom: "1rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    backgroundColor: "white"
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    padding: 0,
    marginRight: "1rem",
  },
  userpic: {
    padding: 0,
    marginLeft: "auto",
  },
});

const AppHeader = ({ title = "Home", window }) => {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={trigger ? 4 : 0}
      className={classes.header}
    >
      <Container className={classes.headerContainer}>
        <Button href="/" className={classes.logo}>
          <Avatar name={title} size={64} />
        </Button>

        <Typography variant="subtitle1">{title}</Typography>

        <Avatar
          name="User"
          size={48}
          round={true}
          className={classes.userpic}
        />
      </Container>
    </AppBar>
  );
};

export default AppHeader;
