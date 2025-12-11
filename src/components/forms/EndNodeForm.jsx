import { useState } from 'react';
import './FormStyles.css';

export const EndNodeForm = ({ node, onUpdate, onDelete }) => {
  const [message, setMessage] = useState(node.data.message || 'Workflow Complete');
  const [summaryFlag, setSummaryFlag] = useState(node.data.summaryFlag || false);

  const handleUpdate = () => {
    onUpdate(node.id, {
      message,
      summaryFlag,
    });
  };

  return (
    <div className="node-form">
      <h3>End Node Configuration</h3>

      <div className="form-group">
        <label>End Message</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Enter completion message"
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={summaryFlag}
            onChange={(e) => {
              setSummaryFlag(e.target.checked);
              setTimeout(handleUpdate, 0);
            }}
          />
          Generate workflow summary
        </label>
        <small className="form-hint">
          When enabled, the system will generate a summary report at workflow completion
        </small>
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
