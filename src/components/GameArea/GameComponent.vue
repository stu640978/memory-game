<template>
  <div class="container">
    <div class="gamearea">
      <div class="info__box">
        <div class="timer">
          <span class="timer__text">{{ timerText }}</span>
        </div>
        <div class="reset__btn" @click="ResetGame">重新遊戲</div>
      </div>
      <div class="cardarea">
        <div class="cover" :class="{ active: coverActive }">
          <span class="text" @click="StartGame">開始遊戲</span>
        </div>
        <div class="cardwrapper">
          <CardComponent
            v-for="(item, index) in outputCardData"
            :key="index"
            v-bind="item"
            :ignoreClick="ignoreClick"
            @flip="GetFlipData"
          />
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="遊戲結束!"
    :width="dialogWidth"
    class="gameover_dialog"
    :before-close="handleClose"
  >
    <div class="content">
      <div class="textbox">
        <span class="gameover_text" v-html="gameoverText"></span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="ResetGame"> 再玩一次 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted, computed } from "vue";
import CardComponent from "@/components/GameArea/CardComponent.vue";

const coverActive = ref(true);

const cardData = reactive([
  {
    id: 0,
    number: 1,
    color: "red",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 1,
    number: 1,
    color: "red",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 2,
    number: 2,
    color: "orange",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 3,
    number: 2,
    color: "orange",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 4,
    number: 3,
    color: "yellow",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 5,
    number: 3,
    color: "yellow",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 6,
    number: 4,
    color: "green",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 7,
    number: 4,
    color: "green",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 8,
    number: 5,
    color: "blue",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 9,
    number: 5,
    color: "blue",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 10,
    number: 6,
    color: "purple",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 11,
    number: 6,
    color: "purple",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 12,
    number: 7,
    color: "pink",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 13,
    number: 7,
    color: "pink",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 14,
    number: 8,
    color: "gray",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 15,
    number: 8,
    color: "gray",
    isFlipped: false,
    isMatched: false,
  },
]);

const dialogVisible = ref(false);

const dialogWidth = ref("45%");

interface flipedDataInterface {
  id: number;
  number: number;
}

const flipedData: flipedDataInterface[] = reactive([]);

const outputCardData = reactive([...cardData]);

const ignoreClick = ref(false);

const timerText = ref(0);

let timer: ReturnType<typeof setInterval>;

watch(flipedData, (newVal) => {
  // 當翻轉的卡片數量為 2 時，判斷是否為相同數字
  if (newVal.length === 2) {
    // 判斷是否所有卡片都已經翻轉，若是則遊戲結束
    if (outputCardData.every((element) => element.isFlipped === true)) {
      GameOver();
      return;
    }

    ignoreClick.value = true;
    setTimeout(() => {
      if (newVal[0].number !== newVal[1].number) {
        outputCardData.forEach((element) => {
          if (element.id === newVal[0].id || element.id === newVal[1].id) {
            element.isFlipped = false;
          }
        });
      } else {
        outputCardData.forEach((element) => {
          if (element.id === newVal[0].id || element.id === newVal[1].id) {
            element.isMatched = true;
          }
        });
      }

      flipedData.splice(0);
    }, 1000);

    // 必須要等到卡片翻轉完畢才能再次點擊
    setTimeout(() => {
      ignoreClick.value = false;
    }, 1000);
  }
});

const gameoverText = computed(() => {
  let returnText = "";
  switch (true) {
    case timerText.value <= 30:
      returnText = `你是鬼吧! 只花了&nbsp;<span class="time_text">${timerText.value}</span>&nbsp;秒就完成了遊戲`;
      break;

    case timerText.value <= 60:
      returnText = `恭喜你! 共花了&nbsp;<span class="time_text">${timerText.value}</span>&nbsp;秒完成了遊戲`;
      break;

    case timerText.value > 60:
      returnText = `你累了嗎? 花了&nbsp;<span class="time_text">${timerText.value}</span>&nbsp;秒才完成遊戲`;
      break;
  }

  return returnText;
});

onMounted(() => {
  window.addEventListener("resize", GetLatestWidthAndResizeDialog);
  GetLatestWidthAndResizeDialog();
});

