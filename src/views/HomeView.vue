<template>
  <div class="home">
    <HeaderComponent />
    <GameComponent />
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderArea/HeaderComponent.vue";
import GameComponent from "@/components/GameArea/GameComponent.vue";
import FooterComponent from "@/components/FooterArea/FooterComponent.vue";
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 3840px) {
  .home {
    zoom: 2;
  }
}

@media screen and (max-width: 2560px) {
  .home {
    zoom: 1.5;
  }
}

@media screen and (max-width: 1920px) {
  .home {
    zoom: 1;
  }
}
</style>
