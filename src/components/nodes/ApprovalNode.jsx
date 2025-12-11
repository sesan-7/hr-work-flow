import { BaseNode } from './BaseNode';

export const ApprovalNode = ({ data, selected }) => {
  return (
    <BaseNode data={data} type="approval" selected={selected}>
      <div className="node-title">{data.title || 'Approval Required'}</div>
      {data.approverRole && (
        <div className="node-detail">
          <strong>Approver:</strong> {data.approverRole}
        </div>
      )}
      {data.autoApproveThreshold > 0 && (
        <div className="node-detail">
          <strong>Auto-approve:</strong> &lt; {data.autoApproveThreshold}
        </div>
      )}
    </BaseNode>
  );
};
