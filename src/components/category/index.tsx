import { Button } from "@mui/material";

import { TCategory } from "../../api/blogs/api";
import { SelectedCategories } from "../../pages/home";

type CategoryProps = TCategory & {
  selectedCategories?: SelectedCategories;
  handleButtonClick?: (id: number) => void;
};

export const Category = ({
  id,
  title,
  text_color,
  background_color,
  handleButtonClick,
  selectedCategories,
}: CategoryProps) => {
  return (
    <Button
      sx={{
        color: text_color,
        backgroundColor: background_color,
        fontFamily: "FiraGo, sans-serif",
        lineHeight: "16px",
        fontWeight: 500,
        fontSize: "12px",
        textAlign: "center",
        border: "1px solid #fff",
        borderColor: selectedCategories?.includes(id) ? "black" : "#fff",
        opacity: 0.9,
        "&:hover": {
          backgroundColor: background_color,
          opacity: 1,
        },
      }}
      onClick={() => {
        handleButtonClick && handleButtonClick(id);
      }}
    >
      {title}
    </Button>
  );
};
