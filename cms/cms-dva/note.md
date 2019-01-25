## dva

* 基于 redux、redux-saga 和 react-router 的轻量级前端框架。(Inspired by elm and choo)
* dva是基于 react + redux 最佳实践上实现的封装方案，简化了 redux 和 redux-saga 使用上的诸多繁琐操作

## 数据流向

* 改变数据的时候可以通过 dispatch 发起一个 action
* 如果是同步行为会直接通过 Reducers 改变 State
* 如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State

## 八个概念

#### state

#### action

#### dispatch

#### reducer

#### effect 异步操作

* 它来自于函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出
* dva 为了控制副作用的操作，底层引入了redux-sagas做异步流程控制，由于采用了generator的相关概念，所以将异步转成同步写法，从而将effects转为纯函数

#### subscribe

#### router

#### router components