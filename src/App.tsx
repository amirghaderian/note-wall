import React, { useState } from "react";
import "./App.css";
import { NewNote,NoteList,Header,NoteStatus } from "./Components";

// تعریف نوع برای یادداشت
interface Note {
  id: number; // یا string، بسته به اینکه ID به چه صورت تعریف شده
  content: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sortBy, setSortBy] = useState<string>("latest");

  const handleNotes = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
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

  let sortedNotes = notes;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setNotes(sortedNotes);
  };

  return (
    <>
      <div className="container">
        <Header notes={notes} sortBy={sortBy} onSort={handleChange} />
        <div className="note-app">
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
        </div>
      </div>
    </>
  );
};

export default App;
