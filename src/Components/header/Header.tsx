import React from "react";
import Note from "../../types/types";

// تعریف نوع پروپس‌ها
interface NoteHeaderProps {
  notes: Note[]; // استفاده از نوع Note
  sortBy: string; // نوع sortBy
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void; // نوع تابع onSort
}

const NoteHeader: React.FC<NoteHeaderProps> = ({ notes, sortBy, onSort }) => {
  return (
    <div className="note-header">
      <h1>my notes ({notes.length})</h1>
      <select value={sortBy} onChange={onSort}>
        <option value="latest">Sort based on latest notes</option>
        <option value="earliest">Sort based on earliest notes</option>
        <option value="completed">Sort based on completed notes</option>
      </select>
    </div>
  );
};

export default NoteHeader;
