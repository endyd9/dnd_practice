import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import Boards from "../components/boards";

const Home: NextPage = () => {
    const startItems = [...Array(8)].map((_, i) => ({id: `${i}`, content: `item-${i}`}));
    const [droppable, setDroppable] = useState<any[]>([{
        idx: 0,
        id: "board0",
        content: startItems.slice(0, 4)
    }, {idx: 1, id: "board1", content: startItems.slice(4, 8)}])


    const onDragEnd = ({source, destination, draggableId}: DropResult) => {
        if (!destination) return;
        console.log(draggableId)

        let targetItem
        const _droppable = droppable.map(items => {
            if (source.droppableId === items.id) {
                [targetItem] = items.content.splice(source.index, 1)
            }
            return items
        })
        _droppable.map(items => {
            if (destination.droppableId === items.id) {
                const newItems = items.content.map(e => e)
                newItems.splice(destination.index, 0, targetItem);
                items.content = newItems
                return items
            }
        })
        setDroppable(_droppable)
    };

    const onAddColumn = (columnId, newColumn) => {
        setDroppable(() => droppable.map(column => {
            if (column.id === columnId) {
                column.content.push(newColumn)
            }
            return column
        }))
    }

    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);
    if (!enabled) {
        return null;
    }

    return (
        <div className={styles.container}>
            <DragDropContext onDragEnd={onDragEnd}>
                {droppable?.map((e) => (
                    <div key={e.id}>
                        <Boards droppableId={e.id} items={e.content} addColumn={onAddColumn} idx={e.idx}/>
                    </div>
                ))}
            </DragDropContext>
            <button onClick={() => {
                const nextIdx = droppable.length + 1
                console.log(nextIdx)
                setDroppable((prev) => [...prev, {idx: nextIdx, id: `board${nextIdx}`, content: []}])
            }}>
                +
            </button>
        </div>
    );
}

export default Home
