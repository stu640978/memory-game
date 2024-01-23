<template>
  <div class="header">
    <div class="title">記憶猜猜樂</div>
    <div class="header__rightbox">
      <div class="help" @click="ClickHelp">?</div>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="45%"
    class="tips_dialog"
    :before-close="handleClose"
  >
    <div class="content">
      <span class="tips_text title">
        此網頁為記憶卡片遊戲
        <br />
      </span>
      <span class="tips_text"> 遊戲規則：<br /> </span>
      <span class="tips_text">
        1. 遊戲開始時，會隨機產生 9 張卡片，每張卡片都有一個對應的配對卡片
        <br />
      </span>
      <span class="tips_text">
        2. 每次點擊卡片，卡片會翻面，並且會顯示卡片的數字
        <br />
      </span>
      <span class="tips_text">
        3. 當點擊兩張卡片後，若兩張卡片的數字相同，則卡片不會翻面蓋上
        <br />
      </span>
      <span class="tips_text">
        4. 反之，若兩張卡片的數字不相同，則卡片會翻面蓋上
        <br />
      </span>
      <span class="tips_text">
        5. 當所有卡片都被翻面後，遊戲結束
        <br />
      </span>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialogVisible = ref(false);

const ClickHelp = () => {
  dialogVisible.value = true;
};

const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  width: 100%;
  @extend %flex_center;
  background-color: rgba(128, 0, 128, 0.5);
  position: relative;
  .title {
    @include font_set(#ececec, 24px, 600);
    line-height: 64px;
  }
  .header__rightbox {
    width: 80px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    @extend %flex_center;
    .help {
      width: 40px;
      height: 40px;
      border: 4px solid rgb(120, 0, 120);
      border-radius: 50%;
      @include font_set(#ececec, 18px, 600);
      background-color: rgb(216, 0, 216);
      line-height: 32px;
      cursor: pointer;
    }
  }
}
.content {
  width: 100%;
  height: 100%;
  @extend %flex_center;
  flex-wrap: wrap;
  .tips_text {
    width: 100%;
    text-align: left;
    @include font_set(#dcdcdc, 16px, 500);
    margin-bottom: 10px;
  }
  .title {
    margin-bottom: 16px;
  }
}
</style>
