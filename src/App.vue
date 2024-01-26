<template>
  <router-view />
</template>

<style lang="scss">
@import "~@/assets/scss/css_reset.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.el-dialog {
  background-color: rgba(51, 41, 65, 0.8) !important;
  .el-dialog__title {
    color: #dcdcdc;
  }
}
</style>
