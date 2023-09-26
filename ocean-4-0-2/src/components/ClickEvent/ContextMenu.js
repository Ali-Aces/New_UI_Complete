import React from 'react';

function ContextMenu({ x, y, onClose, onCopy, onPaste, onDuplicate, onRename }) {
  const style = {
    position: 'fixed',
    top: y,
    left: x,
  };

  return (
    <div className="context-menu" style={style}>
      <div onClick={onCopy}>Copy</div>
      <div onClick={onPaste}>Paste</div>
      <div onClick={onDuplicate}>Duplicate</div>
      <div onClick={onRename}>Rename</div>
    </div>
  );
}

export default ContextMenu;
