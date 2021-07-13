<template>
  <div id="app">
    <GnssComponent/>
  </div>
</template>

<script>

import GnssComponent from "@/components/GnssComponent";

export default {
  name: 'App',
  components: {
    GnssComponent
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
</style>
