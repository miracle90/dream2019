'use strict';

module.exports = appInfo => {
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_lyy';

	// add your config here
	config.middleware = [];
	// 配置数据库：提供主机名，端口，数据库名称，用户名，密码
	config.mysql = {
		client: {
			host: 'localhost',
			port: 3306,
			database: 'cms',
			user: 'root',
			password: '',
		}
	}

	config.security = {
		csrf: false
	}
	return config;
};