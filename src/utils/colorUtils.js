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
    const index = projectTitle.length % colors.length;
    return colors[index];
};

export const generateBorderColor = (projectTitle) => {
    const colors = [
        'rgb(67, 56, 202)',    // 深靛藍
        'rgb(126, 34, 206)',   // 深紫色
        'rgb(29, 78, 216)',    // 深藍色
        'rgb(15, 118, 110)',   // 深青色
        'rgb(4, 120, 87)',     // 深綠色
        'rgb(190, 18, 60)',    // 深玫瑰紅
        'rgb(146, 64, 14)',    // 深琥珀色
        'rgb(51, 65, 85)',     // 深石板色
        'rgb(109, 40, 217)',   // 深紫羅蘭
        'rgb(14, 116, 144)',   // 深青色
        'rgb(162, 28, 175)',   // 深紫紅色
        'rgb(190, 24, 93)',    // 深粉紅色
        'rgb(194, 65, 12)',    // 深橙色
        'rgb(77, 124, 15)',    // 深萊姆色
        'rgb(3, 105, 161)',    // 深天藍色
        'rgb(30, 64, 175)',    // 更深的藍色
        'rgb(55, 48, 163)',    // 更深的靛藍色
        'rgb(107, 33, 168)',   // 更深的紫色
        'rgb(17, 94, 89)',     // 更深的青色
        'rgb(6, 95, 70)',      // 更深的綠色
    ];
    const index = projectTitle.length % colors.length;
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