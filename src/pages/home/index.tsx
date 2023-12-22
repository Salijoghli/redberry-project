import { Box, Typography } from "@mui/material";
import { Navbar } from "../../components/navbar";

import blogLogo from "../../assets/images/blog-logo.png";
import { Categories } from "../../components/categories";
import { useState } from "react";
import { Blogs } from "../../components/blogs";

export type SelectedCategories = Array<number>;

const Home = () => {
  const [selectedCategories, setSelectedCategories] =
    useState<SelectedCategories>([]);
  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={12}
        py={10}
      >
        <Typography
          fontWeight={700}
          fontFamily={"FiraGo, sans-serif"}
          fontSize={"64px"}
          lineHeight={"72px"}
        >
          ბლოგი
        </Typography>
        <Box
          component="img"
          width="624px"
          height="200px"
          src={blogLogo}
          alt="blog logo"
        />
      </Box>

      <Categories
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <Blogs selectedCategories={selectedCategories} />
    </Box>
  );
};

export default Home;
