let mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');

//mysql连接池
function OptPool(){
    this.flag = true;   //是否连接过
    this.pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'kmes',
        port     : '3306'
    });

    this.getPool = function (){
        if(this.flag) {
            //监听connection事件
            this.pool.on('connection',function(connection){
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            })
        }
        return this.pool;
    }
};

module.exports = OptPool;
