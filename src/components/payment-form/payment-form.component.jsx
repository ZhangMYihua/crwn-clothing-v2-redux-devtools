import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useSelector } from "react-redux"
import { selectCartTotal } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"
import { BUTTON_TYPE_CLASSES } from "../button/button.component"

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles"

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const amount = useSelector(selectCartTotal)
  const currentUser = useSelector(selectCurrentUser)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessingPayment(true)

    try {
      // Use development URL when in development mode
      const baseUrl =
        process.env.NODE_ENV === "development" ? "http://localhost:8888" : ""

      const response = await fetch(
        `${baseUrl}/.netlify/functions/create-payment-intent`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.clientSecret) {
        throw new Error("No client secret received")
      }

      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.email : "Guest",
          },
        },
      })

      setIsProcessingPayment(false)

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error.message}`)
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("There was an issue with your payment. Please try again.")
      setIsProcessingPayment(false)
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          disabled={!stripe || isProcessingPayment}
        >
          {isProcessingPayment ? "Processing..." : "Pay Now"}
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm
