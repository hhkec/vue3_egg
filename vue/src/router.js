import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/",component: () => import ('./components/main.vue')},
        {path: "/login",component: () => import ('./components/LoginView.vue')},
        {path: "/payment",component: () => import ('./components/PayMent.vue')},
        {path: "/refview",component: () => import ('./components/RefView.vue')},
        {path: "/body/:id",component: () => import ('./components/BodyView.vue')},
        {path: "/mytt",component: () => import ('./components/MyTt.vue')},
        {path: "/temp",component: () => import ('./components/temp.vue')},
        {path: "/setupUser",component: () => import ('./components/setup/user.vue')},

    ]
});

// 路由守卫
router.beforeEach((to,from,next) => {
    // let token = localStorage.getItem("token")
    // if(token === "kec" || to.path === "/login"){
    //     next();
    // }else{
    //     next("/login");
    // }
    let UserClass = localStorage.getItem("UserClass")
    console.log(UserClass)
    if(to.path == "/setupUser" && UserClass != "系统管理员"){
        next("/login");
    }else{
        next();
    }
})

export default router;
