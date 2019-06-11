<template>
  <yd-layout>
    <div id="UserReg">
      <!-- 身份类型 -->
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">
            <div class="lable">
              <strong>身份类型</strong>
            </div>
          </span>
          <span slot="left">
            <div class="sfbtns">
              <yd-radio-group v-model="form.customerProperty" size="16">
                <yd-radio val="001">
                  <span class="text">批发商</span>
                </yd-radio>
                <yd-radio val="007">
                  <span class="text">厂商</span>
                </yd-radio>
                <yd-radio val="002">
                  <span class="text">二级批发/早市/农贸市场</span>
                </yd-radio>
                <yd-radio val="004">
                  <span class="text">小区门店</span>
                </yd-radio>
                <yd-radio val="008">
                  <span class="text">配送公司</span>
                </yd-radio>
                <yd-radio val="003">
                  <span class="text">餐饮店/团体单位</span>
                </yd-radio>
                <yd-radio val="005">
                  <span class="text">个人</span>
                </yd-radio>
              </yd-radio-group>
            </div>
          </span>
        </yd-cell-item>
      </yd-cell-group>

      <!-- 非个人用户选择经营户性质 -->
      <yd-cell-group v-if="form.customerProperty !='005' && form.customerProperty !=''">
        <template v-if="form.customerProperty =='001' || form.customerProperty =='002'">
          <!-- 选择渠道 -->
          <yd-cell-item>
            <span slot="left">
              <div class="lable">
                <strong>渠道</strong>
              </div>
            </span>
            <span slot="left">
              <div class="sfbtns" style="padding-left:0.15rem">
                <yd-radio-group v-model="form.channelCode" size="16">
                  <yd-radio :val="d.code" v-for="d in ChannelList" :key="d.code">
                    <span class="text">{{d.name}}</span>
                  </yd-radio>
                </yd-radio-group>
              </div>
            </span>
          </yd-cell-item>
          <!-- 其他渠道备注 -->
          <yd-cell-item v-if="form.channelCode=='QT'">
            <span slot="left">
              <div class="lable">
                <strong>所在市场备注</strong>
              </div>
            </span>
            <yd-input v-model="form.remark" slot="right" max="20" placeholder="请输入所在市场备注"></yd-input>
          </yd-cell-item>
        </template>
        <yd-cell-item v-if="form.customerProperty=='001' && form.channelCode != '001201'">
          <span slot="left">
            <div class="lable">
              <strong>经营户类型</strong>
            </div>
          </span>
          <span slot="left">
            <div class="sfbtns" style="padding-left:0.15rem">
              <template v-if="!(form.customerProperty=='001'||form.customerProperty=='002')">
                <yd-radio-group v-model="defaultProperty" size="16">
                  <yd-radio :val="d.key" v-for="d in customerTypeList" disabled :key="d.key">
                    <span class="text">{{d.value}}</span>
                  </yd-radio>
                </yd-radio-group>
              </template>
              <template v-else>
                <yd-radio-group v-model="form.property" size="16">
                  <yd-radio :val="d.key" v-for="d in customerTypeList" :key="d.key">
                    <span class="text">{{d.value}}</span>
                  </yd-radio>
                </yd-radio-group>
              </template>
            </div>
          </span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">
            <div class="lable">
              <strong>个人/公司名称</strong>
            </div>
          </span>
          <yd-input v-model="form.name" slot="right" max="16" placeholder="请输入个人/公司名称"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">
            <div class="lable">
              <strong>手机号码</strong>
            </div>
          </span>
          <yd-input
            :disabled="isUpdate"
            v-model="form.telephone"
            slot="right"
            max="20"
            placeholder="请输入联系电话"
          ></yd-input>
        </yd-cell-item>
        <template v-if="!isUpdate">
          <yd-cell-item>
            <span slot="left">
              <div class="lable">
                <strong>密码</strong>
              </div>
            </span>
            <yd-input
              v-model="form.password"
              type="password"
              slot="right"
              max="20"
              placeholder="请输入密码"
            ></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">
              <div class="lable">
                <strong>确认密码</strong>
              </div>
            </span>
            <yd-input
              v-model="repassword"
              type="password"
              slot="right"
              max="20"
              placeholder="请确认密码"
            ></yd-input>
          </yd-cell-item>
        </template>
      </yd-cell-group>
      <!-- 供应商类型 2019/3/13 修改为商品分类-->
      <!-- <yd-cell-group v-if="form.customerProperty =='001'">
        <yd-cell-item>
          <span slot="left">
            <div class="lable">
              <strong>所属类型</strong>
            </div>
          </span>
          <span slot="left">
            <div class="sfbtns" style="padding-left:0.15rem">
              <yd-radio-group v-model="form.type" size="16">
                <yd-radio :val="d.key" v-for="d in customerTypeList">
                  <span class="text">{{d.value}}</span>
                </yd-radio>
              </yd-radio-group>
            </div>
          </span>
        </yd-cell-item>
      </yd-cell-group>-->
      <!-- 供应商品来源 -->
      <yd-cell-group
        v-if="form.customerProperty=='001' && form.channelCode == 'QT' && form.property != '2'"
      >
        <yd-cell-item>
          <span slot="left">
            <div class="lable">
              <strong>供应商品来源</strong>
            </div>
          </span>
          <span slot="left">
            <div class="sfbtns">
              <yd-radio-group v-model="form.isLocal" size="16">
                <yd-radio :val="d.value" v-for="d in isLocalList" :key="d.value">
                  <span class="text">{{d.name}}</span>
                </yd-radio>
              </yd-radio-group>
            </div>
          </span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-if="form.customerProperty=='003'">
        <yd-cell-item>
          <span slot="left">
            <div class="lable">
              <strong>企业类型</strong>
            </div>
          </span>
          <span slot="left">
            <div class="sfbtns">
              <yd-radio-group v-model="form.enterpriseType" size="16">
                <yd-radio :val="d.key" v-for="d in TCTypeList" :key="d.key">
                  <span class="text">{{d.value}}</span>
                </yd-radio>
              </yd-radio-group>
            </div>
          </span>
        </yd-cell-item>
      </yd-cell-group>
      <!-- 厂商经营范围 -->
      <yd-cell-group v-if="form.customerProperty =='007' || form.customerProperty =='001'">
        <yd-cell-item>
          <span slot="left">
            <div class="lable">
              <strong>供应商品分类</strong>
            </div>
          </span>
          <span slot="left">
            <div class="sfbtns">
              <yd-checkbox-group v-model="businessScope" size="16">
                <yd-checkbox
                  :val="d.code"
                  v-for="d in categoryTypeList"
                  :key="d.code"
                  shape="circle"
                >{{d.name}}</yd-checkbox>
              </yd-checkbox-group>
            </div>
          </span>
        </yd-cell-item>
      </yd-cell-group>

      <!--完善资料 -->
      <template v-if="form.customerProperty != ''">
        <yd-cell-group title="完善资料">
          <template v-if="form.customerProperty !='005'">
            <yd-cell-item
              v-if="form.customerProperty == '001' && form.property!='1' && form.property!='' "
            >
              <span slot="left">
                <div class="lable">
                  <strong>市场证明</strong>
                </div>
              </span>
              <el-upload
                slot="left"
                :action="uploadURL+'/imgUpload'"
                :on-error="uploadError"
                :show-file-list="false"
                :data="uploadData"
                :on-success="marketcertPicSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
              >
                <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传市场证明</yd-button>
              </el-upload>
            </yd-cell-item>
            <div
              class="uploadimgPre"
              v-if="form.marketcertPic && form.customerProperty == '001' && form.property!='1' && form.property!='' "
            >
              <img :src="configs.imgURL+form.marketcertPic" alt>
            </div>
            <yd-cell-item>
              <span slot="left">
                <div class="lable">
                  <strong>营业执照号码</strong>
                </div>
              </span>
              <yd-input v-model="form.regId" slot="right" max="20" placeholder="请输入营业执照号码"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
              <span slot="left">
                <div class="lable">
                  <strong>营业执照照片</strong>
                </div>
              </span>
              <el-upload
                slot="left"
                :action="uploadURL+'/imgUpload'"
                :on-error="uploadError"
                :show-file-list="false"
                :data="uploadData"
                :on-success="businessLicensePicSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
              >
                <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传营业执照</yd-button>
              </el-upload>
            </yd-cell-item>
            <div class="uploadimgPre" v-if="form.businessLicensePic">
              <img :src="configs.imgURL+form.businessLicensePic" alt>
            </div>
          </template>
          <!-- 食品流通许可证 -->
          <template v-if="form.customerProperty !='005'">
            <yd-cell-item>
              <span slot="left">
                <div class="lable">
                  <strong>食品流通许可证</strong>
                </div>
              </span>
              <el-upload
                slot="left"
                :action="uploadURL+'/imgUpload'"
                :on-error="uploadError"
                :show-file-list="false"
                :data="uploadData"
                :on-success="foodLicensePicSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
              >
                <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传许可证</yd-button>
              </el-upload>
            </yd-cell-item>
            <div class="uploadimgPre" v-if="form.foodLicensePic">
              <img :src="configs.imgURL+form.foodLicensePic" alt>
            </div>
          </template>
          <!-- 清真食品准营证 -->
          <template v-if="form.customerProperty !='005' && form.channelCode != '001201'">
            <yd-cell-item>
              <span slot="left">
                <div class="lable">
                  <strong>清真食品准营证</strong>
                </div>
              </span>
              <el-upload
                slot="left"
                :action="uploadURL+'/imgUpload'"
                :on-error="uploadError"
                :show-file-list="false"
                :data="uploadData"
                :on-success="muslimfoodPermitPicSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
              >
                <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传清真食品准营证</yd-button>
              </el-upload>
            </yd-cell-item>
            <div class="uploadimgPre" v-if="form.muslimfoodPermitPic">
              <img :src="configs.imgURL+form.muslimfoodPermitPic" alt>
            </div>
          </template>
          <yd-cell-item v-if="form.customerProperty !='005' && form.channelCode != '001201'">
            <span slot="left">
              <div class="lable">
                <strong>法人名称</strong>
              </div>
            </span>
            <yd-input v-model="form.legalpepresent" slot="right" max="20" placeholder="请输入法人名称"></yd-input>
          </yd-cell-item>
          <yd-cell-item v-if="form.customerProperty !='005' && form.channelCode != '001201'">
            <span slot="left">
              <div class="lable">
                <strong>法人照片</strong>
              </div>
            </span>
            <el-upload
              slot="left"
              :action="uploadURL+'/imgUpload'"
              :on-error="uploadError"
              :show-file-list="false"
              :data="uploadData"
              :on-success="legalpepresentPicSuccess"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
            >
              <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传法人照片</yd-button>
            </el-upload>
          </yd-cell-item>
          <div class="uploadimgPre" v-if="form.legalpepresentPic && form.customerProperty !='005'">
            <img :src="configs.imgURL+form.legalpepresentPic" alt>
          </div>
          <template v-if="form.customerProperty !='005' && form.channelCode != '001201'">
            <yd-cell-item>
              <span slot="left">
                <div class="lable">
                  <strong>身份证正面照</strong>
                </div>
              </span>
              <el-upload
                slot="left"
                :action="uploadURL+'/imgUpload'"
                :on-error="uploadError"
                :show-file-list="false"
                :data="uploadData"
                :on-success="idCardPicSuccess"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
              >
                <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传正面照</yd-button>
              </el-upload>
            </yd-cell-item>
            <div class="uploadimgPre" v-if="form.idCardPic_01">
              <img :src="configs.imgURL+form.idCardPic_01" alt>
            </div>
            <yd-cell-item>
              <span slot="left">
                <div class="lable">
                  <strong>身份证反面照</strong>
                </div>
              </span>
              <el-upload
                slot="left"
                :action="uploadURL+'/imgUpload'"
                :on-error="uploadError"
                :show-file-list="false"
                :data="uploadData"
                :on-success="idCardPicSuccess1"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
              >
                <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传反面照</yd-button>
              </el-upload>
            </yd-cell-item>
            <div class="uploadimgPre" v-if="form.idCardPic_02">
              <img :src="configs.imgURL+form.idCardPic_02" alt>
            </div>
          </template>
          <!-- 上传门店照片 -->
          <yd-cell-item v-if="form.customerProperty =='004'">
            <span slot="left">
              <div class="lable">
                <strong>门头照片</strong>
              </div>
            </span>
            <el-upload
              slot="left"
              :action="uploadURL+'/imgUpload'"
              :on-error="uploadError"
              :show-file-list="false"
              :data="uploadData"
              :on-success="storePicSuccess"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
            >
              <yd-button type="primary" bgcolor="#6FB138" color="#fff">上传门头照片</yd-button>
            </el-upload>
          </yd-cell-item>
          <div class="uploadimgPre" v-if="form.storePic && form.customerProperty =='004'">
            <img :src="configs.imgURL+form.storePic" alt>
          </div>
          <!-- 门店个人用户需要地图选择位置 -->
          <yd-cell-item arrow v-if="form.customerProperty =='004' || form.customerProperty =='005'">
            <span slot="left">
              <div class="lable">
                <strong>地址</strong>
              </div>
            </span>
            <span slot="right" @click="openMapWX" v-if="form.address">{{form.address}}</span>
            <span slot="right" @click="openMapWX" v-else>地图选择位置</span>
          </yd-cell-item>
          <!-- 非门店个人用户不用地图选择位置 -->
          <yd-cell-item
            v-if="!(form.customerProperty=='004' || form.customerProperty=='005') && form.channelCode != '001201'"
          >
            <span slot="left">
              <div class="lable">
                <strong>地址</strong>
              </div>
            </span>
            <yd-input v-model="form.address" type="text" slot="left" max="20" placeholder="请填写地址"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
      </template>
    </div>

    <div class="yd-tabbar" slot="bottom" v-if="!isUpdate">
      <div class="flex flex-x-center" style="width: 100%;">
        <div @click="save" class="loginbtn flex flex-y-center flex-x-center">
          <span>提交注册</span>
        </div>
      </div>
    </div>
    <div class="yd-tabbar" slot="bottom" v-else>
      <div class="flex flex-x-center" style="width: 100%;">
        <div @click="submitUpdate" class="loginbtn flex flex-y-center flex-x-center">
          <span>提交</span>
        </div>
      </div>
    </div>
  </yd-layout>
