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
</style>
