import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext, themes } from "./ThemeContext";

function App() {

  const theme = useContext(ThemeContext);
  let initialFavList: string[] = [];
  const [favoritesList, setFavoritesList] = useState(initialFavList);
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    delete: false,
    liked: false
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    console.log(currentTheme)
  };

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const handleLikeClick = (id: number, title: string) => {
    const noteInd = notes.findIndex((note) => note.id === id)
    notes[noteInd] = {
      id: id,
      title: notes[noteInd].title,
      content: notes[noteInd].content,
      label: notes[noteInd].label,
      liked: !notes[noteInd].liked,
      delete: notes[noteInd].delete
    }

    const faveNoteList = notes.filter((note) => note.liked).map(note => note.title)

    setFavoritesList(faveNoteList)
    console.log(notes)
  }

  const handleDeleteClick = (id: number) => {
    const noteInd = notes.findIndex((note) => note.id === id)
    notes[noteInd] = {
      id: id,
      title: notes[noteInd].title,
      content: notes[noteInd].content,
      label: notes[noteInd].label,
      liked: notes[noteInd].liked,
      delete: true
    }

    const newNotes = notes.filter((note) => !note.delete)
    setNotes(newNotes)
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
    <div style={{
       background: currentTheme.background,
       color: currentTheme.foreground,
       padding: "20px",
     }} className='app-container'>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required>
          </input>
        </div>
        <div>
          <textarea
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required>
          </textarea>
        </div>

        <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type="submit">Create Note</button></div>
      </form>

      <div style={{
       background: currentTheme.background,
       color: currentTheme.foreground,
       padding: "20px",
     }}className="notes-grid">
        {notes.map((note) => (
          <div style={{
            background: currentTheme.background,
            color: currentTheme.foreground,
            padding: "20px",
          }}
            key={note.id}
            className="note-item"
          >
              <div className="notes-header">
                <button style={{
       background: currentTheme.background,
       color: currentTheme.foreground,
     }} onClick={() => handleLikeClick(note.id, note.title)}>{note.liked ? '❤️' : '♡'}</button>
                <button style={{
       background: currentTheme.background,
       color: currentTheme.foreground,
     }} onClick={() => handleDeleteClick(note.id)}>x</button>
              </div>
              <h2 contentEditable='true'> {note.title} </h2>
              <p contentEditable='true'> {note.content} </p>
              <p contentEditable='true'> {note.label} </p>
          </div>
        ))}
      </div>
      <div>
        <h2>Favorites List</h2>
        {favoritesList.map((fave) =>
          <p>{fave}</p>
        )}
      </div>
      <div>
        <button onClick={toggleTheme}> Toggle Theme </button>
      </div>
    </div>
    </ThemeContext.Provider>);
}

export default App;

