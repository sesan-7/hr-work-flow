import { Handle, Position } from 'reactflow';
import { NODE_CONFIGS } from '../../constants/nodeTypes';
import './NodeStyles.css';

export const BaseNode = ({ data, type, children, selected }) => {
  const config = NODE_CONFIGS[type];

  return (
    <div className={`custom-node ${selected ? 'selected' : ''}`} style={{ borderColor: config.color }}>
      {type !== 'start' && (
        <Handle type="target" position={Position.Top} className="node-handle" />
      )}

      <div className="node-header" style={{ backgroundColor: config.color }}>
        <span className="node-icon">{config.icon}</span>
        <span className="node-label">{config.label}</span>
      </div>

      <div className="node-content">
        {children}
      </div>

      {type !== 'end' && (
        <Handle type="source" position={Position.Bottom} className="node-handle" />
      )}
    </div>
  );
};
