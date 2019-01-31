/**
 * 接口约束 class
 */
interface Animals {
    name: string,
    speak(sth: string): void
}
interface Bird {
    fly(): void
}
// 接口扩展
interface MachineBird extends Bird {
    machineFly(): void
}
// 实现接口
class Dogs implements Animals, MachineBird {
    constructor (public name: string) {
        this.name = name
    }
    speak (sth: string): void {
        console.log('speak')
    }
    fly () {
        console.log('fly')
    }
    machineFly () {
        console.log('machineFly')
    }
}
let dogs = new Dogs('dog')
console.log(dogs)