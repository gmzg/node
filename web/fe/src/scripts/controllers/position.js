import positionsaveTpl from '../views/position.save.html';
import positionTpl from '../views/position.list.html';
import positionModels from "../models/position";
import updateTpl from '../views/position.update.html';
import homeTpl from '../views/home.html'
//list页面按钮绑定点击事件
const _genToken = () => {
    return new Date().getTime() + Math.random()
  }
const _addlink = ({router,req}) => {
    $("#addbtn").on("click", function () {
        router.go("/position_save");
    });
    //删除按钮
    $(".pos-remove").on('click',async function(){
        let id = $(this).attr('posid');
        // let {pageSize=2} = req.query || {};
        let result = await positionModels.remove(id);
        if(result.ret){
            let {keywords = '', pageNo=1,pageSize=2} = req.query || {}
            console.log( req.query)
            // pageNo = req.query.pageNo || 1;
            // let keywords = req.query.keywords;
            let total = (await positionModels.listall()).data;
            let nowpageNO = ~~Math.ceil(total/pageSize);
            if(~~pageNo>nowpageNO && ~~pageNo!=1){
               pageNo = ~~pageNo-1;
            }
               router.go(`/positionList?_=${id}&pageNo=${~~pageNo}&pageSize=${pageSize}&keywords=${keywords}`)
        }else{
            alert(result.data.msg)
        }
    })

    //搜索框
    $("#possearch").on("click",async function(){
        let keywords = $("#keywords").val();
        let query = {
            ...req.query,
            keywords,
            pageNo: 1,//返回第一页
            _: _genToken
        }
        router.go("/positionList?"+$.param(query))
    })
    //修改按钮
    $(".pos-update").on("click",function(){
        let id = $(this).attr("posid");
        router.go('/update',{id})       
    }) 
}

//修改页面按钮事件绑定
const _bindupdateEvent = (router)=>{

    //返回按钮
    $("#posback").on("click",()=>{
        router.back();
    })
    //提交按钮
    $('#possubmit').on('click',async()=>{
        // let data = $("#posupdate").serialize();   
        // let result = await positionModels.changedate(data);
        let result = await positionModels.changedate();
        if(result){
            alert(result.data.msg)
        }else{
            alert("修改失败");
        }    
    })
}
//修改页面渲染
const update = async({router,res,req,next})=>{
    let id = req.body.id;
    let result = (await positionModels.update(id)).data;
    let html = template.render(updateTpl,{result}); 
    res.render(html); 
    _bindupdateEvent(router);        
}

   

//添加页面按钮绑定事件
const _bindSaveEvent = (router)=>{
    //返回按钮
    $("#posback").on("click",()=>{
        router.back();    
    })
    //提交按钮
    $('#possubmit').on("click",async ()=>{
        // let data = $("#possave").serialize();   
        // let result = await positionModels.save(data);
        //图片加数据提交
        let result = await positionModels.save();
        if(result){
            $("#possave").get(0).reset()
        }else{
            alert(result.data.msg);
        }

    })
}


const list = async ({ req,res, router }) => {
    let {pageNo = 1,pageSize = 2,keywords=""} = req.query || {};
    let open  = (await positionModels.list({pageNo,pageSize,keywords}))
    if(!open.ret){
        router.go('/home')
        return
    }
    
    //短路运算符
    //默认设置pageNo,pageSize,keywords
    // let {pageNo = 1,pageSize = 2,keywords=""} = req.query || {};
    let result  = (await positionModels.list({pageNo,pageSize,keywords})).data
    let total = (await positionModels.listall()).data.total;
    
    let pageCount = Math.ceil(total/~~pageSize);
    let html = template.render(positionTpl, {
        data:result.list,
        all:new Array(~~Math.ceil(result.all/pageSize)),
        pageNo:pageNo,
        pageSize:pageSize,
        keywords,
        pageCount
    })
    res.render(html)
    _addlink({router,req});
    $('#list').addClass('active1')
    $('#first').removeClass('active1')
    
}
const home = (req,res,next)=>{
    res.render(homeTpl)
    $('#first').addClass('active1')
    $('#list').removeClass('active1')
}
//添加页面
const save = ({ router,res }) => {
    res.render(positionsaveTpl);
    _bindSaveEvent(router);
}

export default {
    list,
    save,
    update,
    home
}