# chatbot-flow-builder

A simple chatbot flow builder built with **React** and **React Flow**.  
Users can create a flow by **dragging Message nodes onto the canvas**, **connecting nodes** using handles, and **editing node text** from a settings panel. The flow can be saved with validation.

## Live Demo
- Deployment Link: **<chatbot-flow-builder-flax-five.vercel.app>**

## Project Overview
This project implements the required features:
- **Text (Message) Node**: Multiple message nodes can be added to the flow.
- **Drag & Drop Nodes Panel**: Add nodes by dragging from the right-side panel to the canvas.
- **Handles & Edges**:
  - **Source handle**: Only **one outgoing edge** allowed per node.
  - **Target handle**: Multiple incoming edges allowed.
- **Settings Panel**: Clicking a node opens a settings panel to edit its message text.
- **Save Validation**: Shows error when there are **more than one node** and **more than one node has no incoming connection** (“empty target handle”).

## Technology Stack
- **React.js**
- **React Flow**
- **JavaScript**
- **Vite** (for development/build)

## Setup Instructions (Run Locally)

### 1) Clone the repository

```bash
git clone https://github.com/jnvgauri5055/chatbot-flow-builder.git
cd chatbot-flow-builder
