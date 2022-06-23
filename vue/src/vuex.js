import { createStore } from 'vuex'

// 创建一个 store 实例
const store = createStore({
    state () {
      return {
        user:{
            name:"user",
            type:"未登录"
        },
        count: 0,
        obj:{
            message:"sss",
            count:99
        },
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false },
          { id: 3, text: '...', done: true }
        ]
      }
    },
    getters: {
      doneTodos (state) {
        return state.todos.filter(todo => todo.done)
      },
      getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    },
    mutations: {
      userLogin (state,loginUser) {
        state.user = loginUser
      },       
      increment (state) {
        state.count++
      },
      updateMessage (state, message) {
        state.obj.message = message
      },

    }
  })

export default store;
