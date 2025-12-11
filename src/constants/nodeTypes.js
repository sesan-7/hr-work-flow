export const NODE_TYPES = {
  START: 'start',
  TASK: 'task',
  APPROVAL: 'approval',
  AUTOMATED: 'automated',
  END: 'end',
};

export const NODE_CONFIGS = {
  [NODE_TYPES.START]: {
    label: 'Start Node',
    color: '#10b981',
    icon: '▶',
    description: 'Workflow entry point',
  },
  [NODE_TYPES.TASK]: {
    label: 'Task Node',
    color: '#3b82f6',
    icon: '📋',
    description: 'Human task (e.g., collect documents)',
  },
  [NODE_TYPES.APPROVAL]: {
    label: 'Approval Node',
    color: '#f59e0b',
    icon: '✓',
    description: 'Manager or HR approval step',
  },
  [NODE_TYPES.AUTOMATED]: {
    label: 'Automated Step',
    color: '#8b5cf6',
    icon: '⚡',
    description: 'System-triggered actions',
  },
  [NODE_TYPES.END]: {
    label: 'End Node',
    color: '#ef4444',
    icon: '◼',
    description: 'Workflow completion',
  },
};

export const INITIAL_NODE_DATA = {
  [NODE_TYPES.START]: {
    title: 'Start',
    metadata: {},
  },
  [NODE_TYPES.TASK]: {
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    customFields: {},
  },
  [NODE_TYPES.APPROVAL]: {
    title: '',
    approverRole: '',
    autoApproveThreshold: 0,
  },
  [NODE_TYPES.AUTOMATED]: {
    title: '',
    action: '',
    parameters: {},
  },
  [NODE_TYPES.END]: {
    message: 'Workflow Complete',
    summaryFlag: false,
  },
};
