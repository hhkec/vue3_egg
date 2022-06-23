<template>
  <el-button type="primary" @click="increment" >button</el-button>
  <el-button type="primary" @click="aaa" >button</el-button>
  {{this.$store.state.user}}
  <p ></p>
  {{this.$store.getters.doneTodos}}
</template>

<script>
export default {
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  },
    aaa() {
    let a=3;

    console.log(a - a/a-- + a++ * a--)
  }
}
}
</script>

<style>

</style>