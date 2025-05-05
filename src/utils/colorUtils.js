// 顏色生成函數
export function generatePastelColor(seed) {
    // 使用字符串哈希算法計算一個數值
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        // 使用一個更大的素數（31）乘法來放大差異
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // 使用字符串長度和第一個字符進一步擾動哈希值
    hash = hash * seed.length + (seed.charCodeAt(0) || 13);
    
    // 使用正弦函數將哈希值映射到 0-1 範圍
    // 對於相近的輸入，正弦函數會產生差異較大的輸出
    const randomVal = i => Math.abs(Math.sin(hash * (i + 1) * 12.9898) * 43758.5453 % 1);
    
    // 莫蘭迪色系基礎調色板 (R, G, B 形式)
    const morandiPalette = [
        [220, 214, 206], // 米灰
        [211, 196, 183], // 淺棕
        [202, 204, 196], // 灰綠
        [219, 200, 182], // 杏色
        [207, 193, 186], // 玫瑰灰
        [185, 181, 172], // 灰棕
        [196, 208, 215], // 淺藍灰
        [224, 209, 205], // 粉灰
        [211, 205, 179], // 草黃灰
        [208, 183, 181], // 淡紫灰
        [198, 195, 189], // 中性灰
        [208, 199, 194], // 石灰
        [215, 205, 188], // 淺卡其
        [192, 195, 190], // 青灰
        [189, 208, 188], // 淺草綠
        [190, 184, 198]  // 淺紫灰
    ];
    
    // 安全地選擇顏色索引，確保不超出範圍
    const index = Math.floor(randomVal(0) * morandiPalette.length);
    const baseIndex = Math.max(0, Math.min(index, morandiPalette.length - 1));
    const baseColor = morandiPalette[baseIndex];
    
    // 確保所有變量都有有效的默認值
    if (!baseColor) {
        // 如果出現意外，使用安全的默認值
        return 'rgb(220, 214, 206)'; // 使用米灰色作為默認值
    }
    
    // 輕微擾動顏色，但保持在莫蘭迪色系範圍內（小範圍變化）
    // 我們使用較小的範圍(±20)來保持顏色的莫蘭迪特性
    const r = Math.min(255, Math.max(180, baseColor[0] + Math.floor(randomVal(1) * 40 - 20)));
    const g = Math.min(255, Math.max(180, baseColor[1] + Math.floor(randomVal(2) * 40 - 20)));
    const b = Math.min(255, Math.max(180, baseColor[2] + Math.floor(randomVal(3) * 40 - 20)));
    
    // 返回 RGB 格式顏色
    return `rgb(${r}, ${g}, ${b})`;
} 