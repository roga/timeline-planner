// 顏色生成函數
export function generatePastelColor(seed) {
   
    const base64Seed = btoa(encodeURIComponent(seed)); // 將 seed 轉換為 Base64
    const hashValue = Array.from(base64Seed).reduce((sum, char) => sum + char.charCodeAt(0), 0); // 計算 ASCII 總和
    
    // 根據 ASCII 總和計算調色板索引
    const index = hashValue % quickColorPalette.length; // 確保索引在調色板範圍內
    const baseColor = quickColorPalette[index];
    
    // 確保所有變量都有有效的默認值
    if (!baseColor) {
        // 如果出現意外，使用安全的默認值
        return 'rgb(214, 212, 206)'; // 使用灰棕作為默認值
    }
    
    // 返回 RGB 格式顏色
    return `rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`;
}

const quickColorPalette = [
    [180, 184, 212], //rgb(180, 184, 212) 
    [242, 213, 239], // #F2D5EF 
    [189, 193, 124], //rgb(189, 193, 124) 
    [142, 209, 100], //rgb(142, 209, 100) 
    [117, 163, 214], //rgb(117, 163, 214) 
    [227, 199, 41]  //rgb(227, 199, 41) 
];