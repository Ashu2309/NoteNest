import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [];
  let history = useHistory();

  const [notes, setnotes] = useState(notesInitial);
  const host = "https://note-nest-wheat.vercel.app/";

  const state = {
    name: "Ashu",
    class: "TE A",
  };

  // CURD OPERATIONS
  // GET all Func
  const getNote = async () => {
    //Api call
    const response = await fetch(`https://note-nest-wheat.vercel.app/api/notes/fetchuser`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    // console.log(json);
    setnotes(json);
  };

  // Add Func
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`https://note-nest-wheat.vercel.app/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    //Lofic for update
    const note = await response.json();
    setnotes(notes.concat(note));
  };

  // Delete Func
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(
      `https://note-nest-wheat.vercel.app/api/notes/deletenote/${id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const json = await response.json();
    const delNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(delNotes);
  };

  // update Func
  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(
      `https://note-nest-wheat.vercel.app/api/notes/updatenote/${id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();
    // console.log(json);
    //Lofic for update
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };

  // USER AUTHETICATION

  return (
    <>
      <NoteContext.Provider
        value={{
          state,
          notes,
          setnotes,
          addNote,
          deleteNote,
          getNote,
          updateNote,
        }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;

// const response = await fetch(url, {
//   method: "POST", // *GET, POST, PUT, DELETE, etc.
//   mode: "cors", // no-cors, *cors, same-origin
//   headers: {
//     "Content-Type": "application/json",
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body: JSON.stringify(data), // body data type must match "Content-Type" header
// });
// return response.json();
