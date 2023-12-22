import { Box, Stack, Typography } from "@mui/material";
import { TBlog } from "../../api/blogs/api";
import { Category } from "../category";

export const Blog = ({
  title,
  author,
  categories,
  description,
  id,
  image,
  publish_date,
}: TBlog) => {
  return (
    <Stack width="408px" height="620px" gap={3}>
      <Box
        component="img"
        width="100%"
        height="328px"
        sx={{
          objectFit: "cover",
        }}
        src={image}
        alt="card image"
      />
      <Stack width="100%" height="268px" spacing={2}>
        <Stack spacing={1}>
          <Typography
            fontFamily="FiraGo, sans-serif"
            fontWeight={500}
            fontSize="16px"
            lineHeight={"20px"}
            color="#1A1A1F"
          >
            {author}
          </Typography>
          <Typography
            fontFamily="FiraGo, sans-serif"
            fontWeight={400}
            fontSize="12px"
            lineHeight={"16px"}
            color={"#85858D"}
          >
            {publish_date}
          </Typography>
        </Stack>
        <Typography
          fontFamily="FiraGo, sans-serif"
          fontWeight={500}
          fontSize="20px"
          color="#1A1A1F"
          lineHeight={"28px"}
        >
          {title}
        </Typography>
        <Box display="flex" maxWidth="408px" overflow={"hidden"} gap="16px">
          {categories.slice(0, 3).map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
