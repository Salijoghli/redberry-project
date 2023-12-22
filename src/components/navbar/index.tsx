import {
  Button,
  Box,
  Stack,
  Modal,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import navbarLogo from "../../assets/images/navbar-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "480px",
  height: "272px",
  bgcolor: "background.paper",
  borderRadius: 4,
  p: 4,
  alignItems: "center",
};

export const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(
    sessionStorage.getItem("email") !== null
  );
  const navigate = useNavigate();

  const handleLoginModalOpen = () => setOpenLoginModal((prev) => !prev);
  const handleLoginErr = () => setLoginErr((prev) => !prev);

  const handleLoginButtonClick = async () => {
    if (successfulLogin) {
      handleLoginModalOpen();
      location.reload();

      return;
    }

    try {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.status == 204) {
        setSuccessfulLogin((prev) => !prev);
        sessionStorage.setItem("email", email);
      } else {
        handleLoginErr();
      }
    } catch (error) {
      handleLoginErr();
    }
  };

  return (
    <Box
      width="100vw"
      height="80px"
      display="flex"
      justifyContent={"space-between"}
      alignItems="center"
      bgcolor="#fff"
      borderBottom={1}
    >
      <Box
        component="img"
        src={navbarLogo}
        width={"150px"}
        height={"24px"}
        paddingLeft={"76px"}
      />
      <Box display="flex">
        <Button
          variant="contained"
          sx={{
            fontFamily: "FiraGo",
            marginRight: "76px",
          }}
          onClick={() => {
            isAuthorized ? navigate("/new-blog") : handleLoginModalOpen();
          }}
        >
          {isAuthorized ? `დაამატე ბლოგი` : `შესვლა`}
        </Button>

        {isAuthorized && (
          <Button
            onClick={() => {
              sessionStorage.clear();
              setIsAuthorized((prev) => !prev);
              location.reload();
            }}
          >
            გასვლა
          </Button>
        )}
      </Box>
      <Modal
        open={openLoginModal}
        onClose={() => {
          handleLoginModalOpen();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={modalStyle} component={"form"}>
          <IconButton
            aria-label="delete"
            sx={{
              display: "flex",
              alignItems: "right",
              justifyContent: "right",
              p: 0,
              m: 0,
              width: "100%",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={() => {
              handleLoginModalOpen();
            }}
          >
            <CloseIcon />
          </IconButton>
          {successfulLogin && (
            <Box
              width="64px"
              height="64px"
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
          )}
          <Typography
            variant="h6"
            component="h2"
            textAlign={"center"}
            sx={{
              fontFamily: "FiraGo, sans-serif",
              fontSize: "1.8em",
              marginBottom: 4,
              fontWeight: 700,
              lineHeight: successfulLogin ? "28px" : "32px",
            }}
          >
            {successfulLogin ? `წარმატებული ავტორიზაცია` : `შესვლა`}
          </Typography>

          {!successfulLogin && (
            <TextField
              label="ელ-ფოსტა"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
              error={loginErr}
              helperText={
                loginErr ? (
                  <Box display="flex" alignItems="center" gap={1} marginTop={1}>
                    <ErrorIcon /> ელ ფოსტა არ მოიძებნა
                  </Box>
                ) : null
              }
            />
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={!email.endsWith("@redberry.ge")}
            sx={{
              m: 4,
            }}
            onClick={() => handleLoginButtonClick()}
          >
            {successfulLogin ? `კარგი` : `შესვლა`}
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
};
