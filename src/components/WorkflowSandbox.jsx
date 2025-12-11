import { useState } from 'react';
import { simulateWorkflow } from '../api/mockApi';
import './WorkflowSandbox.css';

export const WorkflowSandbox = ({ nodes, edges, isOpen, onClose }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setResult(null);

    try {
      const simulationResult = await simulateWorkflow({ nodes, edges });
      setResult(simulationResult);
    } catch (error) {
      setResult({
        success: false,
        errors: [error.message],
        executionLog: [],
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const exportWorkflow = () => {
    const workflowData = { nodes, edges };
    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="sandbox-overlay" onClick={onClose}>
      <div className="sandbox-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sandbox-header">
          <h2>Workflow Testing Sandbox</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sandbox-content">
          <div className="sandbox-info">
            <div className="info-item">
              <span className="info-label">Nodes:</span>
              <span className="info-value">{nodes.length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Connections:</span>
              <span className="info-value">{edges.length}</span>
            </div>
          </div>

          <div className="sandbox-actions">
            <button
              className="btn btn-primary"
              onClick={handleSimulate}
              disabled={isSimulating || nodes.length === 0}
            >
              {isSimulating ? 'Simulating...' : 'Simulate Workflow'}
            </button>

            <button
              className="btn btn-secondary"
              onClick={exportWorkflow}
              disabled={nodes.length === 0}
            >
              Export as JSON
            </button>
          </div>

          {result && (
            <div className="simulation-result">
              <h3 className={result.success ? 'success' : 'error'}>
                {result.success ? '✓ Simulation Successful' : '✗ Validation Failed'}
              </h3>

              {result.errors.length > 0 && (
                <div className="error-list">
                  <h4>Errors:</h4>
                  <ul>
                    {result.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.executionLog.length > 0 && (
                <div className="execution-log">
                  <h4>Execution Timeline:</h4>
                  <div className="log-items">
                    {result.executionLog.map((log, index) => (
                      <div key={index} className="log-item">
                        <div className="log-number">{index + 1}</div>
                        <div className="log-details">
                          <div className="log-title">{log.title}</div>
                          <div className="log-type">{log.nodeType}</div>
                          <div className="log-desc">{log.details}</div>
                          <div className="log-time">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="log-status">{log.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {nodes.length === 0 && (
            <div className="empty-workflow">
              <p>No nodes in workflow. Add nodes to the canvas to test.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
