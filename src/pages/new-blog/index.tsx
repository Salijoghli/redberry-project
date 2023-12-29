import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { HomeReturnArrow } from "../../components/home-return-arrow";
import { Navbar } from "../../components/navbar";
import { BlogInput } from "../../api/blogs/api";
import { useState, useEffect, FormEvent } from "react";
import { ImageUploader } from "../../components/image-uploader";
import { InputField } from "../../components/textfield";
import { SelectCategory } from "../../components/select-category";
import { ModalSuccess } from "../../components/modal/success";

const TOKEN =
  "db43105a7d86b634dcc5be24ec37dfdc939473ad75ee98cd4904659298c9b4b4";

const PATH = "https://api.blog.redberryinternship.ge/api/blogs";

const defaultFormData: BlogInput = {
  title: "",
  author: "",
  categories: [],
  description: "",
  image: null,
  publish_date: "",
  email: "",
};

const NewBlog = () => {
  const [formData, setFormData] = useState<BlogInput>(defaultFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!formData.image) {
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("publish_date", formData.publish_date);
      formDataToSend.append("email", formData.email ?? "");
      formDataToSend.append("categories", JSON.stringify(formData.categories));

      const headers = {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };
      const response = await fetch(PATH, {
        headers,
        method: "post",
        body: formDataToSend,
      });

      if (response.status === 204) console.log("success");
      setFormSubmitted(false);
      setOpenModal((prev) => !prev);
      sessionStorage.removeItem("formData");
    } catch (error) {
      console.error(error);
      setFormSubmitted(false);
    }
  };

  const handleDateChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      publish_date: value,
    }));
  };

  //get info on mount
  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData");
    if (storedFormData !== null) {
      const myFormData = JSON.parse(storedFormData) as BlogInput;
      setFormData(myFormData);
    }
  }, []);

  //save form info
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("formData", JSON.stringify(formData));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData]);

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
            formSubmitted={formSubmitted}
          />

          <Box display="flex" width="100%" gap={3}>
            <InputField
              property="author"
              value={formData.author}
              setData={setFormData}
              applyAllRules
              label="ავტორი"
              setIsValidForm={setIsValidForm}
            />

            <InputField
              property="title"
              value={formData.title}
              setData={setFormData}
              label="სათაური"
              setIsValidForm={setIsValidForm}
            />
          </Box>

          <InputField
            property="description"
            value={formData.description}
            setData={setFormData}
            label="აღწერა"
            multiline
            fullWidth
            setIsValidForm={setIsValidForm}
          />

          <Box display="flex" gap={3} width="100%">
            <Stack spacing={1} width="288px">
              <Typography>გამოქვეყნების თარიღი *</Typography>
              <TextField
                type="date"
                value={formData.publish_date}
                required
                color="success"
                onChange={(e) => handleDateChange(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Stack>
            <SelectCategory
              formCategories={formData.categories}
              setFormData={setFormData}
            />
          </Box>

          <InputField
            property="email"
            value={formData.email}
            setData={setFormData}
            label="ელ ფოსტა"
            setIsValidForm={setIsValidForm}
          />

          <Box display="flex" justifyContent="right">
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "288px",
                borderRadius: "8px",
                backgroundColor: "#5D37F3",
                "&:hover": {
                  backgroundColor: "#5D37e3",
                },
              }}
              disabled={!isValidForm}
            >
              გამოქვეყნება
            </Button>
          </Box>
        </Stack>
      </Stack>
      <ModalSuccess
        linkText="მთავარ გვერდზე დაბრუნება"
        openModal={openModal}
        text="ჩანაწერი წარმატებით დაემატა"
      />
    </Box>
  );
};

export default NewBlog;
