'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', app.middleware.checksession(),controller.home.index);

   //user
  router.get('/userGet', controller.user.userGet);
  router.post('/userlogin', controller.user.userlogin);  
  router.post('/userAdd', controller.user.userAdd);    
  router.delete('/userDel/:id', controller.user.userDel);    
  router.put('/userPut/:id', controller.user.userPut);


  //login
  router.post('/login', controller.home.login);    
  //cookie
  router.get('/cookie', controller.home.setCookie);
  //session
  router.get('/session', controller.home.setSession);

  //查
  router.get('/fruit', controller.fruit.getFruit);
  //增
  router.post('/fruit', controller.fruit.insertFruit);
  //删
  router.delete('/fruit/:id', controller.fruit.deleteFruit);
  //改
  router.put('/fruit/:id', controller.fruit.updataFruit);
 

  //支付宝
  router.post('/payment', controller.payment.paymentDo);    


};
