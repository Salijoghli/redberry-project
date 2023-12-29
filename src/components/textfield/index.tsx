import React, { useEffect } from "react";
import { BlogInput } from "../../api/blogs/api";
import { Stack, TextField, Typography } from "@mui/material";

const minLettersCount = (value: string, minLettersCount: number) =>
  value.replace(/\s+/g, "").length < (minLettersCount || 4);

const getColor = (condition: boolean, text: string) =>
  text.trim() == "" ? "#85858D" : condition ? "#EA1919" : "#14D81C";

const typographyStyles = {
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "20px",
};

type Property = keyof Pick<
  BlogInput,
  "author" | "description" | "title" | "email"
>;

//generate helper texts based on property
const GenerateValidationInfo = (property: Property, text: string) => {
  if (property === "author") {
    const authorErrors = {
      firstRule: minLettersCount(text, 4),
      secondRule:
        text.split(/\s+/).filter((word) => word.trim() !== "").length < 2,
      thirdRule: !/^[ა-ჰ\s]+$/.test(text),
    };
    const isError =
      text.trim() !== "" &&
      Object.values(authorErrors).some((error) => error === true);
    return {
      data: [
        <Typography
          {...typographyStyles}
          color={getColor(authorErrors.firstRule, text)}
        >
          * მინიმუმ 4 სიმბოლო
        </Typography>,
        <Typography
          color={getColor(authorErrors.secondRule, text)}
          {...typographyStyles}
        >
          * მინიმუმ 2 სიტყვა
        </Typography>,
        <Typography
          color={getColor(authorErrors.thirdRule, text)}
          {...typographyStyles}
        >
          * მხოლოდ ქართული ასოები
        </Typography>,
      ],
      error: isError,
    };
  }
  if (property === "email") {
    const isError =
      text.trim() !== "" &&
      /^[\w]{3,255}?[a-zA-Z0-9]{0,255}@redberry\.ge$/.test(text);
    return {
      data: [
        <Typography color={getColor(isError, text)} {...typographyStyles}>
          მეილი უნდა მთავრდებოდეს @redberry.ge-ით
        </Typography>,
      ],
      error: isError,
    };
  }
  if (property === "description") {
    const isError = text.trim() !== "" && minLettersCount(text, 2);
    return {
      data: [
        <Typography color={getColor(isError, text)} {...typographyStyles}>
          * მინიმუმ ორი სიმბოლო
        </Typography>,
      ],
      error: isError,
    };
  }
  return {
    data: [
      <Typography
        color={getColor(minLettersCount(text, 4), text)}
        {...typographyStyles}
      >
        * მინიმუმ ოთხი სიმბოლო
      </Typography>,
    ],
    error: text.trim() !== "" && minLettersCount(text, 4),
  };
};

type InputFieldProps = {
  property: Property;
  label: string;
  setData: React.Dispatch<React.SetStateAction<BlogInput>>;
  setIsValidForm: React.Dispatch<React.SetStateAction<boolean>>;
  multiline?: boolean;
  fullWidth?: boolean;
  value?: string;
};

export const InputField = ({
  property,
  value = "",
  setData,
  label,
  multiline,
  fullWidth,
  setIsValidForm,
}: InputFieldProps) => {
  const handleInputChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  const { data, error } = GenerateValidationInfo(property, value);

  useEffect(() => {
    if (property !== "email") setIsValidForm(!error);
  }, [error]);

  return (
    <Stack width={fullWidth ? "100%" : "288px"} spacing={1}>
      <Typography fontWeight={500} lineHeight="20px" color="#1A1A1F">
        {label}
      </Typography>
      <TextField
        variant="outlined"
        error={error}
        value={value}
        required={property !== "email"}
        multiline={multiline}
        {...(fullWidth ? { minRows: 5 } : {})}
        placeholder={`შეიყვანეთ ${label}`}
        InputProps={{
          style: {
            borderRadius: "12px",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: getColor(error, value),
            },
            "&.Mui-focused fieldset": {
              borderColor: error ? "#85858D" : "#5D37F3",
            },
          },
        }}
        onChange={(e) => handleInputChange(e.target.value)}
        helperText={data}
      />
    </Stack>
  );
};