</template>
<script>
import mixin from "../../utils/mixin.js";
import "element-ui/lib/theme-chalk/index.css";
import { Upload } from "element-ui";
import configs from "../../configs";
export default {
  mixins: [mixin],
  components: {
    [Upload.name]: Upload
  },
  data() {
    return {
      cgsActive: false,
      gysActive: false,
      businessLicensePic: "",
      legalpepresentPic: "",
      storePic: "",
      foodLicensePic: "",
      muslimfoodPermitPic: "",
      marketcertPic: "",
      idCardPic_01: "",
      idCardPic_02: "",
      configs: configs,
      form: {
        name: "",
        telephone: "",
        password: "",
        // 五类客户类型
        customerProperty: "",
        // 完善资料字段
        regId: "", //营业执照号码
        businessLicensePic: "", //执照照片
        legalpepresent: "", //法人
        legalpepresentPic: "", //法人照片
        storePic: "", //门头照片
        foodLicensePic: "",
        muslimfoodPermitPic: "",
        idCard: "", // 身份证正反面照片 '正面照片Url,反面Url'
        address: "",
        type: "",
        businessScope: "",
        idCardPic_01: "",
        idCardPic_02: "",
        isLocal: "",
        property: "",
        channelCode: "",
        remark: "",
        marketcertPic: "",
        enterpriseType: ""
      },
      businessScope: [],
      fileList: [],
      uploadData: {
        savePath: "registerNewtwo"
      },
      isUpdate: false,
      repassword: "",
      ChannelList: [],
      customerTypeList: [],
      categoryTypeList: [],
      defaultChannelCode: "",
      defaultProperty: "1",
      TCTypeList: [],
      isLocalList: [
        {
          name: "本地",
          value: "0"
        },
        {
          name: "外地",
          value: "1"
        }
      ]
    };
  },
  watch: {
    form: {
      handler(val, oldVal) {
        // 解决12批选择个人后 在选择其他身份完善资料显示不正确
        if (
          !(val.customerProperty == "001" || val.customerProperty == "002") &&
          val.property != ""
        ) {
          this.form.property = "";
        }
        if (!(val.customerProperty == "001") && val.islocal != "") {
          this.form.islocal = "";
        }
      },
      deep: true
    }
  },
  mounted() {
    // 解决苹果不回弹页面
    this.$nextTick(() => {
      var u = navigator.userAgent;
      var app = navigator.appVersion;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let ele = document.getElementsByTagName("input");

      if (isIOS) {
        for (let i of ele) {
          // console.log(i)
          i.onblur = function() {
            this.blurAdjust();
          }.bind(this);
        }
      }
    });
  },
  created() {
    this.$store.dispatch("changeNavBarTitle", "注册");
    this.getTCType();
    this.getCustomerType();
    this.getCategoryType();
    this.getChannelList();
    this.postRequest("channel/list", {
      level: 3,
      deleted: 0,
      isDefault: 1
    }).then(d => {
      if (d.data && d.data.state == 0) {
        if (d.data.aaData.length > 0) {
          this.defaultChannelCode = d.data.aaData[0].code;
        }
      }
    });
    // 获取用户已经填写的个人信息
    if (sessionStorage.getItem("jz_saveInputInfo")) {
      this.form = JSON.parse(sessionStorage.getItem("jz_saveInputInfo"));
    }
    // 获取用户选择的地址
    if (sessionStorage.getItem("getAddr")) {
      var getAddrByMap = JSON.parse(sessionStorage.getItem("getAddr"));
      this.userSelectAddressInfo = getAddrByMap;
      this.selectedAddressStr = `${getAddrByMap.pname}${getAddrByMap.cityname}${
        getAddrByMap.adname
      }${getAddrByMap.address}`;
      if (
        this.form.customerProperty == "004" ||
        this.form.customerProperty == "005"
      ) {
        this.form.address = this.selectedAddressStr;
      }
    }
    // 获取临时用户更新注册信息
    if (this.$store.state.temporarUserId) {
      this.isUpdate = true;
      this.postRequest("customer/queryById", {
        id: this.$store.state.temporarUserId
      }).then(resp => {
        if (resp.data && resp.data.state == 0) {
          if (resp.data.aaData) {
            this.form.name = resp.data.aaData.name;
            this.form.telephone = resp.data.aaData.tel;
          }
        }
      });
    } else {
      this.isUpdate = false;
    }
  },
  methods: {
    /**
     * 上传执照图片成功回调
     */
    businessLicensePicSuccess(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.businessLicensePic = URL.createObjectURL(file.raw);
        this.form.businessLicensePic = res.aaData.path;
      }
    },
    /**
     * 上传市场证明成功回调
     */
    marketcertPicSuccess(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.marketcertPic = URL.createObjectURL(file.raw);
        this.form.marketcertPic = res.aaData.path;
      }
    },
    /**
     * 上传法人成功回调
     */
    legalpepresentPicSuccess(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.legalpepresentPic = URL.createObjectURL(file.raw);
        this.form.legalpepresentPic = res.aaData.path;
      }
    },
    /**
     * 上传食品流通许可证成功回调
     */
    foodLicensePicSuccess(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.foodLicensePic = URL.createObjectURL(file.raw);
        this.form.foodLicensePic = res.aaData.path;
      }
    },
    /**
     * 上传清真食品准营证成功回调
     */
    muslimfoodPermitPicSuccess(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.muslimfoodPermitPic = URL.createObjectURL(file.raw);
        this.form.muslimfoodPermitPic = res.aaData.path;
      }
    },
    /**
     * 上传men点图成功回调
     */
    storePicSuccess(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.storePic = URL.createObjectURL(file.raw);
        this.form.storePic = res.aaData.path;
      }
    },
    /**
     * 上传法人身份证正面成功回调
     */
    idCardPicSuccess(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.idCardPic_01 = URL.createObjectURL(file.raw);
        this.form.idCardPic_01 = res.aaData.path;
      }
    },
    /**
     * 上传法人身份证反面成功回调
     */
    idCardPicSuccess1(res, file) {
      this.$dialog.loading.close();
      if (res.state == 0 && res.aaData) {
        // this.idCardPic_02 = URL.createObjectURL(file.raw);
        this.form.idCardPic_02 = res.aaData.path;
      }
    },
    /**
     * 上传图片之前的操作
     */
    beforeAvatarUpload(file) {
      this.$dialog.loading.open("图片上传中请稍后...");
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      // 	this.$dialog.alert({
      // 		mes: '上传图片大小不能超过 2MB!'
      // 	});
      // 	this.$dialog.loading.close()
      // }
    },
    /**
     * 获取渠道
     */
    getChannelList() {
      this.postRequest("channel/list", {
        level: 3,
        deleted: 0
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            d.data.aaData.push({
              code: "QT",
              name: "其他"
            });
            this.ChannelList = d.data.aaData;
          }
        }
      });
    },
    /**
     * 获取经营户性质
     */
    getCustomerType() {
      this.postRequest("datadic/list", {
        dataType: "CUSTOMER_PROPERTY"
        // extendVal: "merchant"
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.customerTypeList = d.data.aaData;
          }
        }
      });
    },
    /**
     * 获取供应商品分类
     */
    getCategoryType() {
      this.postRequest("category/list", {
        level: 1,
        enabled: 1
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.categoryTypeList = d.data.aaData;
          }
        }
      });
    },
    checkForm(isUpdate) {
      if (this.form.customerProperty == "") {
        this.$dialog.alert({
          mes: "请填选择身份"
        });
        return false;
      }
      // 4，厂商，团体，门店，配送公司，个人不需要渠道,经营户类型默认到公司√
      if (
        this.form.customerProperty == "001" ||
        this.form.customerProperty == "002"
      ) {
        if (this.form.channelCode == "") {
          this.$dialog.alert({
            mes: "请选择渠道"
          });
          return false;
        }
        if (this.form.channelCode == "QT" && this.form.remark == "") {
          this.$dialog.alert({
            mes: "请输入所在市场备注"
          });
          return false;
        }
      }

      if (
        this.form.customerProperty != "005" &&
        this.form.property == "" &&
        this.form.customerProperty == "001" &&
        this.form.channelCode != "001201"
      ) {
        if (
          this.form.customerProperty == "001" ||
          this.form.customerProperty == "002"
        ) {
          if (this.form.property == "") {
            this.$dialog.alert({
              mes: "请选择经营户类型"
            });
            return false;
          }
        }
      }

      if (this.form.name == "") {
        let mes = `个人/公司名称`;
        this.$dialog.alert({
          mes: `请填写${mes}`
        });
        return false;
      }

      if (this.form.telephone == "") {
        this.$dialog.alert({
          mes: "请填写联系电话"
        });
        return false;
      }

      if (!isUpdate) {
        if (this.form.password == "") {
          this.$dialog.alert({
            mes: "请填写密码"
          });
          return false;
        }
        if (this.form.repassword == "") {
          this.$dialog.alert({
            mes: "请确认密码"
          });
          return false;
        }
      }

      if (this.repassword != this.form.password) {
        this.$dialog.alert({
          mes: "两次密码不一致"
        });
        return false;
      }

      // 一级批发商选择供应商来源
      if (
        this.form.customerProperty == "001" &&
        this.form.channelCode == "QT" &&
        this.form.property != "2" &&
        this.form.isLocal == ""
      ) {
        this.$dialog.alert({
          mes: "请选择供应商品来源"
        });
        return false;
      }
      // 厂商一批经营范围选择
      if (
        (this.form.customerProperty == "007" ||
          this.form.customerProperty == "001") &&
        this.businessScope.length == 0
      ) {
        this.$dialog.alert({
          mes: "请选择供应商品分类"
        });
        return false;
      }
      // 必传图片验证
      if (this.form.customerProperty != "005") {
        if (
          this.form.customerProperty == "001" &&
          this.form.property != "1" &&
          this.form.property != "" &&
          this.form.marketcertPic == ""
        ) {
          this.$dialog.alert({
            mes: "请上传市场证明"
          });
          return false;
        }
        // 请输入营业执照号码
        if (
          this.form.regId == "" &&
          !(this.form.customerProperty == "001" && this.form.isLocal == "0") &&
          (this.form.property != 2 && this.defaultProperty != 2)
        ) {
          this.$dialog.alert({
            mes: "请输入营业执照号码"
          });
          return false;
        }
        // 请上传营业执照
        if (this.form.businessLicensePic === "") {
          this.$dialog.alert({
            mes: "请上传营业执照"
          });
          return false;
        }

        // // 食品流通许可证
        // if (this.form.foodLicensePic === "") {
        //   if (this.form.customerProperty != "003" && this.form.property != 2) {
        //     this.$dialog.alert({
        //       mes: "请上传食品流通许可证"
        //     });
        //     return false;
        //   }
        // }
        // // 上传清真食品准营证
        // if (this.form.muslimfoodPermitPic === "") {
        //   if (this.form.customerProperty != "003") {
        //     this.$dialog.alert({
        //       mes: "请上传清真食品准营证"
        //     });
        //     return false;
        //   }
        // }
        // 上传法人照片
        if (
          this.form.legalpepresentPic === "" &&
          this.form.channelCode != "001201"
        ) {
          this.$dialog.alert({
            mes: "请上传法人照片"
          });
          return false;
        }
        // 请上传身份证正面照
        if (
          this.form.idCardPic_01 === "" &&
          this.form.channelCode != "001201"
        ) {
          this.$dialog.alert({
            mes: "请上传身份证正面照"
          });
          return false;
        }
        // 请上传身份证反面照
        if (
          this.form.idCardPic_02 === "" &&
          this.form.channelCode != "001201"
        ) {
          this.$dialog.alert({
            mes: "请上传身份证反面照"
          });
          return false;
        }
      }

      // 请输入法人名称
      if (
        this.form.legalpepresent == "" &&
        this.form.customerProperty != "005" &&
        this.form.channelCode != "001201"
      ) {
        this.$dialog.alert({
          mes: "请输入法人名称"
        });
        return false;
      }
      // 请输入地址
      if (this.form.address == "" && this.form.channelCode != "001201") {
        this.$dialog.alert({
          mes: "请输入地址"
        });
        return false;
      }
      return true;
    },
    /**
     * 保存
     */
    async save() {
      console.log(this.checkParam());
      if (this.checkForm()) {
        // 保存
        let matcheResult = await this.telephoneMatche();
        if (matcheResult.state == 1) {
          // 如果是门店或个人必要通过地图选择位置获取经纬度
          if (
            this.form.customerProperty == "004" ||
            this.form.customerProperty == "005"
          ) {
            this.regPost(true, this.checkParam());
          } else {
            this.regPost(false, this.checkParam());
          }
        } else {
          this.$dialog.alert({
            mes: matcheResult.msg
          });
        }
      }
    },
    /**
     * @description: 临时客户保存用户信息
     * @param {type}
     * @return:
     */
    async submitUpdate() {
      if (this.checkForm(true)) {
        let param = this.checkParam();
        param.id = this.$store.state.temporarUserId;
        param.extend = this.form.customerProperty;
        // 保存
        // 如果是门店或个人必要通过地图选择位置获取经纬度
        if (
          this.form.customerProperty == "004" ||
          this.form.customerProperty == "005"
        ) {
          this.updateRegPost(true, param);
        } else {
          this.updateRegPost(false, param);
        }
      }
    },
    /**
     * 调用接口
     * @param 是否个人门店注册
     */
    regPost(isgrOrMd, param) {
      this.form.isGetId = 1;

      this.postRequest("customer/customerRegist", param).then(d => {
        if (d.data && d.data.state == 0) {
          // 门店个人注册需要添加地址信息
          if (isgrOrMd) {
            if (this.userSelectAddressInfo) {
              this.createUserAddress(d.data.aaData.id);
            }
          } else {
            this.$dialog.toast({
              mes: "注册成功",
              timeout: 1200,
              icon: "success",
              callback: () => {
                if (
                  this.form.customerProperty == "004" ||
                  this.form.customerProperty == "005"
                ) {
                  this.$router.go(-2);
                } else {
                  this.$router.go(-1);
                }
              }
            });
          }
        }
      });
    },
    getTCType() {
      this.postRequest("datadic/list", {
        dataType: "TC_TYPE"
      }).then(d => {
        if (d.data && d.data.state == 0) {
          if (d.data.aaData) {
            this.TCTypeList = d.data.aaData;
          }
        }
      });
    },
    /**
     * @description: 临时用户完善注册信息提交接口
     * @param {type} isgrOrMd
     * @return:
     */
    updateRegPost(isgrOrMd, param) {
      this.form.isGetId = 1;

      this.postRequest("customer/update", param).then(d => {
        if (d.data && d.data.state == 0) {
          this.$store.state.temporarUserId = null;
          // 门店个人注册需要添加地址信息
          if (isgrOrMd) {
            if (this.userSelectAddressInfo) {
              this.createUserAddress(this.$store.state.temporarUserId);
            }
          } else {
            this.$dialog.toast({
              mes: "提交成功",
              timeout: 1200,
              icon: "success",
              callback: () => {
                if (
                  this.form.customerProperty == "004" ||
                  this.form.customerProperty == "005"
                ) {
                  this.$router.go(-2);
                } else {
                  this.$router.go(-1);
                }
              }
            });
          }
        }
      });
    },
    /**
     * @description: 封装注册参数
     * @param {type}
     * @return:
     */
    checkParam() {
      let param = {
        isGetId: 1,
        name: this.form.name,
        telephone: this.form.telephone,
        password: this.form.password,
        customerProperty: this.form.customerProperty,
        regId: this.form.regId,
        businessLicensePic: this.form.businessLicensePic,
        legalpepresent: this.form.legalpepresent,
        legalpepresentPic: this.form.legalpepresentPic,
        foodLicensePic: this.form.foodLicensePic,
        muslimfoodPermitPic: this.form.muslimfoodPermitPic,
        storePic: this.form.storePic,
        address: this.form.address,
        type: this.form.type,
        enterpriseType: this.form.enterpriseType,
        marketcertPic: this.form.marketcertPic
      };
      if (this.form.idCardPic_01 != "" && this.form.idCardPic_02 != "") {
        param.idCard = `${this.form.idCardPic_01};${this.form.idCardPic_02}`;
      }

      if (param.customerProperty == "007" || param.customerProperty == "001") {
        this.form.businessScope
          ? (param.businessScope = this.form.businessScope.join("/"))
          : (param.businessScope = "");
      }
      // 4，厂商，团体，门店，配送公司，个人不需要渠道,经营户类型默认到公司
      if (param.customerProperty == "001" || param.customerProperty == "002") {
        if (this.form.channelCode == "QT") {
          param.channelCode = "";
          param.remark = this.form.remark;
        } else {
          param.channelCode = this.form.channelCode;
          param.remark = "";
        }
      } else {
        param.channelCode = "";
        param.remark = "";
      }
      // 1p商品来源
      if (param.customerProperty == "001") {
        param.islocal = this.form.isLocal;
      }
      // 1,2p选这经营户类型
      if (param.customerProperty == "001" || param.customerProperty == "002") {
        param.property = this.form.property;
      } else if (param.customerProperty != "005") {
        param.property = this.defaultProperty;
      }
      // 出一批二批默认渠道
      if (param.channelCode == "" && param.remark == "") {
        param.channelCode = this.defaultChannelCode;
      }

      return param;
    },
    /**
     * 添加地址
     */
    createUserAddress(customerId) {
      var url = "address/create";
      var param = {
        provinceCode: this.userSelectAddressInfo.pcode,
        cityCode: this.userSelectAddressInfo.cityCode,
        districCode: this.userSelectAddressInfo.adcode,
        detailedAddress: this.form.address,
        contacts: this.form.name,
        phoneNumber: this.form.telephone,
        customerId: customerId,
        comment: "",
        latitude: this.userSelectAddressInfo.location.lat,
        longitude: this.userSelectAddressInfo.location.lng
      };
      // 获取cityCode
      this.postRequest("comArea/list", {
        parentAreaCode: param.provinceCode,
        level: 2
      }).then(d => {
        if (d.data && d.data.state == 0) {
          for (let a = 0; a < d.data.aaData.length; a++) {
            if (
              d.data.aaData[a].areaName == this.userSelectAddressInfo.cityname
            ) {
              param.cityCode = d.data.aaData[a].areaCode;
              break;
            }
          }
          // 调用新增地址接口
          this.postRequest(url, param).then(d => {
            if (d.data && d.data.state == 0) {
              this.$dialog.toast({
                mes: "保存成功",
                timeout: 1200,
                icon: "success",
                callback: () => {
                  if (
                    this.form.customerProperty == "004" ||
                    this.form.customerProperty == "005"
                  ) {
                    this.$router.go(-2);
                  } else {
                    this.$router.go(-1);
                  }
                }
              });
              sessionStorage.removeItem("jz_getAddrByMap");
              sessionStorage.removeItem("jz_saveInputInfo");
            }
          });
        }
      });
    },
    /**
     * 选择采购商
     */
    cgsClick() {
      this.form.key = "buyer";
      this.cgsActive = true;
      this.gysActive = false;
    },
    /**
     * 选择供应商商
     */
    gysClick() {
      this.form.key = "merchant";
      this.cgsActive = false;
      this.gysActive = true;
    },
    /**
     * 验证手机号码
     */
    telephoneMatche() {
      return new Promise((resolve, reject) => {
        this.postRequest("customer/telephoneMatche", {
          telephone: this.form.telephone
        }).then(d => {
          if (d.data) {
            resolve(d.data);
          }
        });
      });
    },
    /**
     * 打开地图选地址
     */
    openMapWX() {
      window.sessionStorage.setItem(
        "jz_saveInputInfo",
        JSON.stringify(this.form)
      );
      this.$router.push({
        name: "selectAddr",
        query: {
          from: "reg"
        }
      });
    },
    /**
     * 上传失败
     */
    uploadError() {
      this.$dialog.loading.close();
      this.$dialog.toast({
        mes: "上传失败",
        timeout: 1200,
        icon: "error"
      });
    }
  }
};
</script>
<style lang="scss">
.yd-tabbar {
  padding: 0 !important;
}
.yd-tabbar .loginbtn {
  width: 100%;
  height: 0.78rem;
  background: #6fb138;
  // border-radius: 0.39rem;
  color: #fff;
  font-size: 0.31rem;
  text-align: center;
}
#UserReg {
  .uploadimgPre {
    width: 121px;
    height: 121px;
    border-radius: 3px;
    margin: 10px 10px 10px 2.4rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .yd-cell-item:not(:last-child):after,
  .yd-cell:after {
    border: 0.01rem solid #e4e4e4;
    background-image: none;
  }

  select {
    color: #333;
    padding-left: 5px;
  }

  .lable {
    width: 2rem;
    font-size: 0.3rem;
    text-align: right;
    margin-right: 0.35rem;
  }
  .yd-cell-title {
    padding: 0.24rem;
  }

  .sfbtns {
    padding: 0.1rem 0 0.2rem;

    .yd-radio,
    .yd-checkbox {
      display: block;
    }

    .yd-radio-icon {
      color: #6fb138 !important;
    }

    span.text {
      font-size: 0.28rem;
    }
  }

  .sfbtn {
    border: 1px solid #c6c6c6;
    padding: 3px 10px;
    border-radius: 3px;
    margin-right: 5px;
  }

  .sfbtn.active {
    border: 1px solid #6fb138;
    background: #6fb138;
    color: #fff;
  }
}
</style>
