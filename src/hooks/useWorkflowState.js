import { useState, useCallback } from 'react';
import { NODE_TYPES, INITIAL_NODE_DATA } from '../constants/nodeTypes';

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

export const useWorkflowState = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = useCallback((type, position) => {
    const id = getNodeId();
    const newNode = {
      id,
      type,
      position,
      data: { ...INITIAL_NODE_DATA[type] },
    };

    setNodes((nds) => [...nds, newNode]);
    return id;
  }, []);

  const updateNode = useCallback((nodeId, data) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...data },
          };
        }
        return node;
      })
    );
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const deleteEdge = useCallback((edgeId) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  }, []);

  const clearWorkflow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    nodeId = 0;
  }, []);

  const exportWorkflow = useCallback(() => {
    return {
      nodes,
      edges,
    };
  }, [nodes, edges]);

  const importWorkflow = useCallback((workflowData) => {
    if (workflowData.nodes) {
      setNodes(workflowData.nodes);
    }
    if (workflowData.edges) {
      setEdges(workflowData.edges);
    }
    setSelectedNode(null);

    const maxId = workflowData.nodes.reduce((max, node) => {
      const id = parseInt(node.id.split('_')[1]);
      return id > max ? id : max;
    }, 0);
    nodeId = maxId + 1;
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    setNodes,
    setEdges,
    setSelectedNode,
    addNode,
    updateNode,
    deleteNode,
    deleteEdge,
    clearWorkflow,
    exportWorkflow,
    importWorkflow,
  };
};
