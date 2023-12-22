import { Box, Button } from "@mui/material";
import { useData } from "../../context";
import { SelectedCategories } from "../../pages/home";

type CategoriesProps = {
  selectedCategories: SelectedCategories;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<SelectedCategories>
  >;
};

export const Categories = ({
  selectedCategories,
  setSelectedCategories,
}: CategoriesProps) => {
  const { categories } = useData();
  const handleButtonClick = (selectedId: number) => {
    if (!selectedCategories.includes(selectedId)) {
      setSelectedCategories((prev) => [...prev, selectedId]);
    } else {
      const filteredCategories = selectedCategories.filter(
        (category) => category !== selectedId
      );
      setSelectedCategories(filteredCategories);
    }
  };
  return (
    <Box
      width="684px"
      gap="24px"
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent="center"
      alignItems="center"
      margin="auto"
      my={5}
      p={2}
    >
      {categories.map(({ id, text_color, title, background_color }) => (
        <Button
          key={id}
          sx={{
            color: text_color,
            backgroundColor: background_color,
            fontFamily: "FiraGo, sans-serif",
            lineHeight: "16px",
            textAlign: "center",
            border: "1px solid #fff",
            borderColor: selectedCategories.includes(id) ? "black" : "#fff",
            opacity: 0.9,
            "&:hover": {
              backgroundColor: background_color,
              opacity: 1,
            },
          }}
          onClick={() => {
            handleButtonClick(id);
          }}
        >
          {title}
        </Button>
      ))}
    </Box>
  );
};
