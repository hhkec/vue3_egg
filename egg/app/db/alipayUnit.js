const AlipaySdk = require('alipay-sdk').default;

const alipaySdk = new AlipaySdk({
  //appId  买家账号： trdqei4717@sandbox.com
  appId: '2021000120616664',  
  //签名算法，不建议修改                                 
  signType:'RSA2',
  //openapi.alipay.com/gateway.do 	支付宝网关地址 ，沙箱环境下使用时需要修改
  gateway:'https://openapi.alipaydev.com/gateway.do', 
  //支付宝公钥(通过 密钥工具生成的应用公钥 在https://openhome.alipay.com/develop/sandbox/app上生成的支付宝公钥)
  alipayPublicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjCDgkadF4nodcKA1aMaK5uLBtra5s/g9DXUhdAYUTwF7zthtKHQ/310BD4Zmp9gh3iGZRYAfHLhPeJn8WpSAbZDB0kpNTvK6IuncXPRWitxwZl5uiS6jTfm+cK6FjgWfxqYhApyrvAC7eEL2iKK0rFQZBqPQyk3FFiVAWdHNJjUSefCQAM81HVBp/cmYGXcJ+YytM7ScFFhH63VjpGaAGEIlvUCdkE2FzSq+3+NMmTVP82hseOPGu3GTRwWa2UmXwRNS1u/hwnILMTBbUirOPU4e+W52mu1l1QhzZcThMN59mu7xRqhK5dvM9TkPnl5c/tcSmXXgVjdobv4MddLscQIDAQAB', 
  //应用私钥，密钥工具生成的应用私钥，工具下载地址：https://opendocs.alipay.com/common/02kipl
  privateKey: 'MIIEpgIBAAKCAQEA2hbYXC/3EbfLSeq4Agp+ASeNKgAmOy19lUkbAuhyuhX2OVdwN13RNopMd4mtFX+78f/gsfm8b+2r+46KW+s3a/lo/acbw8PjUOaVUMDZksKSPiL4cPxFnAWqxzhyxtVc9iHjs0d/AXQowJlSTRiPUwwNZGKhb4GbhJTwAFhDDwAtE1OgzWOu4qW2XWzyEEoO5/Uiqr33WkhWpGQ1j2xxdFM3I5U2xjwgXNPhhl2UFWWk53RC7vYu4XF6NiU5nTOZAVayw0w81B+eIMcy8VhX1rrur/APnkf1hifdA6KxJES71AA4za+vFaLH/k96t59JHPGGSGwiMZK93oxnN7k3kQIDAQABAoIBAQCVR0vjliVc6FxrBRHcu8fSDHuQwzdoDFRIqhimHevhugSm7VXvX/VDitiafg+OhrdkB0yLJjE4wAuXjdLg5hkyfC7EaO0VS/E9wAd2lfqXfT1S8Obzl4oiKLLj2Jyfww31n+7XGVoy6Yq3gnsWMHhyVO6ZxvVPePy1fKjm44NLMQSBkzeITwdyIuzJrxnU5qjOeWPs+k8qzg+5GDxVWxH0egaHyYvOXYpA0Ba/rg/ojxmLI2NXowttY5hKthjP6ugbB4hKRyVLkpk6q25XqVEvcBoohw7Fg+samukV4BF4kHZqYoBoxxsqLLMGRA21DAb9jpaf96tjL5Radi3xWYXBAoGBAPwpgDeEXBFM7XW0AjCIP6tn1VtIAa/7nYyn6TBDkyQigKfqrDDv2cTo7uePWSAB6U/hsqoBoxJuPw6Oc2/+9oAs/pp5Bexzxw5a24jhkiRljPUftfmBI/Q5vekLNO7GYaqzJ68sUpSUxxZZUrdVM1r9tYmC/BybAuSeNuS+T1QZAoGBAN1olhAYzHL9EqvMFhZfuxm4/DqmIBhW80X83myqU+vvqROwXSnhxGnDZjKDveFROLHkonD9rZSHhMVi9b2lLgCgnrnK9bg9vZ5ETIZ2Vpa8UDNej0UGoomqG4hHeOtyOHgFsYnqAJGOb3PVq96yTP/PRgHndyLacDxa1sQE6y45AoGBAJWRpDzJ5LZaU+tiB350ApgP8czADEgvTgc1ParkGi3vzTJMjzBDxH74z2RIccv7dkFslUYjzG9NN1fSBQTkTaA/kBFeQbY8AlEwcVFiwwWVuqNW2OCSyhm9+jh17kLHJv1SYPKVrrH1AZXvC5I1Fk4deQWEzTfGdlPWyKarf3BZAoGBANCiiSXJ+H4ys7FnsziKJQjsI+IwQPYumTdOPVowdrxRLgX7nw6kTC1Nj7PyKK91lfMr+1Z19WeM/DP0OJToXh0BPhDdjAZ9R30n5uSeBqIr+Xcul9r3kZofzanxj6RuEYAn/VB0TOzcR3Hj2v0TDzPO4a1RrBYPuMtm3hIAgI0hAoGBAJv3Py8tfuy/uAsHqNU3faUpUQlrIPdPBcAnlC18Xpxc+fGQ3Eq7FmW+LgXKaiGQyq6tqMYBz0WV/+N1IisWCjQPK7+nnri2o+kSbn2HT3nQFUkQTLCAXECjIcIYNEiyHFNO8Oz3gAkbhme7bLdYbn35k/GvV5V/ktsG8LRkuwTi'    

});

// 1、资料教材
// https://www.yuque.com/chenqiu/alipay-node-sdk/config-sdk
// 2、支付宝沙箱
// https://openhome.alipay.com/develop/sandbox/app

module.exports = alipaySdk;