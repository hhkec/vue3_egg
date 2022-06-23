'use strict';

const Controller = require('egg').Controller;

const OptPool = require('./mysqlConnPool.js');
const optPool = new OptPool();
const pool = optPool.getPool();

class fruitController extends Controller {
  //查++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async getFruit() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.request.body);

    // //从连接池获取连接
    // pool.getConnection(function (err, conn) {
    //   //查询
    //   conn.query('SELECT * FROM `user`', function (err, rs, fields) {
    //     if (err) {
    //       console.log('mysql查询错误:' + err);
    //       return;
    //     }

    //     for (let i in rs) {
    //       console.log(rs[i].UserName);
    //       list.push(rs[i].UserName);
    //     }

    //     conn.release();   //放回连接池（必须在完成操作之后）
    //   });
    // });

    let conn = await new Promise((resolve) => {
      pool.getConnection(function (err, conn) {
        resolve(conn);
      });
    })

    let tab = ctx.query.tab
    let mySqlStr = 'SELECT * FROM ' + tab
    let rsInfo = await new Promise((resolve,reject) => {
      conn.query(mySqlStr, function (err, rs, fields) {
        if (err) {
          console.log('mysql操作错误:' + err);
          reject(err);
        }
        resolve({ rs: rs, fields: fields });
      });
    })

    conn.release();   //放回连接池（必须在完成操作之后）

    let fname = rsInfo.fields[1].name;
    let rs = rsInfo.rs;
    let rlist = [];    
    for (let i in rs) rlist.push(rs[i][fname]);
    ctx.body = rlist;
  }

  //增++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async insertFruit() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.request.body);

    //获取前端传递过来的参数
    let { UserName, PassWord, UserClass } = ctx.request.body;

    //从连接池获取连接
    let conn = await new Promise((resolve) => {
      pool.getConnection(function (err, conn) {
        resolve(conn);
      });
    })

    //插入数据
    let mySqlStr = `INSERT INTO user(UserName,PassWord,UserClass) VALUES('${UserName}','${PassWord}','${UserClass}')`;
    await new Promise((resolve) => {
      conn.query(mySqlStr, function (err, result) {
        if (err) {
          console.log('mysql插入错误:' + err);
          return;
        }
        resolve(result);
      });
    })

    //查询数据
    mySqlStr = 'SELECT * FROM `user`'
    let rs = await new Promise((resolve) => {
      conn.query(mySqlStr, function (err, rs, fields) {
        if (err) {
          console.log('mysql获取错误:' + err);
          return;
        }
        resolve(rs);
      });
    })

    //释放连接池（必须在完成操作之后）
    conn.release();

    let rlist = [];
    for (let i in rs) rlist.push(rs[i].UserName);

    ctx.body = rlist;
  }

  //删++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async deleteFruit() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.request.body);

    //获取前端传递过来的参数
    let id = ctx.params.id;

    //从连接池获取连接
    let conn = await new Promise((resolve) => {
      pool.getConnection(function (err, conn) {
        resolve(conn);
      });
    })

    //删除数据
    let mySqlStr = `DELETE FROM user where UserName='${id}'`;
    await new Promise((resolve) => {
      conn.query(mySqlStr, function (err, result) {
        if (err) {
          console.log('mysql删除错误:' + err);
          return;
        }
        resolve(result);
      });
    })

    //查询数据
    mySqlStr = 'SELECT * FROM `user`'
    let rs = await new Promise((resolve) => {
      conn.query(mySqlStr, function (err, rs, fields) {
        if (err) {
          console.log('mysql获取错误:' + err);
          return;
        }
        resolve(rs);
      });
    })

    //释放连接池（必须在完成操作之后）
    conn.release();

    let rlist = [];
    for (let i in rs) rlist.push(rs[i].UserName);
    ctx.body = rlist;
  }

  //改++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async updataFruit() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.request.body);

    //获取前端传递过来的参数
    let id = ctx.params.id;
    let { UserName, PassWord, UserClass } = ctx.request.body;

    //从连接池获取连接
    let conn = await new Promise((resolve) => {
      pool.getConnection(function (err, conn) {
        resolve(conn);
      });
    })

    //修改数据
    let mySqlStr = `UPDATE user SET UserName = '${UserName}',PassWord = '${PassWord}',UserClass = '${UserClass}' WHERE UserName='${id}'`;
    await new Promise((resolve) => {
      conn.query(mySqlStr, function (err, result) {
        if (err) {
          console.log('mysql修改错误:' + err);
          return;
        }
        resolve(result);
      });
    })

    //查询数据
    mySqlStr = 'SELECT * FROM `user`'
    let rs = await new Promise((resolve) => {
      conn.query(mySqlStr, function (err, rs, fields) {
        if (err) {
          console.log('mysql获取错误:' + err);
          return;
        }
        resolve(rs);
      });
    })

    //释放连接池（必须在完成操作之后）
    conn.release();

    let rlist = [];
    for (let i in rs) rlist.push(rs[i].UserName);
    ctx.body = rlist;
  }
}

module.exports = fruitController;
