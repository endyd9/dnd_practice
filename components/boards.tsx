import {Draggable, Droppable} from "react-beautiful-dnd";
import styles from "../styles/Home.module.css";
import {useState} from "react";
import Items from "./items";

interface ItemsProps {
    droppableId: string
    items: object[]
    addColumn: Function
    idx: number
}

const Boards = ({droppableId, items, addColumn, idx}: ItemsProps) => {
    const [text, setText] = useState("")
    const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal")
    const changeDirection = (event) => {
        if(direction === "horizontal"){
            setDirection("vertical")
        }else {
            setDirection("horizontal")
        }
    }

    return (
        <Droppable droppableId={`${droppableId}`} direction={direction}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Draggable draggableId={`board${idx}`} index={idx}>
                        {provided => (
                            <div className={styles.board}
                                 ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    if (text === "") return
                                    console.log(droppableId)
                                    addColumn(droppableId, ({id: `${Math.random()}`, content: text}))
                                    setText("")
                                }}>
                                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                                    <button>+</button>
                                </form>
                                {items?.map((item, index) => (
                                    <Items key={item?.id} item={item} index={index} changeDirection={changeDirection}/>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default Boards