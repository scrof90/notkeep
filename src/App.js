import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Notes from './components/Notes';
import NoteCreationForm from './components/NoteCreationForm';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useEffect(() => {
    const setInitialNotes = async () => {
      try {
        const initialNotes = await noteService.getAll();
        setNotes(initialNotes);
      } catch {
        handleError('Failed to fetch notes');
      }
    };

    setInitialNotes();
  }, []);

  // TODO: add logic for determining title
  const addNote = async (e) => {
    e.preventDefault();
    const noteObject = {
      title: '',
      content: newNote,
      date: new Date().toISOString(),
      pinned: false
    };

    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    } catch {
      handleError('Note creation failed, please try again');
    }
  };

  const togglePinned = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, pinned: !note.pinned };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    } catch {
      handleError(`Note '${note.content}' was already removed from server`);
    }
  };

  const handleNoteChange = (e) => setNewNote(e.target.value);
  const handleSearchFilterChange = (e) => setSearchFilter(e.target.value);
  const handleSearchFilterClear = () => setSearchFilter('');

  const notesFiltered = notes.filter((note) =>
    note.content.toLowerCase().includes(searchFilter.trim().toLowerCase())
  );

  return (
    <div>
      <header className="topbar">
        <div className="logo-container">
          <div>menu</div>
          <div>
            <div>logo</div>
            <h1>NotKeep</h1>
          </div>
        </div>
        <div className="search-container">
          <SearchBar
            searchFilter={searchFilter}
            onSearchFilterChange={handleSearchFilterChange}
            onSearchFilterClear={handleSearchFilterClear}
          />
        </div>
        <div className="tools-container">
          <div>tools</div>
          <div>tools</div>
          <div>tools</div>
        </div>
        <div>account</div>
      </header>
      <div className="notes-container">
        <NoteCreationForm onSubmit={addNote} inputValue={newNote} onChange={handleNoteChange} />
        <Notification message={errorMessage} />
        {notesFiltered.length > 0 && <Notes notes={notesFiltered} togglePinned={togglePinned} />}
      </div>
    </div>
  );
};

export default App;
