import React from "react";

import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const DialogTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppListDialog = ({ open = false, title, children, handler }) => {
  const handleToggle = () => {
    handler(!open);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={DialogTransition}
      onClose={handleToggle}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>
        {title}
        <IconButton
          edge="end"
          aria-label="close"
          onClick={handleToggle}
          style={{ float: "right" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppListDialog;
