## 什么是 Buffer

* 缓冲区Buffer是暂时存放输入输出数据的一段内存。
* JS语言没有二进制数据类型，而在处理TCP和文件流的时候，必须要处理二进制数据。
* NodeJS提供了一个Buffer对象来提供对二进制数据的操作
* 是一个表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数需要提前确定
* Buffer好比由一个8位字节元素组成的数组，可以有效的在JavasScript中表示二进制数据

## 定义buffer的三种方

```
// 通过长度定义 buffer
const buf1 = Buffer.alloc(10)

// 通过数组定义 buffer
const buf2 = Buffer.from([1, 2, 3])

// 字符串创建
const buf3 = Buffer.from('一夜暴富')
```

## base64

* Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种基于64个可打印字符来表示二进制数据的方法。
* Base64要求把每三个8Bit的字节转换为四个6Bit的字节（38 = 46 = 24），然后把6Bit再添两位高位0，组成四个8Bit的字节，也就是说，转换后的字符串理论上将要比原来的长1/3

```js
const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str){
    let buf = Buffer.from(str);
    let result = '';
    for(let b of buf){
        result += b.toString(2);
    }
    return result.match(/(\d{6})/g).map(val=>parseInt(val,2)).map(val=>CHARTS[val]).join('');
}
let r = transfer('珠');     //54+g
```
