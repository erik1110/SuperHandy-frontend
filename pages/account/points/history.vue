<template>
    <PostTaskOverlay/>
  <AccountPointsHistoryCard :data="historyList"></AccountPointsHistoryCard>
</template>
<script setup>
import { storeFullOverlay } from "@/stores/storeFullOverlay";
import { getAccountPointsHistory } from "@/services/apis/point";
import { siteConfig } from "@/services/siteConfig";
const _storeFullOverlay = storeFullOverlay();
const { fromNow } = useMoment();
const historyList = ref([]);
const _tagsColor = {
  role: {
    案主: "sp-tag-light-xs-cyan",
    幫手: "sp-tag-light-xs-amber",
    系統: "sp-tag-light-xs-slate",
    default: "sp-tag-light-xs-slate",
  },
  tag: {
    刊登任務: "sp-tag-dark-lg-cyan",
    完成任務: "sp-tag-dark-lg-amber",
    系統儲值: "sp-tag-dark-lg-slate",
    default: "sp-tag-dark-lg-slate",
  },
};

const FuncGetAccountPointsHistory = async function () {
  _storeFullOverlay.open()
  try {
    let res = await getAccountPointsHistory();
    if (!res.error) {
      // console.log(res)
    } else {
      return;
    }
    if (!Array.isArray(res.data)) return;
    res.data.forEach((item) => {
      let _historyData = {};
      _historyData.tag = item.tag; //任務標籤
      _historyData.role = `# ${item.role}`; //任務角色
      _historyData.taskId = item.taskId; //任務編號
      _historyData.time = fromNow(item.createdAt); //交易時間
      _historyData.desc = item.desc.join(", "); //交易項目
      _historyData.tagClass =
        _tagsColor.tag[item.tag] ?? _tagsColor.tag.default;
      _historyData.roleClass =
        _tagsColor.role[item.role] ?? _tagsColor.role.default;

      // 點數計算 - 幫手
      if (item.role === "幫手") {
        _historyData.total = item.money.salary;
        _historyData.detail = `平台費: ${item.money.platform}, 超人幣: ${item.money.superCoin}`;
      } else {
        // 點數計算 - 案主 | 系統 ...
        _historyData.total = item.money.superCoin + item.money.helperCoin;
        _historyData.detail = `超人幣: ${item.money.superCoin}, 幫手幣: ${item.money.helperCoin}`;
      }

      // 點數顯示顏色和前綴符號
      _historyData.totalClass =
        _historyData.total > 0 ? "sp-text-green-500" : "sp-text-red-500";
      _historyData.totalPrefix = _historyData.total > 0 ? "+" : "";

      historyList.value.push(_historyData);
    });
  } catch (error) {
    console.log({ error });
  } finally {
    _storeFullOverlay.close()
  }
};
FuncGetAccountPointsHistory();
</script>
<style scoped></style>
