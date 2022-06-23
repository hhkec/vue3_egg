module.exports = () => {
    return async function (ctx, next) {
        if (ctx.session.userClass === "高级") {
            await next();
        } else {
            await ctx.redirect("/public/login.html");   //重定向，跳转到该页
        }
    }
};