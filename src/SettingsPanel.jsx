import React from 'react'

export default function SettingsPanel({ node, onTextChange }) {
  if (!node) return null

  const handleTextChange = (e) => {
    onTextChange(node.id, e.target.value)
  }

  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      <div className="setting-group">
        <label htmlFor="node-message">Node Message</label>
        <input
          id="node-message"
          type="text"
          value={node.data.text}
          onChange={handleTextChange}
          placeholder="Enter message text"
        />
      </div>
      <div style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>
        Node ID: {node.id}
      </div>
    </div>
  )
}
