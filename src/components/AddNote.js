import React, { useContext, useState } from "react";
import NoteConText from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteConText);
  const { addnote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("A new note has been Added", "success");
  };

  const onChange = (evt) => {
    setNote({ ...note, [evt.target.name]: evt.target.value });
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Add a Note
          </p>

          <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label htmlFor="title" className="form-label">
                  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  value={note.title}
                />
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label htmlFor="description" className="form-label">
                  <i className="fa-solid fa-note-sticky fa-lg me-3 fa-fw"></i>
                  Description
                </label>
                <textarea
                  cols="30"
                  rows="5"
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={onChange}
                  value={note.description}
                ></textarea>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <div className="form-outline flex-fill mb-0">
                <label htmlFor="tag" className="form-label">
                  <i className="fa-solid fa-tag fa-lg me-3 fa-fw"></i>
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  onChange={onChange}
                  value={note.tag}
                />
              </div>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button type="submit" className="btn btn-info">
                Add Note
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-6 note-img">
          <img
            src="https://img.freepik.com/free-vector/creative-writing-concept-illustration_114360-8167.jpg?w=740&t=st=1670756404~exp=1670757004~hmac=3c63781551e917f4065478e899a6b1d6b28fb8853b7bffa52d1f09c161d0377c"
            className="img-fluid"
            alt="Sample"
          />
        </div>
      </div>
    </>
  );
};

export default AddNote;
