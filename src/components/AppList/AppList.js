import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import AppListDialog from "./componets/AppListDialog";
import AppListForm from "./componets/AppListForm";

import store from "../../store";

const CREATE_TITLE = "Create new card";
const EDIT_TITLE = "Edit card";
const REMOVE_TITLE = "Remove Card";

const AppList = () => {
  const [list, setList] = useState(null);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [isRemove, setIsRemove] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(CREATE_TITLE);

  useEffect(() => {
    setLoading(false);
    setList(store.getState());
    store.subscribe(() => console.log("Store:", store.getState()));
    // eslint-disable-next-line
  }, [list, dialogOpen, store.getState()]);

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
    if (!dialogOpen) {
      setDialogTitle(CREATE_TITLE);
      setIsRemove(false);
      setItem({});
    }
  };

  const handleEdit = (item) => {
    setDialogTitle(`${EDIT_TITLE} ID: ${item.id}`);
    setIsRemove(false);
    setItem(item);
    setDialogOpen(!dialogOpen);
  };
  const handleRemove = (item) => {
    setDialogTitle(`${REMOVE_TITLE} ID: ${item.id}`);
    setIsRemove(true);
    setItem(item);
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={handleDialog}
        style={{ float: "right" }}
      >
        Create card
      </Button>

      {loading ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : list && list.length ? (
        <List style={{ clear: "both" }}>
          {list.map((item) => (
            <ListItem key={item.id} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <ListItemAvatar>
                <Avatar
                  name={item.avatar || item.name}
                  style={{ marginRight: "1rem" }}
                  size={64}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">{item.name}</Typography>
                }
                secondary={
                  <Typography variant="caption">
                    <span style={{ display: "block" }}>{item.text}</span>
                    <small style={{ color: "teal" }}>ID: {item.id}</small>
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEdit(item)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleRemove(item)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        "Empty list. Create one."
      )}

      <AppListDialog
        open={dialogOpen}
        title={dialogTitle}
        handler={handleDialog}
      >
        <AppListForm {...item} close={handleDialog} isRemove={isRemove} />
      </AppListDialog>
    </>
  );
};

export default AppList;
