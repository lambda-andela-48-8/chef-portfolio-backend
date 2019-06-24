class UserController {
  static async postUser(req, res) {
    res.status(201).json({
      status: 'success',
      data: 'welcome',
    });
  }
}

export default UserController;
