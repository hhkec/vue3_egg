<template>
  {{change}} :{{change3}}
  <br/>
  message:{{message}}
  <el-button type="primary" @click="increment" >button</el-button>
  <input :value="message" @input="updateMessage">

  <HR/> 
  <h3>{{pinia.name}}</h3>  <!--使用-->
  <h3>{{pinia.age}}</h3>
  <button @click="pinia.age++">修改pinia数据</button>   <!--修改-->

</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch} from 'vue'
import { useStore } from "vuex";
import { PiniaStore } from '../pinia'

const store = useStore();
const pinia = PiniaStore();

const value = ref('')

  function increment() {
    store.commit('increment')
    console.log(store.state.count)
  }

  function updateMessage (e) {
    store.commit('updateMessage', e.target.value)
  }

  //计算属性
  const change = computed(() => {return store.state.count * 2})
  const change3 = computed(() => {return store.state.count * 3})
  const message = computed(() => {return store.state.obj.message})


 //观察属性
  watch(
    change,
    (newVal, oldVal) => {
      console.log(`变化前：${oldVal}`)
      console.log(`变化后：${newVal}`)
    }, {
      immediate: true,  // 立即执行
      deep: true        // 深度监听
    }
  )


</script>

