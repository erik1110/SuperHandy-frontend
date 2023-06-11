<template>
  <div v-if="detail">
    <VCard>
      <VCardText>
        <div class="stpper">
          <div class="stpper-item" :class="progressObject.publishedAt.class">
            <div class="stpper-item-icon">
              <CheckIcon class="stpper-item-icon-svg" />
              <span class="stpper-item-icon-text">1</span>
            </div>
            <div class="stpper-item-content">
              <div class="stpper-item-content-title sp-text-h4">任務發布</div>
              <div class="stpper-item-content-end_time">
                <div class="stpper-item-content-end_time-text sp-text-caption">
                  {{ progressObject.publishedAt.time }}
                </div>
              </div>
            </div>
          </div>
          <div class="sp-block stpper-line"></div>
          <div class="stpper-item" :class="progressObject.inProgressAt.class">
            <div class="stpper-item-icon">
              <CheckIcon class="stpper-item-icon-svg" />
              <span class="stpper-item-icon-text">2</span>
            </div>
            <div class="stpper-item-content">
              <div class="stpper-item-content-title sp-text-h4">媒合幫手</div>
              <div class="stpper-item-content-end_time">
                <div class="stpper-item-content-end_time-text sp-text-caption">
                  {{ progressObject.inProgressAt.time }}
                </div>
              </div>
            </div>
          </div>
          <div class="sp-block stpper-line"></div>
          <div class="stpper-item" :class="progressObject.submittedAt.class">
            <div class="stpper-item-icon">
              <CheckIcon class="stpper-item-icon-svg" />
              <span class="stpper-item-icon-text">3</span>
            </div>
            <div class="stpper-item-content">
              <div class="stpper-item-content-title sp-text-h4">任務執行</div>
              <div class="stpper-item-content-end_time">
                <div class="stpper-item-content-end_time-text sp-text-caption">
                  {{ progressObject.submittedAt.time }}
                </div>
              </div>
            </div>
          </div>
          <div class="sp-block stpper-line"></div>
          <div class="stpper-item" :class="progressObject.confirmedAt.class">
            <div class="stpper-item-icon">
              <CheckIcon class="stpper-item-icon-svg" />
              <span class="stpper-item-icon-text">4</span>
            </div>
            <div class="stpper-item-content">
              <div class="stpper-item-content-title sp-text-h4">任務完成</div>
              <div class="stpper-item-content-end_time">
                <div class="stpper-item-content-end_time-text sp-text-caption">
                  {{ progressObject.confirmedAt.time }}
                </div>
              </div>
            </div>
          </div>
          <div class="sp-block stpper-line"></div>
          <div class="stpper-item" :class="progressObject.completedAt.class">
            <div class="stpper-item-icon">
              <CheckIcon class="stpper-item-icon-svg" />
              <span class="stpper-item-icon-text">5</span>
            </div>
            <div class="stpper-item-content">
              <div class="stpper-item-content-title sp-text-h4">雙方評價</div>
              <div class="stpper-item-content-end_time">
                <div class="stpper-item-content-end_time-text sp-text-caption">
                  {{ progressObject.completedAt.time }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
<script setup>
  import { CheckIcon } from "@heroicons/vue/24/solid";
  const detail = useState("taskDetail");
  const progressName = [
    "publishedAt",
    "inProgressAt",
    "submittedAt",
    "confirmedAt",
    "completedAt",
  ];
  const progressObjectModel = {
    publishedAt: {
      class: "unActive",
      time: "",
    },
    inProgressAt: {
      class: "unActive",
      time: "",
    },
    submittedAt: {
      class: "unActive",
      time: "",
    },
    confirmedAt: {
      class: "unActive",
      time: "",
    },
    completedAt: {
      class: "unActive",
      time: "",
    },
  };
  const progressObject = ref({
    publishedAt: {
      class: "unActive",
      time: "",
    },
    inProgressAt: {
      class: "unActive",
      time: "",
    },
    submittedAt: {
      class: "unActive",
      time: "",
    },
    confirmedAt: {
      class: "unActive",
      time: "",
    },
    completedAt: {
      class: "unActive",
      time: "",
    },
  });
  const FuncProgressControll = function (val) {
    if (val) {
      let i = 0;
      progressObject.value = progressObjectModel;
      while (i != -1) {
        if (val.progressBar[progressName[i]]) {
          progressObject.value[progressName[i]] = {
            class: "actived",
            time: new Date(val.progressBar[progressName[i]]).toLocaleString(),
          };
          if (i != 4) {
            progressObject.value[progressName[i + 1]] = {
              class: "active",
              time: "",
            };
          }
          i = i + 1;
          if (i == 5) {
            i = -1;
          }
        } else {
          i = -1;
        }
      }
    }
  };
  FuncProgressControll(detail.value);
  watch(
    () => detail.value,
    (val) => {
      FuncProgressControll(val);
    }
  );
</script>
<style lang="scss" scoped>
  .stpper {
    display: flex;
    align-items: center;
    width: 100%;
    &-item {
      flex-grow: 0;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      &-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid #5658fb;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        font-size: 14px;
        &-svg {
          display: none;
          width: 14px;
          height: 14px;
        }
      }
      &-content {
        &-end_time {
          display: none;
          position: relative;
          height: 20px;
          &-text {
            position: absolute;
            left: 0;
            top: 0;
            width: 140px;
            transform: scale(0.85) translateX(-15px);
          }
        }
      }
    }
    &-line {
      flex: 1;
      height: 1px;
      background-color: #5658fb;
      margin: 0 10px;
    }
  }
  .stpper-item.actived {
    .stpper-item-icon {
      &-svg {
        display: inline;
      }
      &-text {
        display: none;
      }
    }
    .stpper-item-content-end_time {
      display: block;
    }
  }
  .stpper-item.active {
    .stpper-item-icon {
      background-color: #5658fb;
      &-svg {
        display: none;
      }
      &-text {
        display: inline;
        color: white;
      }
    }
    .stpper-item-content-end_time {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    .stpper-item {
      flex-direction: column;
      &-icon {
        margin-right: 0;
        margin-bottom: 5px;
      }
      &-content {
        &-title {
          font-size: 1rem;
        }
        &-end_time {
          display: none;
          height: 0px;
          opacity: 0;
        }
      }
    }
  }
  @media (max-width: 640px) {
    .stpper-line {
      visibility: hidden;
      margin: 0;
    }
    .stpper-item {
      &-content {
        &-title {
          font-size: 0.75rem;
        }
      }
    }
  }
</style>
