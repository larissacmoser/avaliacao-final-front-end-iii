import { Button, ButtonGroup, CardContent, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicCard from "../components/BasicCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/modules/LoginSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const userslist = JSON.parse(localStorage.getItem("users") || "[]");
  const loginRedux = useAppSelector((state) => state.login);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const inputEmail = useRef("");
  const inputPassword = useRef("");
  const dispatch = useAppDispatch();

  if (loginRedux.logged) {
    navigate("/pagina-recados");
  }

  const handleLogin = () => {
    userslist.forEach((user: any) => {
      if (user.email === email && user.password === password) {
        dispatch(login({ email, password, logged: true }));
        localStorage.setItem("userlogged", JSON.stringify(email));
      }
    });
  };

  const handleChangePage = () => {
    navigate("/criar-conta");
  };
  return (
    <>
      <BasicCard
        title="Entrar no sistema de recados"
        children={
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              sx={{ marginBottom: "25px" }}
              inputRef={inputEmail}
              value={email || ""}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              type="password"
              variant="outlined"
              inputRef={inputPassword}
              value={password || ""}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <ButtonGroup
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "25px",
              }}
              variant="text"
              aria-label="text button group"
            >
              <Button
                onClick={() => {
                  handleChangePage();
                }}
              >
                Criar conta
              </Button>
              <Button
                onClick={() => {
                  handleLogin();
                }}
              >
                Entrar
              </Button>
            </ButtonGroup>
          </CardContent>
        }
      />
    </>
  );
};
export default Login;
