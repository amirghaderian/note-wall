import React, { useState } from "react";
import "./App.css";
import { NewNote, NoteList, Header, NoteStatus, NoteApp } from "./Components";
import Note from "./types/types";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sortBy, setSortBy] = useState<string>("latest");

  const handleNotes = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };
const handleUpdate = (newNote: Note) => {
  const filterNotes=notes.filter((note)=>note.id!==newNote.id)
  setNotes(() => [...filterNotes, newNote]);
};
  const handleDelete = (id: number) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const handleCompletedNote = (id: number) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, completed: !note.completed } : note
    );
    setNotes(newNotes);
  };

  let sortedNotes = notes; // این قسمت در آینده باید برای مرتب‌سازی یادداشت‌ها اضافه شود.
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // این قسمت نیاز به به‌روزرسانی دارد، در حال حاضر به سادگی از sortedNotes استفاده شده است
  };

  return (
    <div className="container">
      <Header notes={notes} sortBy={sortBy} onSort={handleChange} />
      {/* <div className="note-app">
        <NewNote onAddNote={handleNotes} />
        <div className="note-container">
          <NoteStatus notes={notes} />
          <NoteList
            notes={sortedNotes}
            sortBy={sortBy}
            sortedNotes={sortedNotes}
            onDelete={handleDelete}
            onComplete={handleCompletedNote}
          />
        </div>
      </div> */}
          <NoteApp
        onAddNote={handleNotes}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onComplete={handleCompletedNote}
        notes={notes}
        sortBy={sortBy}
        sortedNotes={sortedNotes}
        // onSortChange={handleChange}
      />
    </div>
  );
};

export default App;
