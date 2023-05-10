export const siteConfig = {
  //麵包屑中文
  breadcrumbsCn: {
    home: "首頁",
    login: "登入",
    signup: "註冊",
    "find-tasks": "找任務",
    list: "任務列表",
    map: "任務地圖",
    "post-task": "刊登任務",
    detail: "查看詳情",
    account: "會員",
    tasks: "任務管理",
    comments: "評價查看",
    points: "點數管理",
    about: "關於我們",
    faq: "常見問題",
    terms: "使用者條款",
    privacy: "隱私權政策",
    "exposure-plan": "曝光方案",
    "reset-password": "忘記密碼",
    "verify-email": "信箱驗證",
  },

  //NuxtLink的路徑
  linkPaths: {
    home: { title: "首頁", to: "/" },
    login: { title: "登入", to: "/auth/login" },
    postTask: { title: "刊登任務", to: "/post-task" },
    account: { title: "會員帳號", to: "/account" },
  },
};
