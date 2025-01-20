import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Comment from "../Comments/Comment";
import { getUserIdFromToken, getRoleFromToken } from "../../auth";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPost = async () => {
      try {
        const postResponse = await fetch(
          `http://localhost:8080/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const postData = await postResponse.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await fetch(
          `http://localhost:8080/comments/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPost(), fetchComments()]);
      setLoading(false);
    };

    fetchData();
  }, [postId]);

  const handleEditOpen = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/posts/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        setEditDialogOpen(false);
        alert("Post updated successfully.");
      } else {
        alert("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Post deleted successfully.");
        window.location.href = "/home";
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  const userId = getUserIdFromToken();
  const userRole = getRoleFromToken();
  const canEditOrDelete =
    userId && (userId === post.user.id || userRole === "moderator");

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        sx={{ marginBottom: "20px" }}
        onClick={() => navigate(-1)}
      >
        Back to Previous Page
      </Button>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          By: {post.user.username} | {new Date(post.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          {post.content}
        </Typography>
        {canEditOrDelete && (
          <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditOpen}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        )}
      </Paper>

      <Typography variant="h6">Comments:</Typography>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostDetails;
