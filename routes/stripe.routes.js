const router = require("express").Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {

  const { event_name, price, event_id, image_url, user_id } = req.body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: event_name,
            images: [image_url]
          },
          unit_amount: price, // For $20.00, Stripe requires amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: process.env.ORIGIN + `/payment-success?eventId=${event_id}`, 
    cancel_url: process.env.ORIGIN + `/payment-cancelled?eventId=${event_id}`,
    // metadata: {
    //   eventId: event_id,
    //   userId: user_id
    // },
  });

  res.json({ id: session.id });

})


module.exports = router
