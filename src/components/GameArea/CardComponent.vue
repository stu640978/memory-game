<template>
  <div
    class="card_container"
    :class="[isFlipped === true ? 'flip' : null]"
    @click="FlipCard"
  >
    <div class="card" :style="{ backgroundColor: color }">
      <div class="card__box">
        <span class="card__box__span">{{ number }}</span>
      </div>
    </div>
    <div class="card__back"></div>
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
});

const emits = defineEmits<{
  flip: [id: number];
}>();

const FlipCard = () => {
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

  .card,
  .card__back {
    position: absolute;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.25s ease-in-out;
  }
  .card {
    @extend %flex_center;
    border-radius: 5px;
    transform: rotateY(-180deg);

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
    background-color: #3b3b3bd4;
    border-radius: 5px;
    transform: rotateY(0deg);
  }
}
.flip .card__back {
  transform: rotateY(180deg);
}
</style>
