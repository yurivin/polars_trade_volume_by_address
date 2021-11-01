<template>
  <div id="app">
    <StatisticTokens/>
  </div>
</template>

<script>

import StatisticTokens from "./components/StatisticTokens";




export default {
  name: 'App',


  components: {
    StatisticTokens
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1{
  cursor: pointer;
}
</style>
