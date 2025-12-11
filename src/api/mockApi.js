export const mockAutomations = [
  {
    id: 'send_email',
    label: 'Send Email',
    params: ['to', 'subject', 'body'],
  },
  {
    id: 'generate_doc',
    label: 'Generate Document',
    params: ['template', 'recipient'],
  },
  {
    id: 'create_ticket',
    label: 'Create Ticket',
    params: ['priority', 'assignee', 'description'],
  },
  {
    id: 'send_notification',
    label: 'Send Notification',
    params: ['channel', 'message'],
  },
  {
    id: 'update_database',
    label: 'Update Database',
    params: ['table', 'field', 'value'],
  },
];

export const getAutomations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomations);
    }, 300);
  });
};

export const simulateWorkflow = (workflowData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { nodes, edges } = workflowData;

      const validationErrors = validateWorkflow(nodes, edges);

      if (validationErrors.length > 0) {
        resolve({
          success: false,
          errors: validationErrors,
          executionLog: [],
        });
        return;
      }

      const executionLog = generateExecutionLog(nodes, edges);

      resolve({
        success: true,
        errors: [],
        executionLog,
      });
    }, 500);
  });
};

const validateWorkflow = (nodes, edges) => {
  const errors = [];

  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Workflow must have a Start Node');
  }
  if (startNodes.length > 1) {
    errors.push('Workflow must have only one Start Node');
  }

  const endNodes = nodes.filter((n) => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push('Workflow must have an End Node');
  }

  nodes.forEach((node) => {
    const outgoingEdges = edges.filter((e) => e.source === node.id);
    const incomingEdges = edges.filter((e) => e.target === node.id);

    if (node.type === 'start' && incomingEdges.length > 0) {
      errors.push(`Start Node "${node.data.title}" cannot have incoming connections`);
    }

    if (node.type === 'end' && outgoingEdges.length > 0) {
      errors.push(`End Node "${node.data.message}" cannot have outgoing connections`);
    }

    if (node.type !== 'start' && node.type !== 'end') {
      if (incomingEdges.length === 0) {
        errors.push(`Node "${node.data.title}" is not connected to the workflow`);
      }
      if (outgoingEdges.length === 0) {
        errors.push(`Node "${node.data.title}" has no outgoing connection`);
      }
    }
  });

  const hasCycle = detectCycle(nodes, edges);
  if (hasCycle) {
    errors.push('Workflow contains a cycle (circular dependency)');
  }

  return errors;
};

const detectCycle = (nodes, edges) => {
  const adjacency = {};
  nodes.forEach((node) => {
    adjacency[node.id] = [];
  });

  edges.forEach((edge) => {
    if (adjacency[edge.source]) {
      adjacency[edge.source].push(edge.target);
    }
  });

  const visited = new Set();
  const recStack = new Set();

  const hasCycleDFS = (nodeId) => {
    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = adjacency[nodeId] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycleDFS(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  for (const nodeId of Object.keys(adjacency)) {
    if (!visited.has(nodeId)) {
      if (hasCycleDFS(nodeId)) return true;
    }
  }

  return false;
};

const generateExecutionLog = (nodes, edges) => {
  const log = [];

  const startNode = nodes.find((n) => n.type === 'start');
  if (!startNode) return log;

  const visited = new Set();
  const queue = [startNode.id];

  while (queue.length > 0) {
    const currentNodeId = queue.shift();

    if (visited.has(currentNodeId)) continue;
    visited.add(currentNodeId);

    const node = nodes.find((n) => n.id === currentNodeId);
    if (!node) continue;

    log.push({
      nodeId: node.id,
      nodeType: node.type,
      title: node.data.title || node.data.message || 'Start',
      timestamp: new Date().toISOString(),
      status: 'completed',
      details: getNodeExecutionDetails(node),
    });

    const outgoingEdges = edges.filter((e) => e.source === currentNodeId);
    outgoingEdges.forEach((edge) => {
      if (!visited.has(edge.target)) {
        queue.push(edge.target);
      }
    });
  }

  return log;
};

const getNodeExecutionDetails = (node) => {
  switch (node.type) {
    case 'start':
      return 'Workflow initiated';
    case 'task':
      return `Task assigned to ${node.data.assignee || 'unassigned'}`;
    case 'approval':
      return `Approval requested from ${node.data.approverRole || 'unknown role'}`;
    case 'automated':
      return `Executed action: ${node.data.action || 'no action selected'}`;
    case 'end':
      return node.data.message || 'Workflow completed';
    default:
      return 'Step executed';
  }
};
