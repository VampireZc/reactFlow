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
  const { id, data, selected } = props;
  
  return (
    <div style={{
      padding: '10px',
      border: `2px solid ${selected ? '#4CAF50' : '#333'}`,
      borderRadius: '8px',
      background: '#fff',
      fontWeight: 'bold'
    }}>
      <div style={{ width: '100%', textAlign: 'center', background: '#ec6868ff', padding: '5px' }}>
        <span style={ { color: '#fff', fontSize: '16px' } }>节点 {(data?.label as string) || 'Node'}</span>
      </div>
      
      {/* 顶部输入端口 */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-handle"
        style={{
          background: '#10f01bff', // 绿色表示输入
          width: 12,
          height: 12,
        }}
      />
      
      {/* 左侧输入端口 */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-handle"
        style={{
          background: '#555', // 灰色表示输入
          width: 12,
          height: 12,
        }}
      />
      
      {/* 右侧输出端口 */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-handle"
        style={{
          background: '#ee2e0cff', // 红色表示输出
          width: 12,
          height: 12,
        }}
      />
      
      {/* 底部输出端口 */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-handle"
        style={{
          background: '#ff9900ff', // 橙色表示输出
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
    type: 'custom'
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: '2' },
    type: 'custom' // ✅ 练习 1：启用自定义节点
  },
  {
    id: '3',
    position: { x: 0, y: 200 },
    data: { label: '3' },
    type: 'custom' // ✅ 练习 1：启用自定义节点
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

// ✅ 保存和加载相关的工具函数
const saveToLocalStorage = (nodes: any, edges: any) => {
  const state = {
    nodes,
    edges
  };
  localStorage.setItem('reactflow-state', JSON.stringify(state));
  alert('✅ 已保存到本地存储！');
  console.log('📦 保存到 localStorage:', state);
};

const loadFromLocalStorage = (): { nodes: any; edges: any } | null => {
  const saved = localStorage.getItem('reactflow-state');
  if (saved) {
    try {
      const state = JSON.parse(saved);
      console.log('📥 从 localStorage 加载:', state);
      return state;
    } catch (error) {
      console.error('❌ 解析失败:', error);
      alert('❌ 加载失败！');
      return null;
    }
  }
  return null;
};

const downloadAsJSON = (nodes: any, edges: any, filename: string = 'flowchart.json') => {
  const data = { nodes, edges };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  console.log('💾 已下载 JSON:', filename);
};

export default function App() {
  // 检查是否有保存的状态
  const savedState = loadFromLocalStorage();
  const initialNodesValue = savedState?.nodes || initialNodes;
  const initialEdgesValue = savedState?.edges || initialEdges;

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesValue);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesValue);

  // ✅ 保存所有数据到 localStorage
  const handleSave = useCallback(() => {
    saveToLocalStorage(nodes, edges);
  }, [nodes, edges]);

  // ✅ 从 localStorage 加载数据
  const handleLoad = useCallback(() => {
    const savedState = loadFromLocalStorage();
    if (savedState) {
      setNodes(savedState.nodes);
      setEdges(savedState.edges);
      alert('✅ 已成功加载！');
    }
  }, [setNodes, setEdges]);

  // ✅ 下载为 JSON 文件
  const handleDownload = useCallback(() => {
    downloadAsJSON(nodes, edges, `flowchart-${Date.now()}.json`);
  }, [nodes, edges]);
  const onConnect = useCallback(
    (params) => {
      console.log('🔗 尝试连接:', params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  // 监听选中状态变化
  const onSelectionChange = useCallback(({ nodes: selectedNodes, edges: selectedEdges }) => {
    console.log('选中的节点:', selectedNodes);
    console.log('选中的边:', selectedEdges);
    console.log('边的信息:', edges);
  }, [edges]);

  // ✅ 练习 2：点击节点时显示详细信息
  const onNodeClick = useCallback((event: React.MouseEvent<HTMLDivElement>, node: any) => {
    console.log('========================================');
    console.log('节点数据:', node);
    console.log('========================================');
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
        onNodeClick={onNodeClick} // ✅ 使用 onNodeClick 来监听节点点击事件
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
      
      {/* 保存和下载按钮组 */}
      <div style={{
        position: 'absolute',
        top: '80px',
        right: '20px',
        display: 'flex',
        gap: '10px',
        zIndex: 1000
      }}>
        <button 
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          💾 保存到本地
        </button>
        
        <button 
          onClick={handleLoad}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📥 加载数据
        </button>
        
        <button 
          onClick={handleDownload}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: '#9C27B0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ⬇️ 下载 JSON
        </button>
      </div>
    </div>
  );
}