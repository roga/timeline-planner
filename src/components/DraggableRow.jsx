import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { RowType } from "../utils/constants";

function DraggableRow({ engineer, index, moveEngineer, children }) {
    const ref = useRef(null);
    const [{ isOver }, drop] = useDrop({
        accept: RowType,
        hover(item, monitor) {
            if (!ref.current) return;
            
            const dragIndex = item.index;
            const hoverIndex = index;
            
            // 如果是拖到自己身上，則不做任何處理
            if (dragIndex === hoverIndex) return;
            
            // 獲取拖拽項目的矩形大小
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            
            // 獲取中點位置
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            
            // 獲取鼠標位置
            const clientOffset = monitor.getClientOffset();
            
            // 獲取鼠標相對於矩形頂部的位置
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            
            // 只有當拖動超過目標行的一半高度時才執行移動
            // 向上拖動
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            // 向下拖動
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            
            // 執行排序操作
            moveEngineer(dragIndex, hoverIndex);
            
            // 注意：我們改變了 item 的 index，這樣我們就不需要重新計算 hover 位置
            item.index = hoverIndex;
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });
    
    const [{ isDragging }, drag] = useDrag({
        type: RowType,
        item: () => ({ index }),
        collect: monitor => ({ 
            isDragging: monitor.isDragging() 
        })
    });
    
    // 設置拖拽預覽
    const dragPreview = useRef(null);
    
    // 將 drag 和 drop 連接到元素
    drag(drop(ref));

    return (
        <motion.tr
            ref={ref}
            layout
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // 過渡到半透明
            transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
            }}
            className={`${isOver ? 'bg-blue-50' : ''} cursor-move relative`}
        >
            {children}
            {isDragging && (
                <div className="absolute inset-0 bg-blue-100 opacity-20 pointer-events-none"></div>
            )}
        </motion.tr>
    );
}

export default DraggableRow; 