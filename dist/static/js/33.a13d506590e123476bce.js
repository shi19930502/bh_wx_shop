webpackJsonp([33],{"0NaA":function(t,e,s){"use strict";function a(t){s("8yjt")}Object.defineProperty(e,"__esModule",{value:!0});var i=s("MNi2"),r=s("t1kk"),o=s("XyMi"),n=a,l=Object(o.a)(i.a,r.a,r.b,!1,n,null,null);e.default=l.exports},"8yjt":function(t,e,s){var a=s("yW8x");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=s("rjj0").default;i("1304ff15",a,!0,{})},BO1k:function(t,e,s){t.exports={default:s("fxRn"),__esModule:!0}},"H+kO":function(t,e,s){"use strict";var a=s("BO1k"),i=s.n(a);e.a={data:function(){return{categoryList:[],gbgoodsId:"",secondCategoryList:[],isUserEnter:!1,isOftenBuy:!1}},methods:{addActiveStatus:function(t){var e=1;e=this.isUserEnter?0:1;for(var s in t)t[s].isActive=s==e;return t},menuClick:function(t){this.pageNum=1,this.productList=[],this.$refs.productList&&this.$refs.productList.$emit("ydui.infinitescroll.reInit"),t.isActive||(t.isActive=!0);var e=!0,s=!1,a=void 0;try{for(var r,o=i()(this.categoryList);!(e=(r=o.next()).done);e=!0){var n=r.value;t.id!=n.id&&(n.isActive=!1)}}catch(t){s=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(s)throw a}}if("oftenbuy"==t.id)this.secondCategoryList=[],this.isOftenBuy=!0,this.gbgoodsId="",this.getProductList();else if(this.isOftenBuy=!1,t.childList){this.secondCategoryList=t.childList;for(var l in this.secondCategoryList)0!=l&&this.secondCategoryList[l].isActive&&(this.secondCategoryList[l].isActive=!1);this.gbgoodsId=t.gbgoodsId,this.getProductList()}else this.secondCategoryList=[],this.gbgoodsId=t.gbgoodsId,this.getProductList()},getCategoryList:function(){this.getCategoryListSaveLocal()},getCategoryListSaveLocal:function(){var t=this;this.postRequest("category/childList",{parentCategoryId:"top",filteEnabled:1,filteDeleted:0,orderField:"t.f_id",supplierId:this.sellerId}).then(function(e){e&&e.data&&0==e.data.state&&(e.data.aaData.unshift({name:"常买",id:"oftenbuy"}),t.categoryList=t.addActiveStatus(e.data.aaData),t.getSonCategoryList(t.categoryList))})},getSonCategoryList:function(t){for(var e in t)if(t[e].childList)for(var s in t[e].childList)t[e].childList[s].isActive=!1;this.isOftenBuy?this.getProductList():t.length>1&&t[1].childList?(this.secondCategoryList=t[1].childList,this.gbgoodsId=t[1].gbgoodsId,this.getProductList()):(this.secondCategoryList=[],t.length>1&&(this.gbgoodsId=t[1].gbgoodsId,this.getProductList()))}}}},MNi2:function(t,e,s){"use strict";var a=s("vsZy");e.a={mixins:[a.a],data:function(){return{cgsActive:!1,gysActive:!1,form:{name:"",telephone:"",key:"",password:"",channelCode:"",invitationCode:"",loginName:""},repassword:"",ChannelList:[]}},created:function(){this.$store.dispatch("changeNavBarTitle","注册"),this.getChannelList()},methods:{getChannelList:function(){var t=this;this.postRequest("channel/list",{level:3}).then(function(e){e.data&&0==e.data.state&&e.data.aaData&&(t.ChannelList=e.data.aaData)})},save:function(){var t=this;return""==this.form.name?void this.$dialog.alert({mes:"请填写用户昵称"}):""==this.form.key?void this.$dialog.alert({mes:"请填选择身份"}):""==this.form.telephone?void this.$dialog.alert({mes:"请填写联系电话"}):""==this.form.password?void this.$dialog.alert({mes:"请填写密码"}):""==this.form.repassword?void this.$dialog.alert({mes:"请确认密码"}):this.repassword!=this.form.password?void this.$dialog.alert({mes:"两次密码不一致"}):"merchant"==this.form.key&&""==this.form.channelCode?void this.$dialog.alert({mes:"请选择渠道"}):void this.postRequest("customer/telephoneMatche",{telephone:this.form.telephone}).then(function(e){1==e.data.state?t.postRequest("customer/customerRegist",t.form).then(function(e){e.data&&0==e.data.state&&t.$dialog.toast({mes:"保存成功",timeout:1200,icon:"success",callback:function(){this.$router.go(-1)}.bind(t)})}):t.$dialog.alert({mes:e.data.msg})})},cgsClick:function(){this.form.key="buyer",this.cgsActive=!0,this.gysActive=!1},gysClick:function(){this.form.key="merchant",this.cgsActive=!1,this.gysActive=!0}}}},fYxN:function(t,e,s){"use strict";var a=s("BO1k"),i=s.n(a);e.a={data:function(){return{carIds:[],ShippingcarList:[],alreadyChosenGoods:[],orderTotal:0,shopCar:{shopNum:0,commodityNum:0,shopAllMoney:"0.00"},queryGrouplist:[]}},methods:{createShippingcar:function(t){var e,s=this,a={buyerId:this.userInfo.typeCode,productId:t.productId,productName:t.productName,skuId:t.id,skuName:t.name,quantity:t.quantity,comment:t.remark||"",sellerId:this.sellerId||this.$route.query.sellerId||t.sellerId};t.supplierId&&(a.sellerId=t.supplierId),t.skuId&&(a.skuId=t.skuId),t.skuName&&(a.skuName=t.skuName);var r=[],o=!0,n=!1,l=void 0;try{for(var d,c=i()(this.carIds);!(o=(d=c.next()).done);o=!0){var u=d.value;r.push(u.skuId)}}catch(t){n=!0,l=t}finally{try{!o&&c.return&&c.return()}finally{if(n)throw l}}if(this.isInArray(r,a.skuId)){e=0==t.quantity?"shippingcar/delete":"shippingcar/update";for(var h in this.carIds)this.carIds[h].skuId!=t.id&&this.carIds[h].skuId!=t.skuId||(a.id=this.carIds[h].carId);this.postRequest(e,a).then(function(t){t.data&&0==t.data.state&&s.getShippingcarList()})}else e="shippingcar/create",this.postRequest(e,a).then(function(e){if(e.data&&0==e.data.state){var a={skuId:t.id||t.skuId,carId:e.data.aaData.id};s.carIds.push(a),s.getShippingcarList()}else t.showjianBtn=!1,t.quantity=0,s.$dialog.alert({mes:e.data.msg})})},getShippingcarList:function(){var t=this;this.postRequest("shippingcar/queryGrouplist",{buyerId:this.userInfo.typeCode,sellerId:this.sellerId}).then(function(e){if(e.data&&0==e.data.state){t.ShippingcarList=e.data.aaData;var s=[];t.alreadyChosenGoods=[];for(var a in e.data.aaData){if(t.sellerId==a){var r=!0,o=!1,n=void 0;try{for(var l,d=i()(e.data.aaData[a]);!(r=(l=d.next()).done);r=!0){l.value.showjianBtn=!1}}catch(t){o=!0,n=t}finally{try{!r&&d.return&&d.return()}finally{if(o)throw n}}t.alreadyChosenGoods=e.data.aaData[a]}var c=!0,u=!1,h=void 0;try{for(var f,p=i()(e.data.aaData[a]);!(c=(f=p.next()).done);c=!0){var g=f.value,m={skuId:g.skuId,carId:g.id};s.push(m)}}catch(t){u=!0,h=t}finally{try{!c&&p.return&&p.return()}finally{if(u)throw h}}}t.carIds=s;for(var v=[],y=0;y<t.alreadyChosenGoods.length;y++)for(var A=0;A<t.carSettlementGoods.length;A++)t.alreadyChosenGoods[y].id==t.carSettlementGoods[A]&&v.push(t.carSettlementGoods[A]);t.carSettlementGoods=v,t.showShopCar&&t.carSettlementGoods.length<=0&&(t.isCheckAll=!1,t.$refs.checklistDemo.$emit("ydui.checklist.checkall",t.isCheckAll)),t.orderTotal=t.getOrderTotal(t.alreadyChosenGoods).priceTotal,"ShopSearch"!=t.$route.name&&"ProSkuList"!=t.$route.name&&"UserCollection"!=t.$route.name&&"Home"!=t.$route.name||t.getSearchProCar(e.data.aaData)}})},getSearchProCar:function(t){var e=0;this.queryGrouplist=[],this.shopCar.shopMoney="0.00";for(var s in t)e++,this.queryGrouplist=this.queryGrouplist.concat(t[s]);this.shopCar.shopNum=e,this.shopCar.commodityNum=this.queryGrouplist.length;for(var a=0;a<this.queryGrouplist.length;a++){var i=parseFloat(this.queryGrouplist[a].promotionPrice)*parseFloat(this.queryGrouplist[a].quantity);this.shopCar.shopMoney=(parseFloat(this.shopCar.shopMoney)+i).toFixed(2)}this.$refs.shopCarshopMoney&&(this.$refs.shopCarshopMoney.innerHTML="￥"+this.shopCar.shopMoney)},getOrderTotal:function(t){var e=0,s=0;for(var a in t)s+=t[a].quantity,t[a].promotionPrice>0&&t[a].promotionBasePrice>0?e+=t[a].quantity*t[a].promotionPrice.mul(100):e+=t[a].quantity*t[a].price.mul(100);return{priceTotal:(e/100).toFixed(2),quantityTotal:(s-0).toFixed(2)}},isInArray:function(t,e){for(var s=0;s<t.length;s++)if(t[s]==e)return!0;return!1},countVisits:function(){this.postRequest("store/countVisits",{sellerId:this.sellerId}).then(function(t){t.data&&t.data.state})}}}},fxRn:function(t,e,s){s("+tPU"),s("zQR9"),t.exports=s("g8Ux")},g8Ux:function(t,e,s){var a=s("77Pl"),i=s("3fs2");t.exports=s("FeBl").getIterator=function(t){var e=i(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return a(e.call(t))}},t1kk:function(t,e,s){"use strict";s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("yd-layout",[s("div",{attrs:{id:"UserReg"}},[s("yd-cell-group",[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[s("div",{staticClass:"lable"},[s("strong",[t._v("用户昵称")])])]),t._v(" "),s("yd-input",{attrs:{slot:"right",max:"20",placeholder:"请输入昵称"},slot:"right",model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[s("div",{staticClass:"lable"},[s("strong",[t._v("身份")])])]),t._v(" "),s("span",{attrs:{slot:"left"},slot:"left"},[s("span",{class:t.cgsActive?"sfbtn active":"sfbtn",on:{click:t.cgsClick}},[t._v("采购商")]),t._v(" "),s("span",{class:t.gysActive?"sfbtn active":"sfbtn",on:{click:t.gysClick}},[t._v("供应商")])])]),t._v(" "),s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[s("div",{staticClass:"lable"},[s("strong",[t._v("手机号码")])])]),t._v(" "),s("yd-input",{attrs:{slot:"right",max:"20",placeholder:"请输入联系电话"},slot:"right",model:{value:t.form.telephone,callback:function(e){t.$set(t.form,"telephone",e)},expression:"form.telephone"}})],1),t._v(" "),s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[s("div",{staticClass:"lable"},[s("strong",[t._v("密码")])])]),t._v(" "),s("yd-input",{attrs:{slot:"right",type:"password",max:"20",placeholder:"请输入密码"},slot:"right",model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[s("div",{staticClass:"lable"},[s("strong",[t._v("确认密码")])])]),t._v(" "),s("yd-input",{attrs:{slot:"right",type:"password",max:"20",placeholder:"请确认密码"},slot:"right",model:{value:t.repassword,callback:function(e){t.repassword=e},expression:"repassword"}})],1)],1),t._v(" "),s("yd-cell-group",{directives:[{name:"show",rawName:"v-show",value:t.cgsActive,expression:"cgsActive"}]},[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[s("div",{staticClass:"lable"},[s("strong",[t._v("邀请码")])])]),t._v(" "),s("yd-input",{attrs:{slot:"right",max:"20",placeholder:"选填"},slot:"right",model:{value:t.form.invitationCode,callback:function(e){t.$set(t.form,"invitationCode",e)},expression:"form.invitationCode"}})],1)],1),t._v(" "),s("yd-cell-group",{directives:[{name:"show",rawName:"v-show",value:t.gysActive,expression:"gysActive"}]},[s("yd-cell-item",{attrs:{arrow:""}},[s("span",{attrs:{slot:"left"},slot:"left"},[s("div",{staticClass:"lable"},[s("strong",[t._v("渠道")])])]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.form.channelCode,expression:"form.channelCode"}],attrs:{slot:"right"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.form,"channelCode",e.target.multiple?s:s[0])}},slot:"right"},t._l(t.ChannelList,function(e){return s("option",{domProps:{value:e.code}},[t._v(t._s(e.name))])}))])],1),t._v(" "),s("div",{staticClass:"flex flex-x-center",staticStyle:{padding:"0 0.24rem"}},[s("div",{staticClass:"loginbtn flex flex-y-center flex-x-center",on:{click:t.save}},[s("span",[t._v("注册")])])])],1)])},i=[]},vsZy:function(t,e,s){"use strict";var a=s("BO1k"),i=s.n(a),r=s("//Fk"),o=s.n(r),n=s("pyzf");s("fYxN"),s("H+kO");e.a={data:function(){return{uploadURL:n.a.uploadURL,cityName:n.a.cityName,imgURL:n.a.imgURL,userInfo:JSON.parse(localStorage.getItem("userInfo")),logisticsType:[{type:0,name:"自提",selected:!1},{type:1,name:"物流配送",selected:!0}],payType:[{type:0,name:"现金支付",selected:!0},{type:1,name:"POS刷卡",selected:!1},{type:2,name:"微信支付",selected:!1},{type:3,name:"支付宝支付",selected:!1}],distributionType:[{distributionType:0,name:"次日配送",selected:!0},{distributionType:1,name:"当日配送",selected:!1}]}},mounted:function(){},methods:{getServerTime:function(){var t=this;return new o.a(function(e,s){t.postRequest("store/getServerTime",{}).then(function(t){e(t&&0==t.data.state?t.data.aaData:null)})})},priceFormat:function(t){return"number"==typeof t?t.div(100)||0:t||0},blurAdjust:function(t){setTimeout(function(){if("INPUT"!=document.activeElement.tagName&&"TEXTAREA"!=document.activeElement.tagName){/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?"ios":/(Android)/i.test(navigator.userAgent)&&"android","ios"&&document.activeElement.scrollIntoViewIfNeeded(!0)}},100)},uniqueArr:function(t){var e=[],s={},a=!0,r=!1,o=void 0;try{for(var n,l=i()(t);!(a=(n=l.next()).done);a=!0){var d=n.value;s[d]||(e.push(d),s[d]=1)}}catch(t){r=!0,o=t}finally{try{!a&&l.return&&l.return()}finally{if(r)throw o}}return e},GetDateStr:function(t,e){var s=new Date;e&&(s=new Date(e.replace(/-/g,"/"))),s.setDate(s.getDate()+t);var a=s.getFullYear(),i=s.getMonth()+1,r=s.getDate(),o=s.getDay();return i<10&&(i="0"+i),r<10&&(r="0"+r),{date:a+"-"+i+"-"+r,week:"星期"+"日一二三四五六".charAt(o)}}}}},yW8x:function(t,e,s){e=t.exports=s("FZ+f")(!0),e.push([t.i,"#UserReg .yd-cell-item:not(:last-child):after,#UserReg .yd-cell:after{border:.01rem solid #e4e4e4;background-image:none}#UserReg select{color:#333;padding-left:5px}#UserReg .lable{width:1.8rem;font-size:.3rem}#UserReg .loginbtn{width:100%;height:.78rem;background:#6fb138;border-radius:.39rem;color:#fff;font-size:.31rem;text-align:center}#UserReg .sfbtns{padding:.1rem 0 .2rem}#UserReg .sfbtns .yd-radio{display:block}#UserReg .sfbtns .yd-radio-icon{color:#6fb138!important}#UserReg .sfbtns span.text{font-size:.28rem}#UserReg .sfbtn{border:1px solid #c6c6c6;padding:3px 10px;border-radius:3px;margin-right:5px}#UserReg .sfbtn.active{border:1px solid #6fb138;background:#6fb138;color:#fff}","",{version:3,sources:["D:/Web/银川电子结算new/北环/前端/微信商城/src/views/user/UserReg.vue"],names:[],mappings:"AACA,sEAEE,4BAA8B,AAC9B,qBAAuB,CACxB,AACD,gBACE,WAAY,AACZ,gBAAkB,CACnB,AACD,gBACE,aAAc,AACd,eAAkB,CACnB,AACD,mBACE,WAAY,AACZ,cAAgB,AAChB,mBAAoB,AACpB,qBAAuB,AACvB,WAAY,AACZ,iBAAmB,AACnB,iBAAmB,CACpB,AACD,iBACE,qBAAyB,CAC1B,AACD,2BACI,aAAe,CAClB,AACD,gCACI,uBAA0B,CAC7B,AACD,2BACI,gBAAmB,CACtB,AACD,gBACE,yBAA0B,AAC1B,iBAAkB,AAClB,kBAAmB,AACnB,gBAAkB,CACnB,AACD,uBACE,yBAA0B,AAC1B,mBAAoB,AACpB,UAAY,CACb",file:"UserReg.vue",sourcesContent:["\n#UserReg .yd-cell-item:not(:last-child):after,\n#UserReg .yd-cell:after {\n  border: 0.01rem solid #e4e4e4;\n  background-image: none;\n}\n#UserReg select {\n  color: #333;\n  padding-left: 5px;\n}\n#UserReg .lable {\n  width: 1.8rem;\n  font-size: 0.3rem;\n}\n#UserReg .loginbtn {\n  width: 100%;\n  height: 0.78rem;\n  background: #6FB138;\n  border-radius: 0.39rem;\n  color: #fff;\n  font-size: 0.31rem;\n  text-align: center;\n}\n#UserReg .sfbtns {\n  padding: 0.1rem 0 0.2rem;\n}\n#UserReg .sfbtns .yd-radio {\n    display: block;\n}\n#UserReg .sfbtns .yd-radio-icon {\n    color: #6FB138 !important;\n}\n#UserReg .sfbtns span.text {\n    font-size: 0.28rem;\n}\n#UserReg .sfbtn {\n  border: 1px solid #C6C6C6;\n  padding: 3px 10px;\n  border-radius: 3px;\n  margin-right: 5px;\n}\n#UserReg .sfbtn.active {\n  border: 1px solid #6FB138;\n  background: #6FB138;\n  color: #fff;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=33.a13d506590e123476bce.js.map