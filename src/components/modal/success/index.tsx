import { Box, Typography, Button } from "@mui/material";
import { Modal } from "..";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  openModal: boolean;
  text: string;
  linkText: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalSuccess = ({
  openModal,
  linkText,
  text,
  setOpenModal,
}: ModalProps) => {
  const navigate = useNavigate();
  const handleButtonCLick = () => {
    if (setOpenModal) setOpenModal((prev) => !prev);
    else navigate("/");
  };
  return (
    <Modal isModalOpen={openModal} setIsModalOpen={setOpenModal}>
      <Box
        width="54px"
        height="54px"
        borderRadius={"50%"}
        bgcolor={"#14D81C"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        my={2}
      >
        <CheckIcon
          fontSize="large"
          sx={{
            color: "#fff",
          }}
        />
      </Box>
      <Typography
        variant="h6"
        fontWeight={700}
        lineHeight="20px"
        paddingBottom={5}
        paddingTop={2}
      >
        {text}
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "430px",
          marginTop: 1,
        }}
        onClick={handleButtonCLick}
      >
        {linkText}
      </Button>
    </Modal>
  );
};
