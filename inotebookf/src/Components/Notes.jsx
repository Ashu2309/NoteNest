import React, { useState, useContext } from "react";
import noteContext from "./NotesFolder/NoteContext";
import NoteItem from "./NoteItem";
import Button from "@mui/material/Button";

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [input, setinput] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const addBtn = (e) => {
    e.preventDefault();
    addNote(input.title, input.description, input.tag);
    setinput({ title: "", description: "", tag: "General" });
    showAlert("Note Added", "success");
  };

  const inputEvent = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form className="container my-5">
        <div className="mb-3">
          <label className="form-label">Title here ..</label>
          <input
            type="text"
            className="form-control"
            name="title"
            required
            onChange={inputEvent}
            value={input.title}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Write Note</label>
          <textarea
            rows="5"
            className="form-control"
            name="description"
            required
            onChange={inputEvent}
            value={input.description}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            name="tag"
            required
            onChange={inputEvent}
            value={input.tag}
          />
        </div>

        <Button
          disabled={input.title.length < 5 || input.description.length < 5}
          variant="contained"
          className="bg-info"
          onClick={addBtn}
        >
          Add Note
        </Button>
      </form>
      {/* cardItems */}
      <div className="container d-flex align-items-center mx-auto justify-content-center">
        <div className="row mx-auto ">
          <NoteItem showAlert={showAlert} />
        </div>
      </div>
    </>
  );
};

export default Notes;
