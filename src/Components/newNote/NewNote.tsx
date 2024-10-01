import React, { useState } from "react";
import Note from "../../types/types";

// تعریف نوع پروپس‌ها
interface AddNewNoteProps {
  onAddNote: (note: Note) => void; // تابع برای اضافه کردن یادداشت
  onComplete?: (id: number) => void; // تابع اختیاری برای کامل کردن یادداشت
}

const AddNewNote: React.FC<AddNewNoteProps> = ({ onAddNote, onComplete }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) return;

    const newNote: Note = {
      title,
      description,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTitle("");
    setDescription("");
    onAddNote(newNote);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="add-new-note">
      <h2>Add New Note</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={handleChange}
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
        <button type="submit" className="btn btn--primary">
          Add New Note
        </button>
      </form>
    </div>
  );
};

export default AddNewNote;
