const BaseController = require('./base');

class UserController extends BaseController {
	async index() {
		let { service } = this;
		let result = await service.user.list()
		this.success(result)
	}
	async create() {
		let { ctx, service } = this;
		let user = ctx.request.body;
		let result = await service.user.create(user)
		if (result.affectedRows > 0) {
			this.success(result.insertId)
		} else {
			this.error('用户添加失败')
		}
	}
	async update() {
		let { ctx, service } = this;
		let id = ctx.params.id;
		let updateUser = ctx.request.body;
		updateUser.id = id;
		let result = await service.user.update(updateUser)
		if (result.affectedRows > 0) {
			this.success('用户更新成功')
		} else {
			this.error('用户更新失败')
		}
	}
	async destroy() {
		let { ctx, service } = this;
		let id = ctx.params.id;
		let result = await service.user.destroy(id);
		if (result.affectedRows > 0) {
			this.success('用户删除成功')
		} else {
			this.error('用户删除失败')
		}
	}
}

module.exports = UserController;