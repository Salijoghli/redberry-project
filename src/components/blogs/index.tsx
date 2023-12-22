import { useEffect, useState } from "react";
import { useData } from "../../context";
import { TBlogs } from "../../api/blogs/api";
import { SelectedCategories } from "../../pages/home";
import { Box } from "@mui/material";

type BlogsProps = {
  categories: SelectedCategories;
};

export const Blogs = ({ categories }: BlogsProps) => {
  const { blogs } = useData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredBlogs, setFilteredBlogs] = useState<TBlogs>(blogs);
  useEffect(() => {}, [categories]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width="100%"
      maxWidth="1288px"
      margin="auto"
      gap="32px"
    ></Box>
  );
};
