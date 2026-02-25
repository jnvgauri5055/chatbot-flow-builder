import React from 'react'
import { Handle, Position } from 'reactflow'

export default function TextNode({ data, isConnecting, selected }) {
  return (
    <div
      style={{
        padding: '12px',
        minWidth: '150px',
        backgroundColor: 'white',
        border: selected ? '2px solid #ff9800' : '2px solid #2196f3',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {}
      <Handle
        type="target"
        position={Position.Left}
        isConnecting={isConnecting}
      />

      {/* Node Content */}
      <div style={{ fontSize: '14px', color: '#333', wordBreak: 'break-word' }}>
        {data.text}
      </div>

      {/* Source Handle (right) - only one outgoing edge allowed */}
      <Handle
        type="source"
        position={Position.Right}
        isConnecting={isConnecting}
      />
    </div>
  )
}
