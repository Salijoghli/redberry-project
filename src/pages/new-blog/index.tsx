import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { HomeReturnArrow } from "../../components/home-return-arrow";
import { Navbar } from "../../components/navbar";
import { BlogInput } from "../../api/blogs/api";
import { useState, FormEvent } from "react";
import { ImageUploader } from "../../components/image-uploader";
import { InputField } from "../../components/textfiled";

const defaultFormData: BlogInput = {
  title: "",
  author: "",
  categories: [],
  description: "",
  image: "",
  publish_date: "",
  email: "",
};

const NewBlog = () => {
  const [formData, setFormData] = useState<BlogInput>(defaultFormData);
  const [isValidImage, setIsValidImage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isValidImage) {
      console.log("nope");
      return;
    }
    console.log(formData);
  };

  const handleDateChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      publish_date: value,
    }));
  };

  return (
    <Box position="relative" bgcolor="#FBFAFF">
      <Navbar />
      <HomeReturnArrow />
      <Stack width="600px" margin="auto" my={5} spacing={5} textAlign="left">
        <Typography
          fontFamily="FiraGO"
          fontSize="32px"
          fontWeight="700"
          lineHeight="40px"
          letterSpacing="0em"
        >
          ბლოგის დამატება
        </Typography>
        <Stack
          width="100%"
          spacing={3}
          component={"form"}
          onSubmit={handleFormSubmit}
        >
          <ImageUploader
            image={formData.image}
            setFormData={setFormData}
            setIsValidImage={setIsValidImage}
            formSubmitted={formSubmitted}
          />

          <Box display="flex" width="100%" gap={3}>
            <InputField
              property="author"
              value={formData.author}
              setData={setFormData}
              applyAllRules
              label="ავტორი"
            />

            <InputField
              property="title"
              value={formData.title}
              setData={setFormData}
              label="სათაური"
            />
          </Box>

          <InputField
            property="description"
            value={formData.description}
            setData={setFormData}
            label="აღწერა"
            multiline
            fullWidth
          />

          <Box display="flex" gap={3} width="100%">
            <Box>
              <Typography></Typography>
              <TextField
                type="date"
                value={formData.publish_date}
                onChange={(e) => handleDateChange(e.target.value)}
                label="გამოქვეყნების თარიღი *"
                sx={{}}
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="right">
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "288px",
                borderRadius: "8px",
              }}
            >
              გამოქვეყნება
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewBlog;
