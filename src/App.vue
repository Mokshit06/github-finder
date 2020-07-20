<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    titleTemplate: "%s | Github Finder"
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Montserrat:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap");

#app,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
}

svg {
  font-size: 0.7em;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: #4c69fa;
}

a {
  text-decoration: none;
}
</style>
