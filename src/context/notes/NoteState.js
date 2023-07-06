import { useState } from "react";
import NoteConText from "./NoteContext";

const host = "http://localhost:5000";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //   Get all notes
  const getnotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //  Add a note
  const addnote = async (title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deletenote = async (id) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    // eslint-disable-next-line
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editnote = async (id, title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = await response.json();


    let newNotes= JSON.parse(JSON.stringify(notes))
    //  logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteConText.Provider
      value={{ notes, setNotes, getnotes, addnote, deletenote, editnote }}
    >
      {props.children}
    </NoteConText.Provider>
  );
};

export default NoteState;
