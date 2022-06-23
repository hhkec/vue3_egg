<template>
 <h1>水果列表</h1>
 
<form @submit.prevent="insert">
  <div>
    <label for="">名称：</label>
    <input type="text" v-model="name">
  </div>  
  <div>
    <label for="">价格：</label>
    <input type="text" v-model.number="price">
  </div>
  <button>添加</button>
</form>
<ul>
  <li v-for="item,index in list" v-bind:key="index">
    名称：{{item.name}},
    单价：{{item.price}},
    数量:
    <button @click="dec(index)">-</button>
    <span>{{item.count}}</span>
    <button @click="inc(index)">+</button>
  </li>
</ul>
<h2>总价:{{totalPrice}}</h2>
<h2>调用外部函数返回:{{number}}</h2>

</template>

<script>
import { ref, computed, reactive } from "vue"
import sum from '../utils/sum.js'

export default {
  setup() {
    
    const name = ref("苹果")
    const price = ref(1)
    const list = reactive([])

    const totalPrice = computed( () => {
      let sum=0

      list.forEach(v => {
        sum += v.count * v.price     
      });

      return sum
    })  

    const number = computed( () => {
        return sum();
    })  

    function insert(){
      const fruit = reactive({
        name:name.value,
        price:price.value,
        count:1
      })
      list.push(fruit)
    }

    function inc(i){
      list[i].count++
    }

    function dec(i){
      list[i].count--
      if(list[i].count === 0 && confirm("是否删除数据")){
        list.splice(i,1)
      } 
    }

    return {
      name,
      price,
      list,
      number,
      totalPrice,
      insert,
      inc,
      dec
    }
  },
}
</script>
