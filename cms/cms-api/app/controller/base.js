const { Controller } = require('egg');

class BaseController extends Controller {
	success (data) {
        this.ctx.body = {
            code: 0,
            data
        }
    }
    error (error) {
        this.ctx.body = {
            code: 1,
            error
        }
    }
}

module.exports = BaseController;