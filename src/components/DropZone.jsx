import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import TimelineContext from "../contexts/TimelineContext";
import { ItemType } from "../utils/constants";

function DropZone({ engineer, month, onDrop, children, onAddTask }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType,
        drop: (item) => onDrop(item, engineer.id, month),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }), [engineer.id, month, onDrop]);
    
    // 獲取月份是否收折的狀態
    const { collapsedMonths } = useContext(TimelineContext);
    const isCollapsed = collapsedMonths[month];

    return (
        <td ref={drop} className={`border border-gray-500 align-top bg-white ${isOver ? 'bg-blue-50' : ''} ${isCollapsed ? 'w-[30px] min-w-[30px] p-0' : 'w-[150px] min-w-[150px] relative'}`}>
            <div className={`${isCollapsed ? '' : 'h-full w-full p-1'}`} style={{margin: 0, height: '100%'}}>
                <div className="pb-8">
                    {children}
                </div>
            </div>
            {!isCollapsed && (
                <div className="absolute bottom-1 right-1">
                    <button
                        onClick={() => onAddTask(engineer.id, month)}
                        className="text-xs text-blue-600 border border-blue-400 rounded px-1 bg-white"
                    >+ 任務</button>
                </div>
            )}
        </td>
    );
}

export default DropZone; 