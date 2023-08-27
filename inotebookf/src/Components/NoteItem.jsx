import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "./NotesFolder/NoteContext";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const NoteItem = ({ showAlert }) => {
  const history = useHistory();
  const context = useContext(noteContext);
  const { notes, deleteNote, getNote, updateNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      history.push("/login");
      showAlert("you need to login first", "info");
    }
  }, []);

  const [input, setinput] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const handleEvent = (e) => {
    e.preventDefault();
    updateNote(input.id, input.etitle, input.edescription, input.etag);
    closeref.current.click();
    showAlert("Note Updated", "info");
  };
  const inputEvent = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const closeref = useRef(null);

  const updateFn = (currNote) => {
    ref.current.click();
    setinput({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tag,
    });
  };

  return (
    <>
      <div>
        <button
          hidden
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Update Note
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="container my-5">
                  <div className="mb-3">
                    <label className="form-label">Title here ..</label>
                    <input
                      type="text"
                      className="form-control"
                      name="etitle"
                      required
                      value={input.etitle}
                      onChange={inputEvent}
                      id="etitle"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Write Note</label>
                    <textarea
                      rows="5"
                      className="form-control"
                      name="edescription"
                      onChange={inputEvent}
                      id="edescription"
                      required
                      value={input.edescription}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      name="etag"
                      onChange={inputEvent}
                      id="etag"
                      value={input.etag}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={closeref}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    input.etitle.length < 5 || input.edescription.length < 5
                  }
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEvent}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4>{notes.length === 0 && "No notes to display !"}</h4>
      {notes.map((elem, ind) => {
        return [
          <div
            className="card col-3 border-info mx-3"
            style={{
              minWidth: "20rem",
              maxWidth: "25rem",
              margin: "1rem 0",
              backgroundColor: "#F3FFFF",
            }}
            key={ind}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title m-0">{elem.title}</h5>
                <div>
                  <Button
                    variant="outlined"
                    className="text-success btns-card border-success me-3"
                    onClick={() => {
                      updateFn(elem);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                  <Button
                    variant="outlined"
                    className="text-danger btns-card border-danger"
                    onClick={() => {
                      deleteNote(elem._id);
                      showAlert("Note Deleted", "success");
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </Button>
                </div>
              </div>
              <p className="card-text">{elem.description}</p>

              {elem.tag.split(" ").map((tag) => {
                return [
                  <Button
                    variant="outlined"
                    className="text-secondary font-weight-bold bg-light shadow btns-card border-secondary m-1"
                  >
                    #{tag}
                  </Button>,
                ];
              })}
            </div>
          </div>,
        ];
      })}
    </>
  );
};

export default NoteItem;
