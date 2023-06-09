<template>
  <AccountPointsHistoryCard :data="historyList"></AccountPointsHistoryCard>
</template>
<script setup>
import { getAccountPointsHistory } from "@/services/apis/point";
const { fromNow } = useMoment()
const historyList = ref([]);
const roleSetting = {
  '案主': {
    tagClass: 'sp-tag-dark-lg-cyan',
    roleClass: 'sp-tag-light-xs-cyan'
  },
  '幫手': {
    tagClass: 'sp-tag-dark-lg-amber',
    roleClass: 'sp-tag-light-xs-amber'
  },
}
const FuncGetAccountPointsHistory = async function () {
  try {
    let res = await getAccountPointsHistory();
    if (!res.error) {
      console.log(res)
    } else {
      return;
    }
    if (!Array.isArray(res.data)) return;
    res.data.forEach((item) => {
      let _historyData = {};
      _historyData.tag = item.tag;//任務標籤
      _historyData.role = `# ${item.role}`;//任務角色
      _historyData.taskId = item.taskId;//任務編號
      _historyData.time = fromNow(item.createdAt);//交易時間
      _historyData.desc = item.desc.join(', ');//交易項目
      _historyData.tagClass = roleSetting[item.role] ? roleSetting[item.role].tagClass : 'sp-tag-dark-lg-slate';
      _historyData.roleClass = roleSetting[item.role] ? roleSetting[item.role].roleClass : 'sp-tag-light-xs-slate';

      // 點數計算 - 案主
      if (item.role === '案主') {
        _historyData.total = (item.money.superCoin + item.money.helperCoin);
        _historyData.detail = `超人幣: ${item.money.superCoin}, 幫手幣: ${item.money.helperCoin} `;
      }

      // 點數計算 - 幫手
      if (item.role === '幫手') {
        _historyData.total = item.money.salary;
        _historyData.detail = `平台費: ${item.money.platform}, 超人幣: ${item.money.superCoin}`;
      }

      // 點數顯示顏色和前綴符號
      _historyData.totalClass = _historyData.total > 0 ? 'sp-text-green-500' : 'sp-text-red-500'
      _historyData.totalPrefix = _historyData.total > 0 ? '+' : ''

      historyList.value.push(_historyData)
    })

  } catch (error) {
    console.log({ error })
  } finally {

  }
};
FuncGetAccountPointsHistory();
</script>
<style scoped></style>