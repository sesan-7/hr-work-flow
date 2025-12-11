import { BaseNode } from './BaseNode';

export const EndNode = ({ data, selected }) => {
  return (
    <BaseNode data={data} type="end" selected={selected}>
      <div className="node-title">{data.message || 'End'}</div>
      {data.summaryFlag && (
        <div className="node-detail">
          <span>📊 Generate Summary</span>
        </div>
      )}
    </BaseNode>
  );
};
