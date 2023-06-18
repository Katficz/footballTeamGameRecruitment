<template>
  <nav>
    <router-link to="/dodaj">add</router-link> |
    <router-link to="/lista">lista</router-link>
  </nav>
  <div class="main-container">
    <router-view />
  </div>
</template>

<style lang="scss">
$layout-breakpoint-small: 500px;

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #d6d6d6;
}

.main-container {
  width: 80vw;
  height: 80vh;
  margin: auto;
  @media (max-width: $layout-breakpoint-small) {
    width: 95vw;
  }
}

nav {
  text-align: center;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
