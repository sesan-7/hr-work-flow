# HR Workflow Designer

A React-based visual workflow designer for creating and testing HR workflows. Built with React Flow, this application allows HR admins to design complex workflows involving tasks, approvals, and automated steps.

## Features

- **Visual Workflow Canvas**: Drag-and-drop interface powered by React Flow
- **Custom Node Types**:
  - Start Node - Workflow entry point
  - Task Node - Human tasks (document collection, forms, etc.)
  - Approval Node - Manager or HR approval steps
  - Automated Step Node - System-triggered actions
  - End Node - Workflow completion
- **Dynamic Configuration Forms**: Each node type has a custom form with validation
- **Mock API Integration**: Simulates backend with automated action definitions
- **Workflow Testing/Sandbox**: Validate and simulate workflow execution
- **Import/Export**: Save and load workflows as JSON
- **Real-time Validation**: Detects cycles, missing connections, and structural issues

## Architecture

### Project Structure

```
src/
├── api/
│   └── mockApi.js           # Mock API for automations and workflow simulation
├── components/
│   ├── forms/               # Node configuration forms
│   │   ├── StartNodeForm.jsx
│   │   ├── TaskNodeForm.jsx
│   │   ├── ApprovalNodeForm.jsx
│   │   ├── AutomatedNodeForm.jsx
│   │   ├── EndNodeForm.jsx
│   │   └── FormStyles.css
│   ├── nodes/               # Custom React Flow node components
│   │   ├── BaseNode.jsx
│   │   ├── StartNode.jsx
│   │   ├── TaskNode.jsx
│   │   ├── ApprovalNode.jsx
│   │   ├── AutomatedNode.jsx
│   │   ├── EndNode.jsx
│   │   └── NodeStyles.css
│   ├── NodeConfigPanel.jsx  # Right panel for node configuration
│   ├── Sidebar.jsx          # Left sidebar with draggable nodes
│   ├── WorkflowCanvas.jsx   # Main React Flow canvas
│   └── WorkflowSandbox.jsx  # Testing/simulation modal
├── constants/
│   └── nodeTypes.js         # Node type definitions and configs
├── hooks/
│   ├── useWorkflowState.js  # Workflow state management
│   └── useAutomations.js    # Fetch and manage automations
├── App.jsx                  # Main application component
└── main.jsx                 # Application entry point
```

### Key Design Decisions

#### 1. **Modular Component Architecture**
Each node type is a separate component with its own configuration form. This makes it easy to add new node types without modifying existing code.

#### 2. **Custom Hook for State Management**
`useWorkflowState` centralizes all workflow state logic (nodes, edges, CRUD operations) making the main App component cleaner and easier to test.

#### 3. **Separation of Concerns**
- **API Layer**: Isolated in `src/api/` for easy replacement with real backend
- **Components**: Pure presentational components
- **Hooks**: Business logic and state management
- **Constants**: Centralized configuration

#### 4. **Form Abstraction**
Each node type has its own form component with controlled inputs. Forms update node data in real-time using the `onUpdate` callback.

#### 5. **Mock API with Realistic Behavior**
The mock API includes:
- Async operations to simulate network latency
- Workflow validation (cycles, missing connections, etc.)
- Execution simulation with timeline generation
- Error handling

#### 6. **Type-Safe Node Configuration**
Node types and initial data are defined in constants, ensuring consistency across the application.

## Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

### Creating a Workflow

1. **Drag nodes from the sidebar** onto the canvas
2. **Connect nodes** by dragging from one node's handle to another
3. **Configure nodes** by clicking on them to open the configuration panel
4. **Test the workflow** using the "Test Workflow" button in the header

### Node Configuration

#### Start Node
- Title: Name of the workflow start
- Metadata: Optional key-value pairs for workflow context

#### Task Node
- Title: Task name (required)
- Description: Task details
- Assignee: Person responsible
- Due Date: Deadline for completion
- Custom Fields: Additional key-value data

#### Approval Node
- Title: Approval step name
- Approver Role: Who should approve (Manager, HRBP, Director, etc.)
- Auto-Approve Threshold: Amount below which approval is automatic

