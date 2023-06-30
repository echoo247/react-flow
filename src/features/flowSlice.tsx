import { createSlice } from '@reduxjs/toolkit';
import ReactFlow, {
    Node,
    Edge,
} from 'reactflow';
import { MySelectField } from '../componets/UI/Select';


type FilterFlows = {
    initialNodes: Node[],
    initialEdges: Edge[],
    nodes: Node[],
    edges: Edge[],
    selectedOptions: string[]
}

const initialState: FilterFlows = {
    initialNodes: [],
    initialEdges: [],
    nodes: [],
    edges: [],
    selectedOptions: [],
}

const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        setInitialNodes: (state, action) => {
            state.initialNodes = action.payload;
            state.nodes = action.payload;

        },
        setInitialEdges: (state, action) => {
            state.initialEdges = action.payload;
            state.edges = action.payload;
        },
        updateNode: (state, action) => {
            const { id, data } = action.payload;
            const node = state.nodes.find((node) => node.id === id);
            if (node) {
                node.data = data;
            }
        },
        updateEdge: (state, action) => {
            const { id, source, target } = action.payload;
            const edge = state.edges.find((edge) => edge.id === id);
            if (edge) {
                edge.source = source;
                edge.target = target;
            }
        },
        createNode: (state, action) => {
            state.selectedOptions.push(action.payload)
            const newNode: Node = {
                id: `${state.nodes.length + 1}`,
                data: {
                    label:
                        <div>
                            <MySelectField/>
                            {state.selectedOptions.join('-')}
                        </div>
                },
                position: { x: 100 + Math.floor(Math.random() * (250 - 500 + 1)) + 250, y: 125 + Math.floor(Math.random() * (250 - 500 + 1)) + 250 },
            }
            const newEdge: Edge = {
                id: `e${state.nodes.length}-${state.nodes.length + 1}`,
                source: `${state.nodes.length}`,
                target: `${state.nodes.length + 1}`,
                label: `${state.selectedOptions.join('-')}`,
                type: 'step'
            }

            state.nodes.push(newNode);
            state.edges.push(newEdge);
        },
    },
});

export const {setInitialNodes, setInitialEdges, updateNode, updateEdge, createNode} = flowSlice.actions;

export default flowSlice.reducer;


