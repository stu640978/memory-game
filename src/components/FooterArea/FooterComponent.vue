<template>
  <div class="footer">
    <div class="developer_info">
      <p class="developer">Developed by Jimmy Yu</p>
      <a
        href="https://github.com/stu640978/memory-game"
        class="link"
        target="_blank"
      >
        Repo link
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
  height: 100px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  @extend %flex_center;
  background-color: rgba(0, 0, 0, 0.7);
  .developer_info {
    width: 220px;
    margin-top: 15px;
    @extend %flex_center;
    flex-wrap: wrap;
    .developer {
      @include font_set(#d4d4d4, 16px, 600);
      margin-bottom: 20px;
    }
    .link {
      @include font_set(#d4d4d4, 16px, 600);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
