import React, { forwardRef } from "react";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const DialogTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppDialog = ({ open = true, title, children, handler = () => {} }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={DialogTransition}
      onClose={() => handler(!open)}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>
        {title}
        <IconButton
          edge="end"
          aria-label="close"
          onClick={() => handler(!open)}
          style={{ float: "right" }}
          size="small"
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

export default AppDialog;
