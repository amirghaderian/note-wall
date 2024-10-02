import React, { useState } from "react";
import Note from "../../types/types";
// import Datepicker from "../datepicker";

interface NoteAppProps {
  onAddNote: (note: Note) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onUpdate: (note: Note) => void;
  onSort: (notes: Note[]) => void;
  notes: Note[];
  sortBy: string;
}

const NoteApp: React.FC<NoteAppProps> = ({
  onAddNote,
  onDelete,
  onComplete,
  onUpdate,
  onSort,
  notes,
  sortBy,
}) => {
  const [title, setTitle] = useState<string>(""); 
  const [description, setDescription] = useState<string>(""); 
  const [editTitle, setEditTitle] = useState<string>(""); 
  const [editDescription, setEditDescription] = useState<string>(""); 
  const [deadline, setDeadline] = useState<string>(""); 
  const [editingDeadLine, setEditDeadline] =  useState<string>(""); 
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null); 

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) return;

    const newNote: Note = {
      title,
      description,
      id: editingNoteId !== null ? editingNoteId : Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
	  deadline
    };

    setTitle("");
    setDescription("");
    setDeadline("")
    onAddNote(newNote);
    setEditingNoteId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleEditClick = (note: Note) => {
    setEditTitle(note.title);
    setEditDescription(note.description);
	setEditDeadline(note.deadline ? note.deadline : "")
    setEditingNoteId(note.id);
  };

  const handleUpdateNote = () => {
	if (!editTitle || !editDescription || editingNoteId === null) return;
  	const noteToUpdate = notes.find((note) => note.id === editingNoteId);
  
	if (!noteToUpdate) return;
  
	const updatedNote: Note = {
	  title: editTitle,
	  description: editDescription,
	  id: editingNoteId,
	  completed: noteToUpdate.completed,
	  createdAt: noteToUpdate.createdAt,  
	  deadline: editingDeadLine || "",  
	};
  
	onUpdate(updatedNote);
  
	setEditTitle("");
	setEditDescription("");
	setEditDeadline("");
	setEditingNoteId(null);
  };
  
  const allNotes = notes.length;
  const completedNotes = notes.filter((n) => n.completed).length;
  const openNotes = allNotes - completedNotes;

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortBy === "earliest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return Number(a.completed) - Number(b.completed);
    }
  });

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggingIndex === null || index === draggingIndex) return;
    
    const reorderedNotes = [...sortedNotes];
    const noteToMove = reorderedNotes.splice(draggingIndex, 1)[0];
    reorderedNotes.splice(index, 0, noteToMove);
    setDraggingIndex(index); 
    onSort(reorderedNotes); 
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };
  const isDeadlinePassed = (deadline: string) => {
	const deadlineDate = new Date(deadline);
	const currentDate = new Date();
	return deadlineDate < currentDate;
  };
  
  return (
    <div className="note-app">
      {/* بخش افزودن یادداشت */}
      <div className="add-new-note">
        <h2>Add New Note</h2>
        <form className="note-form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="text-field"
            placeholder="Note title ..."
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="text-field"
            placeholder="Note description ..."
          />
		    <input
   			value={deadline}
			onChange={(e) => setDeadline(e.target.value)}
			type="date" 
    		className="text-field"
  />
    {/* <Datepicker id="example-datepicker"  placeholder="Deadline" classList="datepicker"  /> */}
          <button type="submit" className="btn btn--primary">
            Add New Note
          </button>
        </form>
      </div>
      <div className={`note-container`} style={!allNotes ?{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"25px"}:{}}>
        {/* بخش وضعیت یادداشت‌ها */}
        <div className="note-status">
          {allNotes ? (
            <ul>
              <li>
                All <span>{allNotes}</span>
              </li>
              <li>
                Completed <span>{completedNotes}</span>
              </li>
              <li>
                Open <span>{openNotes}</span>
              </li>
            </ul>
          ) : (
            <p>✅ No Notes have been added yet</p>
          )}
        </div>

        {/* بخش لیست یادداشت‌ها */}
        <div className="note-list">
          {sortedNotes.map((note, index) => (
            <div
              key={note.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={() => handleDragOver(index)}
              onDragEnd={handleDragEnd}
              className={`note-item ${note.completed ? "completed" : ""}`}
            >
              <div className="note-item__header">
                <div>
                  {editingNoteId === note.id ? (
                    <>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        type="text"
                        className="text-field"
                      />
                      <input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        type="text"
                        className="text-field"
                      />
					    <input
      					value={editingDeadLine? editingDeadLine : ""} 
      					onChange={(e) => setEditDeadline(e.target.value)}
      					type="date"
      					className="text-field"
    />
                    </>
                  ) : (
                    <>
                      <p className="title">{note.title}</p>
                      <p className="desc">{note.description}</p>
					  {note.deadline && <p className="deadline">Deadline: {note.deadline}</p>}
                    </>
                  )}
                </div>
                <div className="actions">
                  {editingNoteId === note.id ? (
                    <button onClick={handleUpdateNote}>✔️</button>
                  ) : (
                    <button onClick={() => handleEditClick(note)}>✏️</button>
                  )}
                  <button onClick={() => onDelete(note.id)}>❌</button>
                  <input
                    type="checkbox"
                    name={note.id.toString()}
                    id={note.id.toString()}
                    onChange={() => onComplete(note.id)}
                    checked={note.completed}
                  />
                </div>
              </div>
              <div className="note-item__footer">
                {new Date(note.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
			{note.deadline && (
 				 <p className={`deadline ${isDeadlinePassed(note.deadline) ? "deadline-passed" : ""}`}>
   				 Deadline: {new Date(note.deadline).toLocaleDateString("en-US", {
      			year: "numeric",
      			month: "long",
      			day: "numeric",
    		})}
 		 </p>
		)}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
