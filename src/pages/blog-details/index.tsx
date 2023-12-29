import { useParams } from "react-router-dom";
import { TBlog, TBlogs, getBlog } from "../../api/blogs/api";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Navbar } from "../../components/navbar";
import { Blog } from "../../components/blog";
import { useData } from "../../context";
import Carousel from "react-material-ui-carousel";
import { Card, Grid, Stack } from "@mui/material";
import { HomeReturnArrow } from "../../components/home-return-arrow";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<TBlog>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { blogs } = useData();

  const [similarBlogs, setSimilarBlogs] = useState<TBlogs>([]);

  //dont ask me what ur looking at
  // found this solution on stackoverflow
  //this was used to show 3 items at a time in the carousel
  const sliderItems = similarBlogs.length > 3 ? 3 : similarBlogs.length;
  const items = [];

  for (let i = 0; i < similarBlogs.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Card
          raised
          key={i.toString()}
          sx={{ backgroundColor: "#F3F2FA", boxShadow: "none" }}
        >
          <Grid container spacing={0}>
            {similarBlogs.slice(i, i + sliderItems).map((blog) => (
              <Blog key={blog.id} {...blog} />
            ))}
          </Grid>
        </Card>
      );
    }
  }

  useEffect(() => {
    getBlog(Number(blogId))
      .then((blog) => {
        setBlog(blog);
        setIsLoading(false);
        setError(null);

        // get the id - s
        const blogCategoryIds = blog.categories.map((category) => category.id);

        // filter blogs based on id
        const filteredSimilarBlogs = blogs.filter((b) =>
          b.categories.some((category) => blogCategoryIds.includes(category.id))
        );

        // exclude current blog
        const finalSimilarBlogs = filteredSimilarBlogs.filter(
          (b) => b.id !== blog.id
        );

        setSimilarBlogs(finalSimilarBlogs);
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
          <HomeReturnArrow />
          <Blog {...blog} size="big" />
        </>
      )}

      {items.length > 0 ? (
        <Stack width="1288px" margin="auto" spacing={3}>
          <Typography
            fontWeight={700}
            fontSize="32px"
            lineHeight={"40px"}
            color="#1A1A1F"
            width="720px"
            px={2}
          >
            მსგავსი სტატიები
          </Typography>
          <Carousel
            autoPlay={false}
            animation="slide"
            navButtonsAlwaysVisible
            indicators={false}
          >
            {items}
          </Carousel>
        </Stack>
      ) : (
        <Typography
          fontWeight={700}
          variant="h2"
          lineHeight={"40px"}
          color="#1A1A1F"
          textAlign="center"
          marginBottom={10}
        >
          ვერ მოიძებნა მსგავსი სტატია
        </Typography>
      )}
    </Box>
  );
};

export default BlogDetails;
