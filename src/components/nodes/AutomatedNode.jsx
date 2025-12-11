import { BaseNode } from './BaseNode';

export const AutomatedNode = ({ data, selected }) => {
  return (
    <BaseNode data={data} type="automated" selected={selected}>
      <div className="node-title">{data.title || 'Automated Action'}</div>
      {data.action && (
        <div className="node-detail">
          <strong>Action:</strong> {data.action}
        </div>
      )}
      {data.parameters && Object.keys(data.parameters).length > 0 && (
        <div className="node-detail">
          {Object.keys(data.parameters).length} parameter(s)
        </div>
      )}
    </BaseNode>
  );
};
