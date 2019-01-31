/**
 * 接口是一种规范的定义，定义了行为和动作的规范
 * 接口定义了某些类必须遵守的规范
 * 接口不关心类的内部状态数据，也不关心细节
 * 类似与抽象类，还增加了属性、函数等类型
 * 
 * 1、约束对象，复用
 */
interface UserInterface {
    name: string,
    age: number,
    home?: string
}
function getUserInfo(user: UserInterface): void {
    console.log(`${user.name} + ${user.age} + ${user.home}`)
}
function getVipInfo(user: UserInterface): void {
    console.log(`${user.name} + ${user.age}`)
}
getUserInfo({
    name: 'lyy',
    age: 18,
    home: '北京'
})
getVipInfo({
    name: 'lyy',
    age: 18
})