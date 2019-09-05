/* eslint-disable class-methods-use-this */
class SessionController {
  async store(req, res) {
    return res.status(200).send();
  }
}

module.exports = new SessionController();
