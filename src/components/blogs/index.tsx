import { useData } from "../../context";
import { SelectedCategories } from "../../pages/home";
import { Box, Typography } from "@mui/material";
import { Blog } from "../blog";

type BlogsProps = {
  selectedCategories: SelectedCategories;
};

export const Blogs = ({ selectedCategories }: BlogsProps) => {
  const { blogs } = useData();
  const filteredBlogs =
    selectedCategories.length > 0
      ? blogs.filter((blog) =>
          blog.categories.some((category) =>
            selectedCategories.includes(category.id)
          )
        )
      : blogs;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width="1288px"
      maxWidth="100%"
      margin="auto"
      gap="32px"
      py={7}
    >
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => <Blog key={blog.id} {...blog} />)
      ) : (
        <Typography variant="h4" margin={"auto"} textAlign={"center"}>
          ვერ მოიძება ბლოგები
        </Typography>
      )}
    </Box>
  );
};
