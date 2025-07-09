import "./ShowNote.css";

const ShowNote = ({ notes, onDelete, onArchive, onRestore }) => {
  // Memisahkan catatan aktif dan diarsipkan
  const activeNotes = notes.filter(note => !note.archived);
  const archivedNotes = notes.filter(note => note.archived);

  return (
    <>
      <h2>Daftar Catatan</h2>
      <div className="NotesList">
        <div className="NoteItem">
          <ul>
            {activeNotes.length > 0 ? (
              activeNotes.map((note) => (
                <li key={note.id}>
                  <h2>{note.title}</h2>
                  <p>{note.createdAt}</p>
                  <p className="bodyNote">{note.body}</p>
                  <div className="buttonContainer">
                    <button onClick={() => onDelete(note.id)}>Delete</button>
                    <button onClick={() => onArchive(note.id)}>Arsipkan</button>
                  </div>
                </li>
              ))
            ) : (
              <p>Tidak ada catatan aktif untuk ditampilkan</p>
            )}
          </ul>
        </div>
      </div>

      <h2>Arsip</h2>
      <div className="ArchivedNotes">
        {archivedNotes.length > 0 ? (
          <ul>
            {archivedNotes.map((note) => (
              <li key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.createdAt}</p>
                <p className="bodyNote">{note.body}</p>
                <div className="buttonContainer">
                  <button onClick={() => onDelete(note.id)}>Delete</button>
                  <button onClick={() => onRestore(note.id)}>Kembalikan</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada catatan yang diarsipkan</p>
        )}
      </div>
    </>
  );
};

export default ShowNote;
