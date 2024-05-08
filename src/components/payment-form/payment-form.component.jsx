import React, { useState } from 'react'
import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles'
import { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { CardElement, useElements } from '@stripe/react-stripe-js'
import { useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'

const PaymentForm = () => {

    const elements = useElements()
    const stripe = useStripe()

    const amount = useSelector(selectCartTotal)
    const user = useSelector(selectCurrentUser)

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const paymentHandler = async (e) => {


        e.preventDefault()

        if (!stripe || !elements) return

        setIsLoading(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json())

        const { paymentIntent: { client_secret } } = response
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user ? user.displayName : 'Guest'
                }
            }
        })

        setIsLoading(false)

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
                <PaymentButton isLoading={isLoading} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm