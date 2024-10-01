import React, { useState } from "react";
import "./App.css";
import { Header, NoteApp } from "./Components";
import Note from "./types/types";
const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sortBy, setSortBy] = useState<string>("no-sort");

  const handleNotes = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };
const handleUpdate = (newNote: Note) => {
  debugger;
  const filterNotes=notes.filter((note)=>note.id!==newNote.id)
  setNotes(() => [...filterNotes, newNote]);
};
const handleSort = (sortedNote: Note[]) => { 
  setNotes(sortedNote);
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // این قسمت نیاز به به‌روزرسانی دارد، در حال حاضر به سادگی از sortedNotes استفاده شده است
  };

  return (
    <div className="container">
      <Header notes={notes} sortBy={sortBy} onSort={handleChange} />
          <NoteApp
        onAddNote={handleNotes}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onComplete={handleCompletedNote}
        notes={notes}
        sortBy={sortBy}
        onSort={handleSort}
        // onSortChange={handleChange}
      />
    </div>
  );
};

export default App;
