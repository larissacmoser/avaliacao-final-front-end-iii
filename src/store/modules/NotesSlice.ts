import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { NoteType } from "../../types";

const adapter = createEntityAdapter<NoteType>({
  selectId: (item) => item.id,
});

export const {
  selectAll: selectNotes,
  selectById: selectNoteById,
} = adapter.getSelectors((state: RootState) => state.notes);

const sliceContacts = createSlice({
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
});

export const {
  addNote,
  addMany,
  deleteNote,
  updateNote,
  setNotes,
} = sliceContacts.actions;
export default sliceContacts.reducer;
