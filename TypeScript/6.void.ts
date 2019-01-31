function greeting(name:string):void {
    console.log(`hello ${name}!`)
    // return 'ok'
}
greeting('lyy')

/**
 * never
 * 一般用于抛异常的代码
 */
let xs:never;
xs = (() => {
    throw new Error('Wrong')
})()

let yy:object = {
    name: 'lyy'
}