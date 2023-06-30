import { Node } from 'reactflow';
import { MySelectField } from '../componets/UI/Select';



export const fetchedNodes : Node[] = [
    {
        id: '1',
        data: { label:
                <div>
                    <MySelectField/>
                </div> },
        position: { x: 50, y: 75 },
        style: {
            width: 160,
            height: 40,
        },
    },

];