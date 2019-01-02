const mongoose  = require('../utils/database')

//创建结合的数据模板
const positionSchema = new mongoose.Schema({
    goodsLogo:String,
    goodsname:String,
    price: String,
    detail: String,
    createDate: String
})
//定义集合的名称

const PositionModel = mongoose.model('positions',positionSchema);

//保存一条职位信息
const save = (data)=>{
    return new PositionModel(data)
      .save()
      .then((result)=>{
          console.log(result)
          return result
      })
}
// console.log(PositionModel.positions)
//取到全部职位信息
const list = ({pageNo,pageSize,keywords}) =>{
    let reg = new RegExp(keywords, 'gi')
    return  PositionModel
      .find({
          $or:[{
              "goodsname":reg
          }]
      }
         
      )
      .sort({
          _id:-1
      })
      .limit(~~pageSize)
      .skip(~~(pageNo-1)*pageSize)
      .then((result)=>{
        return result
      })    
}
//获取全部数据
const listall = (keywords)=>{
    let reg = new RegExp(keywords,"gi")
    return PositionModel
           .find({
               $or:[
                   {"goodsname":reg}
                  ]
           })
           .then((result)=>{
               return result
           })
}
//删除数据
const remove = (id)=>{
    return PositionModel
        .findByIdAndDelete(id)
        .then((result)=>{
            return result
        })
}
//找到固有ID的数据
const update = (id)=>{
    return PositionModel
        .findById(id)
        .then((result)=>{
            return result
        })
}
//修改数据保存
const changedate =({id,data})=>{
    return PositionModel
    .findByIdAndUpdate(id, data)
    .then((result)=>{
        return result
    })
}

module.exports = {
    save,
    list,
    listall,
    remove,
    update,
    changedate
}