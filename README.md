*HR Workflow Designer – README*

-> *Architecture*

This project is built with React and React Flow to create a simple drag-and-drop workflow builder.
The structure is split into clear parts:

Canvas (React Flow): Handles node rendering, connections, zooming, and dragging.

Custom Nodes: Separate components for Start, Task, Approval, Automated Step, and End nodes.

Configuration Forms: Each node type has its own form for updating details.

State Management: A custom hook (useWorkflowState) manages nodes, edges, and updates.

Mock API: Simulates backend actions like loading automation steps and validating workflows.

This separation keeps the code clean, easy to scale, and simple to maintain.

-> *How to Run*

Install dependencies:

npm install


Start the development server:

npm run dev


App runs at: http://localhost:5173

Production build:

npm run build

-> *Design Decisions*

Modular structure: Every node and form is isolated, making future changes easy.

React Flow: Chosen because it handles the heavy lifting—dragging, zooming, connection logic.

Mock API instead of backend: Helps simulate real features without needing a server.

Real-time updates: Node data updates instantly when edited.

Clean separation: UI, logic, API, and configuration are kept separate for clarity.

What’s Completed

Drag-and-drop workflow canvas

Five fully functional custom node types

Real-time configuration panel

Add/remove nodes and connections

Workflow validation (start/end rules, cycle check, orphan check)

Mock API for automated actions

Workflow testing/simulation panel

Import and export as JSON

Minimap, zoom controls, and responsive layout


-> *What I Would Add With More Time*

Undo/redo actions

Auto-arrange nodes

Error indicators on problematic nodes

Pre-built workflow templates

Copy/paste and multi-select

Keyboard shortcuts

Branching/conditional nodes

Real backend integration
