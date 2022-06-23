<template>
  <div class="login-box">
    <p class="login-title">用户管理</p>
    <el-form
      label-position="right"
      label-width="110px"
      :model="formLogin"
      style="max-width: 460px"
    >
      <el-form-item label="现有用户：">
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
      <el-form-item label="用户名称：">
        <el-input v-model="formLogin.name" style="width:300px"/>
      </el-form-item>
      <el-form-item label="输入密码：">
        <el-input v-model="formLogin.pswd" type="password" style="width:300px"/>
      </el-form-item>
      <el-form-item label="确认密码：">
        <el-input v-model="pswdC" type="password" style="width:300px"/>
      </el-form-item>     
      <el-form-item label="用户等级：">
        <el-select v-model="formLogin.type" placeholder="请选择用户权限等级" style="width:300px">
          <el-option label="操作员" value="操作员"   />
          <el-option label="管理员" value="管理员" />
          <el-option label="系统管理员" value="系统管理员" />
        </el-select>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="success" @click="userAdd">添加用户</el-button>  
        <el-button type="danger" @click="userDel(formLogin.name)">删除用户</el-button>  
        <el-button type="warning" @click="userPut(formLogin.name)">修改用户</el-button>  
      </div>
      <p></p>
    </el-form>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import md5 from 'js-md5';
import axios from 'axios';
axios.defaults.baseURL = '/api';
const router = useRouter();

const pswdC = ref('')
const formLogin = reactive({
  name: '',
  pswd: '',
  type: '操作员',
})

const userAdd = () => {
  if(pswdC.value === formLogin.pswd){
    axios.post(`/userAdd`,{
      name: formLogin.name,
      pswd: md5(formLogin.pswd + "13545872728"),
      type: formLogin.type,
    })
    .then((res) => {
      let reData = res.data;
      if(reData.reState){
        userInfo.value = reData.rs;
        ElMessage.success('用户添加成功')
      }else{
        ElMessage.error('用户添加失败')
      }      
    })
  }else{
    ElMessage.error('两次输入的密码不相同')
  }
}

const userDel = (UserName) => {
  axios.delete(`/userDel/${UserName}?ww=delete`)
  .then((res) => {
    let reData = res.data;
    if(reData.reState){
      userInfo.value = reData.rs;
      ElMessage.success('删除用户成功')
    }else{
      ElMessage.error('删除用户失败')     
    }     
  })
}

const userPut = (UserName) => {
  if(pswdC.value === formLogin.pswd){
    axios.put(`/userPut/${UserName}?ee=put`,{
        UserName: formLogin.name,
        PassWord: formLogin.pswd,
        UserClass: formLogin.type
    })
    .then((res) => {
      let reData = res.data;
      if(reData.reState){
        userInfo.value = reData.rs;
        ElMessage.success('修改用户成功')
      }else{
        ElMessage.error('修改用户失败')     
      }     
    })
  }else{
    ElMessage.error('两次输入的密码不相同')
  }    
}

interface userItem {
  UserName: string
  UserClass: string
}
let userInfo = ref<userItem[]>([])
const value = ref('')

onMounted(() => {
  axios.get(`/userGet?tab=user`)
  .then((res) => {
    let reData = res.data;
    if(reData.reState){
      userInfo.value = reData.rs;
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