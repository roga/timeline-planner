import React, { useState, useEffect, useMemo, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 導入自定義組件
import TaskCard from "./TaskCard";
import DraggableRow from "./DraggableRow";
import DropZone from "./DropZone";
import TaskEditModal from "./TaskEditModal";
import TimelineContext from "../contexts/TimelineContext";

// 導入工具函數
import { generatePastelColor } from "../utils/colorUtils";
import { months, defaultData, findMaxTaskId } from "../utils/dataUtils";

function Timeline() {
    const fileInputRef = useRef();
    const downloadLinkRef = useRef(null);
    const [collapsedMonths, setCollapsedMonths] = useState({});
    const [data, setData] = useState({ engineers: [], tasks: [] });
    const [editingTask, setEditingTask] = useState(null);
    const [editingFields, setEditingFields] = useState({});
    const [taskIdCounter, setTaskIdCounter] = useState(100);
    const [editingEngineerId, setEditingEngineerId] = useState(null);
    const [editingEngineerName, setEditingEngineerName] = useState("");
    const editNameInputRef = useRef(null);

    // 提供 context value
    const contextValue = useMemo(() => ({
        collapsedMonths,
    }), [collapsedMonths]);

    // 切換月份收折狀態
    const toggleMonthCollapse = (month) => {
        setCollapsedMonths(prev => ({
            ...prev,
            [month]: !prev[month]
        }));
    };

    // 初始化資料
    useEffect(() => {
        const stored = localStorage.getItem("timelineData");
        if (stored) {
            const parsedData = JSON.parse(stored);
            
            // 處理舊格式數據轉換
            if (Array.isArray(parsedData)) {
                const convertedData = {
                    engineers: parsedData.map((eng, idx) => ({ 
                        id: `e${idx+1}`, 
                        name: eng.name 
                    })),
                    tasks: []
                };
                
                parsedData.forEach((eng, idx) => {
                    const engineerId = `e${idx+1}`;
                    eng.tasks.forEach(task => {
                        convertedData.tasks.push({
                            ...task,
                            engineerId
                        });
                    });
                });
                
                setData(convertedData);
            } else {
                setData(parsedData);
            }
            
            // 找出當前最大ID值，確保新任務ID不會重複
            const maxId = findMaxTaskId(parsedData);
            setTaskIdCounter(maxId);
        } else {
            setData(defaultData);
            // 設置初始計數器為默認數據中的最大ID
            setTaskIdCounter(findMaxTaskId(defaultData));
        }
    }, []);

    // 處理點擊其他區域時儲存
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editingEngineerId && 
                editNameInputRef.current && 
                !editNameInputRef.current.contains(event.target)) {
                handleSaveEngineerName();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingEngineerId, editingEngineerName]);

    // 儲存資料到 localStorage
    const saveData = (newData) => {
        setData(newData);
        localStorage.setItem("timelineData", JSON.stringify(newData));
    };

    // 開始編輯人物名稱
    const handleStartEditName = (engineer) => {
        setEditingEngineerId(engineer.id);
        setEditingEngineerName(engineer.name);
        // 使用 setTimeout 確保 DOM 更新後聚焦到輸入框
        setTimeout(() => {
            if (editNameInputRef.current) {
                editNameInputRef.current.focus();
                editNameInputRef.current.select();
            }
        }, 10);
    };

    // 儲存人物名稱
    const handleSaveEngineerName = () => {
        if (!editingEngineerId || !editingEngineerName.trim()) {
            setEditingEngineerId(null);
            return;
        }

        const newEngineers = data.engineers.map(eng => 
            eng.id === editingEngineerId ? { ...eng, name: editingEngineerName.trim() } : eng
        );
        
        saveData({ ...data, engineers: newEngineers });
        setEditingEngineerId(null);
    };

    // 匯出JSON
    const handleExportJSON = () => {
        try {
            // 將數據轉換為JSON字符串
            const dataStr = JSON.stringify(data, null, 2);
            
            // 創建Blob對象
            const blob = new Blob([dataStr], { type: "application/json;charset=utf-8" });
            
            // 創建臨時URL
            const url = URL.createObjectURL(blob);
            
            // 設置下載鏈接
            if (downloadLinkRef.current) {
                downloadLinkRef.current.href = url;
                downloadLinkRef.current.download = `timeline_${new Date().toLocaleDateString().replace(/[:.]/g, "-")}_${new Date().toLocaleTimeString().replace(/[:.]/g, "-")}.json`;
                
                // 觸發點擊事件
                downloadLinkRef.current.click();
                
                // 延遲釋放 URL
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 200);
            } else {
                console.error("下載鏈接元素不存在");
            }
        } catch (error) {
            console.error("匯出JSON失敗:", error);
            alert("匯出JSON失敗，請檢查控制台錯誤");
        }
    };

    // 匯入JSON
    const handleImportJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // 處理舊格式數據導入
                if (Array.isArray(importedData)) {
                    const convertedData = {
                        engineers: importedData.map((eng, idx) => ({ 
                            id: `e${idx+1}`, 
                            name: eng.name 
                        })),
                        tasks: []
                    };
                    
                    importedData.forEach((eng, idx) => {
                        const engineerId = `e${idx+1}`;
                        eng.tasks.forEach(task => {
                            convertedData.tasks.push({
                                ...task,
                                engineerId
                            });
                        });
                    });
                    
                    saveData(convertedData);
                } else {
                    saveData(importedData);
                }
            } catch (err) {
                alert("匯入失敗：JSON 格式錯誤");
            }
        };
        reader.readAsText(file);
    };

    // 處理任務拖放
    const handleDrop = (item, targetEngineerId, targetMonth) => {
        // 先找到實際的任務對象
        const taskToUpdate = data.tasks.find(t => t.id === item.id);
        if (!taskToUpdate) return;
        
        // 如果是同一個人物的同一個月份，則不需要操作
        if (taskToUpdate.engineerId === targetEngineerId && taskToUpdate.month === targetMonth) {
            return;
        }
        
        // 創建更新後的數據：使用不可變的方式來更新任務
        const newTasks = data.tasks.map(t => {
            if (t.id === item.id) {
                return { ...t, engineerId: targetEngineerId, month: targetMonth };
            }
            return t;
        });
        
        saveData({ ...data, tasks: newTasks });
    };
    
    // 儲存任務編輯
    const handleEditSave = () => {
        const newTasks = data.tasks.map(task => 
            task.id === editingTask.id ? { ...task, ...editingFields } : task
        );
        
        saveData({ ...data, tasks: newTasks });
        setEditingTask(null);
        setEditingFields({});
    };

    // 新增任務
    const handleAddTask = (engineerId, month) => {
        // 生成唯一ID：使用當前時間戳 + 隨機數，確保唯一性
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        const newId = timestamp + random;
        
        const newTask = { 
            id: newId, 
            engineerId, 
            project: "新任務", 
            summary: "", 
            status: "ongoing", 
            month 
        };
        
        saveData({ 
            ...data, 
            tasks: [...data.tasks, newTask] 
        });
    };

    // 刪除任務
    const handleDeleteTask = (taskToDelete) => {
        const newTasks = data.tasks.filter(t => t.id !== taskToDelete.id);
        saveData({ ...data, tasks: newTasks });
    };

    // 新增
    const handleAddEngineer = () => {
        const name = prompt("請輸入新的名字");
        if (!name) return;
        
        const exists = data.engineers.some(e => e.name === name);
        if (exists) return alert("該名字已存在");
        
        const newEngineerId = `e${Date.now()}`;
        const newEngineers = [...data.engineers, { id: newEngineerId, name }];
        
        saveData({ ...data, engineers: newEngineers });
    };

    // 刪除
    const handleDeleteEngineer = (engineerId) => {
        const engineer = data.engineers.find(e => e.id === engineerId);
        if (!engineer) return;
        
        if (!window.confirm(`確定要刪除 ${engineer.name} 嗎？`)) return;
        
        // 刪除人物及其相關任務
        const newEngineers = data.engineers.filter(e => e.id !== engineerId);
        const newTasks = data.tasks.filter(t => t.engineerId !== engineerId);
        
        saveData({ 
            engineers: newEngineers, 
            tasks: newTasks 
        });
    };

    // 緩存專案顏色映射
    const projectColorMap = useMemo(() => {
        const map = {};
        data.tasks.forEach(task => {
            if (!map[task.project]) {
                map[task.project] = generatePastelColor(task.project);
            }
        });
        return map;
    }, [data.tasks]);

    // 獲取指定人物的任務
    const getEngineerTasks = (engineerId) => {
        return data.tasks.filter(task => task.engineerId === engineerId);
    };

    return (
        <TimelineContext.Provider value={contextValue}>
            <DndProvider backend={HTML5Backend}>
                <div className="p-4 space-y-4">
                    <div className="flex gap-2">
                        <button onClick={handleAddEngineer} className="px-3 py-1 bg-gray-200 rounded">New Owner</button>
                        <button onClick={handleExportJSON} className="px-3 py-1 bg-gray-200 rounded">Export JSON</button>
                        <button onClick={() => fileInputRef.current.click()} className="px-3 py-1 bg-gray-200 rounded">Import JSON</button>
                    </div>
                    <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportJSON} />
                    <a ref={downloadLinkRef} className="hidden"></a>

                    <div className="overflow-x-auto overflow-y-visible text-left" style={{ maxWidth: '100%' }}>
                        <table className="table-fixed border-collapse w-auto">
                            <thead>
                            <tr>
                                <th className="sticky left-0 z-10 min-w-[150px] w-[150px] bg-gray-400 border border-gray-400 text-center">Owner</th>
                                {months.map(month => {
                                    const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
                                    const isCurrentMonth = currentMonth === month; // 檢查是否為當月
                                    return (
                                        <th
                                            key={month}
                                            className={`bg-gray-400 border border-gray-400 text-center ${collapsedMonths[month] ? 'w-[30px] min-w-[30px] p-0' : 'w-[150px] min-w-[150px]'}`}
                                            style={isCurrentMonth ? { backgroundColor: 'rgba(102, 17, 117, 0.23)' } : {}} // 當月背景色
                                        >
                                            <div className="flex justify-center items-center">
                                                {!collapsedMonths[month] && <span>{month}</span>}
                                                <button 
                                                    onClick={() => toggleMonthCollapse(month)}
                                                    className={`${collapsedMonths[month] ? 'text-xs w-full py-1' : 'ml-1 text-xs'} text-gray-600 hover:text-black px-1 rounded hover:bg-gray-300`}
                                                    title={collapsedMonths[month] ? "expand" : "collapse"}
                                                >
                                                    {collapsedMonths[month] ? '→' : '←'}
                                                </button>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {data.engineers.map((engineer, index) => (
                                <DraggableRow
                                    key={engineer.id}
                                    engineer={engineer}
                                    index={index}
                                    moveEngineer={(from, to) => {
                                        const updated = [...data.engineers];
                                        const [moved] = updated.splice(from, 1);
                                        updated.splice(to, 0, moved);
                                        saveData({ ...data, engineers: updated });
                                    }}
                                >
                                    <td className="sticky left-0 z-10 min-w-[150px] w-[150px] border border-gray-400 bg-gray-100 align-top font-bold text-center relative">
                                        <div className="flex flex-col items-start gap-1 px-2 py-1 pb-8">
                                            <div className="flex items-center w-full">
                                                <span className="mr-2 text-gray-500 cursor-move">⋮⋮</span>
                                                {editingEngineerId === engineer.id ? (
                                                    <input
                                                        ref={editNameInputRef}
                                                        type="text"
                                                        value={editingEngineerName}
                                                        onChange={(e) => setEditingEngineerName(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleSaveEngineerName();
                                                            } else if (e.key === 'Escape') {
                                                                setEditingEngineerId(null);
                                                            }
                                                        }}
                                                        className="border px-1 py-0.5 rounded w-full"
                                                    />
                                                ) : (
                                                    <span 
                                                        className="w-full text-left"
                                                        onDoubleClick={() => handleStartEditName(engineer)}
                                                    >
                                                        {engineer.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="absolute bottom-1 right-1">
                                            <button
                                                onClick={() => handleDeleteEngineer(engineer.id)}
                                                className="text-xs text-red-500 border border-red-500 rounded px-1 bg-white"
                                            >Delete</button>
                                        </div>
                                    </td>
                                    {months.map(month => (
                                        <DropZone
                                            key={month}
                                            engineer={engineer}
                                            month={month}
                                            onDrop={handleDrop}
                                            onAddTask={handleAddTask}
                                        >
                                            {!collapsedMonths[month] && getEngineerTasks(engineer.id)
                                                .filter(task => task.month === month)
                                                .map(task => (
                                                    <TaskCard
                                                        key={task.id}
                                                        task={task}
                                                        engineer={engineer}
                                                        onEdit={setEditingTask}
                                                        onDelete={handleDeleteTask}
                                                        projectColor={projectColorMap[task.project]}
                                                    />
                                                ))}
                                        </DropZone>
                                    ))}
                                </DraggableRow>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {editingTask && (
                        <TaskEditModal
                            task={editingTask}
                            editingFields={editingFields}
                            setEditingFields={setEditingFields}
                            onSave={handleEditSave}
                            onCancel={() => setEditingTask(null)}
                        />
                    )}
                </div>
            </DndProvider>
        </TimelineContext.Provider>
    );
}

export default Timeline; 