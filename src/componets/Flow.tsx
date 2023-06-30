import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    OnEdgesChange,
    OnConnect,
    OnNodesChange,
    Background,
} from 'reactflow';


import 'reactflow/dist/style.css';

import { useAppDispatch, useAppSelector } from '../firebase-config/store';
import { updateEdge, updateNode } from '../features/flowSlice';


export function Flow() {
    const { nodes: initialNodes, edges: initialEdges } = useAppSelector(state => state.flow)
    const dispatch = useAppDispatch()
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    useEffect(() => {
        setNodes(initialNodes)
        setEdges(initialEdges)
    }, [initialNodes, initialEdges]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])


    useEffect(() => {
        if(nodes && edges) {
            dispatch(updateNode(nodes))
            dispatch(updateEdge(edges))

        }
    },[nodes, edges, dispatch])

    return (
        <>
            <ReactFlow
                onConnect={onConnect}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >

                <Background />
            </ReactFlow>

        </>


    )

}

