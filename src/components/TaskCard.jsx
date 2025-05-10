import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import { statuses } from "../utils/dataUtils";
import { ItemType } from "../utils/constants";
import { getStatusColor, generateTitleColor } from "../utils/colorUtils";
import TimelineContext from "../contexts/TimelineContext";

const TaskCard = ({ task, engineer, onEdit, onDelete, projectColor, isFirstMonth, isLastMonth }) => {
    const { showOnlyTitles } = useContext(TimelineContext);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div
            ref={drag}
            className={`
                group relative mb-1 rounded-lg border shadow-md
                ${isFirstMonth ? 'border-l-1' : 'border-l-0'}
                ${isLastMonth ? 'border-r-1' : 'border-r-0'}
                ${isFirstMonth ? 'rounded-l-md' : 'rounded-l-sm'}
                ${isLastMonth ? 'rounded-r-md' : 'rounded-r-sm'}
                ${isFirstMonth ? 'pl-1' : 'pl-1'}
                ${isLastMonth ? 'pr-1' : 'pr-1'} 
                ${isFirstMonth ? 'ml-1' : 'ml-1'}
                ${isLastMonth ? 'mr-1' : 'mr-1'}
                bg-white
                hover:bg-gray-50
                transition-all duration-200 ease-in-out
                ${isDragging ? 'opacity-50' : 'opacity-100'}
                ${isFirstMonth ? 'cursor-move' : 'cursor-default'}
                ${showOnlyTitles ? 'h-[40px]' : 'h-[120px]'}
            `}
            style={{
                borderLeftColor: isFirstMonth ? projectColor : 'transparent',
                borderRightColor: isLastMonth ? projectColor : 'transparent',
                borderTopColor: projectColor,
                borderBottomColor: projectColor,
                boxShadow: isFirstMonth ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
            draggable={isFirstMonth}
        >
            <div className="p-1.5 h-full flex flex-col">
                <div className="flex items-start justify-between gap-2 flex-1">
                    <div className="flex-1 min-w-0">
                        <div className={`flex items-center ${showOnlyTitles ? 'mb-0' : 'mb-1'} ${generateTitleColor(task.project)} rounded-md px-2 py-1`}>
                            <span className="text-sm font-bold truncate text-white">
                                {task.project}
                            </span>
                        </div>
                        {!showOnlyTitles && (
                            <>
                                <p className="text-sm text-gray-700 line-clamp-2 px-1">
                                    {task.summary}
                                </p>
                                <hr className="my-1 border-gray-200" />
                            </>
                        )}
                    </div>
                </div>
                {isFirstMonth && !showOnlyTitles && (
                    <div className="mt-auto">
                        <div className="flex items-center justify-end gap-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)} font-medium`}>
                                {task.status}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(task);
                                }}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard; 