import { useState } from 'react';
import './FormStyles.css';

export const StartNodeForm = ({ node, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(node.data.title || 'Start');
  const [metadata, setMetadata] = useState(node.data.metadata || {});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleUpdate = () => {
    onUpdate(node.id, { title, metadata });
  };

  const addMetadata = () => {
    if (newKey.trim()) {
      setMetadata({ ...metadata, [newKey]: newValue });
      setNewKey('');
      setNewValue('');
    }
  };

  const removeMetadata = (key) => {
    const updated = { ...metadata };
    delete updated[key];
    setMetadata(updated);
  };

  return (
    <div className="node-form">
      <h3>Start Node Configuration</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Start"
        />
      </div>

      <div className="form-group">
        <label>Metadata (Key-Value Pairs)</label>
        <div className="metadata-list">
          {Object.entries(metadata).map(([key, value]) => (
            <div key={key} className="metadata-item">
              <span className="metadata-key">{key}:</span>
              <span className="metadata-value">{value}</span>
              <button
                className="btn-small btn-danger"
                onClick={() => removeMetadata(key)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="metadata-input">
          <input
            type="text"
            placeholder="Key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button className="btn-small btn-primary" onClick={addMetadata}>
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
