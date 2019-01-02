const positionModel = require('../models/position')

const moment = require('moment')

const list = async (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=utf-8');
    console.log(req.query,1)
    let {pageNo=1,pageSize=5,keywords=''} = req.query
    let list = await positionModel.list({pageNo,pageSize,keywords});
    let all = (await positionModel.listall(keywords)).length;
    console.log(all)
    if (list) {
        //将.ejs模板内容读取出来并返回给前端
        res.render('position', {
            ret: true,
            data:JSON.stringify({
                list,
                all
            })
        })
    } else {
        res.render('position', {
            ret: false,
            data: JSON.stringify({
                msg: "数据获取失败"
            })
        })
    }
}
const listall = async(req,res,next)=>{
    res.header("Content-Type",'application/json; charset=utf-8')
    let {keywords} = req.query
    let result = await positionModel.listall(keywords);
    console.log(result)
    if(result){
        res.render('position',{
            ret:true,
            data:JSON.stringify({total:result.length})
        })
    }
}
const save = async (req, res, next) => {

    //设置返回数据类型为JSon类型
    res.header('Content-Type', 'application/json; charset=utf-8')
    //给model中save传参
    let result = await positionModel.save({
        ...req.body,
        createDate: moment().format('YYYY-MM-DD HH:mm')
     
    });

    if (result) {
        //保存成功返回给前段的提示，ajax成功时接收的数据
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                msg: '数据保存成功'
            })
        })
    } else {
        res.render('position', {
            ret: false,
            data: JSON.stringify({
                msg: '数据保存失败'
            })
        })
    }

}
//删除功能
const remove = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    const id = req.body.id;
    let result = await positionModel.remove(id);
    if (!!result) {
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                msg: '数据删除成功'
            })
        })
    }
}
const update = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let id = req.body.id;
    let result = JSON.stringify(await positionModel.update(id));
    if (!!result) {
        res.render('position', {
            ret: true,
            data:result
        })
    }


}
//修改信息
const changedate =async (req,res,next)=>{
    res.header('Content-Type', 'application/json; charset=utf-8')
    let id = req.body.id;
    let data = req.body;
    let result =  positionModel.changedate({id,data});
    if(!!result){
        res.render('position',{
            ret:true,
            data: JSON.stringify({
                msg:"数据修改成功"
            })
        })
    } 
}

module.exports = {
    list,
    listall,
    save,
    remove,
    update,
    changedate
}