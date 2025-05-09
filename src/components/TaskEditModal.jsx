import React, { useCallback, useEffect } from "react";
import { statusOptions, statuses } from "../utils/dataUtils";

function TaskEditModal({ task, editingFields, setEditingFields, onSave, onCancel }) {
    // 當任務改變時，重置編輯欄位
    useEffect(() => {
        setEditingFields({
            project: task.project,
            summary: task.summary,
            status: task.status,
            startDate: task.startDate,
            endDate: task.endDate
        });
    }, [task, setEditingFields]);

    const handleChange = useCallback((field, value) => {
        setEditingFields(prev => ({
            ...prev,
            [field]: value
        }));
    }, [setEditingFields]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">編輯任務</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">專案</label>
                        <input
                            type="text"
                            value={editingFields.project}
                            onChange={(e) => handleChange("project", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">摘要</label>
                        <input
                            type="text"
                            value={editingFields.summary}
                            onChange={(e) => handleChange("summary", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">狀態</label>
                        <select
                            value={editingFields.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{statuses[status]} {status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">開始日期</label>
                        <input
                            type="date"
                            value={editingFields.startDate}
                            onChange={(e) => handleChange("startDate", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">結束日期</label>
                        <input
                            type="date"
                            value={editingFields.endDate}
                            onChange={(e) => handleChange("endDate", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        取消
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        儲存
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskEditModal; 