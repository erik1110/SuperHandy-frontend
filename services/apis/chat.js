const { req } = useHttp();

//取得聊天室列表
export const getChatList = () => req("GET", "/chat/list",{},{ auth: true });

//取得聊天室歷史訊息
export const getChatRoomHistory = (query) => req("GET", `/chat/history`,query,{ auth: true });

