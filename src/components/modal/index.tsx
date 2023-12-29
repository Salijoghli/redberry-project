import { IconButton, Stack, Modal as MuiModal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "480px",
  height: "300px",
  bgcolor: "background.paper",
  borderRadius: 4,
};

type ModalProps = {
  isModalOpen: boolean;
  children: React.ReactNode;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({
  isModalOpen,
  children,
  setIsModalOpen,
}: ModalProps) => {
  const handleModalOpen = () => {
    if (setIsModalOpen) setIsModalOpen((prev) => !prev);
  };

  return (
    <MuiModal
      open={isModalOpen}
      onClose={() => {
        handleModalOpen();
      }}
    >
      <Stack
        sx={modalStyle}
        component={"form"}
        alignItems="center"
        justifyContent="center"
      >
        {setIsModalOpen && (
          <IconButton
            sx={{
              position: "absolute",
              textAlign: "right",
              width: "24px",
              height: "24px",
              right: 25,
              top: 25,
              p: 0,
              m: 0,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => {
              handleModalOpen();
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {children}
      </Stack>
    </MuiModal>
  );
};
