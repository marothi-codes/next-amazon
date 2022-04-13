import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { authToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = authToken(user);
    res.send({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid email/ password combination.' });
  }
});

export default handler;
