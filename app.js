const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const public_key = 'pk_test_51MpP4TSJ6e3WCqeYxmh9Lgalj2Ion6jI0yTFlh2FDqakjHGhWf9cjHsPTmICp8ivpymFeUsEA85ZygXbkIskn30V00zRcdfNTX'
const private_key = 'sk_test_51MpP4TSJ6e3WCqeYJI6nFYQmNZiU6NhYLGogvFznzUAkvZVxdqtogErxXA5pYScTgAWvJiFrm9ixTOCKIvh2lweL00aNgC1mz4'

const stripe = require('stripe')(private_key)

const storeItems = new Map([
    [1, { priceIncents: 10000, name: "abc" }],
    [2, { priceIncents: 20000, name: "cba" }],
])
app.post('/checkout', async (req, res) => {
      try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceIncents,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html'
        })
        res.json({ url: session.url })
    } catch (error) {
        console.log("error")
        res.status(500).json(error.message )
    }
})


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})