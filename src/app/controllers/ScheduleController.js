import Appointment from '../models/Appointment';

class ScheaduleController {
  async index(req, res) {
    return res.json({ ok: true });
  }
}

export default new ScheaduleController();
