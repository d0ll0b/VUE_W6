import{M as U}from"./MessageToast-xh-Gpjaf.js";import{_ as w,r as f,o as d,c,b as n,a as s,i as m,F as k,h as C,t as p,w as q,d as V,f as L,v as M,n as g}from"./index-hTMWHt8X.js";const _="https://ec-course-api.hexschool.io/v2",h="dollob_api",B={data(){return{carts:{},total:"",finalTotal:"",isLoading:!1,form:{user:{name:"",email:"",tel:"",address:""},message:""}}},components:{MessageToast:U},methods:{add_cart(a,t=1,r){let i="",e="";const u=`加入購物車成功，新增${t}筆商品~~`;this.isLoading=!0,r==="new"?(i=`${_}/api/${h}/cart`,e="post"):(i=`${_}/api/${h}/cart/${r}`,e="put");const y={product_id:a,qty:t};this.axios[e](i,{data:y}).then(b=>{this.get_cart(),this.toastMsg(u)}).catch(b=>{alert(b)}).finally(()=>{this.isLoading=!1,this.$refs.userProductModal.hide_Model()})},get_cart(){this.isLoading=!0;const a=`${_}/api/${h}/cart`;this.axios.get(a).then(t=>{const{carts:r,total:i,finalTotal:e}=t.data.data;this.carts=r,this.total=i,this.finalTotal=e}).catch(t=>{alert(t)}).finally(()=>{this.isLoading=!1})},delete_cart(a=null){let t="",r="",i="";this.isLoading=!0,a===null?(i=confirm("是否清空購物車？"),t=`${_}/api/${h}/carts`,r="購物車已清空 ಥ_ಥ"):(i=confirm("是否刪除品項？"),t=`${_}/api/${h}/cart/${a}`,r="已從購物車刪除 ಥ_ಥ"),i&&this.axios.delete(t).then(e=>{this.get_cart(),this.toastMsg(r)}).catch(e=>{alert(e)}).finally(()=>{this.isLoading=!1})},onSubmit(){const a=`${_}/api/${h}/order`;this.isLoading=!0,this.axios.post(a,{data:this.form}).then(t=>{this.get_cart(),this.$refs.form.resetForm(),this.form.message="",this.toastMsg("訂單已成交，謝謝~~")}).catch(t=>{alert(t)}).finally(()=>{this.isLoading=!1})},toastMsg(a){this.$refs.messageToast.show_toast(a)}},mounted(){this.get_cart()}},S=s("h3",null,"購物車",-1),N={class:"container"},E={class:"mt-4"},F={class:"text-end"},j={class:"table align-middle"},D=s("thead",null,[s("tr",null,[s("th"),s("th",null,"品名"),s("th",{style:{width:"150px"}},"數量/單位"),s("th",null,"單價")])],-1),P=["onClick"],z={key:0,class:"fas fa-spinner fa-pulse"},O={key:0,class:"text-success"},A={class:"input-group input-group-sm"},G={class:"input-group mb-3"},H=["onUpdate:modelValue","disabled","onBlur"],I={class:"input-group-text",id:"basic-addon2"},J={class:"text-end"},K={key:0,class:"text-success"},Q=s("td",{colspan:"3",class:"text-end"},"總計",-1),R={class:"text-end"},W={key:0},X=s("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),Y={class:"text-end text-success"},Z={class:"my-5 row justify-content-center"},$={class:"mb-3"},ss=s("label",{for:"email",class:"form-label"},"Email",-1),es={class:"mb-3"},ts=s("label",{for:"name",class:"form-label"},"收件人姓名",-1),os={class:"mb-3"},ls=s("label",{for:"tel",class:"form-label"},"收件人電話",-1),as={class:"mb-3"},ns=s("label",{for:"address",class:"form-label"},"收件人地址",-1),is={class:"mb-3"},rs=s("label",{for:"message",class:"form-label"},"留言",-1),ds={class:"text-end"};function cs(a,t,r,i,e,u){const y=f("VueLoading"),b=f("message-toast"),v=f("v-field"),x=f("error-message"),T=f("v-form");return d(),c(k,null,[S,n(y,{active:e.isLoading},null,8,["active"]),s("div",N,[s("div",E,[n(b,{ref:"messageToast"},null,512),s("div",F,[e.carts.length?(d(),c("button",{key:0,class:"btn btn-outline-danger",type:"button",onClick:t[0]||(t[0]=o=>u.delete_cart())},"清空購物車")):m("",!0)]),s("table",j,[D,s("tbody",null,[e.carts?(d(!0),c(k,{key:0},C(e.carts,o=>(d(),c("tr",{key:o.id},[s("td",null,[s("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:l=>u.delete_cart(o.id)},[e.isLoading?(d(),c("i",z)):m("",!0),V(" x ")],8,P)]),s("td",null,[V(p(o.product.title)+" ",1),o.coupon?(d(),c("div",O," 已套用優惠券 ")):m("",!0)]),s("td",null,[s("div",A,[s("div",G,[L(s("input",{min:"1",type:"number",class:"form-control","onUpdate:modelValue":l=>o.qty=l,disabled:e.isLoading,onBlur:l=>u.add_cart(o.product_id,o.qty,o.id)},null,40,H),[[M,o.qty,void 0,{number:!0}]]),s("span",I,p(o.product.unit),1)])])]),s("td",J,[o.coupon?(d(),c("small",K,"折扣價：")):m("",!0),V(" "+p(o.product.price),1)])]))),128)):m("",!0)]),s("tfoot",null,[s("tr",null,[Q,s("td",R,p(e.total),1)]),e.carts.total!==e.carts.finalTotal?(d(),c("tr",W,[X,s("td",Y,p(e.finalTotal),1)])):m("",!0)])])]),s("div",Z,[n(T,{ref:"form",class:"col-md-6",onSubmit:u.onSubmit},{default:q(({errors:o})=>[s("div",$,[ss,n(v,{id:"email",name:"email",type:"email",class:g(["form-control",{"is-invalid":o.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:e.form.user.email,"onUpdate:modelValue":t[1]||(t[1]=l=>e.form.user.email=l)},null,8,["class","modelValue"]),n(x,{name:"email",class:"invalid-feedback"})]),s("div",es,[ts,n(v,{id:"name",name:"name",type:"text",class:g(["form-control",{"is-invalid":o.name}]),placeholder:"請輸入姓名",rules:"required",modelValue:e.form.user.name,"onUpdate:modelValue":t[2]||(t[2]=l=>e.form.user.name=l)},null,8,["class","modelValue"]),n(x,{name:"name",class:"invalid-feedback"})]),s("div",os,[ls,n(v,{id:"tel",name:"tel",type:"tel",class:g(["form-control",{"is-invalid":o.tel}]),placeholder:"請輸入電話",rules:"required|minMaxLength:8,10",modelValue:e.form.user.tel,"onUpdate:modelValue":t[3]||(t[3]=l=>e.form.user.tel=l)},null,8,["class","modelValue"]),n(x,{name:"tel",class:"invalid-feedback"})]),s("div",as,[ns,n(v,{id:"address",name:"address",type:"text",class:g(["form-control",{"is-invalid":o.address}]),placeholder:"請輸入地址",rules:"required",modelValue:e.form.user.address,"onUpdate:modelValue":t[4]||(t[4]=l=>e.form.user.address=l)},null,8,["class","modelValue"]),n(x,{name:"address",class:"invalid-feedback"})]),s("div",is,[rs,L(s("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":t[5]||(t[5]=l=>e.form.message=l)},null,512),[[M,e.form.message]])]),s("div",ds,[s("button",{type:"submit",class:g(["btn btn-danger",{disabled:Object.keys(o).length!==0||!e.carts.length}])},"送出訂單",2)])]),_:1},8,["onSubmit"])])])],64)}const _s=w(B,[["render",cs]]);export{_s as default};