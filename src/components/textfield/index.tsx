import React, { useEffect } from "react";
import { BlogInput } from "../../api/blogs/api";
import { Stack, TextField, Typography } from "@mui/material";

const validateInput = (
  property: keyof BlogInput,
  value: string,
  applyAllRules?: boolean,
  minLettersCount?: number
) => {
  const errorMessages: string[] = [];

  if (value.trim() === "") {
    return errorMessages;
  }

  if (property === "email") {
    // email rule:
    if (!value.endsWith("@redberry.ge")) {
      errorMessages.push("მეილი უნდა მთავრდებოდეს @redberry.ge - ით");
    }
    return errorMessages;
  }

  // Rule 1:
  if (value.replace(/\s+/g, "").length < (minLettersCount || 4)) {
    errorMessages.push("მინიმუმ 4 სიმბოლო");
  }

  // Apply all rules if specified
  if (applyAllRules) {
    // Rule 2:
    const nonEmptyWords = value
      .split(/\s+/)
      .filter((word) => word.trim() !== "");
    if (nonEmptyWords.length < 2) {
      errorMessages.push("მინიმუმ 2 სიტყვა");
    }

    // Rule 3:
    const georgianLettersRegex = /^[ა-ჰ\s]+$/;
    if (!georgianLettersRegex.test(value)) {
      errorMessages.push("მხოლოდ ქართული ასოები");
    }
  }

  return errorMessages;
};

type InputFieldProps = {
  property: keyof BlogInput;
  label: string;
  setData: React.Dispatch<React.SetStateAction<BlogInput>>;
  setIsValidForm: React.Dispatch<React.SetStateAction<boolean>>;
  applyAllRules?: boolean;
  minLettersCount?: number;
  multiline?: boolean;
  fullWidth?: boolean;
  value?: string;
};

export const InputField = ({
  property,
  value = "",
  setData,
  applyAllRules,
  label,
  multiline,
  setIsValidForm,
  fullWidth,
  minLettersCount = 4,
}: InputFieldProps) => {
  const errorMessages = validateInput(
    property,
    value,
    applyAllRules,
    minLettersCount
  );
  const isError = errorMessages.length > 0;
  const handleInputChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  useEffect(() => {
    if (property !== "email") setIsValidForm(!isError);
  }, [isError]);

  return (
    <Stack width={fullWidth ? "100%" : "288px"} spacing={1}>
      <Typography fontWeight={500} lineHeight="20px" color="#1A1A1F">
        {label} *
      </Typography>
      <TextField
        variant="outlined"
        error={isError}
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
              borderColor: isError
                ? "red"
                : errorMessages.length === 0 && value.trim() !== ""
                ? "#14D81C"
                : "",
            },
          },
        }}
        onChange={(e) => handleInputChange(e.target.value)}
        helperText={errorMessages.map((message, index) => (
          <Typography
            key={index}
            fontSize="12px"
            lineHeight="20px"
            color="error"
          >
            * {message}
          </Typography>
        ))}
      />
    </Stack>
  );
};
