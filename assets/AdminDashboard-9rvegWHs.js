import{_ as m,r as u,o as d,c as k,a as i,b as n,w as a,d as e,j as _,k as f,i as x,F as g}from"./index-Ej6bj2S0.js";const $="https://ec-course-api.hexschool.io/v2";let r="";const V={data(){return{isLogin:!1}},methods:{checkAdmin(){const o=`${$}/api/user/check`;this.axios.post(o,{api_token:r}).then(t=>{alert(o),this.isLogin=!0}).catch(t=>{alert(t),alert(o),this.$router.push("/login")})},signout(){document.cookie="hexToken=;expires=",alert("已成功登出~~"),this.$router.push("/login")}},mounted(){r=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),this.axios.defaults.headers.common.Authorization=r,this.checkAdmin()}},w=i("h1",null,"後台導覽列",-1);function L(o,t,v,A,l,c){const s=u("RouterLink"),h=u("RouterView");return d(),k(g,null,[w,i("nav",null,[n(s,{to:"/"},{default:a(()=>[e("返回前台")]),_:1}),e(" | "),n(s,{to:"/admin/products"},{default:a(()=>[e("產品列表")]),_:1}),e(" | "),n(s,{to:"/admin/orders"},{default:a(()=>[e("訂單列表")]),_:1}),e(" | "),i("a",{href:"#",onClick:t[0]||(t[0]=_((...p)=>c.signout&&c.signout(...p),["prevent"]))},"登出")]),l.isLogin?(d(),f(h,{key:0})):x("",!0)],64)}const C=m(V,[["render",L]]);export{C as default};
