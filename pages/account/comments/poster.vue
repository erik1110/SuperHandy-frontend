<template>
  <div>
    <VCard class="mb-4" v-if="posterStars">
      <VCardText>
        <div class="sp-flex sp-items-center sp-mb-4">
          <div class="sp-text-center">
            <div class="sp-text-h4">{{ posterStars.avg.toFixed(1) }}</div>
            <v-rating
              v-model="posterStars.avg"
              class="mb-1 mr-2 sm:sp-flex-initial sp-flex-auto"
              density="compact"
              size="small"
              color="v-purple"
              half-increments
              disabled
            ></v-rating>
          </div>
          <div
            class="sp-cursor-pointer sp-border-2 sp-border-gray-100 sp-border-solid sp-rounded-4 sp-py-2 sp-px-4 sp-mr-2 sp-text-body"
            :class="{ 'sp-text-white sp-bg-[#5658FB]': activeGroup == 0 }"
            @click="activeGroup = 0"
          >
            全部({{ posterStars.totalCount }})
          </div>
          <div
            class="sp-cursor-pointer sp-border-2 sp-border-gray-100 sp-border-solid sp-rounded-4 sp-py-2 sp-px-4 sp-mr-2 sp-text-body"
            :class="{ 'sp-text-white sp-bg-[#5658FB]': activeGroup == 5 }"
            @click="activeGroup = 5"
          >
            五星({{ posterStars["5"] }})
          </div>
          <div
            class="sp-cursor-pointer sp-border-2 sp-border-gray-100 sp-border-solid sp-rounded-4 sp-py-2 sp-px-4 sp-mr-2 sp-text-body"
            :class="{ 'sp-text-white sp-bg-[#5658FB]': activeGroup == 4 }"
            @click="activeGroup = 4"
          >
            四星({{ posterStars["4"] }})
          </div>
          <div
            class="sp-cursor-pointer sp-border-2 sp-border-gray-100 sp-border-solid sp-rounded-4 sp-py-2 sp-px-4 sp-mr-2 sp-text-body"
            :class="{ 'sp-text-white sp-bg-[#5658FB]': activeGroup == 3 }"
            @click="activeGroup = 3"
          >
            三星({{ posterStars["3"] }})
          </div>
          <div
            class="sp-cursor-pointer sp-border-2 sp-border-gray-100 sp-border-solid sp-rounded-4 sp-py-2 sp-px-4 sp-mr-2 sp-text-body"
            :class="{ 'sp-text-white sp-bg-[#5658FB]': activeGroup == 2 }"
            @click="activeGroup = 2"
          >
            二星({{ posterStars["2"] }})
          </div>
          <div
            class="sp-cursor-pointer sp-border-2 sp-border-gray-100 sp-border-solid sp-rounded-4 sp-py-2 sp-px-4 sp-mr-2 sp-text-body"
            :class="{ 'sp-text-white sp-bg-[#5658FB]': activeGroup == 1 }"
            @click="activeGroup = 1"
          >
            一星({{ posterStars["1"] }})
          </div>
        </div>
        <label class="text-v-gray-text pb-2 d-block" for="taskComment"
          >評價</label
        >
        <VSelect id="taskComment" v-model="comment" :items="commentItems">
        </VSelect>
        <label class="text-v-gray-text pb-2 d-block" for="taskType">分類</label>
        <VSelect
          id="taskType"
          v-model="type"
          :items="categories"
          item-value="name"
          item-title="name"
          clearable
        ></VSelect>
        <VBtn color="primary" @click="searchComments">搜尋</VBtn>
      </VCardText>
    </VCard>
    <VCard class="mb-4" v-for="(item, index) in commentGroup" :key="index">
      <VCardText>
        <div class="">#{{ item.category }}</div>
        <div class="sp-flex sp-my-2">
          <div class="sp-mr-4 sp-shrink-0">
            <img
              class="sp-shrink-0 sp-grow-0"
              width="120"
              height="120"
              :src="
                item.imgUrls.length > 0
                  ? item.imgUrls[0]
                  : 'https://picsum.photos/120'
              "
            />
          </div>
          <div class="sp-flex-1">
            <div class="sp-flex">
              <span class="sp-text-h4">{{ item.title }}</span>
            </div>
            <div class="sp-flex sp-text-body">
              <span class="sp-shrink">
                <MapPinIcon
                  class="sp-inline-block sp-w-[20px] sp-h-[20px] sp-mb-1"
                ></MapPinIcon>
              </span>
              <span class="">{{ item.address }}</span>
            </div>
            <div class="sp-flex sp-text-body">
              <span class="sp-shrink sp-w-[40px]">薪水</span>
              <span class="">{{ item.salary }} 超人幣</span>
            </div>
            <div class="sp-flex sp-text-body">
              <span class="sp-shrink sp-w-[40px]">幫手</span>
              <span class="">{{ item.helper }}</span>
            </div>
            <div class="sp-inline-flex sp-text-body">
              <span class="sp-shrink sp-w-[40px]">刊登</span>
              <span class="">{{
                new Date(item.publishedAt).toLocaleString()
              }}</span>
            </div>
            <v-btn
              color="primary"
              outlined
              class="sp--translate-y-2 sp-px-4 sp-py-2 sp-text-center sp-border-2 sp-border-black sp-border-solid sp-float-right"
              @click="gotoDetail(item.taskId)"
            >
              查看詳情
            </v-btn>
          </div>
        </div>
        <div class="sp-border-2 sp-border-gray-400 sp-border-solid">
          <div
            class="d-flex sp-items-center sp-border-b-2 sp-border-gray-400 sp-border-solid"
          >
            <div
              class="sp-px-4 sp-py-2 sp-border-r-2 sp-border-gray-400 sp-border-solid"
            >
              幫手評價
            </div>
            <div
              class="sp-px-4 sp-py-1 sp-border-r-2 sp-border-gray-400 sp-border-solid sp-overflow-hidden"
            >
              <v-rating
                v-model="item.helperReview.star"
                class="sm:sp-flex-initial sp-flex-auto"
                readonly
                density="compact"
                size="small"
                color="v-purple"
              ></v-rating>
            </div>
            <div class="sp-px-4 sp-py-2 sp-inline-flex sp-flex-1">
              <input
                class="sp-h-[20px] sp-outline-none sp-flex-1"
                v-model="item.helperReview.comment"
                disabled
              />
            </div>
          </div>
          <div class="d-flex sp-items-center">
            <div
              class="sp-px-4 sp-py-2 sp-border-r-2 sp-border-gray-400 sp-border-solid"
            >
              案主評價
            </div>
            <div
              class="sp-px-4 sp-py-1 sp-border-r-2 sp-border-gray-400 sp-border-solid sp-overflow-hidden"
            >
              <v-rating
                v-model="item.editStar"
                class="sm:sp-flex-initial sp-flex-auto"
                :readonly="!item.isEdit"
                density="compact"
                size="small"
                color="v-purple"
              ></v-rating>
            </div>
            <div class="sp-px-4 sp-py-2 sp-inline-flex sp-flex-1">
              <input
                class="sp-h-[20px] sp-outline-none sp-flex-1"
                v-model="item.editComment"
                :disabled="!item.isEdit"
                :placeholder="item.isEdit ? '請輸入評論...' : ''"
              />
              <div v-if="item.posterReview.status == '待評價'">
                <PencilSquareIcon
                  v-if="!item.isEdit"
                  class="sp-inline-block sp-w-[20px] sp-h-[20px] sp-cursor-pointer"
                  @click="item.isEdit = true"
                ></PencilSquareIcon>
                <XMarkIcon
                  v-if="item.isEdit"
                  class="sp-inline-block sp-mr-2 sp-w-[20px] sp-h-[20px] sp-cursor-pointer"
                  @click="cancelEdit(item)"
                ></XMarkIcon>
                <ClipboardDocumentCheckIcon
                  v-if="item.isEdit"
                  class="sp-inline-block sp-w-[20px] sp-h-[20px] sp-cursor-pointer"
                  @click="postComment(item)"
                ></ClipboardDocumentCheckIcon>
              </div>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
