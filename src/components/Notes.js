import PropTypes from 'prop-types';
import Note from './Note';
import styles from './Notes.module.css';

const Notes = ({ notes, togglePinned, searchFilter }) => {
  const filteredNotes = notes
    .filter((note) => note.content.toLowerCase().includes(searchFilter.trim().toLowerCase()))
    .map((note) => <Note key={note.id} note={note} togglePinned={togglePinned} />);

  return (
    <div>
      {filteredNotes.length > 0 && (
        <h2 className={styles.header}>{notes[0].pinned ? 'Pinned' : 'Others'}</h2>
      )}
      {filteredNotes.length > 0 && <div className={styles.notes}>{filteredNotes}</div>}
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  togglePinned: PropTypes.func.isRequired,
  searchFilter: PropTypes.string.isRequired
};

export default Notes;
