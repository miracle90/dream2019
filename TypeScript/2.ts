/**
 * 数据类型
 * boolean 布尔型
 * number 数字型
 * string 字符串
 * 字符串型数组
 * 数字型数组
 * 对象型数组
 * 元组类型 => 长度和类型都不可变
 * 枚举类型 enum
 * any
 * undifined null
 * void
 * never
 * ! 感叹号强制取值
 */
let isMarried:boolean = true;
let age:number = 10;
let firstname:string = 'li';
let hobbies:string[] = ['smoking', 'drinking', 'haire'];
let numbers:Array<number> = [4, 5, 6]
let students:Array<object> = [{name: 'lyy', age: 18}]
let fullname:[string, string, number] = ['l', 'yy', 18]
let mixArray1:Array<string|number|boolean> = ['l', 'yy', 18]
let mixArray2:Array<any> = ['l', 'yy', 18]
