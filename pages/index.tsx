import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const Home: NextPage = () => {
    const startItems = [...Array(8)].map((_, i) => ({ id: `${i}${i}${i}`, content: `item-${i}` }));
    const [items, setItems] = useState<any[]>(startItems.slice(0,4))
    const [items2, setItems2] = useState<any[]>(startItems.slice(4,8))

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;

        let newItems
        let targetItem

        if(source.droppableId === "droppable"){
            [targetItem] = items.splice(source.index, 1)
        }else {
            [targetItem] = items2.splice(source.index, 1)
        }

        if(destination.droppableId === "droppable"){
            newItems = items.map(e => e)
            newItems.splice(destination.index, 0, targetItem);
            setItems(newItems);
        }else{
            newItems = items2.map(e => e)
            newItems.splice(destination.index, 0, targetItem);
            setItems2(newItems);
        }


    };

    // newItems = items.map(e => e)
    // const [targetItem] = newItems.splice(source.index, 1);
    // newItems.splice(destination.index, 0, targetItem);

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
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div className={styles.droppable} ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId="droppable2">
                {(provided) => (
                    <div className={styles.droppable} ref={provided.innerRef} {...provided.droppableProps}>
                        {items2.map((item, index) => (
                            <Draggable key={item.id+"2"} draggableId={item.id+"2"} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        </div>
    );
}

export default Home
