import React from "react";
import { Paper, Typography } from "@mui/material";

const Comment = ({ comment }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "10px",
        marginTop: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        {comment.user.username} | {new Date(comment.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1">{comment.content}</Typography>
    </Paper>
  );
};

export default Comment;
