import {Draggable} from "react-beautiful-dnd";

interface ItemsPorps {
    item: any
    index:number
    changeDirection:Function
}

const Items = ({item, index, changeDirection}:ItemsPorps) => {
    return (
        <Draggable draggableId={item?.id} index={index}>
            {(provided) => (
                <div
                    onClick={event =>  changeDirection(event)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {item.content}
                </div>
            )}
        </Draggable>
    )
}


export default Items