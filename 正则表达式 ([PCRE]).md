https://www.cnblogs.com/hzzjj/p/10665264.html 一组匹配中国大陆手机号码的正则表达式

一组匹配中国大陆手机号码的正则表达式。

# 正则表达式 ([PCRE])

##### 如果你需要 POSIX 标准的正则表达式，点击这里

## 匹配所有号码（手机卡 + 数据卡 + 上网卡）

[`^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4(?:[14]0\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$`]匹配所有号码（手机卡 + 数据卡 + 上网卡）]

## 匹配所有支持短信功能的号码（手机卡 + 上网卡）

[`^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$`]匹配所有支持短信功能的号码（手机卡 + 上网卡）]

## 手机卡

### 匹配所有

[`^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$`]匹配基础运营商]

### 匹配中国移动

[`^(?:\+?86)?1(?:3(?:4[^9\D]|[5-9]\d)|5[^3-6\D]\d|8[23478]\d|(?:78|98)\d)\d{7}$`]匹配基础运营商中国移动]

### 匹配中国联通

[`^(?:\+?86)?1(?:3[0-2]|[578][56]|66)\d{8}$`]匹配基础运营商中国联通

### 匹配中国电信

[`^(?:\+?86)?1(?:3(?:3\d|49)\d|53\d{2}|8[019]\d{2}|7(?:[37]\d{2}|40[0-5])|9[19]\d{2})\d{6}$`]匹配基础运营商中国电信

### 匹配北京船舶通信导航有限公司（海事卫星通信）

[`^(?:\+?86)?1749\d{7}$`]匹配北京船舶通信导航有限公司（海事卫星通信）

### 工业和信息化部应急通信保障中心（应急通信）

[`^(?:\+?86)?174(?:0[6-9]|1[0-2])\d{6}$`]工业和信息化部应急通信保障中心（应急通信）





匹配手机号码的正则表达式：^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$

目前匹配号段

中国电信号段

133、149、153、173、177、180、181、189、199
中国联通号段
130、131、132、145、155、156、166、175、176、185、186
中国移动号段
134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198
其他号段
14号段以前为上网卡专属号段，如中国联通的是145，中国移动的是147等等。
虚拟运营商
电信：1700、1701、1702
移动：1703、1705、1706
联通：1704、1707、1708、1709、171





## vue系列：vue中使用vee-validate3表单验证

https://blog.csdn.net/weixin_43972437/article/details/106408302





## vee-validate文档

+ ValidationProvider组件是一个包装输入并使用作用域插槽提供验证状态的组件

  + Scoped Slot Props

    | 名称        |            类型            | 描述                                                         |
    | :---------- | :------------------------: | :----------------------------------------------------------- |
    | errors      |         `string[]`         | 错误消息列表                                                 |
    | failedRules |   `[x: string]: string`    | 失败规则的映射对象，其中（规则，消息）作为（键，值）         |
    | aria        | `{ [x: string]: string }`  | 映射aria属性的对象以便于访问.                                |
    | classes     | `{ [x: string]: boolean }` | 根据验证状态配置的类名的映射对象.                            |
    | validate    |   `(e: any) => Promise`    | 用作触发验证的事件处理程序的函数。对于不使用v-model的字段很有用. |
    | reset       |        `() => void`        | 重置验证状态的函数.                                          |
    | valid       |    `boolean|undefined`     | 如果字段有效。                                               |
    | invalid     |    `boolean|undefined`     | 如果字段无效。                                               |
    | changed     |         `boolean`          | 如果字段值已更改.                                            |
    | touched     |         `boolean`          | If the field has been blurred.                               |
    | untouched   |         `boolean`          | If the field wasn't blurred.                                 |
    | pristine    |         `boolean`          | 如果字段值未被操纵.                                          |
    | dirty       |         `boolean`          | If the field value has been manipulated.                     |
    | pending     |         `boolean`          | 指示是否正在进行字段验证.                                    |
    | required    |         `boolean`          | If the field is required.                                    |
    | validated   |         `boolean`          | If the field has been validated at least once.               |
    | passed      |         `boolean`          | If the field has been validated and is valid.                |
    | failed      |         `boolean`          | If the field has been validated and is invalid.              |

  + `ValidationProvider`默认编译为 span标签

    ```html
    <ValidationProvider rules="required" v-slot="{ errors }">
      <input v-model="value" type="text">
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
    
    <!-- HTML 输出 -->
    <span>
      <input type="text">
      <span>ERROR_MSG_PLACEHOLDER</span>
    </span>
    ```

  + 可以通过 `tag`属性更改默认标签

    ```html
    <ValidationProvider rules="required" v-slot="{ errors }" tag="div">
      <input v-model="value" type="text">
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
    
    <!-- HTML Output -->
    <div>
      <input type="text">
      <span>ERROR_MSG_PLACEHOLDER</span>
    </div>
    ```

  + `slim`属性可以用来减少不必要渲染, 默认该属性为 `false`

    