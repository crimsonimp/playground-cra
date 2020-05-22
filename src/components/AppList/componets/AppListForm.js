import React, { useState } from "react";
import SimpleCrypto from "simple-crypto-js";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import store from "../../../store";

const categories = [
  "BBQ and Grilling",
  "Casseroles",
  "Meats",
  "Pasta",
  "Pizza",
  "Rice and Beans",
  "Salads",
  "Soups and Stews",
  "Stir-Fry",
];

const useStyles = makeStyles({
  text: {
    marginBottom: "2rem",
  },
  field: {
    width: "100%",
    marginBottom: "1rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  button: {
    marginRight: "1rem",
  },
});

const AppListForm = ({
  id = SimpleCrypto.generateRandom(),
  name = "",
  description = "",
  image = "",
  category = "",
  isRemove = false,
  handler = () => {},
}) => {
  const [state, setState] = useState({
    id,
    name,
    description,
    category,
    image,
  });
  const classes = useStyles();
  const storeList = store.getState();
  const autoImage = `http://lorempixel.com/350/200/food/${
    storeList.length + 1
  }`;

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const type = isRemove ? "REMOVE_ITEM" : "SET_ITEM";
    const item = { ...state, image: state.image || autoImage };
    store.dispatch({ type, data: { ...item } });
    handler();
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRemove && (
        <Typography variant="subtitle1" className={classes.text}>
          Are you sure, you want to remove card <strong>{id || name}</strong>?
        </Typography>
      )}

      {!isRemove && (
        <>
          <TextField
            name="name"
            label="Name"
            value={state.name}
            onChange={handleChange}
            className={classes.field}
            InputProps={{
              required: true,
            }}
          />
          <TextField
            name="description"
            label="Description"
            value={state.description}
            onChange={handleChange}
            className={classes.field}
            InputProps={{
              required: true,
            }}
          />
          <TextField
            name="image"
            label="Image"
            value={state.image}
            onChange={handleChange}
            className={classes.field}
            helperText={
              !image && `Empty field will replaced with this ${autoImage}/`
            }
          />
          <Select
            name="category"
            label="Category"
            value={state.category}
            onChange={handleChange}
            className={classes.field}
          >
            <MenuItem value="">None</MenuItem>
            {categories.map((option, i) =>
              <MenuItem value={option} key={i}>{option}</MenuItem>
            )}
          </Select>
        </>
      )}

      <div className={classes.buttons}>
        <Button
          color="primary"
          onClick={() => handler()}
          className={classes.button}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AppListForm;
