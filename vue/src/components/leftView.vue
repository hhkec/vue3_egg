<template>
  <el-row class="tac">
    <el-col :span="24">
      <!-- <h5 class="mb-2">Default colors</h5> -->
      <el-menu
        default-active="toHome"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-menu-item index="toHome">
          <el-icon><HomeFilled /></el-icon>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="toLogin">
          <el-icon><location /></el-icon>
          <span>Login</span>
        </el-menu-item>
        <el-menu-item index="toPayMent">
          <el-icon><Calendar /></el-icon>
          <span>支付宝</span>
        </el-menu-item>
        <el-sub-menu index="toBody">
          <template #title>
            <el-icon><document /></el-icon>
            <span>Multi level</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1">item 1</el-menu-item>
            <el-menu-item index="2">item 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="3">item 3</el-menu-item>
            <el-menu-item index="4">item 4</el-menu-item>
            <el-menu-item index="5">item 5</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="itemNext">
            <template #title>item next</template>
            <el-menu-item index="one">item one</el-menu-item>
            <el-menu-item index="two">item two</el-menu-item>
            <el-menu-item index="three">item three</el-menu-item>
            <el-menu-item index="for">item for</el-menu-item>
            <el-menu-item index="five">item five</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="toRefview">
          <el-icon><Notification /></el-icon>
          <span>ref格式</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <el-icon><Camera /></el-icon>
          <span>无权限菜单</span>
        </el-menu-item>
        <el-menu-item index="">
          <el-icon><setting /></el-icon>
          <router-link :to="'/mytt'">mytt</router-link>
        </el-menu-item> 
        <el-menu-item index="">
          <el-icon><setting /></el-icon>
          <router-link :to="'/temp'">temp</router-link>
        </el-menu-item>                           
        <el-sub-menu index="toSetup">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>Setup</span>
          </template>
          <el-menu-item index="user">用户管理</el-menu-item>       
          <el-menu-item-group title="Group One">
            <el-menu-item index="1">item 1</el-menu-item>
            <el-menu-item index="2">item 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="3">item 3</el-menu-item>
            <el-menu-item index="4">item 4</el-menu-item>
            <el-menu-item index="5">item 5</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="itemNext">
            <template #title>item next</template>
            <el-menu-item index="one">item one</el-menu-item>
            <el-menu-item index="two">item two</el-menu-item>
            <el-menu-item index="three">item three</el-menu-item>
            <el-menu-item index="for">item for</el-menu-item>
            <el-menu-item index="five">item five</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>        
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,Menu as IconMenu,Location,Calendar,
  Setting,Notification,Camera,HomeFilled
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
const router = useRouter();

  const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
  }
  const handleSelect = (key: string, keyPath: string[]) => {

    switch(keyPath[0]) {
     case "toHome":
        router.push('/');
        break;
     case "toLogin":
        router.push('/login');
        break;
     case "toPayMent":
        router.push('/payment');
        break;
     case "toRefview":
        router.push('/refview');
        break;
     case "toBody":
        if (keyPath.length === 2) router.push('/body/' + keyPath[1]);
        if (keyPath.length === 3) router.push('/body/' + keyPath[2]);
        break;
     case "toSetup":
        switch(keyPath[1]) {
          case "user":
              router.push('/setupUser');
              break;
          default: 
        } 
        break;
      default: 
          
    } 
    // console.log(key, keyPath)    
    
  }

</script>
