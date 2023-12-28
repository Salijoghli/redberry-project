import React from "react";
import { BlogInput } from "../../api/blogs/api";
import { Stack, TextField, Typography } from "@mui/material";

//dynamically create helper texts
const renderValidationMessage = (
  key: string,
  text: string,
  isError: boolean
) => (
  <Typography key={key} color={isError ? "error" : "#85858D"}>
    * {text}
  </Typography>
);

type InputFieldProps = {
  property: keyof BlogInput;
  value: string;
  label: string;
  setData: React.Dispatch<React.SetStateAction<BlogInput>>;
  applyAllRules?: boolean;
  minLettersCount?: number;
  multiline?: boolean;
  fullWidth?: boolean;
};

export const InputField = ({
  property,
  value,
  setData,
  applyAllRules,
  label,
  multiline,
  fullWidth,
  minLettersCount = 4,
}: InputFieldProps) => {
  const validateText = () => {
    const validationMessages: JSX.Element[] = [];

    // Rule 1:
    validationMessages.push(
      renderValidationMessage(
        "rule1",
        "მინიმუმ 4 სიმბოლო",
        value.replace(/\s+/g, "").length < minLettersCount
      )
    );

    //if given, apply all rules
    if (applyAllRules) {
      // Rule 2:
      const nonEmptyWords = value
        .split(/\s+/)
        .filter((word) => word.trim() !== "");
      validationMessages.push(
        renderValidationMessage(
          "rule2",
          "მინიმუმ 2 სიტყვა",
          nonEmptyWords.length < 2
        )
      );

      // Rule 3:
      const georgianLettersRegex = /^[ა-ჰ\s]+$/;
      validationMessages.push(
        renderValidationMessage(
          "rule3",
          "მხოლოდ ქართული ასოები",
          !georgianLettersRegex.test(value)
        )
      );
    }

    return validationMessages;
  };

  const validationMessages = validateText();
  const isError = validationMessages.some(
    (message) => message.props.color === "error"
  );

  const handleInputChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  return (
    <Stack width={fullWidth ? "100%" : "288px"} spacing={1}>
      <Typography fontWeight={500} lineHeight="20px" color="#1A1A1F">
        {label} *
      </Typography>
      <TextField
        variant="outlined"
        error={isError}
        value={value}
        required
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
              borderColor:
                validationMessages.length !== 0 && !isError ? "#14D81C" : "",
            },
          },
        }}
        onChange={(e) => handleInputChange(e.target.value)}
        helperText={validationMessages}
      />
    </Stack>
  );
};
