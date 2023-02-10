import { Button, ButtonGroup, CardContent, TextField } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicCard from "../components/BasicCard";
import ListType from "../types/ListType";
import { apiPost } from "../api";

const CriarConta: React.FC = () => {
  const [list, setList] = useState<ListType[]>([]);
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [confirm, setConfirm] = useState<string | undefined>("");
  const inputEmail = useRef<HTMLInputElement | null | undefined>();
  const inputPassword = useRef<HTMLInputElement | null | undefined>();
  const inputPasswordTwo = useRef<HTMLInputElement | null | undefined>();
  const navigate = useNavigate();
  const notes: any = [];

  const addContact = useCallback(
    (user: ListType) => {
      setList([...list, user]);
    },
    [list]
  );
  const handleClick = async () => {
    if (inputPassword === inputPasswordTwo) {
      alert("Confira a senha");
      return;
    }

    if (!email || !password || !confirm) {
      alert(`Preencha os campos!`);
      return;
    }
    if (password.length < 5) {
      alert("A senha precisa ter pelo menos 5 caracteres");
      return;
    }
    if (password !== confirm) {
      return alert("Senhas não conferem!");
    }

    try {
      await apiPost("/", { email, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePage = () => {
    navigate("/");
  };
  const handleChangeEmail = (ev: any) => {
    const value = ev.target.value;
    setEmail(value);
  };
  const handleChangePassword = (ev: any) => {
    const value = ev.target.value;
    setPassword(value);
  };
  const handleChangeConfirm = (ev: any) => {
    const value = ev.target.value;
    setConfirm(value);
  };

  return (
    <BasicCard
      title="Criar conta"
      children={
        <>
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
              value={email || ""}
              onChange={handleChangeEmail}
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              type="password"
              variant="outlined"
              value={password || ""}
              onChange={handleChangePassword}
            />
            <TextField
              id="outlined-basic"
              label="Confirmar senha"
              type="password"
              variant="outlined"
              sx={{ marginTop: "25px" }}
              value={confirm || ""}
              inputRef={inputPasswordTwo}
              onChange={handleChangeConfirm}
            ></TextField>
          </CardContent>
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "25px",
            }}
            variant="text"
            aria-label="text button group"
          >
            <Button
              onClick={() => {
                handleClick();
              }}
            >
              Criar conta
            </Button>
            <Button
              onClick={() => {
                handleChangePage();
              }}
            >
              Entrar
            </Button>
          </ButtonGroup>
        </>
      }
    />
  );
};

export default CriarConta;
