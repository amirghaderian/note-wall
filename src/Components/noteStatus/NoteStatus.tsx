import Message from "../message";

// تعریف نوع پروپس‌ها
interface Note {
  id: number; // یا string، بسته به نوع ID
  title: string;  // به جای content از title استفاده کنید
  description: string;
  completed: boolean;
}

interface NoteStatusProps {
  notes: Note[]; // آرایه‌ای از یادداشت‌ها
}

const NoteStatus: React.FC<NoteStatusProps> = ({ notes }) => {
  const allNotes = notes.length;
  const completedNotes = notes.filter((n) => n.completed).length;
  const open = allNotes - completedNotes;

  return (
    <>
      {allNotes ? (
        <ul className="note-status">
          <li>
            All <span>{allNotes}</span>
          </li>
          <li>
            Completed <span>{completedNotes}</span>
          </li>
          <li>
            Open <span>{open}</span>
          </li>
        </ul>
      ) : (
        <Message>
          ✅<span>No Notes have been added yet</span>
        </Message>
      )}
    </>
  );
};

export default NoteStatus;
