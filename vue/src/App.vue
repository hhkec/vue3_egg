<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <cmpHead/>
      </el-header>
      <el-container>
        <el-aside class="left">
          <cmpLeft msg="这个是传递到子组件的内容"/>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import cmpHead from './components/headView.vue'
import cmpLeft from './components/leftView.vue'

export default {
  name: 'App',
  components: {
    cmpHead,
    cmpLeft
  }
}
</script>

<style scoped>
.header{
  background-color: #fee;
  padding:0px;
  height: 32px;
}
.left{
  background-color: #eef;
  overflow: auto;
  width: "200px";
  height: calc(100vh - 32px);
}
.main{
  background-color: #efe;
  height: calc(100vh - 32px);
}
</style>
