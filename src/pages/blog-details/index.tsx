import { useNavigate, useParams } from "react-router-dom";
import { TBlog, getBlog } from "../../api/blogs/api";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, IconButton } from "@mui/material";
import { Navbar } from "../../components/navbar";
import { Blog } from "../../components/blog";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<TBlog>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBlog(Number(blogId))
      .then((blog) => {
        setBlog(blog);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError("Error loading blog. Please try again later.");
      });
  }, [blogId]);

  if (isLoading) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Navbar />
        <Typography textAlign="center" variant="h1" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      {!blog ? (
        <Typography variant="h6" color="error">
          Blog not found
        </Typography>
      ) : (
        <>
          <IconButton
            sx={{
              background: "#fff",
              position: "absolute",
              m: 4,
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{
                fontSize: "2rem",
                color: "#1A1A1F",
              }}
            />
          </IconButton>
          <Blog {...blog} size="big" />
        </>
      )}
    </Box>
  );
};

export default BlogDetails;
