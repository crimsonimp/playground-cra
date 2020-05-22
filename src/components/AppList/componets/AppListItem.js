import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Delete } from "@material-ui/icons";
import {
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  mb: {
    marginBottom: "1rem",
  },
  action: {
    justifyContent: "flex-end",
  },
});

const AppListItem = ({
  id,
  name,
  description,
  image,
  category,
  onEdit = () => {},
  onRemove = () => {},
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        className={classes.media}
        component="img"
        image={image}
        title={name}
      />

      <CardContent>
        <Typography variant="h5">{name}</Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.mb}
        >
          {description}
        </Typography>

        <Chip label={category} variant="outlined" />
      </CardContent>

      <CardActions disableSpacing className={classes.action}>
        <IconButton onClick={() => onEdit(id)}>
          <Edit />
        </IconButton>

        <IconButton onClick={() => onRemove(id)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AppListItem;
