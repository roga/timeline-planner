export const generateTitleColor = (projectTitle) => {
    const colors = [
        'bg-indigo-700',    // 深靛藍
        'bg-purple-700',    // 深紫色
        'bg-blue-700',      // 深藍色
        'bg-teal-700',      // 深青色
        'bg-emerald-700',   // 深綠色
        'bg-rose-700',      // 深玫瑰紅
        'bg-amber-700',     // 深琥珀色
        'bg-slate-700',     // 深石板色
        'bg-violet-700',    // 深紫羅蘭
        'bg-cyan-700',      // 深青色
        'bg-fuchsia-700',   // 深紫紅色
        'bg-pink-700',      // 深粉紅色
        'bg-orange-700',    // 深橙色
        'bg-lime-700',      // 深萊姆色
        'bg-sky-700',       // 深天藍色
        'bg-blue-800',      // 更深的藍色
        'bg-indigo-800',    // 更深的靛藍色
        'bg-purple-800',    // 更深的紫色
        'bg-teal-800',      // 更深的青色
        'bg-emerald-800',   // 更深的綠色
    ];
    
    // 使用 encodeURIComponent 處理中文字符
    const encoded = encodeURIComponent(projectTitle);
    const sum = encoded.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);    
    const index = sum % colors.length;
    return colors[index];
};

export const generateBorderColor = (projectTitle) => {
    const colors = [
        'rgba(12, 1, 1, 0.9)' ,
        'rgba(137, 17, 17, 0.9)' ,
        'rgba(7, 67, 76, 0.9)' ,
        'rgba(6, 54, 4, 0.9)' ,
    ];

    // 使用 encodeURIComponent 處理中文字符
    const encoded = encodeURIComponent(projectTitle);
    const sum = encoded.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);    
    const index = sum % colors.length;
    
    return colors[index];
};

export const getStatusColor = (status) => {
    const statusColors = {
        'WIP': 'bg-yellow-200 text-yellow-800',
        'DONE': 'bg-green-100 text-green-800',
        'TODO': 'bg-gray-100 text-gray-800',
        'DELAYED': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
};