import SMErouter from  "sme-router";
const render = ()=>{
    let router = new SMErouter('router-view');
    $('#first').on('click',()=>{
        router.go('/home')
    })
    $('#list').on('click',()=>{
        router.go('/positionList')
    })
    let hash = location.hash;
    console.log(hash=="#/home")
    if(hash=="#/home"){
       $('#first').addClass('active1')
     }

}

export default{
    render
}