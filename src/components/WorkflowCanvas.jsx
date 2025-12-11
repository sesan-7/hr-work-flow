import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { StartNode } from './nodes/StartNode';
import { TaskNode } from './nodes/TaskNode';
import { ApprovalNode } from './nodes/ApprovalNode';
import { AutomatedNode } from './nodes/AutomatedNode';
import { EndNode } from './nodes/EndNode';

import './WorkflowCanvas.css';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

export const WorkflowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
  onAddNode,
  selectedNode,
}) => {
  const reactFlowWrapper = useRef(null);
  const [internalNodes, setInternalNodes, onInternalNodesChange] = useNodesState(nodes);
  const [internalEdges, setInternalEdges, onInternalEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (params) => {
      const newEdges = addEdge(params, internalEdges);
      setInternalEdges(newEdges);
      if (onEdgesChange) {
        onEdgesChange(newEdges);
      }
    },
    [internalEdges, setInternalEdges, onEdgesChange]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      onAddNode(type, position);
    },
    [onAddNode]
  );

  const handleNodesChange = useCallback(
    (changes) => {
      onInternalNodesChange(changes);
      if (onNodesChange) {
        onNodesChange(internalNodes);
      }
    },
    [onInternalNodesChange, onNodesChange, internalNodes]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      onInternalEdgesChange(changes);
      if (onEdgesChange) {
        onEdgesChange(internalEdges);
      }
    },
    [onInternalEdgesChange, onEdgesChange, internalEdges]
  );

  return (
    <div className="workflow-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => onNodeClick(node)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background color="#e5e7eb" gap={20} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const colors = {
              start: '#10b981',
              task: '#3b82f6',
              approval: '#f59e0b',
              automated: '#8b5cf6',
              end: '#ef4444',
            };
            return colors[node.type] || '#6b7280';
          }}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};
