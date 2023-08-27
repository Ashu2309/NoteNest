import React, { useRef } from "react";

const ModalUp = ({ getDataFromModal }) => {
  const ref = useRef(null);
  getDataFromModal(ref);

  const inputEvent = (e) => {
    // setinput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
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
                    name="title"
                    required
                    onChange={inputEvent}
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
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                // onClick={updateFn}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUp;
