import { BaseNode } from './BaseNode';

export const StartNode = ({ data, selected }) => {
  return (
    <BaseNode data={data} type="start" selected={selected}>
      <div className="node-title">{data.title || 'Start'}</div>
      {Object.keys(data.metadata || {}).length > 0 && (
        <div className="node-metadata">
          {Object.keys(data.metadata).length} metadata field(s)
        </div>
      )}
    </BaseNode>
  );
};
