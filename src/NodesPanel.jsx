import React from 'react'

export default function NodesPanel() {
  
  const onDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('application/reactflow', 'textNode')
  }

  return (
    <div className="nodes-panel">
      <h2>Nodes</h2>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
        Drag a node type onto the canvas
      </p>
      <div
        className="node-item"
        draggable
        onDragStart={onDragStart}
      >
        + Message
      </div>
    </div>
  )
}
