<template>
    <h1>主体详情{{$route.params.id}}</h1>
    <p>{{blogContent}}</p>
</template>
<script>
export default{
    name: 'BodyView',
    props: {
        msg: String,
    },
    data(){
        return{
            blogContent:"",
            reID:""
        }
    },
    watch : {
        $route() {
            this.reID = this.$route.params.id;
            this.getBlogDataById(this.reID);
        },
    },
    created(){
        this.reID = this.$route.params.id;
        this.getBlogDataById(this.reID);
    },
    methods:{
        getBlogDataById(id){
            switch(id){
                case "1":
                    this.blogContent="技能1";
                    break;
                case "2":
                    this.blogContent="技能2";
                    break;
                case "3":
                    this.blogContent="技能3";
                    break;
            }
        }
    }
}
</script>
