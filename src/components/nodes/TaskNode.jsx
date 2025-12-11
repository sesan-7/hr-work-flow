import { BaseNode } from './BaseNode';

export const TaskNode = ({ data, selected }) => {
  return (
    <BaseNode data={data} type="task" selected={selected}>
      <div className="node-title">{data.title || 'Untitled Task'}</div>
      {data.assignee && (
        <div className="node-detail">
          <strong>Assignee:</strong> {data.assignee}
        </div>
      )}
      {data.dueDate && (
        <div className="node-detail">
          <strong>Due:</strong> {data.dueDate}
        </div>
      )}
    </BaseNode>
  );
};
