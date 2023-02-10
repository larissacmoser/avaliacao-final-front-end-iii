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
import { apiGet } from "../api";
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
  let [notes, setNotes] = useState<any>([]);
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userId") || "");
    async function getNotesById() {
      try {
        let notes = await apiGet(`/${userId}/notes`);
        return notes;
      } catch (error) {
        console.log(error);
      }
    }
    let notes = getNotesById();
    if (notes) {
      setNotes(notes);
    }
  });

  function renderNotes() {
    notes.map((note: any) => {
      return note;
    });
  }
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
      {renderNotes()}
    </>
  );
};

export default PaginaRecados;
