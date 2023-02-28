import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
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
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../api";

import Note from "../components/Note";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoff } from "../store/modules/LoginSlice";
import {
  addNote,
  deleteNote,
  selectNotes,
  updateNote,
  setNotes,
  updateNoteAction,
  createNoteAction,
} from "../store/modules/NotesSlice";
import { NoteType } from "../types";

const PaginaRecados: React.FC = () => {
  const { id } = useParams();

  const note: any = useSelector<any>((state) => getNote(state, id ?? ""));

  const user: any = useSelector<any>((state) => state.auth);

  const [description, setDescription] = useState("");
  const [detailing, setDetailing] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let [notes, setNotes] = useState<any[]>([]);
  useEffect(() => {
    if (note) {
      setDescription(note.description);
      setDetailing(note.detailing);
    }
  }, []);
  const listNotes = async () => {
    let notes = await getNotesById();
    async function getNotesById() {
      let userId = localStorage.getItem("userId");
      try {
        let notes = await apiGet(`/${userId}/notes`);

        return notes.data.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    if (notes) {
      setNotes(notes);
    }
  };
  useEffect(() => {
    listNotes();
  }, []);

  const handleAddNote = async () => {
    const noteData = {
      description,
      detailing,
      id,
      userId: user.id,
    };

    let result = undefined;
    
    if(note){
      result = await dispatch( updateNoteAction(noteData)).unwrap()}
        else {
          result= await dispatch(createNoteAction(noteData)).unwrap()
        }
    

    if (result.ok) {
      navigate("/");
    }
  };

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
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField id="standard-basic" label="Descrição" variant="standard" />
          <TextField
            id="standard-basic"
            label="Detalhamento"
            variant="standard"
          />
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 20px",
            }}
            variant="text"
            aria-label="text button group"
          >
            <Button onClick={() => handleAddNote()}>Salvar</Button>
            <Button>Limpar</Button>
          </ButtonGroup>
          <Grid
            container
            spacing={2}
            sx={{
              padding: "16px",
              display: "flex",
              justifyContent: "flex-end",
            }}
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
          {notes.map((note: NoteType) => {
            return <Note note={note} />;
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default PaginaRecados;
function getNote(state: any, arg1: string): unknown {
  throw new Error("Function not implemented.");
}
