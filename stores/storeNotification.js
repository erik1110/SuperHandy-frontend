import { defineStore } from "pinia";
import { getList } from "@/services/apis/notifications";
import { siteConfig } from "@/services/siteConfig";
const { logInfo, logError } = useLog()

export const storeNotification = defineStore("storeNotification", () => {
  const notiLength = ref(siteConfig.notification.showLength);
  const addNotiLength = () => {
    notiLength.value = (notiLength.value * 2)
  }

  //是否有未讀的系統訊息
  const isHasUnRead = ref(false)

  const hasUnRead = async () => {
    logInfo('Notification setInterval', 'hasUnRead')
    try {
      const { data } = await getList();
      const readObj = data.find((item) => item.read == false);
      isHasUnRead.value = readObj ? true : false

    } catch (error) {
      logError({ error })
      isHasUnRead.value = false
    }
  }

  return {
    notiLength,
    addNotiLength,
    isHasUnRead,
    hasUnRead
  };
});