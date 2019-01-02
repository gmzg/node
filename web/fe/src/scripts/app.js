import body from './views/body.html';
import router from "./router/route";
import user from "./views/user.html";
import userEvent from "./controllers/user";

import nav from "./controllers/nav";
import '../style/app.css';
//填充主体部分
$("#root").html(body);
$("#user").html(user);
nav.render();
userEvent.render();
//载入路由
router.render();

//路由导航
router.navlink();
