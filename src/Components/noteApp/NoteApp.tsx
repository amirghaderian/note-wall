import React, { useState } from "react";
import Note from "../../types/types";

// نوع تعریف پروپس‌ها برای NoteApp
interface NoteAppProps {
  onAddNote: (note: Note) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onUpdate: (note: Note) => void
  notes: Note[];
  sortBy: string;
  sortedNotes: Note[];
}

const NoteApp: React.FC<NoteAppProps> = ({
  onAddNote,
  onDelete,
  onComplete,
  onUpdate,
  notes,
  sortBy,
  sortedNotes,
}) => {
  const [title, setTitle] = useState<string>(""); // برای افزودن یادداشت
  const [description, setDescription] = useState<string>(""); // برای افزودن یادداشت
  const [editTitle, setEditTitle] = useState<string>(""); // برای ویرایش یادداشت
  const [editDescription, setEditDescription] = useState<string>(""); // برای ویرایش یادداشت
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null); // برای مدیریت یادداشت در حال ویرایش

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) return;

    const newNote: Note = {
      title,
      description,
      id: editingNoteId !== null ? editingNoteId : Date.now(), // اگر در حال ویرایش هستید، از id فعلی استفاده کنید
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTitle("");
    setDescription("");
    onAddNote(newNote);
    setEditingNoteId(null); // بازنشانی id ویرایش
    setEditTitle(""); // بازنشانی عنوان ویرایش
    setEditDescription(""); // بازنشانی توضیحات ویرایش
  };

  const handleEditClick = (note: Note) => {
    setEditTitle(note.title); // مقدار عنوان ویرایش را تنظیم می‌کند
    setEditDescription(note.description); // مقدار توضیحات ویرایش را تنظیم می‌کند
    setEditingNoteId(note.id); // ذخیره id یادداشت در حال ویرایش
  };

  const handleUpdateNote = () => {
	debugger;
	console.log(editingNoteId);
    if (!editTitle || !editDescription || editingNoteId === null) return;
    const updatedNote: Note = {
      title: editTitle,
      description: editDescription,
      id: editingNoteId,
      completed: false,
      createdAt: new Date().toISOString(),
    };
	onUpdate(updatedNote)

    // onAddNote(); // به روز رسانی یادداشت
    setEditingNoteId(null); // بازنشانی id ویرایش
    setEditTitle(""); // بازنشانی عنوان ویرایش
    setEditDescription(""); // بازنشانی توضیحات ویرایش
  };

  // حساب وضعیت یادداشت‌ها
  const allNotes = notes.length;
  const completedNotes = notes.filter((n) => n.completed).length;
  const openNotes = allNotes - completedNotes;

  // مرتب‌سازی یادداشت‌ها
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
          <button type="submit" className="btn btn--primary">
            Add New Note
          </button>
        </form>
      </div>
      <div className="note-container">
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
          {sortedNotes.map((note) => (
            <div key={note.id} className={`note-item ${note.completed && "completed"}`}>
              <div className="note-item__header">
                <div>
                  {editingNoteId === note.id ? ( // اگر در حال ویرایش است، ورودی‌ها را نمایش می‌دهیم
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
                    </>
                  ) : (
                    <>
                      <p className="title">{note.title}</p>
                      <p className="desc">{note.description}</p>
                    </>
                  )}
                </div>
                <div className="actions">
                  {editingNoteId === note.id ? ( // اگر در حال ویرایش است، دکمه ذخیره نمایش داده می‌شود
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
