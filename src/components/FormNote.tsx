import { useState, useCallback, useRef, useEffect } from "react";
import React from "react";
import {
  CardContent,
  TextField,
  ButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Note from "../components/Note";
import { NoteType } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteNote,
  selectNoteById,
  selectNotes,
  updateNote,
} from "../store/modules/NotesSlice";
import { idText } from "typescript";

interface FormNoteProps {
  action: (note: NoteType) => void;
}

const FormNote: React.FC<FormNoteProps> = ({ action }) => {
  const dispatch = useAppDispatch();
  const NotesRedux = useAppSelector(selectNotes);
  const [description, setDescription] = useState<string>("");
  const inputDescription = useRef<HTMLInputElement | undefined>();
  const [detailing, setDetailing] = useState<string>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [newDescription, setNewDescription] = useState<string>("");
  const [newDetailing, setNewDetailing] = useState<string>("");
  let userlogged = JSON.parse(localStorage.getItem("userlogged") || "");
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const [getId, setGetId] = useState<number>(0);

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleDeleteNote = useCallback((note: any) => {
    dispatch(deleteNote(note.id));
    users = JSON.parse(localStorage.getItem("users") || "[]");
    let indexUserLogged = users.findIndex((user: any) => {
      return user.email == userlogged;
    });
    const userItem = users[indexUserLogged].notes.filter((value: any) => {
      return value.id != note.id;
    });

    users[indexUserLogged].notes = userItem;
    localStorage.setItem("users", JSON.stringify(users));
  }, []);
  const handleClear = () => {
    setDescription("");
    setDetailing("");
  };
  const handleSubmit = () => {
    if (description === "" || detailing === "") {
      alert("Por favor, escreva o recado");
      return;
    }
    action({ description, detailing });
    let findLoggedUser = users.find((user: any) => {
      return user.email == userlogged;
    });

    findLoggedUser.notes.push({
      id: Math.floor(Date.now() / 1000),
      description,
      detailing,
    });
    localStorage.setItem("users", JSON.stringify(users));
  };
  const handleEditNote = (note: any) => {
    dispatch(
      updateNote({
        id: note.getId,
        changes: {
          description: note.newDescription,
          detailing: note.newDetailing,
        },
      })
    );
    setOpenEdit(false);
    users = JSON.parse(localStorage.getItem("users") || "[]");
    let indexUserLogged = users.findIndex((user: any) => {
      return user.email == userlogged;
    });

    const indexNote = users[indexUserLogged].notes.findIndex((note: any) => {
      return note.id === getId;
    });

    const noteSelected = users[indexUserLogged].notes[indexNote];

    noteSelected.description = newDescription;
    noteSelected.detailing = newDetailing;

    localStorage.setItem("users", JSON.stringify(users));
  };

  const setOpenModal = (item: any) => {
    setNewDescription(item.description);
    setNewDetailing(item.detailing);
    setGetId(item.id);

    setOpenEdit(true);
  };

  return (
    <React.Fragment>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          id="standard-basic"
          label="Descrição"
          variant="standard"
          onChange={(ev) => setDescription(ev.target.value)}
          value={description || ""}
          inputRef={inputDescription}
        />
        <TextField
          id="standard-basic"
          label="Detalhamento"
          variant="standard"
          onChange={(ev) => setDetailing(ev.target.value)}
          value={detailing || ""}
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
          <Button onClick={handleSubmit}>Salvar</Button>
          <Button onClick={handleClear}>Limpar</Button>
        </ButtonGroup>
        {NotesRedux.map((item) => {
          return (
            <Note
              key={item.id}
              note={item}
              actionDelete={() => handleDeleteNote(item)}
              actionEdit={() => setOpenModal(item)}
            />
          );
        })}
        <Dialog open={openEdit} onClose={handleClose}>
          <DialogTitle>EDITAR</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Adicione uma nova descrição e um detalhamento para editar seu
              recado.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Descrição"
              type="text"
              fullWidth
              variant="outlined"
              value={newDescription || ""}
              onChange={(ev) => setNewDescription(ev.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="detailing"
              label="Detalhamento"
              type="text"
              fullWidth
              variant="outlined"
              value={newDetailing || ""}
              onChange={(ev) => setNewDetailing(ev.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleEditNote({ getId, newDescription, newDetailing });
              }}
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </React.Fragment>
  );
};

export default FormNote;
