/**
 * 定义了一个枚举类型的值，性别，里面有两个选项
 */
enum Gender {
    GiRL = 'female',
    BOY = 'male'
};
console.log(`李雷是一个${Gender.BOY}，李梅是${Gender.GiRL}`);

/**
 * 用途：网购
 */
enum OrderStatus {
    WaitForPay = '等待付款',
    WaitForSend = '等待发货',
    Sended = '已发货',
    Signed = '已签收'
};