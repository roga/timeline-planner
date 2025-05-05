import React from "react";
import { statusOptions, statuses } from "../utils/dataUtils";

function TaskEditModal({ task, editingFields, setEditingFields, onSave, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow w-96">
                <h2 className="text-xl font-bold mb-2">編輯任務</h2>
                <input
                    type="text"
                    className="border p-1 mb-2 w-full"
                    placeholder="專案名稱"
                    value={editingFields.project ?? task.project}
                    onChange={(e) => setEditingFields({ ...editingFields, project: e.target.value })}
                />
                <input
                    type="text"
                    className="border p-1 mb-2 w-full"
                    placeholder="任務摘要"
                    value={editingFields.summary ?? task.summary}
                    onChange={(e) => setEditingFields({ ...editingFields, summary: e.target.value })}
                />
                <select
                    className="border p-1 mb-2 w-full"
                    value={editingFields.status ?? task.status}
                    onChange={(e) => setEditingFields({ ...editingFields, status: e.target.value })}
                >
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{statuses[status]} {status}</option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">取消</button>
                    <button onClick={onSave} className="px-3 py-1 bg-blue-500 text-white rounded">儲存</button>
                </div>
            </div>
        </div>
    );
}

export default TaskEditModal; 