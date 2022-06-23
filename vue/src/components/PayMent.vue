<template>
  <el-input v-model="price" style="width:300px"/>
  <el-button type="primary" @click="goPayment">去支付</el-button>

</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch} from 'vue'
import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = '/api';

const price = ref(900)

  function goPayment() {
    let time = new Date();
    let data = {
        orderId : time.toLocaleString(),
        price: price.value
    }
    axios({
        url:`/payment`,
        method:"post",
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:qs.stringify(data)
    }).then((res) => {
        window.location.href = res.data;
        console.log(res)
    })


  }

</script>

