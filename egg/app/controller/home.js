'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '<h1>我是首页</h1>';
  }

  async login() {
    const { ctx } = this;

    let {username,password} = ctx.request.body;
    if (username === "小明" && password === "123456"){
      ctx.session.userClass = "高级";
      ctx.redirect("/public/index.html");   //重定向，跳转到该页
    }else{
      ctx.session.userClass = null;
      ctx.body = '登陆失败';
    }   
  }

  async setCookie() {
    const { ctx } = this;

    let number = parseInt(ctx.cookies.get("number"));
    if (number) number++;
    else number = 1;
    
    // ctx.cookies.set("number", null);  //清除cookie
    ctx.cookies.set("number", number);
    ctx.body = number;
  }

  async setSession() {
    const { ctx } = this;

    let number = ctx.session.number;
    if (number) number++;
    else number = 1;

    ctx.session.number = number;
    ctx.body = number;
  } 

}

module.exports = HomeController;
