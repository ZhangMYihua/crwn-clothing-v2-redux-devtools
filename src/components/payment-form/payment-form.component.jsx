import React from 'react'
import { FormContainer, PaymentFormContainer } from './payment-form.styles'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { CardElement } from '@stripe/react-stripe-js'
import { useElements } from '@stripe/react-stripe-js'
import { useStripe } from '@stripe/react-stripe-js'

const PaymentForm = () => {

    const elements = useElements()
    const stripe = useStripe()

    const paymentHandler = async (e) => {

        e.preventDefault()

        if (!stripe || !elements) return

    }


    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm