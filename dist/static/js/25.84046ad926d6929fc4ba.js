webpackJsonp([25],{"+c0w":function(t,e,r){t.exports=r.p+"static/img/img_moren.af9f00f.png"},"5zde":function(t,e,r){r("zQR9"),r("qyJz"),t.exports=r("FeBl").Array.from},BO1k:function(t,e,r){t.exports={default:r("fxRn"),__esModule:!0}},CKIC:function(t,e,r){var i=r("T0HI");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=r("rjj0").default;s("5cd49b90",i,!0,{})},Gu7T:function(t,e,r){"use strict";e.__esModule=!0;var i=r("c/Tr"),s=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=function(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return(0,s.default)(t)}},"H+kO":function(t,e,r){"use strict";var i=r("BO1k"),s=r.n(i);e.a={data:function(){return{categoryList:[],gbgoodsId:"",secondCategoryList:[],isUserEnter:!1,isOftenBuy:!1}},methods:{addActiveStatus:function(t){var e=1;e=this.isUserEnter?0:1;for(var r in t)t[r].isActive=r==e;return t},menuClick:function(t){this.pageNum=1,this.productList=[],this.$refs.productList&&this.$refs.productList.$emit("ydui.infinitescroll.reInit"),t.isActive||(t.isActive=!0);var e=!0,r=!1,i=void 0;try{for(var a,o=s()(this.categoryList);!(e=(a=o.next()).done);e=!0){var n=a.value;t.id!=n.id&&(n.isActive=!1)}}catch(t){r=!0,i=t}finally{try{!e&&o.return&&o.return()}finally{if(r)throw i}}if("oftenbuy"==t.id)this.secondCategoryList=[],this.isOftenBuy=!0,this.gbgoodsId="",this.getProductList();else if(this.isOftenBuy=!1,t.childList){this.secondCategoryList=t.childList;for(var d in this.secondCategoryList)0!=d&&this.secondCategoryList[d].isActive&&(this.secondCategoryList[d].isActive=!1);this.gbgoodsId=t.gbgoodsId,this.getProductList()}else this.secondCategoryList=[],this.gbgoodsId=t.gbgoodsId,this.getProductList()},getCategoryList:function(){this.getCategoryListSaveLocal()},getCategoryListSaveLocal:function(){var t=this;this.postRequest("category/childList",{parentCategoryId:"top",filteEnabled:1,filteDeleted:0,orderField:"t.f_id",supplierId:this.sellerId}).then(function(e){e&&e.data&&0==e.data.state&&(e.data.aaData.unshift({name:"常买",id:"oftenbuy"}),t.categoryList=t.addActiveStatus(e.data.aaData),t.getSonCategoryList(t.categoryList))})},getSonCategoryList:function(t){for(var e in t)if(t[e].childList)for(var r in t[e].childList)t[e].childList[r].isActive=!1;this.isOftenBuy?this.getProductList():t.length>1&&t[1].childList?(this.secondCategoryList=t[1].childList,this.gbgoodsId=t[1].gbgoodsId,this.getProductList()):(this.secondCategoryList=[],t.length>1&&(this.gbgoodsId=t[1].gbgoodsId,this.getProductList()))}}}},QCAy:function(t,e,r){"use strict";function i(t){r("CKIC")}Object.defineProperty(e,"__esModule",{value:!0});var s=r("dF1F"),a=r("nev+"),o=r("XyMi"),n=i,d=Object(o.a)(s.a,a.a,a.b,!1,n,null,null);e.default=d.exports},T0HI:function(t,e,r){e=t.exports=r("FZ+f")(!0),e.push([t.i,"#OrderCheckoutSuccess .yd-scrolltab{top:5rem}#OrderCheckoutSuccess .yd-scrolltab-content{padding:0}#OrderCheckoutSuccess .header{color:#fff;padding:.76rem}#OrderCheckoutSuccess .header .h1{font-size:.4rem;margin-left:.1rem}#OrderCheckoutSuccess .header .tipstext{text-align:center;padding:.3rem 0}#OrderCheckoutSuccess .header .lookbtn{border-radius:2px;border:1px solid #fff;width:2.4rem;text-align:center;line-height:.68rem;font-size:.3rem}#OrderCheckoutSuccess .youlike-list{background:#fff}#OrderCheckoutSuccess .youlike-list h1{font-size:.3rem;padding:.3rem}#OrderCheckoutSuccess .youlike-list .line{height:1px;background:#ddd}#OrderCheckoutSuccess ul.list::-webkit-scrollbar{display:none}#OrderCheckoutSuccess ul.list{height:100%;overflow-y:auto;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:0 .18rem}#OrderCheckoutSuccess ul.list li{margin-bottom:.2rem;padding:0;border-bottom:none;width:49%}#OrderCheckoutSuccess ul.list li .img{width:100%;height:3.4rem}#OrderCheckoutSuccess ul.list li .img img{width:100%;height:100%}#OrderCheckoutSuccess ul.list li h3{padding:.25rem;width:100%;background:#e6e6e6;text-align:center}","",{version:3,sources:["D:/Web/银川电子结算new/北环/前端/微信商城/src/views/order/OrderCheckoutSuccess.vue"],names:[],mappings:"AACA,oCACE,QAAU,CACX,AACD,4CACE,SAAiB,CAClB,AACD,8BACE,WAAY,AACZ,cAAiB,CAClB,AACD,kCACI,gBAAkB,AAClB,iBAAoB,CACvB,AACD,wCACI,kBAAmB,AACnB,eAAkB,CACrB,AACD,uCACI,kBAAmB,AACnB,sBAAuB,AACvB,aAAc,AACd,kBAAmB,AACnB,mBAAqB,AACrB,eAAkB,CACrB,AACD,oCACE,eAAiB,CAClB,AACD,uCACI,gBAAkB,AAClB,aAAgB,CACnB,AACD,0CACI,WAAY,AACZ,eAAiB,CACpB,AACD,iDACE,YAAc,CACf,AACD,8BACE,YAAa,AACb,gBAAiB,AACjB,uBAAwB,AAChB,eAAgB,AACxB,gBAAmB,CACpB,AACD,iCACI,oBAAsB,AACtB,UAAW,AACX,mBAAoB,AACpB,SAAW,CACd,AACD,sCACM,WAAY,AACZ,aAAe,CACpB,AACD,0CACQ,WAAY,AACZ,WAAa,CACpB,AACD,oCACM,eAAiB,AACjB,WAAY,AACZ,mBAAoB,AACpB,iBAAmB,CACxB",file:"OrderCheckoutSuccess.vue",sourcesContent:["\n#OrderCheckoutSuccess .yd-scrolltab {\n  top: 5rem;\n}\n#OrderCheckoutSuccess .yd-scrolltab-content {\n  padding: 0 0 0 0;\n}\n#OrderCheckoutSuccess .header {\n  color: #fff;\n  padding: 0.76rem;\n}\n#OrderCheckoutSuccess .header .h1 {\n    font-size: 0.4rem;\n    margin-left: 0.1rem;\n}\n#OrderCheckoutSuccess .header .tipstext {\n    text-align: center;\n    padding: 0.3rem 0;\n}\n#OrderCheckoutSuccess .header .lookbtn {\n    border-radius: 2px;\n    border: 1px solid #fff;\n    width: 2.4rem;\n    text-align: center;\n    line-height: 0.68rem;\n    font-size: 0.3rem;\n}\n#OrderCheckoutSuccess .youlike-list {\n  background: #fff;\n}\n#OrderCheckoutSuccess .youlike-list h1 {\n    font-size: 0.3rem;\n    padding: 0.3rem;\n}\n#OrderCheckoutSuccess .youlike-list .line {\n    height: 1px;\n    background: #ddd;\n}\n#OrderCheckoutSuccess ul.list::-webkit-scrollbar {\n  display: none;\n}\n#OrderCheckoutSuccess ul.list {\n  height: 100%;\n  overflow-y: auto;\n  -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n  padding: 0 0.18rem;\n}\n#OrderCheckoutSuccess ul.list li {\n    margin-bottom: 0.2rem;\n    padding: 0;\n    border-bottom: none;\n    width: 49%;\n}\n#OrderCheckoutSuccess ul.list li .img {\n      width: 100%;\n      height: 3.4rem;\n}\n#OrderCheckoutSuccess ul.list li .img img {\n        width: 100%;\n        height: 100%;\n}\n#OrderCheckoutSuccess ul.list li h3 {\n      padding: 0.25rem;\n      width: 100%;\n      background: #e6e6e6;\n      text-align: center;\n}\n"],sourceRoot:""}])},"c/Tr":function(t,e,r){t.exports={default:r("5zde"),__esModule:!0}},dF1F:function(t,e,r){"use strict";var i=r("Gu7T"),s=r.n(i),a=r("vsZy");e.a={mixins:[a.a],data:function(){return{pageSize:10,pageNum:1,orderId:"",orderUmber:"",sellerNewProductList:[]}},created:function(){this.$store.dispatch("changeNavBarTitle","下单成功"),this.orderId=this.$route.query.orderId,this.orderUmber=this.$route.query.orderUmber,this.getSellerNewProductList()},mounted:function(){},methods:{toOrderDetails:function(){this.$router.push({name:"OrderDetails",query:{orderId:this.orderId,orderUmber:this.orderUmber}})},backHome:function(){"1"==sessionStorage.getItem("f_index")?(sessionStorage.removeItem("f_index"),window.location.href="http://ssbh.yshfresh.com/quick_order/#/f_index"):this.$router.push({name:"Home"})},getSellerNewProductList:function(){var t=this;this.postRequest("product/sellerNewProductList",{pageNum:this.pageNum,pageSize:this.pageSize,customerId:this.userInfo.typeCode}).then(function(e){if(e.data&&0==e.data.state){if(1==t.pageNum?t.sellerNewProductList=e.data.aaData:t.sellerNewProductList=[].concat(s()(t.sellerNewProductList),s()(e.data.aaData)),t.sellerNewProductList.length>=e.data.dataCount)return void t.$refs.productList.$emit("ydui.infinitescroll.loadedDone");t.$refs.productList.$emit("ydui.infinitescroll.finishLoad"),t.pageNum++}})}}}},dsty:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAADQElEQVRYR+2ZTahVVRiGn7fIigbioDDoZ5TlJLBRE3+wCAsqArGaGEZCBc7CfsQQCksaJf1QUUGEDqQyCKIftEJEKGpSIEXkQAiSIJAMSXvjPXxbdpdz7937ds69Ds43O2ev9X7P/va31vrWWgKw/QjwOHBtfo/Blkn6qa+ubUly+sn2JuCtviI9288V9CXglKStAT0KXA/8BuzvCdC1+XZJ0e9stp8FtlWH7QE9C1wAPC3pmc5KY2xo+zHghZaLFwM6yAHgSUnPj9F/J2nbm4HXkpbVIWn50HkFansDsAe4sCD3AfdLOnvegNq+vcbIooL8GLhb0t/NqF/wT297JfAJcGlBfgWsk/RXky8LHlHbNwEHgMUF9Q2wVtLJdlL3ArV9CbAX2Cnp606jY4ZGtm8AEr3Lq9kPwGpJv0/t1hnU9kXAe8CdQITWSPp+rrC2swoeAq4qjZ+BlZJ+HabZB/RK4AhwTQlFMMJx0MtsL61IXlcdj5fWsemEOoNGwHZWsHyqK0owwoGNo05mewnwBXBjdTgBrJKUFXJa6wVasCuAg63kj4M4isMZzfZlwOfAzdXwD+AWSd/O1rc3aMFOnU6+q5Eax0PN9sXAR8Ct1eDPmoKSp+esxkIm/JROp5sHcwIt2DuAD4Bmgj4M3CYpAP8x23GcVeaeehCAuyR9OqTtm8CDwI+SkmoDmzNowd4HvNta8j7LrNCORGpK4G3ggfJ5BrhX0vvDQm979KAF+zDwSquISKm4PutzPd8NbCmof4BNkt6ZIUXGA1owTwDPtZwnyhuBHSkf6/8s1VskvTwdZGmND7Qc7AK2tiAy5zajO38/Jan9MkN5x/bp295svw6knpxquyQl6rPafIFmp5BaIHVlY69KenRWwiY/xjWYpgLUPJgBlelrkKvNTrIL7LxEtAGxnboy+55UWYPR39XmFbQr1LB2E9D/E71JREcdvUlEJxFtRWAyPY06HSYRnUR0lJu7UUczejPlaHM0vk3SznE476NpO3uqFNpHJS1v+rYvG34B3gCyU1woy/4/u9qrc1ghKQdyA5uv65u+L56vnKOeL8+BVl7kLZoLseaQv6/4KNpnS52zrFx8fNgW/BdhxhRNv4P5fgAAAABJRU5ErkJggg=="},fBQ2:function(t,e,r){"use strict";var i=r("evD5"),s=r("X8DO");t.exports=function(t,e,r){e in t?i.f(t,e,s(0,r)):t[e]=r}},fYxN:function(t,e,r){"use strict";var i=r("BO1k"),s=r.n(i);e.a={data:function(){return{carIds:[],ShippingcarList:[],alreadyChosenGoods:[],orderTotal:0,shopCar:{shopNum:0,commodityNum:0,shopAllMoney:"0.00"},queryGrouplist:[]}},methods:{createShippingcar:function(t){var e,r=this,i={buyerId:this.userInfo.typeCode,productId:t.productId,productName:t.productName,skuId:t.id,skuName:t.name,quantity:t.quantity,comment:t.remark||"",sellerId:this.sellerId||this.$route.query.sellerId||t.sellerId};t.supplierId&&(i.sellerId=t.supplierId),t.skuId&&(i.skuId=t.skuId),t.skuName&&(i.skuName=t.skuName);var a=[],o=!0,n=!1,d=void 0;try{for(var c,u=s()(this.carIds);!(o=(c=u.next()).done);o=!0){var l=c.value;a.push(l.skuId)}}catch(t){n=!0,d=t}finally{try{!o&&u.return&&u.return()}finally{if(n)throw d}}if(this.isInArray(a,i.skuId)){e=0==t.quantity?"shippingcar/delete":"shippingcar/update";for(var h in this.carIds)this.carIds[h].skuId!=t.id&&this.carIds[h].skuId!=t.skuId||(i.id=this.carIds[h].carId);this.postRequest(e,i).then(function(t){t.data&&0==t.data.state&&r.getShippingcarList()})}else e="shippingcar/create",this.postRequest(e,i).then(function(e){if(e.data&&0==e.data.state){var i={skuId:t.id||t.skuId,carId:e.data.aaData.id};r.carIds.push(i),r.getShippingcarList()}else t.showjianBtn=!1,t.quantity=0,r.$dialog.alert({mes:e.data.msg})})},getShippingcarList:function(){var t=this;this.postRequest("shippingcar/queryGrouplist",{buyerId:this.userInfo.typeCode,sellerId:this.sellerId}).then(function(e){if(e.data&&0==e.data.state){t.ShippingcarList=e.data.aaData;var r=[];t.alreadyChosenGoods=[];for(var i in e.data.aaData){if(t.sellerId==i){var a=!0,o=!1,n=void 0;try{for(var d,c=s()(e.data.aaData[i]);!(a=(d=c.next()).done);a=!0){d.value.showjianBtn=!1}}catch(t){o=!0,n=t}finally{try{!a&&c.return&&c.return()}finally{if(o)throw n}}t.alreadyChosenGoods=e.data.aaData[i]}var u=!0,l=!1,h=void 0;try{for(var A,f=s()(e.data.aaData[i]);!(u=(A=f.next()).done);u=!0){var p=A.value,C={skuId:p.skuId,carId:p.id};r.push(C)}}catch(t){l=!0,h=t}finally{try{!u&&f.return&&f.return()}finally{if(l)throw h}}}t.carIds=r;for(var g=[],m=0;m<t.alreadyChosenGoods.length;m++)for(var y=0;y<t.carSettlementGoods.length;y++)t.alreadyChosenGoods[m].id==t.carSettlementGoods[y]&&g.push(t.carSettlementGoods[y]);t.carSettlementGoods=g,t.showShopCar&&t.carSettlementGoods.length<=0&&(t.isCheckAll=!1,t.$refs.checklistDemo.$emit("ydui.checklist.checkall",t.isCheckAll)),t.orderTotal=t.getOrderTotal(t.alreadyChosenGoods).priceTotal,"ShopSearch"!=t.$route.name&&"ProSkuList"!=t.$route.name&&"UserCollection"!=t.$route.name&&"Home"!=t.$route.name||t.getSearchProCar(e.data.aaData)}})},getSearchProCar:function(t){var e=0;this.queryGrouplist=[],this.shopCar.shopMoney="0.00";for(var r in t)e++,this.queryGrouplist=this.queryGrouplist.concat(t[r]);this.shopCar.shopNum=e,this.shopCar.commodityNum=this.queryGrouplist.length;for(var i=0;i<this.queryGrouplist.length;i++){var s=parseFloat(this.queryGrouplist[i].promotionPrice)*parseFloat(this.queryGrouplist[i].quantity);this.shopCar.shopMoney=(parseFloat(this.shopCar.shopMoney)+s).toFixed(2)}this.$refs.shopCarshopMoney&&(this.$refs.shopCarshopMoney.innerHTML="￥"+this.shopCar.shopMoney)},getOrderTotal:function(t){var e=0,r=0;for(var i in t)r+=t[i].quantity,t[i].promotionPrice>0&&t[i].promotionBasePrice>0?e+=t[i].quantity*t[i].promotionPrice.mul(100):e+=t[i].quantity*t[i].price.mul(100);return{priceTotal:(e/100).toFixed(2),quantityTotal:(r-0).toFixed(2)}},isInArray:function(t,e){for(var r=0;r<t.length;r++)if(t[r]==e)return!0;return!1},countVisits:function(){this.postRequest("store/countVisits",{sellerId:this.sellerId}).then(function(t){t.data&&t.data.state})}}}},fxRn:function(t,e,r){r("+tPU"),r("zQR9"),t.exports=r("g8Ux")},g8Ux:function(t,e,r){var i=r("77Pl"),s=r("3fs2");t.exports=r("FeBl").getIterator=function(t){var e=s(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return i(e.call(t))}},"nev+":function(t,e,r){"use strict";r.d(e,"a",function(){return i}),r.d(e,"b",function(){return s});var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("yd-layout",[i("div",{attrs:{id:"OrderCheckoutSuccess"}},[i("div",{staticClass:"header gradient-y"},[i("div",{staticClass:"flex flex-x-center flex-y-center"},[i("img",{staticStyle:{width:"0.42rem",height:"0.42rem"},attrs:{src:r("dsty")}}),t._v(" "),i("div",{staticClass:"h1"},[t._v("下单成功")])]),t._v(" "),i("div",{staticClass:"tipstext"},[t._v("安全，健康，放心，以溯源为纽带，创造舌尖上的诚信世界。")]),t._v(" "),i("div",{staticClass:"flex flex-x-center"},[i("div",{staticClass:"lookbtn",on:{click:t.toOrderDetails}},[t._v("查看订单")]),t._v(" "),i("div",{staticClass:"lookbtn",staticStyle:{"margin-left":"0.2rem"},on:{click:t.backHome}},[t._v("返回首页")])])]),t._v(" "),i("div",{staticClass:"youlike-list"},[i("div",{staticClass:"flex flex-y-center"},[i("div",{staticClass:"flex-item-2"}),t._v(" "),i("div",{staticClass:"flex-item-2 line"}),t._v(" "),i("div",{staticClass:"title"},[i("h1",[t._v("你可能喜欢")])]),t._v(" "),i("div",{staticClass:"flex-item-2 line"}),t._v(" "),i("div",{staticClass:"flex-item-2"})])]),t._v(" "),i("yd-scrolltab",[i("div",{staticClass:"scrolltab-content",staticStyle:{height:"100%","overflow-y":"auto"},attrs:{id:"shopListWrapper"}},[i("yd-infinitescroll",{ref:"productList",attrs:{callback:t.getSellerNewProductList}},[i("ul",{staticClass:"list flex flex-x-between",attrs:{slot:"list"},slot:"list"},t._l(t.sellerNewProductList,function(e){return i("li",[i("div",{staticClass:"img"},[e.f_product_pic_url?i("img",{attrs:{src:t.imgURL+e.f_product_pic_url}}):i("img",{attrs:{src:r("+c0w")}})]),t._v(" "),i("h3",[t._v(t._s(e.f_name))])])})),t._v(" "),i("span",{attrs:{slot:"doneTip"},slot:"doneTip"},[t._v("没有更多数据啦")])])],1)])],1)])},s=[]},qyJz:function(t,e,r){"use strict";var i=r("+ZMJ"),s=r("kM2E"),a=r("sB3e"),o=r("msXi"),n=r("Mhyx"),d=r("QRG4"),c=r("fBQ2"),u=r("3fs2");s(s.S+s.F*!r("dY0y")(function(t){Array.from(t)}),"Array",{from:function(t){var e,r,s,l,h=a(t),A="function"==typeof this?this:Array,f=arguments.length,p=f>1?arguments[1]:void 0,C=void 0!==p,g=0,m=u(h);if(C&&(p=i(p,f>2?arguments[2]:void 0,2)),void 0==m||A==Array&&n(m))for(e=d(h.length),r=new A(e);e>g;g++)c(r,g,C?p(h[g],g):h[g]);else for(l=m.call(h),r=new A;!(s=l.next()).done;g++)c(r,g,C?o(l,p,[s.value,g],!0):s.value);return r.length=g,r}})},vsZy:function(t,e,r){"use strict";var i=r("BO1k"),s=r.n(i),a=r("//Fk"),o=r.n(a),n=r("pyzf");r("fYxN"),r("H+kO");e.a={data:function(){return{uploadURL:n.a.uploadURL,cityName:n.a.cityName,imgURL:n.a.imgURL,userInfo:JSON.parse(localStorage.getItem("userInfo")),logisticsType:[{type:0,name:"自提",selected:!1},{type:1,name:"物流配送",selected:!0}],payType:[{type:0,name:"现金支付",selected:!0},{type:1,name:"POS刷卡",selected:!1},{type:2,name:"微信支付",selected:!1},{type:3,name:"支付宝支付",selected:!1}],distributionType:[{distributionType:0,name:"次日配送",selected:!0},{distributionType:1,name:"当日配送",selected:!1}]}},mounted:function(){},methods:{getServerTime:function(){var t=this;return new o.a(function(e,r){t.postRequest("store/getServerTime",{}).then(function(t){e(t&&0==t.data.state?t.data.aaData:null)})})},priceFormat:function(t){return"number"==typeof t?t.div(100)||0:t||0},blurAdjust:function(t){setTimeout(function(){if("INPUT"!=document.activeElement.tagName&&"TEXTAREA"!=document.activeElement.tagName){/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?"ios":/(Android)/i.test(navigator.userAgent)&&"android","ios"&&document.activeElement.scrollIntoViewIfNeeded(!0)}},100)},uniqueArr:function(t){var e=[],r={},i=!0,a=!1,o=void 0;try{for(var n,d=s()(t);!(i=(n=d.next()).done);i=!0){var c=n.value;r[c]||(e.push(c),r[c]=1)}}catch(t){a=!0,o=t}finally{try{!i&&d.return&&d.return()}finally{if(a)throw o}}return e},GetDateStr:function(t,e){var r=new Date;e&&(r=new Date(e.replace(/-/g,"/"))),r.setDate(r.getDate()+t);var i=r.getFullYear(),s=r.getMonth()+1,a=r.getDate(),o=r.getDay();return s<10&&(s="0"+s),a<10&&(a="0"+a),{date:i+"-"+s+"-"+a,week:"星期"+"日一二三四五六".charAt(o)}}}}}});
//# sourceMappingURL=25.84046ad926d6929fc4ba.js.map