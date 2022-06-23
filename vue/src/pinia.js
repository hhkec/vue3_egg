import { defineStore } from 'pinia'

//导出 pinia仓库
export const PiniaStore = defineStore('main',{  
    //相当于全局的 data()
    state:() => { 
        return {
            user:{
                name:"未登录",
                type:"0"
            },
            name:'黄老',
            age:98
        }
    },
     //相当于全局的computed
    getters:{

    }, 
    //相当于全局methods
    actions:{

    }   
})
