import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormNote from "../components/FormNote";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoff } from "../store/modules/LoginSlice";
import {
  addNote,
  deleteNote,
  selectNotes,
  updateNote,
  setNotes,
} from "../store/modules/NotesSlice";
import { NoteType } from "../types";

const PaginaRecados: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let userlogged = JSON.parse(localStorage.getItem("userlogged") || "");
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    let indexUserLogged = users.findIndex((user: any) => {
      return user.email == userlogged;
    });
    let loggedUserNotes = users[indexUserLogged].notes;

    dispatch(setNotes(loggedUserNotes));
  });

  const handleAddNote = useCallback((note: NoteType) => {
    dispatch(addNote(note));
  }, []);

  const handleLogOff = () => {
    dispatch(logoff());
    navigate("/");
    localStorage.removeItem("userlogged");
  };
  return (
    <>
      <Card sx={{ minWidth: 275, boxShadow: "10px 5px 5px rgba(0,0,0,0.5)" }}>
        <Typography sx={{ fontSize: "40px", padding: "20px" }}>
          Meus recados
        </Typography>

        <FormNote action={handleAddNote} />

        <Grid
          container
          spacing={2}
          sx={{ padding: "16px", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="text"
            onClick={() => {
              handleLogOff();
            }}
          >
            LOGOFF
          </Button>
        </Grid>
      </Card>
    </>
  );
};

export default PaginaRecados;
