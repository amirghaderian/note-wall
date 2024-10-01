import React from "react";
import Note from "../../types/types";

// تعریف نوع پروپس‌ها برای NoteList
interface NoteListProps {
  notes: Note[];
  sortedNotes: Note[];
  sortBy: string;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onComplete, sortBy, sortedNotes }) => {
  // مرتب‌سازی بر اساس نوع انتخاب شده
  if (sortBy === "earliest") {
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } else if (sortBy === "latest") {
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else {
    sortedNotes = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
  }

  return (
    <div className="note-list">
      {sortedNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default NoteList;

// تعریف نوع پروپس‌ها برای NoteItem
interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onComplete }) => {
  const option: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  
  return (
    <div className={`note-item ${note.completed && "completed"}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => onDelete(note.id)}>❌</button>
          <input
            type="checkbox"
            name={note.id.toString()}
            id={note.id.toString()}
            onChange={() => onComplete(note.id)}
            checked={note.completed} // برای نشان دادن وضعیت تکمیل
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", option)}
      </div>
    </div>
  );
};
