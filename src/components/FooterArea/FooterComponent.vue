<template>
  <div class="footer">
    <div class="developer_info">
      <p class="developer">Developed by Jimmy Yu</p>
      <a
        href="https://github.com/stu640978/memory-game"
        class="link"
        target="_blank"
      >
        <span class="link__text"> Repo link </span>
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
  z-index: 50;
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
      @extend %flex_center;
      height: 22px;
      .link__text {
        @include font_set(#d4d4d4, 16px, 600);
        line-height: 22px;
        position: relative;
        &:hover {
          text-decoration: underline;
        }

        &::before {
          content: "";
          width: 118%;
          height: 70%;
          position: absolute;
          left: -8%;
          top: 38%;
          background: rgba(134, 74, 249, 0.3);
        }
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .footer {
    height: 80px;
    .developer_info {
      margin-top: 5px;
      .developer {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
