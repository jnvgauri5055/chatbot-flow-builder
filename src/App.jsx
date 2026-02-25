import React, { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import TextNode from './TextNode'
import NodesPanel from './NodesPanel'
import SettingsPanel from './SettingsPanel'


const nodeTypes = {
  textNode: TextNode,
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [toast, setToast] = useState(null)

  
  const onNodeClick = (event, node) => {
    setSelectedNodeId(node.id)
  }

  
  const onPaneClick = () => {
    setSelectedNodeId(null)
  }

  
  const onConnect = useCallback((connection) => {
    
    if (connection.source === connection.target) {
      return
    }

    
    const sourceHandleEdges = edges.filter(
      (e) => e.source === connection.source && e.sourceHandle === connection.sourceHandle
    )

    
    if (sourceHandleEdges.length > 0) {
      showToast('Each source can only have one outgoing edge', 'error')
      return
    }

    
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        eds
      )
    )
  }, [edges, setEdges])

  
  
  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

 
  
  const onDrop = useCallback((event) => {
    event.preventDefault()

    const data = event.dataTransfer.getData('application/reactflow')
    if (!data) return

    
    const reactFlowBounds = document.querySelector('.react-flow__viewport').getBoundingClientRect()
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }

    
    const newNodeId = `node-${Date.now()}`
    const newNode = {
      id: newNodeId,
      data: { text: 'test message' },
      position,
      type: 'textNode',
    }

    setNodes((nds) => [...nds, newNode])
  }, [setNodes])

  
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  
  const handleSaveFlow = () => {
     
    if (nodes.length > 1) {
      const nodesWithoutIncoming = nodes.filter((node) => {
        const hasIncoming = edges.some((edge) => edge.target === node.id)
        return !hasIncoming
      })

      if (nodesWithoutIncoming.length > 1) {
        showToast('Cannot save flow', 'error')
        return
      }
    }

    showToast('Flow saved successfully!', 'success')
  }

  
  const updateNodeText = (nodeId, newText) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, text: newText } }
          : node
      )
    )
  }

  return (
    <div className="app-container">
      {/* Top Bar */}
      <div className="top-bar">
        <h1>Chatbot Flow Builder</h1>
        <button onClick={handleSaveFlow}>Save Changes</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Canvas */}
        <div className="canvas-area">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {selectedNodeId ? (
            <SettingsPanel
              node={nodes.find((n) => n.id === selectedNodeId)}
              onTextChange={updateNodeText}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}
