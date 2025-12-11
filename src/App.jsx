import { useCallback, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { useWorkflowState } from './hooks/useWorkflowState';
import { Sidebar } from './components/Sidebar';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { NodeConfigPanel } from './components/NodeConfigPanel';
import { WorkflowSandbox } from './components/WorkflowSandbox';
import './App.css';

function App() {
  const {
    nodes,
    edges,
    selectedNode,
    setNodes,
    setEdges,
    setSelectedNode,
    addNode,
    updateNode,
    deleteNode,
    clearWorkflow,
    exportWorkflow,
    importWorkflow,
  } = useWorkflowState();

  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  const handleAddNode = useCallback(
    (type, position) => {
      const id = addNode(type, position);
      return id;
    },
    [addNode]
  );

  const handleNodeClick = useCallback(
    (node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const handleNodesChange = useCallback(
    (updatedNodes) => {
      setNodes(updatedNodes);
    },
    [setNodes]
  );

  const handleEdgesChange = useCallback(
    (updatedEdges) => {
      setEdges(updatedEdges);
    },
    [setEdges]
  );

  const handleClearWorkflow = () => {
    if (window.confirm('Are you sure you want to clear the entire workflow?')) {
      clearWorkflow();
    }
  };

  const handleImportWorkflow = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const workflow = JSON.parse(event.target.result);
            importWorkflow(workflow);
          } catch (error) {
            alert('Invalid workflow file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>HR Workflow Designer</h1>
          <p className="subtitle">Create and test HR workflows visually</p>
        </div>
        <div className="header-actions">
          <button className="header-btn" onClick={() => setIsSandboxOpen(true)}>
            🧪 Test Workflow
          </button>
          <button className="header-btn" onClick={handleImportWorkflow}>
            📥 Import
          </button>
          <button className="header-btn" onClick={handleClearWorkflow}>
            🗑️ Clear
          </button>
        </div>
      </header>

      <div className="app-content">
        <Sidebar />
        <ReactFlowProvider>
          <WorkflowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onNodeClick={handleNodeClick}
            onAddNode={handleAddNode}
            selectedNode={selectedNode}
          />
        </ReactFlowProvider>
        <NodeConfigPanel
          selectedNode={selectedNode}
          onUpdate={updateNode}
          onDelete={deleteNode}
        />
      </div>

      <WorkflowSandbox
        nodes={nodes}
        edges={edges}
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </div>
  );
}

export default App;
