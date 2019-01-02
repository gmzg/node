const list = ({pageNo,pageSize,keywords})=>{
    return $.ajax({
        url:"/api/position/list",
        data:{
            pageNo,
            pageSize,
            keywords
        },
        success:(result)=>{
            return result
        }
    })
}
const listall = ()=>{
    return $.ajax({
        url:"/api/position/listall",
        success:(result)=>{
            return result
        }
    })
}

const save = (data)=>{
    // return $.ajax({
    //     url:'/api/position/save',
    //     type:"post",
    //     data,
    //     success:(result)=>{
    //         return result
    //     }
    // })
    return new Promise((resolve, reject) => {
        var options = {
          "success": (result) => {
            resolve(result)
          },
          "resetForm": true,
          "dataType": "json"
        };
        $("#possave").ajaxSubmit(options)
      })
}
const remove = (id)=>{
    return $.ajax({
        url:'api/position/remove',
        type:'post',
        data:{
            id
        },
        success:(result)=>{
            return result
        }
        
    })
}
const update = (id)=>{
    return $.ajax({
        url:'api/position/update',
        type:'post',
        data:{
            id
        },
        success:(result)=>{
            return result
        }
    })
}
//修改数据

const changedate = ()=>{
    // return $.ajax({
    //     url:'api/position/changedate',
    //     type:"post",
    //     data,
    //     success:(result)=>{
    //         return result
    //     }
    // })
    return new Promise((resolve, reject) => {
        var options = {
          "success": (result) => {
            resolve(result)
          },
          "resetForm": true,
          "dataType": "json"
        };
        $("#posupdate").ajaxSubmit(options)
      })
}
export default {
    list,
    save,
    listall,
    remove,
    update,
    changedate
}