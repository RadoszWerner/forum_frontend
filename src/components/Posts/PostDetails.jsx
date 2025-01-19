import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";
import Comment from "../Comments/Comment";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/comments/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
        setComments(data.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          By: {post.user.username} | {new Date(post.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          {post.content}
        </Typography>
      </Paper>
      <Typography variant="h6">Comments:</Typography>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
};

export default PostDetails;
