// 常量定義
export const months = [
    "2025-01", "2025-02", "2025-03", "2025-04",
    "2025-05", "2025-06", "2025-07", "2025-08",
    "2025-09", "2025-10", "2025-11", "2025-12"
];

export const statuses = { done: "🟢", ongoing: "🟡", delayed: "🔴" };
export const statusOptions = Object.keys(statuses);

// 預設資料
export const defaultData = {
    engineers: [
        { id: "e1", name: "roga" },
        { id: "e2", name: "test" }
    ],
    tasks: [
        { id: 1, engineerId: "e1", project: "API", summary: "設計 POST API", status: "ongoing", month: "2025-01" },
        { id: 2, engineerId: "e1", project: "Web", summary: "頁面排版", status: "done", month: "2025-02" },
        { id: 3, engineerId: "e2", project: "DB", summary: "建表與索引", status: "delayed", month: "2025-01" }
    ]
};

// 找出任務資料中的最大ID
export const findMaxTaskId = (data) => {
    let maxId = 0;
    
    // 處理舊格式的數據
    if (Array.isArray(data)) {
        data.forEach(eng => {
            eng.tasks.forEach(task => {
                if (typeof task.id === 'number' && task.id > maxId) {
                    maxId = task.id;
                }
            });
        });
    } 
    // 處理新格式的數據
    else if (data && data.tasks) {
        data.tasks.forEach(task => {
            if (typeof task.id === 'number' && task.id > maxId) {
                maxId = task.id;
            }
        });
    }
    
    // 返回最大ID + 100，確保有足夠空間
    return maxId + 100;
}; 