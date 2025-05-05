import { createContext } from "react";

// 創建 Context 用於共享收折狀態
const TimelineContext = createContext({
    collapsedMonths: {},
});

export default TimelineContext; 