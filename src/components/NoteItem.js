import React, { useContext } from "react";
import NoteConText from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteConText);
  const { deletenote } = context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={()=> {updateNote(note)}}></i>
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id);props.showAlert("Deleted Successsfully", "danger")}}></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
