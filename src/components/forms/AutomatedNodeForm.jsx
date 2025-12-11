import { useState, useEffect } from 'react';
import { useAutomations } from '../../hooks/useAutomations';
import './FormStyles.css';

export const AutomatedNodeForm = ({ node, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(node.data.title || '');
  const [action, setAction] = useState(node.data.action || '');
  const [parameters, setParameters] = useState(node.data.parameters || {});

  const { automations, loading } = useAutomations();

  const selectedAutomation = automations.find((a) => a.id === action);

  useEffect(() => {
    if (selectedAutomation) {
      const newParams = {};
      selectedAutomation.params.forEach((param) => {
        newParams[param] = parameters[param] || '';
      });
      setParameters(newParams);
    }
  }, [action, selectedAutomation]);

  const handleUpdate = () => {
    onUpdate(node.id, {
      title,
      action,
      parameters,
    });
  };

  const handleParameterChange = (paramName, value) => {
    setParameters({ ...parameters, [paramName]: value });
  };

  return (
    <div className="node-form">
      <h3>Automated Step Configuration</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Enter step title"
        />
      </div>

      <div className="form-group">
        <label>Action</label>
        {loading ? (
          <p className="loading-text">Loading actions...</p>
        ) : (
          <select
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setTimeout(handleUpdate, 0);
            }}
          >
            <option value="">Select an action</option>
            {automations.map((automation) => (
              <option key={automation.id} value={automation.id}>
                {automation.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAutomation && (
        <div className="form-group">
          <label>Action Parameters</label>
          {selectedAutomation.params.map((param) => (
            <div key={param} className="parameter-input">
              <label className="param-label">{param}</label>
              <input
                type="text"
                value={parameters[param] || ''}
                onChange={(e) => handleParameterChange(param, e.target.value)}
                onBlur={handleUpdate}
                placeholder={`Enter ${param}`}
              />
            </div>
          ))}
        </div>
      )}

      <button className="btn-update" onClick={handleUpdate}>
        Update Node
      </button>

      <button className="btn-delete" onClick={() => onDelete(node.id)}>
        Delete Node
      </button>
    </div>
  );
};
