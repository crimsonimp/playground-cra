import React, { useState, useEffect } from "react";

import { Button, TextField, Typography } from "@material-ui/core";

import store from "../../../store";

const SUBMIT_BTN = "Submit";
const REMOVE_BTN = "Remove";
const CANCEL_BTN = "Cancel";

const AppListForm = ({
  id,
  name = "",
  text = "",
  avatar = "",
  close,
  isRemove,
}) => {
  const [state, setState] = useState({ id, name, text, avatar });
  const [btnText, setBtnText] = useState(SUBMIT_BTN);
  const [randId, setRandId] = useState();

  useEffect(() => {
    setBtnText(isRemove ? REMOVE_BTN : SUBMIT_BTN);
    regenerateID();
  }, [isRemove]);

  const regenerateID = () => setRandId(Math.ceil(Math.random() * 1000));

  const handleChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const list = store.getState();
    const hasId = list.some((i) => i.id === randId);
    const type = isRemove ? "REMOVE" : "ADD";
    const payload = { ...state, id: id || randId };
    if (hasId) regenerateID();
    store.dispatch({ type, payload });
    close();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      {isRemove ? (
        <Typography component="p" style={{ marginBottom: "1rem" }}>
          Are you sure you want to remove card{" "}
          <strong>"{name}"</strong>?
        </Typography>
      ) : (
        <>
          <TextField
            name="name"
            label="Card name"
            value={state.name}
            style={{ width: "100%", marginBottom: "1rem" }}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            name="text"
            label="Card text"
            value={state.text}
            style={{ width: "100%", marginBottom: "1rem" }}
            onChange={(e) => handleChange("text", e.target.value)}
          />
          <TextField
            name="avatar"
            label="Card avatar"
            value={state.avatar}
            style={{ width: "100%", marginBottom: "1rem" }}
            onChange={(e) => handleChange("avatar", e.target.value)}
          />
        </>
      )}
      <Button
        type="reset"
        variant="contained"
        color="inherit"
        style={{ marginRight: "1rem", marginBottom: "1rem" }}
        onClick={close}
      >
        {CANCEL_BTN}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
      >
        {btnText}
      </Button>
    </form>
  );
};

export default AppListForm;
