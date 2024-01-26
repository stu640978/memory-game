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
</template>

<script setup lang="ts">
import { ref, reactive, watch, onUnmounted } from "vue";
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

onUnmounted(() => {
  StopTimer();
});

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
      background-color: #4d4d4dd4;
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
        background-color: #ffee00d2;
        @include font_set(#202020, 16px, 600);
        line-height: 30px;
        cursor: pointer;

        &:hover {
          scale: 1.1;
        }
      }
    }
    .cardarea {
      width: 500px;
      height: 100%;
      @extend %flex_center;
      flex-wrap: wrap;
      padding: 10px;
      position: relative;
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        @extend %flex_center;
        background-color: #202020e5;
        visibility: hidden;
        .text {
          width: 120px;
          height: 40px;
          border-radius: 16px;
          background-color: #ffee00d2;
          @include font_set(#202020, 24px, 600);
          line-height: 40px;
          cursor: pointer;

          &:hover {
            scale: 1.1;
          }
        }
      }

      .active {
        visibility: visible;
      }
    }
  }
}
</style>
