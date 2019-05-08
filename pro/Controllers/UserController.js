const dao = require('../dao/UserDao')
const SIZE=5;

//查询一个用户
exports.get=async function (req,res) {
    let ret={code:1,msg:"ok",user_data:{}}
    let {phone,passwd} = req.query
    let user = await dao.get(phone,passwd)//只要是select，返回的一定是一个数组
    if(user.length==1){
        ret.user_data = user[0]
    }else{
        ret.code=0
    }
    res.send(ret)
}

//增加用户
exports.add=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let user = req.body
    try{
        let result = await dao.add(user)
        if(result.affectedRows==1){
            user.id = result.insertId
            ret.user = user
        }
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }

    res.send(ret)
}

//查询hot列表
exports.getHot=async function (req,res) {
    let ret={code:1,msg:"ok",hot_data:{}}
    let {page} = req.query
    if(!page){
        page = 1
    }
    let hot = await dao.getHot(page,SIZE)//只要是select，返回的一定是一个数组
    ret.hot_data = hot
    res.send(ret)
}

//搜索
exports.search=async function (req,res) {
    let ret={code:1,msg:"ok",list:{}}
    let {name} = req.query
    let list = await dao.getSearch(name)//只要是select，返回的一定是一个数组
    ret.list = list
    res.send(ret)
}

//订单查询
exports.getOrder=async function (req,res) {
    let ret={code:1,msg:"ok",list:{}}
    let {id} = req.query
    let list = await dao.getOrder(id)//只要是select，返回的一定是一个数组
    ret.list = list
    res.send(ret)
}

//订单删除
exports.delete=async function (req,res) {
    let ret={code:1,msg:"ok",list:{}}
    let {user_id,goods_id} = req.body
    let list = await dao.deleteOrder(user_id,goods_id)//只要是select，返回的一定是一个数组
    ret.list = list
    res.send(ret)
}

//订单添加修改
exports.addOrder=async function (req,res) {
    let ret={code:1,msg:"ok",list:{}}
    let {user_id,goods_id} = req.body
    if(req.body.num){
        var num = req.body.num
    }
    let a = await dao.isOrder(user_id,goods_id)
    if(a.length>0){
        if(!num){
            let GetNum = await dao.dealNum(user_id,goods_id)
            var num = GetNum[0].num+1
        }
        var list = await dao.pushOrder(num,user_id,goods_id)
    }else{
        var list = await dao.addOrder(user_id,goods_id)
    }
    ret.list = list
    res.send(ret)
}