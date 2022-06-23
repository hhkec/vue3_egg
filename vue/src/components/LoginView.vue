<template>
  <div class="login-box">
    <p class="login-title">用户登录</p>
    <el-form
      label-position="right"
      label-width="100px"
      :model="formLogin"
      style="max-width: 460px"
    >
      <el-form-item label="用户：">
        <el-select v-model="formLogin.name" filterable placeholder="Select" style="width:300px">
          <el-option
            v-for="item in userInfo"
            :key="item.UserName"
            :label="item.UserName"
            :value="item.UserName"
          >
            <span style="float: left">{{ item.UserName }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.UserClass }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input type="password" v-model="formLogin.pswd" v-on:keyup.enter="login" style="width:300px"/>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="primary" @click="login">用户登陆</el-button>
      </div>
      <p></p>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
import md5 from 'js-md5';
import axios from 'axios';

import { PiniaStore } from '../pinia'
const pinia = PiniaStore();

const router = useRouter();
const store = useStore();  
axios.defaults.baseURL = '/api';

const formLogin = reactive({
  name: '',
  pswd: '',
})

const login = () => {
  console.log(formLogin)
  axios.post(`/userlogin`,{
    name: formLogin.name,
    pswd: md5(formLogin.pswd + "13545872728")
  })
  .then((res) => {
    let reData = res.data;
    if(reData.reState){
      console.log(reData.data)
      // store.commit('userLogin', {name: formLogin.name, type: reData.data})
      pinia.user  = {name: formLogin.name, type: reData.data};
      localStorage.setItem("UserClass",reData.data)
      router.push("/")      
    }else{
      localStorage.setItem("UserClass","0");
      ElMessage.error('用户名或密码错误')
    }      
  })
}

// interface userItem {
//   UserName: string
//   UserClass: string
// }
// let userInfo = ref<userItem[]>([])
// let userInfo = ref([])
let userInfo = reactive([])

onMounted(() => {
  axios.get(`/userGet?tab=user`)
  .then((res) => {
    let reData = res.data;
    if(reData.reState){
      // userInfo.value = reData.rs;
      userInfo.push(...reData.rs);
    }      
  })
})

</script>
<style scoped>
    .login-box {
    border: 1px solid #DCDFE6;
    width: 450px;
    margin: 120px auto;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }
  .login-title {
    text-align: center;
    color: #303133;
  }
</style>