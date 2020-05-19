import React from "react";
import Avatar from "react-avatar";
import { AppBar, Container, useScrollTrigger } from "@material-ui/core";

const AppHeader = ({ title = "Home", window }) => {
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
      style={{ marginBottom: "1rem" }}
    >
      <Container style={{ display: "flex", alignItems: "center" }}>
        <Avatar name={title} size={64} />

        <Avatar name="User" size={48} round={true} style={{ marginLeft: "auto" }}/>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
