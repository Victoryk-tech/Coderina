"use client";

import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import { CiHeart } from "react-icons/ci";
import { LuMessageCircle } from "react-icons/lu";
import SolutionCards from "../Home/components/SolutionCards";

const MediaBody = () => {
  const [mediaOption, setMediaOption] = useState("News Articles");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/media?type=${mediaOption}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [mediaOption]);

  const handleLike = async (id) => {
    try {
      const response = await fetch("/api/media/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, likes: result.likes } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleComment = async (id, comment) => {
    try {
      const response = await fetch("/api/media/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...comment }),
      });
      const result = await response.json();
      if (result.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, comments: result.comments } : item
          )
        );
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box mt={13} className="media__container">
      <Stack justifyContent={["center", "space-between"]}>
        <Typography variant="h4">Media</Typography>
        <Stack direction="row" spacing={2}>
          {["News Articles", "Publications", "Gallery"].map((btn, i) => (
            <Button
              key={i}
              variant={mediaOption === btn ? "contained" : "outlined"}
              onClick={() => setMediaOption(btn)}
            >
              {btn}
            </Button>
          ))}
        </Stack>
      </Stack>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <SolutionCards {...item} />
              <div className="flex items-center gap-2">
                <CiHeart size={18} onClick={() => handleLike(item._id)} />
                <span className="font-semibold">{item.likes}</span>
                <LuMessageCircle size={15} />
                <span className="font-semibold">{item.comments.length}</span>
              </div>
              <Box mt={2}>
                <Typography variant="h6">Comments</Typography>
                {item.comments.map((comment, i) => (
                  <Typography key={i} variant="body2">
                    <strong>{comment.user}</strong>: {comment.text}
                  </Typography>
                ))}
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      handleComment(item._id, {
                        user: "Anonymous",
                        text: e.target.value.trim(),
                      });
                      e.target.value = "";
                    }
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MediaBody;
