import React from 'react'
import { FormContainer, PaymentFormContainer } from './payment-form.styles'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { CardElement, useElements } from '@stripe/react-stripe-js'
import { useStripe } from '@stripe/react-stripe-js'

const PaymentForm = () => {

    const elements = useElements()
    const stripe = useStripe()

    const paymentHandler = async (e) => {

        e.preventDefault()

        if (!stripe || !elements) return

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: 10050 })
        }).then(res => res.json())

        const { paymentIntent: { client_secret } } = response
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Kashif'
                }
            }
        })

        console.log('payment result', paymentResult);
        if (paymentResult.error) {
            console.log('error: ', paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                console.log('payment successful')
            }
        }
    }


    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm