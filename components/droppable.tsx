import {Draggable, Droppable} from "react-beautiful-dnd";
import styles from "../styles/Home.module.css";

interface DroppableProps {
    droppableId: string
    items: object[]
}

const DroppableComponent = ({droppableId, items}:DroppableProps) => {
    return (
            <Droppable droppableId={`${droppableId}`}>
                {(provided) => (
                    <div className={styles.droppable} ref={provided.innerRef} {...provided.droppableProps}>
                        {items?.map((item, index) => (
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
    )
}

export default DroppableComponent