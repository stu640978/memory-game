<template>
  <div class="card_container" @click="FlipCard">
    <div
      class="card__back"
      :class="[isFlipped === true ? 'flip' : 'noflip']"
    ></div>
    <div
      class="card"
      :class="[isFlipped === true ? 'flip' : 'noflip']"
      :style="{ backgroundColor: color }"
    >
      <div class="card__box">
        <span class="card__box__span">{{ number }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isFlipped: {
    type: Boolean,
    required: true,
  },
  isMatched: {
    type: Boolean,
    required: true,
  },
  ignoreClick: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["flip"]);

const FlipCard = () => {
  if (props.ignoreClick || props.isFlipped) return;
  emits("flip", props.id);
};
</script>

<style lang="scss" scoped>
.card_container {
  perspective: 1000px;
  position: relative;
  height: 130px;
  width: 100px;
  margin: 10px;

  &:hover {
    .card__back {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
    }
  }

  .card,
  .card__back {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }
  .card {
    @extend %flex_center;
    border-radius: 5px;
    transform: rotateY(-180deg);
    backface-visibility: hidden;
    perspective: 1000px;
    &.noflip {
      animation: backTurn 0.6s forwards;
    }

    &.flip {
      animation: faceTurn 0.6s forwards;
    }

    .card__box {
      background-color: #3b3b3bd4;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      @extend %flex_center;

      .card__box__span {
        @include font_set(#ececec, 32px, 600);
        line-height: 44px;
      }
    }
  }

  .card__back {
    background-color: rgba(51, 41, 65, 0.8);
    border-radius: 5px;
    cursor: pointer;
    transform: rotateY(0deg);
    backface-visibility: hidden;
    perspective: 1000px;

    &.noflip {
      animation: faceTurn 0.6s forwards;
    }

    &.flip {
      animation: backTurn 0.6s forwards;
    }
  }
}

@media screen and (max-width: 1200px) {
  .card_container {
    height: 105px;
    width: 80px;
    margin: 10px;
  }
}

@media screen and (max-width: 450px) {
  .card_container {
    height: 105px;
    width: 80px;
    margin: 5px;
  }
}

@media screen and (max-width: 400px) {
  .card_container {
    height: 80px;
    width: 60px;
    margin: 5px;
  }
}

@keyframes backTurn {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(180deg);
  }
}

@keyframes faceTurn {
  0% {
    transform: rotateY(-180deg);
  }

  100% {
    transform: rotateY(0deg);
  }
}
</style>
