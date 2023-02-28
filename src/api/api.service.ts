import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const createNote = async (note: any) => {
  try {
    const result = await api.post(`/users/${note.userId}/notes`, note);
    return result.data;
  } catch (error:any) {
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};
interface UpdateNoteProps {
  userId: string;
  id: string;
  description?: string;
  detailing?: string;
}
export const updateNote = async (note: UpdateNoteProps) => {
  try {
    const result = await api.put(
      `/users/${note.userId}/notes/${note.id}`,
      note
    );
    return result.data;
  } catch (error:any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};
export const deleteNote = async (id: string, userId: string) => {
  try {
    const result = await api.delete(`/users/${userId}/notes/${id}`);
    console.log(result);

    return result.data;
  } catch (error:any) {
    console.log(error);
    if (error.request?.response) {
      return JSON.parse(error.request?.response);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};
