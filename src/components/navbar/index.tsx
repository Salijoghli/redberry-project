import { Button, Box, Typography, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../modal";
import { ModalSuccess } from "../modal/success";
import ErrorIcon from "@mui/icons-material/Error";
import navbarLogo from "../../assets/images/navbar-logo.png";

export const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(
    sessionStorage.getItem("email") !== null
  );
  const navigate = useNavigate();

  const handleLoginModalOpen = () => setOpenLoginModal((prev) => !prev);
  const handleLoginErr = () => setLoginErr((prev) => !prev);

  const handleLoginButtonClick = async () => {
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
        sessionStorage.setItem("email", email);
        setIsAuthorized((prev) => !prev);
      } else {
        handleLoginErr();
      }
    } catch (error) {
      handleLoginErr();
    }
  };

  const isNewBlogPage = window.location.pathname === "/new-blog";

  return (
    <Box
      width="calc(100% - 76px - 76px)"
      height="80px"
      display="flex"
      justifyContent={"space-between"}
      alignItems="center"
      bgcolor="#fff"
      borderBottom={1}
      borderColor={"#E4E3EB"}
      px={9.5}
    >
      <Box component="img" src={navbarLogo} width={"150px"} height={"24px"} />
      <Box display="flex" gap={3}>
        <Button
          variant="contained"
          sx={{
            display: isNewBlogPage ? "none" : "block",
            borderRadius: "8px",
            backgroundColor: "#5D37F3",
            "&:hover": {
              backgroundColor: "#5D37e3",
            },
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
              console.log(sessionStorage, "after");
              setIsAuthorized((prev) => !prev);
              navigate("/");
            }}
          >
            გასვლა
          </Button>
        )}
      </Box>
      {isAuthorized ? (
        <ModalSuccess
          openModal={openLoginModal}
          setOpenModal={setOpenLoginModal}
          linkText="კარგი"
          text="წარმატებული ავრორიზაცია"
        />
      ) : (
        <Modal isModalOpen={openLoginModal} setIsModalOpen={setOpenLoginModal}>
          <Stack spacing={loginErr ? 3 : 5}>
            <Typography
              variant="h5"
              component="h2"
              textAlign={"center"}
              sx={{
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {`შესვლა`}
            </Typography>

            <TextField
              label="ელ-ფოსტა"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "10px",
                  width: "430px",
                  margin: "auto",
                },
              }}
              error={
                loginErr ||
                (email.trim() !== "" && !email.endsWith("@redberry.ge"))
              }
              helperText={
                loginErr ? (
                  <Box display="flex" alignItems="center" gap={1} marginTop={1}>
                    <ErrorIcon /> ელ ფოსტა არ მოიძებნა
                  </Box>
                ) : null
              }
            />
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "430px",
                backgroundColor: "#5D37F3",
                "&:hover": {
                  backgroundColor: "#5D37e3",
                },
              }}
              onClick={() => handleLoginButtonClick()}
            >
              {`შესვლა`}
            </Button>
          </Stack>
        </Modal>
      )}
    </Box>
  );
};