onUnmounted(() => {
  StopTimer();
});

const GetLatestWidthAndResizeDialog = () => {
  //get window width
  const windowWidth = window.innerWidth;
  if (windowWidth < 1024) {
    dialogWidth.value = "90%";
  } else {
    dialogWidth.value = "45%";
  }
};

const GenerateNewData = () => {
  let newArray = Shuffle(outputCardData);

  outputCardData.splice(0, outputCardData.length, ...newArray);
};

// 使用 Fisher-Yates Shuffle 洗牌演算法隨機排序原始陣列
const Shuffle = (array: typeof cardData) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const ResetGame = () => {
  dialogVisible.value = false;
  StopTimer();
  flipedData.splice(0);
  outputCardData.forEach((element) => {
    element.isFlipped = false;
    element.isMatched = false;
  });
  coverActive.value = true;
  timerText.value = 0;
};

const StartGame = () => {
  GenerateNewData();
  StartTimer();
  coverActive.value = false;
};

const GameOver = () => {
  StopTimer();
  dialogVisible.value = true;
};

const GetFlipData = (id: number) => {
  outputCardData.forEach((element) => {
    if (element.id === id) {
      element.isFlipped = true;
      flipedData.push({
        id: element.id,
        number: element.number,
      });
    }
  });
};

const StartTimer = () => {
  timer = setInterval(() => {
    timerText.value++;
  }, 1000);
};

const StopTimer = () => {
  clearInterval(timer);
};

const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100% - 100px);
  @extend %flex_center;
  flex-wrap: wrap;
  .gamearea {
    max-width: 550px;
    width: 100%;
    height: 100%;
    @extend %flex_center;
    flex-wrap: wrap;
    padding: 0 10px;
    .info__box {
      margin: 40px 0 26px;
      width: 100%;
      height: 50px;
      @extend %flex_center;
      background-color: rgba(51, 41, 65, 0.8);
      border-radius: 12px;
      position: relative;
      .timer {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: #202020;
        @extend %flex_center;
        .timer__text {
          @include font_set(#ececec, 24px, 600);
        }
      }
      .reset__btn {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 80px;
        height: 30px;
        border-radius: 12px;
        background-color: rgb(248, 229, 89);
        @include font_set(#202020, 16px, 600);
        line-height: 30px;
        cursor: pointer;
        transition: all 0.1s;

        &:hover {
          scale: 1.1;
        }
      }
    }
    .cardarea {
      width: 100%;
      height: 100%;
      @extend %flex_center;
      flex-wrap: wrap;
      position: relative;
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        @extend %flex_center;
        background-color: rgba(51, 41, 65, 0.8);
        visibility: hidden;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        .text {
          width: 120px;
          height: 40px;
          border-radius: 16px;
          background-color: rgb(248, 229, 89);
          @include font_set(#202020, 24px, 600);
          line-height: 40px;
          cursor: pointer;
          transition: all 0.1s;

          &:hover {
            scale: 1.1;
          }
        }
      }

      .active {
        visibility: visible;
      }

      .cardwrapper {
        width: 500px;
        height: 100%;
        @extend %flex_center;
        flex-wrap: wrap;
        padding: 0 10px;
      }
    }
  }
}

.content {
  width: 100%;
  height: 100%;
  @extend %flex_center;
  flex-wrap: wrap;
  .textbox {
    width: 100%;
    height: 35px;
    @extend %flex_center;
    .gameover_text {
      @include font_set(#dcdcdc, 22px, 500);
      text-align: center;
      height: 35px;
      line-height: 35px;
      &:deep(.time_text) {
        @include font_set(rgb(248, 229, 89), 28px, 600);
        line-height: 35px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .container {
    .gamearea {
      .info__box {
        margin: 20px 0 12px;
      }
    }
  }
  .content {
    .textbox {
      .gameover_text {
        @include font_set(#dcdcdc, 18px, 500);
        &:deep(.time_text) {
          @include font_set(rgb(248, 229, 89), 24px, 600);
        }
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .container {
    .gamearea {
      .info__box {
        margin: 10px 0 10px;
      }
    }
  }
}
</style>
