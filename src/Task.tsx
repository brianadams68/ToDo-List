import React, { useState } from "react";

interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  completed,
  onDelete,
  onToggle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span onClick={handleEdit}>{title}</span>
      )}
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Task;
