import { useState } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import styles from './NoteCreationForm.module.css';

const NoteCreationForm = ({
  onSubmit,
  titleValue,
  contentValue,
  pinnedValue,
  onTitleChange,
  onContentChange,
  onPinnedChange
}) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const handleFocus = () => setIsBlurred(false);
  const handleBlur = () => setIsBlurred(true);

  return (
    <OutsideClickHandler onOutsideClick={handleBlur}>
      <form
        onFocus={handleFocus}
        className={`${styles.wrapper} ${isBlurred && styles.blurred}`}
        onSubmit={onSubmit}
      >
        <button
          className={isBlurred ? styles.hidden : styles.pin}
          value={pinnedValue}
          onChange={onPinnedChange}
        >
          {pinnedValue ? <MdPushPin /> : <MdOutlinePushPin />}
        </button>
        <input
          className={isBlurred && styles.hidden}
          type="textarea"
          value={titleValue}
          onChange={onTitleChange}
          placeholder="Title"
        />
        <input
          type="textarea"
          value={contentValue}
          onChange={onContentChange}
          placeholder="Take a note..."
        />
        <button className={isBlurred && styles.hidden} type="submit">
          save
        </button>
      </form>
    </OutsideClickHandler>
  );
};

NoteCreationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  contentValue: PropTypes.string.isRequired,
  pinnedValue: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onPinnedChange: PropTypes.func.isRequired
};

export default NoteCreationForm;
