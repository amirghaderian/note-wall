import React from "react";
import Note from "../../types/types";
import './Header.css'; 

interface NoteHeaderProps {
  notes: Note[]; 
  sortBy: string; 
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
}

const NoteHeader: React.FC<NoteHeaderProps> = ({ notes, sortBy, onSort }) => {
  return (
    <div className="note-header">
      <h1>My Notes ({notes.length})</h1>
      <select value={sortBy} onChange={onSort} className="note-sort-select">
        <option value="no-sort">No Sorting</option>
        <option value="latest">Sort by Latest</option>
        <option value="earliest">Sort by Earliest</option>
        <option value="completed">Sort by Completed</option>
      </select>
    </div>
  );
};

export default NoteHeader;