<script setup>
  import {
    getAccountCommentsStar,
    getAccountComments,
  } from "@/services/apis/account";
  import { postTasksManagementComment } from "@/services/apis/tasks";
  import {
    MapPinIcon,
    PencilSquareIcon,
    XMarkIcon,
    ClipboardDocumentCheckIcon,
  } from "@heroicons/vue/24/solid";
  const categories = useState("categories");
  const posterStars = ref(null);
  const activeGroup = ref(0);
  const comment = ref("全部");
  const commentItems = ["全部", "待評價", "已評價"];
  const type = ref("全部");
  const commentGroup = ref([]);
  const FuncGetAccountCommentsStar = async function () {
    let res = await getAccountCommentsStar("案主");
    if (!res.error) {
      posterStars.value = res.data;
    }
  };
  FuncGetAccountCommentsStar();
  const searchComments = async function () {
    let query = {
      role: "案主",
    };
    if (type.value && type.value != "全部") {
      query.categories = `${type.value}`;
    }
    if (comment.value && comment.value != "全部") {
      query.reviewStatus = `${comment.value}`;
    }
    if (activeGroup.value != 0) {
      query.yourStar = `${activeGroup.value}`;
    }
    query.limit = `100`;
    let res = await getAccountComments(query);
    if (!res.error) {
      res.data.reviews.forEach(function (item) {
        if (item.helperReview.status == "待評價") {
          item.helperReview.star = 0;
          item.helperReview.comment = "";
        }
        if (item.posterReview.status == "待評價") {
          item.posterReview.star = 0;
          item.posterReview.comment = "";
        }
        //案主畫面
        item.editStar = item.posterReview.star;
        item.editComment = item.posterReview.comment;
        item.isEdit = false;
      });
      commentGroup.value = res.data.reviews;
    }
  };
  const cancelEdit = function (item) {
    item.editStar = item.posterReview.star;
    item.editComment = item.posterReview.comment;
    item.isEdit = false;
  };
  const postComment = async function (item) {
    let data = {
      star: item.editStar,
      comment: item.editComment,
    };
    let res = await postTasksManagementComment(item.taskId, data);
    if (!res.error) {
      item.isEdit = false;
      item.posterReview.status = "已評論";
    }
  };
  const gotoDetail = function (taskId) {
    navigateTo(`/account/tasks/${taskId}`);
  };
</script>
