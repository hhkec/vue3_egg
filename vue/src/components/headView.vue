<template>
  <div style="background-color: #66e; height: 32px; line-height: 32px; color:aliceblue ;">
    <el-icon><Files /></el-icon>
    kMES安灯管理系统
    <!-- <el-button plain type="success" @click="login" style="float: right;">{{user.name}}：{{user.type}}</el-button> -->
    <el-button plain type="success" @click="login" style="float: right;">{{pinia.user.name}}：{{pinia.user.type}}</el-button>
  </div>
</template>

<script lang="ts" setup>
// import { computed } from 'vue'
import { useRouter } from "vue-router";
import { PiniaStore } from '../pinia'

// import { useStore,mapState } from "vuex";
// const store = useStore();  

const router = useRouter();
const pinia = PiniaStore();

  //计算属性
  // const user = computed(() => {return store.state.user})

  const login = () => {
    router.push("/login")
  }

</script>
