const BaseController = require("./base.controller.js");

class UsersController extends BaseController {
  constructor() {
    super("users.json");
  }
}

const usersController = new UsersController();

module.exports = usersController;
