import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { apiGet, apiPost } from "../../api";
import { createNote } from "../../api/api.service";
import { NoteType } from "../../types";

const adapter = createEntityAdapter<NoteType>({
  selectId: (item) => item.id,
});

export const createNoteAction = createAsyncThunk(
  "notes/create",
  async (note: any) => {
    const result = await createNote({ ...note });

    console.log(result);

    if (result.ok) {
      return {
        ok: true,
        data: result.data.notes,
      };
    }

    // to-do: verificar
    return {
      ok: false,
    };
  }
);
export const deleteNoteAction = createAsyncThunk(
  "transactions/delete",
  async (note: any) => {
    const result = await deleteNote(note.id);
    return result;
  }
);
export const updateNoteAction = createAsyncThunk(
  "notes/update",
  async (note: any) => {
    const result = await updateNote(note);
    let changes = {};

    if (result) {
      changes = {
        description: note.description,
        detailing: note.detailing,
      };
    }

    return {
      id: note.id,
      changes,
      ok: result,
    };
  }
);
export const {
  selectAll: selectNotes,
  selectById: selectNoteById,
} = adapter.getSelectors((state: RootState) => state.notes);

const sliceNotes = createSlice({
  name: "notes",
  initialState: adapter.getInitialState({ status: "" }),
  reducers: {
    addNote: adapter.addOne,
    addMany: adapter.addMany,
    setNotes: (state, action: PayloadAction<NoteType[]>) => {
      adapter.setAll(state, action.payload);
    },
    updateNote: adapter.updateOne,
    deleteNote: adapter.removeOne,
    deleteNotes: adapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteNoteAction.fulfilled, adapter.removeOne);

    builder.addCase(updateNoteAction.fulfilled, adapter.updateOne);

    builder.addCase(createNoteAction.fulfilled, (state, action) =>
      adapter.setAll(state, action.payload.data)
    );
  },
});

export const {
  addNote,
  addMany,
  deleteNote,
  updateNote,
  setNotes,
} = sliceNotes.actions;
export default sliceNotes.reducer;
