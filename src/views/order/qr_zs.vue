<template>
  <yd-layout id="qrZs">
    <div class="header">
      <div class="content_borther" v-if="obj.f_product_name">{{obj.f_product_name}}【{{obj.f_sku_name}}】</div>
      <div class="content">
        <div class="content_list">
          <div class="list_left"></div>
          <div class="list_right">
            <div class="list_title">产地环节</div>
            <div class="list_children">
              <div class="list_children_name">原产地</div>
              <span>{{obj.produceArea}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">基地/种植户</div>
              <span>{{obj.f_base_name}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">运输车辆</div>
              <span>{{obj.transportNum}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">检测结果</div>
              <span>{{obj.produceDetectionInfo}}</span>
            </div>
          </div>
        </div>
        <div class="content_list">
          <div class="list_left"></div>
          <div class="list_right">
            <div class="list_title">批发环节</div>
            <div class="list_children">
              <div class="list_children_name">市场名称</div>
              <span>{{obj.f_market_name}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">市场地址</div>
              <span>{{obj.marketAdd}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">企业名称</div>
              <span>{{obj.f_seller_name}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">检测结果</div>
              <span>{{obj.detectionInfo}}</span>
            </div>
          </div>
        </div>
        <div class="content_list">
          <div class="list_left"></div>
          <div class="list_right">
            <div class="list_title">采买环节</div>
            <div class="list_children">
              <div class="list_children_name">批次码</div>
              <span>{{obj.f_batch_id}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">产品名称</div>
              <span>{{obj.f_product_name}}【{{obj.f_sku_name}}】</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">进货时间</div>
              <span>{{obj.orderDate}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">采购方名称</div>
              <span>{{obj.f_buyer_name}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">所属区域</div>
              <span>宁夏/银川</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">采购方地址</div>
              <span>{{obj.f_complete_address}}</span>
            </div>
            <div class="list_children">
              <div class="list_children_name">进货数量</div>
              <span>{{obj.saleWeight}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </yd-layout>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      obj: {}
    };
  },
  created() {},
  watch: {},
  computed: {},
  mounted() {
    if (this.$route.query.suyuanCode) {
      this.init();
    } else {
      this.$dialog.confirm({
        title: "提示",
        mes: "请传入suyuanCode参数！",
        opts: [
          {
            txt: "确定",
            color: true,
            callback: () => {
              this.$router.back();
            }
          }
        ]
      });
    }
  },
  methods: {
    init() {
      this.postRequest("order/querySuYuanInfoByCode", {
        suyuanCode: this.$route.query.suyuanCode
      }).then(d => {
        if (d.data.aaData && d.data.aaData != null) {
          this.obj = d.data.aaData;
        } else {
          this.$dialog.toast({
            mes: `${this.$route.query.suyuanCode} 查询为空`,
            timeout: 1500
          });
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#qrZs {
  .header {
    height: 3.6rem;
    padding: 0.45rem 0.51rem 0.33rem 0.51rem;
    background: url(../../assets/imgs/banner.png) no-repeat;
    background-size: 100% 100%;
  }
  .content_borther {
    margin-bottom: 0.33rem;
    font-weight: bold;
    font-size: 0.36rem;
    color: white;
  }
  .content {
    padding: 0.3rem 0.67rem 0.31rem 0.76rem;
    background: white;
    border-radius: 0.16rem;
    margin-bottom: 0.5rem;
    .content_list {
      margin-top: -0.04rem;
      display: flex;
      .list_left {
        width: 1px;
        background: #599e4c;
        position: relative;
        padding: 0.1rem 0;
        margin: 0.04rem 0.48rem 0 0;
        /*margin-right: .48rem;*/
        &:before {
          content: "";
          display: inline-block;
          width: 0.32rem;
          height: 0.32rem;
          background: #599e4c;
          border-radius: 50%;
          position: absolute;
          top: 0rem;
          left: -0.16rem;
        }
      }
      .list_right {
        color: #2c2e2c;
        font-size: 0.26rem;
        flex-grow: 1;
        margin-bottom: 0.6rem;
        font-weight: bold;
        .list_title {
          font-size: 0.32rem;
          padding: 0rem 0 0.3rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .list_children {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.16rem 0;
          border-bottom: 1px solid #f0f0f0;
          .list_children_name {
            width: 1.6rem;
            flex-grow: 0;
          }
          span {
            width: 1rem;
            flex-grow: 1;
            text-align: right;
            font-weight: 500;
          }
        }
      }
    }
    .content_list:last-child {
      .list_left {
        background: transparent;
      }
    }
  }
}
</style>