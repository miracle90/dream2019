"use strict";
/**
 * 定义了一个枚举类型的值，性别，里面有两个选项
 */
var Gender;
(function (Gender) {
    Gender["GiRL"] = "female";
    Gender["BOY"] = "male";
})(Gender || (Gender = {}));
;
console.log("\u674E\u96F7\u662F\u4E00\u4E2A" + Gender.BOY + "\uFF0C\u674E\u6885\u662F" + Gender.GiRL);
/**
 * 用途：网购
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["WaitForPay"] = "\u7B49\u5F85\u4ED8\u6B3E";
    OrderStatus["WaitForSend"] = "\u7B49\u5F85\u53D1\u8D27";
    OrderStatus["Sended"] = "\u5DF2\u53D1\u8D27";
    OrderStatus["Signed"] = "\u5DF2\u7B7E\u6536";
})(OrderStatus || (OrderStatus = {}));
;
