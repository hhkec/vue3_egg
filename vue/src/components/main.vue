<template>
我是HEAD
<h1>{{ msg }}</h1>
<form @submit.prevent="insert">
    <input hidden="true"  type="text" v-model="UserID"><br>
    UserName:<input type="text" v-model="UserName"><br>
    PassWord:<input type="text" v-model="PassWord"><br>
    UserClass:<input type="text" v-model="UserClass"><br>
    <button>添加</button>
</form>
<ul>
    <li v-for="item,index in list" v-bind:key="index">
        {{item}}
        <button @click="del(item)">删除</button>
        <button @click="upd(item)">修改</button>
    </li>
</ul>
<button @click="get">GET菜单</button>

<button @click="cookie">cookie:{{cookieNumber}}</button>
<button @click="session">session:{{sessionNumber}}</button>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = '/api'

export default {
  name: 'cmpHead',
  props: {
    msg: String
  },
  data(){
    return {
        list:[],   
        UserID:0,
        UserName: "",
        PassWord: "",
        UserClass: "",    
        cookieNumber: 0,
        sessionNumber: 0,  
      }
    },
    mounted() {
      this.get();
    },
    methods:{
      get(){
        axios.get(`/fruit?tab=user`)
            .then((res) => {
                this.list = res.data;
        })
      },
      insert(){
          axios.post(`/fruit?ww=post`,{
              UserName: this.UserName,
              PassWord: this.PassWord,
              UserClass: this.UserClass
          })
          .then((res) => {
              this.list = res.data;
          })
      },
      del(i){
          axios.delete(`/fruit/${i}?ww=delete`)
          .then((res) => {
              this.list = res.data;
          })
      },
      upd(i){
          axios.put(`/fruit/${i}?ee=put`,{
              UserName: this.UserName,
              PassWord: this.PassWord,
              UserClass: this.UserClass
          })
          .then((res) => {
              this.list = res.data;
          })
      }, 
      cookie(){
          axios.get(`/cookie`)
          .then((res) => {
              this.cookieNumber = res.data;
          })                    
      }, 
      session(){
          axios.get(`/session`)
          .then((res) => {
              this.sessionNumber = res.data;
          })                    
      }        
    }
}
</script>

<style scoped>

</style>
