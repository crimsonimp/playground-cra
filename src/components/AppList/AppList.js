import React, { useState, useEffect } from "react";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import store from "../../store";
import AppDialog from "../AppDialog";
import AppListItem from "./componets/AppListItem";
import AppListForm from "./componets/AppListForm";

const CREATE_TITLE = "Create new card";
const EDIT_TITLE = "Edit card";
const REMOVE_TITLE = "Remove Card";

const AppList = () => {
  const storeList = store.getState();
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogState, setDialogState] = useState({
    open: false,
    title: CREATE_TITLE,
  });

  useEffect(() => {
    setItems(storeList);
    return () => {
      setIsLoading(false);
    };
  }, [items, storeList]);

  const handleToggleDialog = () => {
    setDialogState((state) => ({ ...state, open: !dialogState.open }));
  };

  const handleCreateItem = () => {
    setDialogState((state) => ({ ...state, title: CREATE_TITLE }));
    handleToggleDialog();
    setItem({});
  };

  const handleEditItem = (id) => {
    const [currentItem] = items.filter(i => i.id === id);
    setDialogState((state) => ({ ...state, title: EDIT_TITLE }));
    setItem(currentItem);
    handleToggleDialog();
  };

  const handleRemoveItem = (id) => {
    const [currentItem] = items.filter(i => i.id === id);
    setDialogState((state) => ({ ...state, title: REMOVE_TITLE }));
    setItem(currentItem);
    handleToggleDialog();
  };

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={7} sm={8}>
          {items && items.length === 0 && (
            <Typography variant="h5">List is empty</Typography>
          )}
        </Grid>

        <Grid item xs={5} sm={4}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleCreateItem}
          >
            Create
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <AppListItem
              {...item}
              onEdit={handleEditItem}
              onRemove={handleRemoveItem}
            />
          </Grid>
        ))}
      </Grid>

      <AppDialog {...dialogState} handler={handleToggleDialog}>
        <AppListForm
          {...item}
          isRemove={dialogState.title === REMOVE_TITLE}
          handler={handleToggleDialog}
        />
      </AppDialog>
    </>
  );
};

export default AppList;
