import { Box, IconButton, Stack, Typography } from "@mui/material";
import { BlogInput } from "../../api/blogs/api";
import { useState } from "react";

import imageAddIcon from "../../assets/images/folder-add.svg";
import ClearIcon from "@mui/icons-material/Clear";
import ImageIcon from "@mui/icons-material/Image";

type ImageUploaderProps = {
  image: string;
  setFormData: React.Dispatch<React.SetStateAction<BlogInput>>;
  setIsValidImage: React.Dispatch<React.SetStateAction<boolean>>;
  formSubmitted: boolean;
};

export const ImageUploader = ({
  image,
  setFormData,
  setIsValidImage,
  formSubmitted,
}: ImageUploaderProps) => {
  const [fileName, setFileName] = useState("");

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      files[0] && setFileName(files[0].name);
      setFormData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(files[0]),
      }));
      setIsValidImage(true);
    } else {
      setIsValidImage(false);
    }
  };

  return (
    <Stack width="100%" spacing={1}>
      <Typography
        sx={{
          fontFamily: "FiraGO",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "20px",
          letterSpacing: "0em",
        }}
      >
        ატვირთეთ ფოტო
      </Typography>
      {!image ? (
        <Stack
          width="100%"
          height="180px"
          borderRadius="12px"
          bgcolor="#f4f3ff"
          alignItems="center"
          justifyContent="center"
          onClick={() => {
            const element = document.querySelector(
              ".image-field"
            ) as HTMLInputElement;
            element.click();
          }}
          sx={{
            cursor: "pointer",
            border:
              formSubmitted && !image ? "2px dashed red" : "2px solid #1A1A1F",
          }}
          spacing={1}
        >
          <input
            type="file"
            accept="image/*"
            className="image-field"
            name="file"
            hidden
            onChange={({ target: { files } }) => {
              handleImageChange(files);
            }}
          />
          <Box component="img" src={imageAddIcon} width="40px" height="40px" />
          <Typography fontFamily={"FiraGo, sans-serif"} variant="body1">
            ჩააგდეთ ფაილი აქ ან{" "}
            {
              <Typography
                display="inline"
                fontWeight="bold"
                fontSize="inherit"
                sx={{
                  textDecoration: "underline",
                }}
              >
                აირჩიეთ ფაილი
              </Typography>
            }
          </Typography>
        </Stack>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          bgcolor="#F2F2FA"
          borderRadius="12px"
          p={1}
        >
          <Box display="flex" gap={"10px"}>
            <ImageIcon />
            <Typography
              fontWeight={400}
              fontFamily="FiraGo, sans-serif"
              color="#1A1A1F"
            >
              {fileName}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => {
              setFormData((prevData) => ({
                ...prevData,
                image: "",
              }));
              setFileName("");
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};
