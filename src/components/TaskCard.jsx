import React from "react";
import { useDrag } from "react-dnd";
import { statuses } from "../utils/dataUtils";
import { ItemType } from "../utils/constants";

function TaskCard({ task, engineer, onEdit, onDelete, projectColor }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { id: task.id, engineerId: engineer.id },
        collect: monitor => ({ isDragging: monitor.isDragging() })
    }), [task.id, engineer.id]);

    return (
        <div
            ref={drag}
            className={`rounded p-1 mb-1 cursor-move bg-white shadow border border-gray-300 ${isDragging ? "opacity-50" : ""}`}
            style={{ width: '100%' }}
        >
            <div className="font-bold text-sm px-1 py-0.5 rounded" style={{ backgroundColor: projectColor }}>{task.project}</div>
            <div className="text-sm mt-1 line-clamp-2">{task.summary}</div>
            <div className="flex justify-between items-center text-xs mt-1">
                <span>{statuses[task.status]}</span>
                <div className="flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="text-blue-500 text-xs">✏️</button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(task); }} className="text-red-500 text-xs">❌</button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard; 