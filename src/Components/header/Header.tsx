import React from "react";
import Note from "../../types/types";
import './Header.css'; // فرمت CSS را به اینجا اضافه کنید

// تعریف نوع پروپس‌ها
interface NoteHeaderProps {
  notes: Note[]; // استفاده از نوع Note
  sortBy: string; // نوع sortBy
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void; // نوع تابع onSort
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
