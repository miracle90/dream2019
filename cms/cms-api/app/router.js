'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	router.get('/', controller.home.index);
	// 名字 + 路径 + 控制器
	router.resources('user', '/user', controller.user);
	// 相当于 =>
	// router.get('/user', controller.user.index)
	// router.post('/user', controller.user.create)
	// router.put('/user/:id', controller.user.update)
	// router.delete('/user/:id', controller.user.destroy)
};