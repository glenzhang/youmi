/**
* 正则模块
* @import youmi.js, utility.js
*/

/// <reference path="youmi.js" />
/// <reference path="utility.js" />

Youmi.Utility.prop("Regs", (function () {

    return {
        // 支付宝账号-只能是邮箱和手机
        alipay: /^(([a-zA-Z0-9])+([a-zA-Z0-9_\.\-])*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4}))|(0{0,1}1[3458]{1}[0-9]{9})$/ig,
        // 银行账号-仅包含英文字母、数字及中划线
        bankaccount: /^([a-zA-Z0-9]|-)+$/ig,
        // 空
        blank: /^\s*$/,
        // 移动电话
        cellphone: /^0{0,1}1[3458]{1}[0-9]{9}$/ig,
        // 邮箱
        email: /^([a-zA-Z0-9])+([a-zA-Z0-9_\.\-])*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/ig,
        // 大陆身份证-弱判断，只需位数和形式满足
        icard: /^(\d{18}|\d{15}|\d{17}x)$/ig,
        // 香港身份证
        ihkcard: /^[a-z0-9]{1}\d{6,7}[a-z0-9]{1}$/ig,
        // 台湾身份证
        itwcard: /^[a-z]{1}\d{8,}$/ig,
        // 用户名-仅包含汉字英文字母及空格
        uname: /^[\u4e00-\u9fa5a-zA-Z\s]+$/ig,
        // url
        url: /^http(s)?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ig,
        // 验证码
        vercode: /^\d{6}$/
    };
}()));