import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Stack, Typography } from "@mui/material";
import { useData } from "../../context";
import { Category } from "../category";
import { useEffect, useMemo, useState } from "react";
import { BlogInput } from "../../api/blogs/api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const menuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 248,
    },
  },
};

const CHIP_STYLE = {
  fontFamily: "FiraGo, sans-serif",
  lineHeight: "16px",
  fontWeight: 500,
  fontSize: "12px",
  textAlign: "center",
  border: "1px solid #fff",
  borderRadius: "30px",
  opacity: 0.9,
};

type SelectCategoryProps = {
  formCategories: Array<number>;
  setFormData: React.Dispatch<React.SetStateAction<BlogInput>>;
};

export const SelectCategory = ({
  formCategories,
  setFormData,
}: SelectCategoryProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    formCategories.map((category) => String(category))
  );
  const { categories } = useData();

  const handleCategoryChange = ({
    target: { value },
  }: SelectChangeEvent<string | string[]>) => {
    const newItems = typeof value === "string" ? [value] : value;
    setSelectedCategories(newItems);
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: selectedCategories.map((categoryId) => Number(categoryId)),
    }));
  }, [selectedCategories]);

  const renderChips = useMemo(() => {
    return selectedCategories.map((id) => {
      const category = categories.find((cat) => cat.id === Number(id));
      if (!category) return null;

      return (
        <Chip
          key={category.id}
          label={category.title}
          sx={{
            ...CHIP_STYLE,
            backgroundColor: category.background_color,
            color: category.text_color,
            "&:hover": {
              opacity: 1,
            },
          }}
        />
      );
    });
  }, [selectedCategories, categories]);

  return (
    <Stack width="288px" spacing={1}>
      <Typography>კატეგორია *</Typography>
      <FormControl>
        <Select
          multiple
          value={selectedCategories}
          required
          onChange={handleCategoryChange}
          displayEmpty
          renderValue={() => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {renderChips}
            </Box>
          )}
          sx={{
            borderRadius: "12px",
          }}
          MenuProps={menuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={String(category.id)}>
              <Category {...category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
