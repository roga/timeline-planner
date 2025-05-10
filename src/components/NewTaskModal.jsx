import React from "react";
import { statusOptions, statuses } from "../utils/dataUtils";

function NewTaskModal({ engineers, onSave, onCancel }) {
    const [fields, setFields] = React.useState({
        project: "",
        summary: "",
        status: "WIP",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        engineerId: ""
    });

    const handleChange = (field, value) => {
        setFields(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">新增任務</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Owner</label>
                        <select
                            value={fields.engineerId}
                            onChange={(e) => handleChange("engineerId", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">請選擇 Owner</option>
                            {engineers.map(engineer => (
                                <option key={engineer.id} value={engineer.id}>{engineer.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">專案</label>
                        <input
                            type="text"
                            value={fields.project}
                            onChange={(e) => handleChange("project", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">摘要</label>
                        <input
                            type="text"
                            value={fields.summary}
                            onChange={(e) => handleChange("summary", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">狀態</label>
                        <select
                            value={fields.status}
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
                            value={fields.startDate}
                            onChange={(e) => handleChange("startDate", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">結束日期</label>
                        <input
                            type="date"
                            value={fields.endDate}
                            onChange={(e) => handleChange("endDate", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                        取消
                    </button>
                    <button
                        onClick={() => onSave(fields)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        新增
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewTaskModal; 