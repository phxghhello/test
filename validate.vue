<template>
  <div class="test">
    校验
    <ValidationObserver ref="form">
      <ValidationProvider
        rules="required"
        name="姓名"
        v-slot="{ errors, classes }"
      >
        <div class="form-part username">
          <label for="">姓名</label>
          <el-input
            type="text"
            class="form-input"
            maxlength="20"
            v-model="formData.username"
            placeholder="请输入姓名"
            :class="classes"
          />
        </div>
        <span class="vee-error">{{ errors[0] }}</span>
      </ValidationProvider>
      <div>
        <ValidationProvider
          rules="required|isPhone"
          name="手机号"
          v-slot="{ errors, classes }"
        >
          <div class="form-part phone">
            <label for="">手机号</label>
            <el-input
              type="text"
              class="form-input"
              v-model="formData.phone"
              placeholder="请填写手机号"
              :class="classes"
            />
          </div>
          <span class="vee-error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div>------------------------------------------------------------------------------</div>
      <el-button type="text" @click="reset">重置</el-button>
      <div v-for="(item, index) in formData.emailList" :key="index">
        <ValidationProvider
          rules="required|isEmail|isEmail2"
          name="emailItem"
          v-slot="{ errors, classes }"
          ref="emailProvider"
          mode="eager"
        >
          <div class="form-part phone">
            <label for="">邮箱</label>
            <el-input
              type="text"
              class="form-input"
              v-model.trim="formData.emailList[index].emailAddress"
              placeholder="请填写邮箱"
              :class="classes"
            />
          </div>
          <span class="vee-error">{{ errors[0] }}</span>
          <el-button type="text" @click.prevent="removeInput(item)"
            >删除</el-button
          >
        </ValidationProvider>
      </div>
      <div>
        <el-button type="text" @click="addInput">新增</el-button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
// 引入验证规则
extend("required", required);
// 自定义验证规则
extend("isPhone", {
  validate: (value) => {
    const isPhone = /^[1][0-9]{10}$/.test(value);
    return isPhone;
  },
  message: "手机号格式不正确",
});
extend("isEmail", {
  validate: (value) => {
    const isPhone = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(value);
    return isPhone;
  },
  message: "邮箱格式不正确",
});

const isRepeat = (arr) => {
  var hash = {};
  for (var i in arr) {
    if (hash[arr[i]]) {
      return true;
    }
    hash[arr[i]] = true;
  }
  return false;
};
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    extend("isEmail2", {
      validate: (value) => {
        let flag = true;
        const { emailList } = this.formData
        console.log(emailList)
        let list = emailList
          .filter((email) => email.emailAddress)
          .map((item) => item.emailAddress)
        console.log(list, value)
        if (list.length > 1) {
          flag = !isRepeat(list)
        }
        console.log(flag);
        return flag;
      },
      message: "邮箱不能重复",
    });
    // rules="required|isEmail|isEmail3:@emailItem"
    extend("isEmail3", {
      params: ["emailItem"],
      validate: (value, { emailItem })=> {
        const { emailList } = this.formData
        console.log(emailList);
        let list = emailList
          .filter((email) => email.emailAddress)
          .map((item) => item.emailAddress)
          
        if (list.length > 1) {
          return value !== emailItem || !isRepeat(list)
        }
        return true
      },
      message: "不能重复",
    });
    return {
      formData: {
        username: "",
        phone: "",
        phoneList: [],
        emailList: [],
      },
    };
  },
  watch: {
    'formData.emailList': {
      deep:true,
      handler(emailList) {
        let flag = true
        let list = emailList
          .filter((email) => email.emailAddress)
          .map((item) => item.emailAddress)
        if (list.length > 1) {
          flag = !isRepeat(list)
        }
        if (flag) {
          this.$nextTick(()=>{
          let refsList = this.$refs.emailProvider 
          if (flag && refsList && refsList.length > 0) {
            refsList.forEach(ref=>{
              if (ref.value) {
                ref.validate(ref.value)
              }
            })
          }
          })
        }
      }
    }

  },
  methods: {
    reset() {
      let refsList = this.$refs.emailProvider
      if (refsList && refsList.length > 0)  {
        console.log('222',refsList);
        refsList.forEach(item=>{
          item.reset()
        })
      }
    },
    removeInput(item) {
      var index = this.formData.emailList.indexOf(item);
      if (index !== -1) {
        this.formData.emailList.splice(index, 1);
      }
    },
    addInput() {
      this.formData.emailList.push({
        emailAddress: "",
      });
    },
  },
};
</script>

<style>
.test {
  width: 450px;
}
.form-input.el-input.invalid .el-input__inner {
  border: solid 1px red;
}
</style>