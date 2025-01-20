import React, { useState } from "react";
import { Pagination, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const navigate = useNavigate();

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  console.log(posts);

  const handlePostClick = (post) => {
    if (!post.id) {
      console.error("Post ID is undefined:", post);
      return;
    }
    navigate(`/post/${post.id}`, { state: { post } }); // Używamy `post.id` w ścieżce
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <Box>
      {paginatedPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onClick={() => handlePostClick(post)}
        />
      ))}
      <Pagination
        count={Math.ceil(posts.length / postsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default PostList;
