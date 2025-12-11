import { useState } from 'react';
import './FormStyles.css';

export const TaskNodeForm = ({ node, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(node.data.title || '');
  const [description, setDescription] = useState(node.data.description || '');
  const [assignee, setAssignee] = useState(node.data.assignee || '');
  const [dueDate, setDueDate] = useState(node.data.dueDate || '');
  const [customFields, setCustomFields] = useState(node.data.customFields || {});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleUpdate = () => {
    onUpdate(node.id, {
      title,
      description,
      assignee,
      dueDate,
      customFields,
    });
  };

  const addCustomField = () => {
    if (newKey.trim()) {
      setCustomFields({ ...customFields, [newKey]: newValue });
      setNewKey('');
      setNewValue('');
    }
  };

  const removeCustomField = (key) => {
    const updated = { ...customFields };
    delete updated[key];
    setCustomFields(updated);
  };

  return (
    <div className="node-form">
      <h3>Task Node Configuration</h3>

      <div className="form-group">
        <label>Title <span className="required">*</span></label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Enter task description"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Assignee</label>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Enter assignee name or email"
        />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          onBlur={handleUpdate}
        />
      </div>

      <div className="form-group">
        <label>Custom Fields</label>
        <div className="metadata-list">
          {Object.entries(customFields).map(([key, value]) => (
            <div key={key} className="metadata-item">
              <span className="metadata-key">{key}:</span>
              <span className="metadata-value">{value}</span>
              <button
                className="btn-small btn-danger"
                onClick={() => removeCustomField(key)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="metadata-input">
          <input
            type="text"
            placeholder="Field name"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Field value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button className="btn-small btn-primary" onClick={addCustomField}>
            Add
          </button>
        </div>
      </div>

      <button className="btn-update" onClick={handleUpdate}>
        Update Node
      </button>

      <button className="btn-delete" onClick={() => onDelete(node.id)}>
        Delete Node
      </button>
    </div>
  );
};
