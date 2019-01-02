const multer = require('multer');
const path = require('path');
const positionModels = require('../models/position')

//磁盘存储
var filename = ''; 
var storage = multer.diskStorage({
    //设置要存储的路径
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
    },
    //设置要生成图片的名字
    filename: function (req, file, cb) {
        let originalName = file.originalname
        let ext = originalName.substr(originalName.lastIndexOf('.'))
         filename = file.fieldname + '-' + Date.now() + ext
        // 将文件名绑定在req.body对象上，目的是在下一个中间件中能够获取到此文件名，并入库
        req.body.goodsLogo = filename
        cb(null, filename)
    }
})
//筛选文件类型
const fileFilter = (req, file, cb) => {

    // 这个函数应该调用 `cb` 用boolean值来
    // 指示是否应接受该文件

    // 文件类型满足条件
    // let type = ['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)
    if (/^image/.test(file.mimetype)) {
        // 接受这个文件，使用`true`，像这样:
        cb(null, true)
    } else {
        // 拒绝这个文件，使用`false`，像这样:
        cb(null, false)
        // 如果有问题，你可以总是这样发送一个错误:
        cb(new Error('文件类型必须是.jpg, .jpeg, .png, .gif'))
    }
}
//错误处理机制
const upload = multer({
    storage,
    fileFilter
}).single('goodsLogo')

const fileupload = (req, res, next) => {
    upload(req, res,async(err) => {
        if (err) {
            res.render('position', {
                ret: false,
                data: JSON.stringify({
                    msg: err.message
                })
            })
        } else {
            if(!!filename){
                next()    
            }else{
                let result = await positionModels.update(req.body.id);
                req.body.goodsLogo = result.goodsLogo;
                next();
            }
            //全局变量置空
            filename = ''
        }
    })
}

module.exports = {
    fileupload
}