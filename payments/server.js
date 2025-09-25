import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

// Health
app.get('/health', (req,res)=>res.json({ok:true}));

// Create Checkout Session (Stripe)
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if(!stripe) return res.status(400).json({error: 'Stripe not configured'});
    const { plan } = req.body; // 'pro' or 'elite'
    const priceId = plan === 'elite' ? process.env.STRIPE_PRICE_ELITE : process.env.STRIPE_PRICE_PRO;
    if(!priceId) return res.status(400).json({error:'Missing price ID env var'});
    const successUrl = (process.env.SUCCESS_URL || 'http://localhost:3000/public/success.html') + `?tier=${plan}`;
    const cancelUrl = process.env.CANCEL_URL || 'http://localhost:3000/public/cancel.html';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Webhook (Stripe) — optional for server-side fulfillment
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  // If you add a webhook secret, verify here. For now, acknowledge.
  res.json({received:true});
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log('Payments server running on port ' + port));
