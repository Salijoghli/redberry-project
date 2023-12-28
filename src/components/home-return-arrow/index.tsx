import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export const HomeReturnArrow = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      sx={{
        background: "#fff",
        position: "absolute",
        m: 4,
      }}
      onClick={() => {
        navigate("/");
      }}
    >
      <KeyboardArrowLeftIcon
        sx={{
          fontSize: "2rem",
          color: "#1A1A1F",
        }}
      />
    </IconButton>
  );
};
