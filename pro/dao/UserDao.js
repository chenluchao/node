const MySQL = require('./MySQL')

//登录查询用户
exports.get=function(phone,passwd){
    let sql = "select * from tb_user where phone=? and passwd=?"
    let data = [phone,passwd]
    return MySQL.query(sql,data)
}

//增加用户
exports.add=function(user){
    let sql = "insert into tb_user(phone,passwd) values(?,?)"
    let data = [user.phone,user.passwd]
    return MySQL.query(sql,data)
}
//查询hot列表
exports.getHot=function(page,size){
    let sql = "select * from tb_hot limit ?,?"
    let data = [(page-1)*size, size]
    return MySQL.query(sql,data)
}

//搜索
exports.getSearch=function(name){
    let sql = "select * from tb_hot where name like ?"
    let con = "%"+name+"%"
    let data = [con]
    return MySQL.query(sql,data)
}

//订单查询
exports.getOrder=function(id){
    let sql = "select a.*,b.num FROM tb_hot a,tb_order b WHERE a.id=b.goods_id and b.user_id = ?"
    let data = [id]
    return MySQL.query(sql,data)
}

//订单删除
exports.deleteOrder=function(user_id,goods_id){
    let sql = "DELETE FROM tb_order WHERE user_id = ? AND goods_id = ?"
    let data = [user_id,goods_id]
    return MySQL.query(sql,data)
}

//判断订单是否已经存在
exports.isOrder=function(user_id,goods_id){
    let sql = "select * FROM tb_order WHERE user_id = ? AND goods_id = ?"
    let data = [user_id,goods_id]
    return MySQL.query(sql,data)
}

/*如果订单已经存在则执行修改Num
*   参数：user_id
*        goods_id
*        num: int
*        传进num数据库直接设置为num值前端进行已有商品和添加数目相加计算
* */
exports.pushOrder=function(num,user_id,goods_id){
    let sql = "update tb_order set num = ? WHERE user_id = ? AND goods_id = ?"
    let data = [num,user_id,goods_id]
    return MySQL.query(sql,data)
}

//如果订单不存在则添加一条新的
exports.addOrder=function(user_id,goods_id){
    let sql = "insert into tb_order(user_id,goods_id) values(?,?)"
    let data = [user_id,goods_id]
    return MySQL.query(sql,data)
}

//查询num的值
exports.dealNum=function(user_id,goods_id){
    let sql = "select num FROM tb_order WHERE user_id = ? AND goods_id = ?"
    let data = [user_id,goods_id]
    return MySQL.query(sql,data)
}