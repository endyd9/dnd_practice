import {Draggable, Droppable} from "react-beautiful-dnd";
import styles from "../styles/Home.module.css";
import {useState} from "react";

interface DroppableProps {
    droppableId: string
    items: object[]
    addColumn: Function
}

const DroppableComponent = ({droppableId, items, addColumn}:DroppableProps) => {
    const [text, setText] = useState("")
    return (
            <Droppable droppableId={`${droppableId}`}>
                {(provided) => (
                    <div className={styles.droppable} ref={provided.innerRef} {...provided.droppableProps}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            addColumn(droppableId, ({id:`${Math.random()}`, content:text}))
                            setText("")
                        }}>
                            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                            <button>+</button>
                        </form>
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