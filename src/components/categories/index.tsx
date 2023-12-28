import { Box } from "@mui/material";
import { useData } from "../../context";
import { SelectedCategories } from "../../pages/home";
import { Category } from "../category";

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
      p={2}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          handleButtonClick={handleButtonClick}
          selectedCategories={selectedCategories}
          {...category}
        />
      ))}
    </Box>
  );
};
