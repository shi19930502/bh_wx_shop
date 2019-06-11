<template>
  <div id="OrderList">
    <template v-if="list.length>0">
      <yd-infinitescroll :callback="getOrderList" ref="infinitescrollDemo">
        <div class="order-list" v-for="d in list" slot="list">
          <div class="order-head flex flex-x-between flex-y-center">
            <div>
              <div @click="toShopEvaluate(d)" class="flex flex-y-center">
                <strong style="font-size: 0.28rem;">{{d.sellerName}}</strong>
                <img class="list_icon_right" src="../../assets/imgs/list_icon_right.png">
              </div>
              <div>{{d.orderUmber}}</div>
            </div>
            <div style="font-size: 0.24rem;">{{d.orderStatusName}}</div>
          </div>
          <div class="card-body" @click="toOrderDetails(d.id,d.orderUmber)">
            <div class="flex flex-x-between flex-y-center">
              <div class="flex">
                <template v-for="orderitem,key in d.orderitemList">
                  <div class="product-img" v-if="key<4">
                    <img v-if="orderitem.productPicUrl" :src="imgURL+orderitem.productPicUrl" alt>
                    <img v-else-if="orderitem.skuPicUrl" :src="imgURL+orderitem.skuPicUrl" alt>
                    <img v-else src="../../assets/imgs/img_moren.png">
                  </div>
                </template>
              </div>
              <div v-show="d.orderitemList.length>4">
                <img src="../../assets/imgs/icon_more.png" style="width: 0.5rem;height: 0.1rem;">
              </div>
              <div class="tar">
                <p class="price">
                  <!-- <span v-if="d.sortingOrderTotal==null && d.inspectedOrderTotal==null">{{'￥'+(d.orderTotal/100).toFixed(2)}}</span>
								<span v-else-if="d.sortingOrderTotal>0">{{'￥'+(d.sortingOrderTotal/100).toFixed(2)}}</span>
                  <span v-else="d.inspectedOrderTotal>0">{{'￥'+(d.inspectedOrderTotal/100).toFixed(2)}}</span>-->
                  <span
                    v-if="d.sortingOrderTotal==0 || d.sortingOrderTotal==null"
                  >{{'￥'+(d.orderTotal/100).toFixed(2)}}</span>
                  <span v-else>{{'￥'+(d.sortingOrderTotal/100).toFixed(2)}}</span>
                </p>
                <p class="sl" style="font-size: 0.24rem;">共{{d.orderitemList.length}}件</p>
              </div>
            </div>
          </div>
          <div class="order-foot flex flex-x-between flex-y-center">
            <span class="time">{{d.createdDate}}</span>
            <div class="flex flex-x-end">
              <btn v-show="d.orderStatusId == 0" name="取消订单" @click="orderCancel(d.id)"></btn>
              <btn
                v-show="(d.orderStatusId == 4 || d.orderStatusId == 5 || d.orderStatusId == 8)&&d.orderUmber.indexOf('ON-7')==-1"
                name="再来一单"
                @click="aginOrder(d)"
              ></btn>
              <btn
                v-show="(d.orderStatusId == 4 || d.orderStatusId == 5)&&d.orderUmber.indexOf('ON-7')==-1"
                name="我要评价"
                @click="toEvaluate(d.id,d.sellerId,d.orderUmber)"
              ></btn>

              <span style="padding: 0.1rem 0;color:#ef4f4f;" v-show="d.orderStatusId == 7">订单已取消</span>
            </div>
          </div>
        </div>
        <span slot="doneTip">没有更多数据啦</span>
      </yd-infinitescroll>
    </template>
    <template v-else>
      <div class="flex flex-x-center flex-y-center" style="height: 100%">
        <div>
          <img src="../../assets/imgs/my_default_img.png">
          <p style="color: #999;" class="tac">暂无订单</p>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import infoCardList from "../component/infoCardList.vue";
import btn from "../component/btn.vue";
import mixin from "../../utils/mixin.js";
import mixin_store from "../../utils/mixin_store.js";

