const router = require("express").Router()

const Event = require('../models/Event.model')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {

  const { success_url, cancel_url, event_name, price, eventId, userId } = req.body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: event_name ,
          },
          unit_amount: price, // For $20.00, Stripe requires amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: success_url || 'http://localhost:3000/payment-success',
    cancel_url: cancel_url || 'http://localhost:3000/payment-cancelled',
    metadata: {
      eventId: eventId,
      userId: userId
    },
  });

  console.log(session)

  res.json({ id: session.id });

})


// router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     const eventId = session.metadata.eventId;
//     const userId = session.metadata.userId;

//     await Event 
//       .findByIdAndUpdate(eventId, { $addToSet: { assistants: userId } } , {new: true})
//       .populate('assistants creator')
//       .populate({ path: 'comments.user', model: 'User' })
//       .then(response => console.log('Evento actualizado con éxito: ', response))
//       .catch(err => console.error(err))
//   }

//   // Responde al webhook de Stripe
//   res.json({received: true});
// })


module.exports = router