#### Automated Step Node
- Title: Step name
- Action: Select from available automated actions (loaded from mock API)
- Parameters: Dynamic fields based on selected action

#### End Node
- End Message: Completion message
- Summary Flag: Whether to generate a workflow summary

### Workflow Validation

The sandbox validates:
- Exactly one Start Node exists
- At least one End Node exists
- No orphaned nodes (all nodes connected)
- No cycles in the workflow
- Start Node has no incoming connections
- End Node has no outgoing connections

### Import/Export

**Export**: Click "Test Workflow" then "Export as JSON" to download the workflow definition

**Import**: Click "Import" in the header to load a previously exported workflow

## Technical Implementation

### React Flow Integration

The application uses React Flow for the visual canvas with:
- Custom node types
- Minimap for navigation
- Controls for zoom/pan
- Background grid
- Snap-to-grid functionality

### State Management

State is managed using React hooks:
- `useState` for local component state
- `useCallback` for memoized callbacks
- Custom `useWorkflowState` hook for global workflow state

### Form Handling

All forms use controlled components with:
- Real-time updates (onBlur)
- Dynamic field rendering (for automated step parameters)
- Validation feedback

### Mock API

The mock API simulates:
- `GET /automations` - Returns available automated actions
- `POST /simulate` - Validates and simulates workflow execution

Validation includes:
- Structural validation (start/end nodes, connections)
- Cycle detection using DFS
- Execution path generation using BFS

## Completed Features

-  React Flow canvas with drag-and-drop
-  5 custom node types with unique styling
-  Dynamic configuration forms for each node type
-  Real-time node updates
-  Connection management
-  Mock API layer with automations
-  Workflow validation (cycles, missing connections)
-  Workflow simulation with execution timeline
-  Import/Export functionality
-  Minimap and controls
-  Delete nodes and edges
-  Clear workflow
-  Responsive layout

## Future Enhancements

Given more time, the following features would add significant value:

### Immediate Priority
- **Undo/Redo**: History management for workflow changes
- **Node Templates**: Pre-configured node patterns for common workflows
- **Validation Error Indicators**: Visual markers on invalid nodes
- **Auto-Layout**: Automatic node positioning for better organization

### Medium Priority
- **Multi-select**: Select and manipulate multiple nodes
- **Copy/Paste**: Duplicate nodes and subgraphs
- **Search/Filter**: Find nodes by name or type
- **Keyboard Shortcuts**: Power-user efficiency improvements
- **Zoom to Fit**: Auto-frame workflow in viewport

### Long-term
- **Version History**: Track workflow changes over time
- **Collaboration**: Multi-user editing with conflict resolution
- **Conditional Branching**: Support for decision nodes
- **Variable System**: Pass data between nodes
- **Backend Integration**: Connect to real API and database
- **Authentication**: User management and permissions
- **Workflow Templates Library**: Shareable workflow templates

## Design Choices & Tradeoffs

### What Worked Well
- **Component modularity**: Easy to extend with new node types
- **React Flow**: Handles complex canvas interactions out of the box
- **Form abstraction**: Each node type is self-contained
- **Mock API design**: Realistic enough to test integration patterns

### Tradeoffs Made
- **No TypeScript**: Used JavaScript for faster initial development (would add TypeScript in production)
- **In-memory state**: No persistence layer (would add database integration for production)
- **Simple validation**: Basic structural checks only (would expand for production)
- **Limited error handling**: Focused on happy path (would add comprehensive error boundaries)

### Time Allocation (~5 hours)
- Architecture & setup: 30 minutes
- Custom nodes & forms: 2 hours
- React Flow integration: 1 hour
- Mock API & validation: 1 hour
- Sandbox/testing panel: 45 minutes
- Styling & polish: 45 minutes

## Testing

While automated tests were not included in this prototype, a production version would include:

- **Unit Tests**: Component logic, hooks, validation functions
- **Integration Tests**: Workflow creation, node configuration, simulation
- **E2E Tests**: Complete user workflows from creation to testing
- **Accessibility Tests**: Keyboard navigation, screen reader support

## Browser Support

Tested on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

## License

MIT

## Contact

For questions or feedback about this implementation, please refer to the project repository.