export default {
  components: {
    infoCardList,
    btn
  },
  mixins: [mixin, mixin_store],
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      byOrderStatusId: false
    };
  },
  created() {
    this.$store.dispatch("changeNavBarTitle", "订单中心");
    // 获取统计页面查询订单状态为 5. 8单子
    if (this.$route.query.byOrderStatusId) {
      this.byOrderStatusId = true;
    }
    this.getOrderList();
  },
  mounted() {},
  methods: {
    /**
     * 再来一单
     */
    aginOrder(d) {
      // 				for (var i in d.orderitemList) {
      // 					d.orderitemList[i].btnText = '备注'
      // 					d.orderitemList[i].showRemarks = false
      // 					d.orderitemList[i].name = d.orderitemList[i].skuName
      // 					d.orderitemList[i].id = d.orderitemList[i].skuId
      // 					d.orderitemList[i].spinner = d.orderitemList[i].quantity
      // 					d.orderitemList[i].remark = d.orderitemList[i].comment
      // 					d.orderitemList[i].promotionPrice = d.orderitemList[i].promotionPrice / 100
      // 					d.orderitemList[i].price = d.orderitemList[i].price / 100
      // 				}
      // 				var settlementParam = {
      // 					settlementGoods: d.orderitemList,
      // 				}
      // 				localStorage.setItem('settlementParam', JSON.stringify(settlementParam))
      // 				this.$router.push({
      // 					name: 'OrderSettlement',
      // 					query: {
      // 						sellerId: d.sellerId,
      // 						sellerName: d.sellerName,
      // 						distributionType: 0
      // 					}
      // 				})

      this.clearCartBySellerId(d);
    },
    /**
     * 清空指定采购商在指定供应商下的购物车数据
     */
    clearCartBySellerId(orderDetail) {
      this.postRequest("shippingcar/batchDeleteBySellerIdAndBuyerId", {
        buyerid: orderDetail.buyerid,
        sellerid: orderDetail.sellerid
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          let mes = "";
          let createCount = 0;
          this.createCarForOgrinOrder(createCount, orderDetail, mes);
        }
      });
    },
    /**
     * 再来一单加入购物车
     */
    createCarForOgrinOrder(createCount, orderDetail, mes) {
      let param;
      if (createCount < orderDetail.orderitemList.length) {
        param = {
          buyerId: orderDetail.buyerId,
          productId: orderDetail.orderitemList[createCount].productId,
          productName: orderDetail.orderitemList[createCount].productName,
          skuId: orderDetail.orderitemList[createCount].skuId,
          skuName: orderDetail.orderitemList[createCount].skuName,
          quantity: orderDetail.orderitemList[createCount].quantity,
          comment: orderDetail.orderitemList[createCount].comment || "",
          sellerId: orderDetail.sellerId
        };
        // 将订单中的商品加入购物车
        this.postRequest("shippingcar/create", param).then(d => {
          if (d.data && d.data.state == 0) {
            // console.log(d.data.state)
          } else {
            mes = d.data.msg + "</br>" + mes;
          }
          createCount++;
          this.createCarForOgrinOrder(createCount, orderDetail, mes);
        });
      } else {
        if (!mes == "") {
          this.$dialog.alert({
            mes: mes
          });
        }
        this.$router.push({
          name: "UserShoppingCart"
        });
      }
    },
    /**
     * 我要评价
     */
    toEvaluate(orderId, sellerId, orderUmber, type) {
      var param = {
        orderId: orderId,
        sellerId: sellerId,
        orderUmber: orderUmber
      };
      if (type) {
        param.type = 1;
      }
      this.$router.push({
        name: "OrderEvaluate",
        query: param
      });
    },
    /**
     * 获取订单列表
     */
    getOrderList() {
      this.postRequest("order/listByUser", {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        checkType: "buy"
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          if (this.pageNum == 1) {
            this.list = resp.data.aaData;
          } else {
            this.list = [...this.list, ...resp.data.aaData];
          }

          if (this.list.length >= resp.data.dataCount) {
            /* 所有数据加载完毕 */
            if (this.$refs.infinitescrollDemo) {
              this.$refs.infinitescrollDemo.$emit(
                "ydui.infinitescroll.loadedDone"
              );
            }
            return;
          }

          /* 单次请求数据完毕 */
          if (this.$refs.infinitescrollDemo) {
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.finishLoad"
            );
          }
          this.pageNum++;
        }
      });
    },
    /**
     * 订单详情
     */
    toOrderDetails(orderId, orderUmber) {
      this.$router.push({
        name: "OrderDetails",
        query: {
          orderId: orderId,
          orderUmber: orderUmber
        }
      });
    },
    /**
     * 取消订单
     */
    orderCancel(id) {
      this.$dialog.confirm({
        title: "提示",
        mes: "确定取消该订单吗？",
        opts: () => {
          this.postRequest("order/update", {
            id: id,
            orderStatusId: "7"
          }).then(resp => {
            if (resp.data && resp.data.state == 0) {
              this.$dialog.toast({
                mes: "取消成功",
                timeout: 1200,
                icon: "success",
                callback: () => {
                  for (var item of this.list) {
                    if (item.id == id) {
                      item.orderStatusId = 7;
                    }
                  }
                }
              });
            }
          });
        }
      });
    },
    /**
     * 查看店铺详情
     */
    toShopEvaluate(d) {
      this.$router.push({
        name: "ShopDetails",
        query: {
          sellerid: d.sellerId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.yd-scrollview:after {
  display: none !important;
}

#OrderList {
  margin-top: -0.25rem;

  height: 100%;

  .order-list {
    margin-top: 0.25rem;
  }

  .order-list {
    background: #fff;

    .order-head {
      padding: 0.25rem;

      strong {
        font-size: 0.3rem;
        color: #2f3927;
      }

      img.list_icon_right {
        width: 0.14rem;
        height: 0.24rem;
        margin-left: 0.17rem;
      }
    }

    .card-body {
      padding: 0.3rem 0.25rem;
      background: #f9f9fb;
    }

    .order-foot {
      padding: 0.15rem 0.25rem;

      .time {
        color: #797d77;
      }

      .btn {
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
