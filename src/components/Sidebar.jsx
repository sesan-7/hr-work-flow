import { NODE_TYPES, NODE_CONFIGS } from '../constants/nodeTypes';
import './Sidebar.css';

export const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Node Palette</h2>
        <p>Drag nodes onto the canvas</p>
      </div>

      <div className="node-list">
        {Object.values(NODE_TYPES).map((nodeType) => {
          const config = NODE_CONFIGS[nodeType];
          return (
            <div
              key={nodeType}
              className="draggable-node"
              draggable
              onDragStart={(e) => onDragStart(e, nodeType)}
              style={{ borderLeftColor: config.color }}
            >
              <span className="node-icon">{config.icon}</span>
              <div className="node-info">
                <div className="node-name">{config.label}</div>
                <div className="node-desc">{config.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <p className="hint">
          <strong>Tip:</strong> Connect nodes by dragging from one handle to another
        </p>
      </div>
    </aside>
  );
};
