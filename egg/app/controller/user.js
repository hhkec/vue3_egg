'use strict';

const Controller = require('egg').Controller;

const OptPool = require('./mysqlConnPool.js');
const optPool = new OptPool();
const pool = optPool.getPool();

class userController extends Controller {

//获取用户信息++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async userGet() {
    const { ctx } = this;
    //获取前端传递过来的参数
    let conn;
    let reData = {};
    try {
      //从连接池获取连接
      conn = await new Promise((resolve,reject) => {
        pool.getConnection(function (err, conn) {
          if (err) {
            console.log('mysql连接池错误:' + err);
            reject(err);
          }
          resolve(conn);
        });
      })

      //查询数据
      let tab = ctx.query.tab
      let mySqlStr = 'SELECT UserName,UserClass FROM ' + tab //+ ' WHERE UserName <> "kecdz"'
      let rs = await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, rs) {
          if (err) {
            console.log('mysql数据获取错误:' + err);
            reject(err);
          }
          resolve(rs);
        });
      })

      if(rs.length === 0) reData = {reState: false, rs: 0};
      else reData = {reState: true, rs: rs};
    } catch (err) {
      console.log('数据库操作出错')
      reData = {reState: false, rs: 0};
    } finally {
      conn.release();   //释放连接池（必须在完成操作之后）
      ctx.body = JSON.stringify(reData);
      // let strData = JSON.stringify(objData);
      // let objData = JSON.parse(strData);
    }       
  }

  //登陆++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async userlogin() {
    const { ctx } = this;
    //获取前端传递过来的参数
    let {name,pswd} = ctx.request.body;
    let conn;
    let reData = {};
    try {
      //从连接池获取连接
      conn = await new Promise((resolve,reject) => {
        pool.getConnection(function (err, conn) {
          if (err) {
            console.log('mysql连接池错误:' + err);
            reject(err);
          }
          resolve(conn);
        });
      })

      //查询数据
      let mySqlStr = "SELECT UserClass FROM `user` WHERE UserName='" + name + "' AND PASSWORD='" + pswd + "'"
      let rs = await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, rs) {
          if (err) {
            console.log('mysql数据获取错误:' + err);
            reject(err);
          }
          resolve(rs);
        });
      })

      if(rs.length === 0) reData = {reState: false, data: 0};
      else reData = {reState: true, data: rs[0].UserClass};
    } catch (err) {
      console.log('数据库操作出错')
      reData = {reState: false, data: 0};
    } finally {
      conn.release();   //释放连接池（必须在完成操作之后）
      ctx.body = JSON.stringify(reData);
    }       
  }
    
  //添加用户++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async userAdd() {
    const { ctx } = this;

    //获取前端传递过来的参数
    let {name,pswd,type} = ctx.request.body;
    let conn;
    let reData;
    try {
      //从连接池获取连接
      conn = await new Promise((resolve,reject) => {
        pool.getConnection(function (err, conn) {
          if (err) {
            console.log('mysql连接池错误:' + err);
            reject(err);
          }
          resolve(conn);
        });
      })

      //插入数据
      let mySqlStr = `INSERT INTO user(UserName,PassWord,UserClass) VALUES('${name}','${pswd}','${type}')`;
      await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, result) {
          if (err) {
            console.log('mysql数据插入错误:' + err);
            reject(err);
          }
          resolve(result); 
        });
      })
              
      //查询数据
      mySqlStr = "SELECT UserName,UserClass FROM `user`"
      let rs = await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, rs) {
          if (err) {
            console.log('mysql数据获取错误:' + err);
            reject(err);
          }
          resolve(rs);
        });
      })

      if(rs.length === 0) reData = {reState: false, rs: 0};
      else reData = {reState: true, rs: rs};
    } catch (err) {
      console.log('数据库操作出错')
      reData = {reState: false, rs: 0};
    } finally {
      conn.release();   //释放连接池（必须在完成操作之后）
      ctx.body = JSON.stringify(reData);
    }    
  }

  //删++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async userDel() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.request.body);
    
    let id = ctx.params.id; //获取前端传递过来的参数
    let conn;
    let reData;
    try {
      //从连接池获取连接
      conn = await new Promise((resolve,reject) => {
        pool.getConnection(function (err, conn) {
          if (err) {
            console.log('mysql连接池错误:' + err);
            reject(err);
          }
          resolve(conn);
        });
      })

      //删除数据
      let mySqlStr = `DELETE FROM user where UserName='${id}'`;
      await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, result) {
          if (err) {
            console.log('mysql数据插入错误:' + err);
            reject(err);
          }
          resolve(result); 
        });
      })
              
      //查询数据
      mySqlStr = "SELECT UserName,UserClass FROM `user`"
      let rs = await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, rs) {
          if (err) {
            console.log('mysql数据获取错误:' + err);
            reject(err);
          }
          resolve(rs);
        });
      })

      if(rs.length === 0) reData = {reState: false, rs: 0};
      else reData = {reState: true, rs: rs};
    } catch (err) {
      console.log('数据库操作出错')
      reData = {reState: false, rs: 0};
    } finally {
      conn.release();   //释放连接池（必须在完成操作之后）
      ctx.body = JSON.stringify(reData);
    }    
  }
  
  //改++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async userPut() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.request.body);
    
    let id = ctx.params.id;
    let { UserName, PassWord, UserClass } = ctx.request.body;    
    let conn;
    let reData;
    try {
      //从连接池获取连接
      conn = await new Promise((resolve,reject) => {
        pool.getConnection(function (err, conn) {
          if (err) {
            console.log('mysql连接池错误:' + err);
            reject(err);
          }
          resolve(conn);
        });
      })

      //修改数据
      let mySqlStr = `UPDATE user SET UserName = '${UserName}',PassWord = '${PassWord}',UserClass = '${UserClass}' WHERE UserName='${id}'`;
      await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, result) {
          if (err) {
            console.log('mysql数据插入错误:' + err);
            reject(err);
          }
          resolve(result); 
        });
      })
              
      //查询数据
      mySqlStr = "SELECT UserName,UserClass FROM `user`"
      let rs = await new Promise((resolve,reject) => {
        conn.query(mySqlStr, function (err, rs) {
          if (err) {
            console.log('mysql数据获取错误:' + err);
            reject(err);
          }
          resolve(rs);
        });
      })

      if(rs.length === 0) reData = {reState: false, rs: 0};
      else reData = {reState: true, rs: rs};
    } catch (err) {
      console.log('数据库操作出错')
      reData = {reState: false, rs: 0};
    } finally {
      conn.release();   //释放连接池（必须在完成操作之后）
      ctx.body = JSON.stringify(reData);
    } 
  }
}

module.exports = userController;
