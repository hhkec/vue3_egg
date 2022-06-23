'use strict';

const Controller = require('egg').Controller;
const alipaySdk = require('../db/alipayUnit');
const AlipayFormData = require('alipay-sdk/lib/form').default;

class paymentController extends Controller {

//支付宝付款++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async paymentDo() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
    console.log(ctx.request.body);

    let {orderId,price} = ctx.request.body;
    
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('returnUrl', 'http://localhost:3000/');
    formData.addField('bizContent', {
      outTradeNo: orderId,
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: price,
      subject: '商品',
      body: '商品详情',
    });
    
    const result = await alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData: formData },
    );

    // result 为可以跳转到支付链接的 url
    console.log(result);  
    
    ctx.body = result;
    // result.then((resp) => {
    //   ctx.body = {result:resp};
    // })
      
  }

}

module.exports = paymentController;
