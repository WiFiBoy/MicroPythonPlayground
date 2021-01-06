<template>
  <div>
    <h3 v-for="item in items">{{item}}</h3>
  </div>
</template>
<script>

export default {
  data () {
    return {
      items:[
        "Device Info (not available for preview release)",
        "Device Config (not available for preview release)",
        "Device Registration (not available for preview release)"
      ]
    }
  }
}
</script>

<style scoped>
 

</style>