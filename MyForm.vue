<template>
  <div class="myForm">
    <van-field
      placeholder="请输入证件号"
      v-model.trim="form.certificateCode"
      @blur="checkCertificateCode"
      @input="checkCertificateCode"
      :error-message="errMsg.certificateCode"
      clearable
    />
    <van-field
      placeholder="请输入密码"
      v-model.trim="form.password"
      @blur="checkPassword"
      @input="checkPassword"
      :error-message="errMsg.password"
      clearable
    />
    <div class="deepErrMsg" v-if="deepErrMsg">{{deepErrMsg}}</div>
    <van-button type="info" @click="login" :class="{ toLogin: !disabled }"
      >立&nbsp;即&nbsp;登&nbsp;录</van-button
    >
  </div>
</template>

<script>
export default {
  name: "Demo",
  components: {},
  mixins: [],
  props: {},

  data() {
    return {
      form: {
        password: "",
        certificateCode: "",
      },
      errMsg: {
        password: "",
        certificateCode: "",
      },
      disabled: true,
      deepErrMsg: '',
    //   deepErrMsg: "请输入正确的证件号或密码!"
    };
  },

  methods: {
    checkBtn() {
       if(this.form.certificateCode && this.form.password && !this.errMsg.password && !this.errMsg.certificateCode) this.disabled = false
    },
    checkCertificateCode() {
      if(this.deepErrMsg) this.deepErrMsg = ""
      if (!this.form.certificateCode) {
        this.errMsg.certificateCode = "请输入证件号码！";
        this.disabled = true
        return false;
      } else {
        this.errMsg.certificateCode = "";
        this.checkBtn()
        return true;
      }
    },
    checkPassword() {
      if(this.deepErrMsg) this.deepErrMsg = ""
      const passwordReg = /^[a-zA-Z0-9]{6,8}$/;
      if (!this.form.password) {
        this.errMsg.password = "请输入密码！";
        this.disabled = true
        return false;
      } else if (!this.form.password.match(passwordReg)) {
        this.errMsg.password = "请输入6-8位字母和数字！";
        this.disabled = true
        return false;
      } else {
        this.errMsg.password = "";
        this.checkBtn()
        return true;
      }
    },
    login() {
      const checkPassword = this.checkPassword();
      const checkCertificateCode = this.checkCertificateCode();
      if (checkPassword && checkCertificateCode) {
        console.log("通过", this.form);
        setTimeout(() => {
            this.deepErrMsg = "请输入正确的证件号或密码!"
        }, 1000);
      }
    },
  },
};
// /* 检查身份证是否合法 验证时请先验证长度是否为15为或者18位 */
//  public static final String IDCARD = "\\d{6}(19|20)*[0-99]{2}(0[1-9]{1}|10|11|12)(0[1-9]{1}"
//      + "|1[0-9]|2[0-9]|30|31)(\\w*)";
//  /** 检查护照是否合法 */
//  public static final String PASSPORT1 = "/^[a-zA-Z]{5,17}$/";
//  public static final String PASSPORT2 = "/^[a-zA-Z0-9]{5,17}$/";
//  /** 港澳通行证验证   */
//  public static final String HKMAKAO = "/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/";
//  /** 台湾通行证验证   */
//  public static final String TAIWAN1 = " /^[0-9]{8}$/";
//  public static final String TAIWAN2 = "/^[0-9]{10}$/"; 
//  https://www.jb51.net/article/109327.htm
//  https://blog.csdn.net/T_shiyi/article/details/79138865
//  */
/*https://blog.csdn.net/qq_44832960/article/details/106613219 vue使用rem，实现移动端适配 */
</script>


<style lang="scss">
.myForm {
  .van-button.van-button--info.van-button--normal {
    background-color: #8fbbe7;
    &.toLogin {
      background-color: #1989fa;
    }
  }
}
</style>
