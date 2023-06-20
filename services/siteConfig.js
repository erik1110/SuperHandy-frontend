export const siteConfig = {

  //麵包屑
  breadcrumbs:{
    //中文名稱對應
    cnName:{
      home: "首頁",
      login: "登入",
      signup: "註冊",
      "find-tasks": "找任務",
      list: "任務列表",
      map: "任務地圖",
      "post-task": "刊登任務",
      "find-task": "任務詳情",
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
    //不規則
    irregular:{
      herf:{
        "find-tasks":"/find-tasks/list",
        //tasks:"/account/tasks/poster"
      },
      others:{
        //"account":"我的帳號"
      }
    }
  },

  //NuxtLink的路徑
  linkPaths: {
    home: { title: "首頁", to: "/" },
    login: { title: "登入", to: "/auth/login" },
    postTask: { title: "刊登任務", to: "/post-task/-1" },
    findTasksList: { title: "任務列表", to: "/find-tasks/list" },
    account: { title: "會員帳號", to: "/account" },
    tasks: { title: "任務管理-任務詳情", to: "/account/tasks" },//for taskId使用
    points: { title: "點數管理", to: "/account/points" },
    pointsHistory: { title: "點數歷史", to: "/account/points/history" },
    comments: { title: "評價查看", to: "/account/comments" },
    exposurePlan: { title: "曝光方案", to: "/exposure-plan" },
  },

  image: {
    upload: {
      maxSize: (2 * 1024 * 1024),// 2MB
      maxSizeCn: '2MB',
    }
  },

  //系統通知
  notification: {
    showLength: 3,//顯示筆數
    isOpen: true, //是否開啟setInterval
    intervalTime: (1000 * 60 * 1)//60s
  }

};
