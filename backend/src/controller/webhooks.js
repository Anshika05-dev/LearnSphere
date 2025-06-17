import { Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await wh.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature']
    });

    const { data, type } = req.body;
    switch (type) {
      case 'user.created': {
        await User.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url
        });
        return res.json({});
      }
      case 'user.updated': {
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url
        });
        return res.json({});
      }
      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        return res.json({});
      }
      default:
        return res.status(400).json({ success: false, message: 'Unsupported event type' });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
