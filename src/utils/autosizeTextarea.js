const autosizeTextarea = (e) => {
  const textarea = e.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

export default autosizeTextarea;
