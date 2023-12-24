import { Box, Button, Stack, Typography } from "@mui/material";
import { TBlog } from "../../api/blogs/api";
import { Category } from "../category";
import { useNavigate } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

type Variant = {
  size?: "big" | "small";
};

type BlogProps = TBlog & Variant;

//made this blog conditional (blog details) so i wouldnt re write the whole thing
export const Blog = ({
  title,
  author,
  categories,
  description,
  id,
  image,
  publish_date,
  email,
  size = "small",
}: BlogProps) => {
  const navigate = useNavigate();

  const blogSize = size === "small";
  //if blog is small (home page) show 3 most recent categories
  const sCategories = blogSize ? categories.slice(0, 3) : categories;
  return (
    <Stack
      width={blogSize ? "408px" : "720px"}
      height={blogSize ? "620px" : "auto"}
      gap={blogSize ? 3 : 5}
      margin="auto"
      sx={{
        my: !blogSize ? 5 : "",
      }}
    >
      <Box
        component="img"
        width="100%"
        height="328px"
        borderRadius={"12px"}
        sx={{
          objectFit: "cover",
        }}
        src={image}
        alt="card image"
      />
      <Stack
        width="100%"
        height="268px"
        spacing={2}
        alignItems="left"
        justifyContent={"left"}
      >
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
            {publish_date} {email}
          </Typography>
        </Stack>
        <Typography
          fontFamily="FiraGo, sans-serif"
          fontWeight={blogSize ? 500 : 700}
          fontSize={blogSize ? "20px" : "32px"}
          color="#1A1A1F"
          lineHeight={blogSize ? "28px" : "40px"}
        >
          {title}
        </Typography>
        <Box
          display="flex"
          width="100%"
          maxWidth="100%"
          flexWrap={"wrap"}
          gap="16px"
        >
          {sCategories.map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </Box>
        <Typography
          overflow={blogSize ? "hidden" : "unset"}
          width="100%"
          fontWeight={400}
          fontSize="16px"
          lineHeight={"28px"}
          fontFamily={"FiraGO"}
          height={"56px"}
          color={"#404049"}
        >
          {description}
        </Typography>
        {blogSize && (
          <Button
            variant="text"
            size="small"
            sx={{
              fontWeight: 500,
              fontFamily: "FiraGo, sans-serif",
              lineHeight: "20px",
              fontSize: "14px",
              m: 0,
              width: "148px",
            }}
            onClick={() => {
              navigate(`/blog-details/${id}`);
            }}
            endIcon={<ArrowOutwardIcon />}
          >
            სრულად ნახვა
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
