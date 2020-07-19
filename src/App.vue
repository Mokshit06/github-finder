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
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

#app,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
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
