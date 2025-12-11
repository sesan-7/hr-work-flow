import { StartNodeForm } from './forms/StartNodeForm';
import { TaskNodeForm } from './forms/TaskNodeForm';
import { ApprovalNodeForm } from './forms/ApprovalNodeForm';
import { AutomatedNodeForm } from './forms/AutomatedNodeForm';
import { EndNodeForm } from './forms/EndNodeForm';
import './NodeConfigPanel.css';

export const NodeConfigPanel = ({ selectedNode, onUpdate, onDelete }) => {
  if (!selectedNode) {
    return (
      <div className="config-panel empty">
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
          <h3>No Node Selected</h3>
          <p>Click on a node to configure its properties</p>
        </div>
      </div>
    );
  }

  const renderForm = () => {
    switch (selectedNode.type) {
      case 'start':
        return <StartNodeForm node={selectedNode} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'task':
        return <TaskNodeForm node={selectedNode} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'approval':
        return <ApprovalNodeForm node={selectedNode} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'automated':
        return <AutomatedNodeForm node={selectedNode} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'end':
        return <EndNodeForm node={selectedNode} onUpdate={onUpdate} onDelete={onDelete} />;
      default:
        return <div>Unknown node type</div>;
    }
  };

  return <div className="config-panel">{renderForm()}</div>;
};
