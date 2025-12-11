import { useState } from 'react';
import './FormStyles.css';

const APPROVER_ROLES = [
  'Manager',
  'HRBP',
  'Director',
  'VP',
  'C-Level',
  'Team Lead',
  'Department Head',
];

export const ApprovalNodeForm = ({ node, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(node.data.title || '');
  const [approverRole, setApproverRole] = useState(node.data.approverRole || '');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(
    node.data.autoApproveThreshold || 0
  );

  const handleUpdate = () => {
    onUpdate(node.id, {
      title,
      approverRole,
      autoApproveThreshold: Number(autoApproveThreshold),
    });
  };

  return (
    <div className="node-form">
      <h3>Approval Node Configuration</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Enter approval title"
        />
      </div>

      <div className="form-group">
        <label>Approver Role</label>
        <select
          value={approverRole}
          onChange={(e) => {
            setApproverRole(e.target.value);
            setTimeout(handleUpdate, 0);
          }}
        >
          <option value="">Select approver role</option>
          {APPROVER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={approverRole}
          onChange={(e) => setApproverRole(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Or enter custom role"
          style={{ marginTop: '8px' }}
        />
      </div>

      <div className="form-group">
        <label>Auto-Approve Threshold</label>
        <input
          type="number"
          value={autoApproveThreshold}
          onChange={(e) => setAutoApproveThreshold(e.target.value)}
          onBlur={handleUpdate}
          placeholder="0"
          min="0"
        />
        <small className="form-hint">
          Auto-approve requests below this amount (0 = always require approval)
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
