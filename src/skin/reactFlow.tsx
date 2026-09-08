import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Handle,
  Position
} from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

// ✅ 自定义节点组件：在底部添加一个输出端口
const CustomNode = (props: NodeProps) => {
  const { data } = props;

  return (
    <div style={{
      padding: '10px',
      border: '2px solid #333',
      borderRadius: '8px',
      background: '#fff',
      fontWeight: 'bold'
    }}>
      <span>{(data?.label as string) || 'Node'}</span>
      {/* 底部输出端口 */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-handle"
        style={{
          background: '#ee2e0cff',
          width: 12,
          height: 12,
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-handle"
        style={{
          background: '#555',
          width: 12,
          height: 12,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-handle"
        style={{
          background: '#555',
          width: 12,
          height: 12,
        }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-handle"
        style={{
          background: '#10f01bff',
          width: 12,
          height: 12,
        }}
      />
    </div>
  );
};

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: '1' },
    type: 'custom' // ✅ 使用自定义节点类型
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: '2' },
    type: 'custom'
  },
  {
    id: '3',
    position: { x: 0, y: 200 },
    data: { label: '3' },
    type: 'custom' // ✅ 使用自定义节点类型
  }
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
];

// ✅ 定义节点类型映射
const nodeTypes = {
  custom: CustomNode
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 处理连接
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // 监听选中状态变化
  const onSelectionChange = useCallback(({ nodes: selectedNodes, edges: selectedEdges }) => {
    console.log('选中的节点:', selectedNodes);
    console.log('选中的边:', selectedEdges);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes} // ✅ 使用自定义节点类型
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} color='#d81010cc' />
      </ReactFlow>
      {/* 按钮放在 ReactFlow 外面 */}
      <button 
        onClick={() => {
          console.log('添加节点按钮被点击了');
          setNodes((nodes) => 
            nodes.concat({
              id: Date.now().toString(), // 使用当前时间戳作为唯一 ID
              position: { x: 400, y: 400 },
              data: { label: `Node ${Date.now() % 1000}` },
              type: 'custom'
            })
          );
        }}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        添加节点
      </button>
    </div>
  );
}