"use strict";
function getUserInfo(user) {
    console.log(user.name + " + " + user.age + " + " + user.home);
}
function getVipInfo(user) {
    console.log(user.name + " + " + user.age);
}
getUserInfo({
    name: 'lyy',
    age: 18,
    home: '北京'
});
getVipInfo({
    name: 'lyy',
    age: 18
});
