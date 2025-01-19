import React, { useState } from "react";
import { Pagination, Box } from "@mui/material";
import PostItem from "./PostItem";

const PostList = ({ posts, onPostClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <Box>
      {paginatedPosts.map((post) => (
        <PostItem key={post.id} post={post} onClick={onPostClick} />
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
