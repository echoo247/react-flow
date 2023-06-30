import React, { useEffect } from 'react';
import './App.css';
import { Flow } from './componets/Flow';
import { useAppDispatch } from './firebase-config/store';
import { setInitialEdges, setInitialNodes } from './features/flowSlice';
import { fetchedEdges } from './initial/edges';
import { fetchedNodes } from './initial/nodes';
import { ReactFlowProvider } from 'reactflow';

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setInitialNodes(fetchedNodes))
        dispatch(setInitialEdges(fetchedEdges))
    }, [])

  return (
      <div style={{width: "100vw", height: "100vh"}} className="App">
          <ReactFlowProvider>
              <Flow/>
          </ReactFlowProvider>
      </div>


  );
}

export default App;
