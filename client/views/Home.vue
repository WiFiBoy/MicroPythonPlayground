<template>
  <div>
    <playground></playground>
  </div>
</template>

<script>
  import playground from './editor/playground'
    export default {
      name: "Home",
      data () {
        return {}
      },
      components: {
        playground
      }
    }
</script>

<style scoped>
  div {
    height:100vh;
  }
</style>
