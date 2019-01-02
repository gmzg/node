//引入第三方路由
import SMErouter from  "sme-router";


//引入模板
import homeTpl from "../views/home.html";
import positionController  from "../controllers/position";


//路由定义
var router =null;
const _render = ()=>{
    //router-view内容更换的body
    router = new SMErouter('router-view');
    //定义homeTpl模块的路由
    router.route('/home',(req,res,next)=>{
        positionController.home(req,res,next)
        // res.render(homeTpl);
    })
    // router.route('/positionList',(req,res,next)=>{
    //     res.render(positionTpl);
    // })
    router.route('/positionList',(req,res,next)=>{
        positionController.list({
            router,
            req,
            res,
            next
        })    
    })
    //添加按钮的路由
    router.route('/position_save',(req,res,next)=>{
        positionController.save({
            router,
            req,
            res,
            next
        })             
    })
    //修改页面路由定义
    router.route("/update",(req,res,next)=>{
        positionController.update({
            router,
            req,
            res,
            next
        })   
    })
    //当路由都不匹配时
    router.route('*',(req,res,next)=>{
        res.redirect("/home");
    })
    // 第一次渲染页面时，需要将路由导航到 /home
    // router.go('/home')
    //定义中间件，当路由切换时调用函数
    router.use((req)=>{
        _activelink(req.route);
    })

}
//路由导航
const _navlink = ()=>{
    let $lis = $('#sidebar-menu li[to]');
    $lis.on("click",function(){
        router.go($(this).attr("to"));
    })
}
//高亮
const _activelink = (route)=>{
    let $lis = $("#sidebar-menu li[to]");
    $lis.filter(`[to="${route}"]`)
        .addClass('active')
        .siblings()
        .removeClass('active');

}


//暴露
 export default {
    render:_render,
    navlink:_navlink
}
