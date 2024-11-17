// src/components/checkout-item/checkout-item.component.jsx

import { useDispatch } from "react-redux"
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.reducer"

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles"

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const { name, imageUrl, price, quantity } = cartItem

  const addItemHandler = () => dispatch(addItemToCart(cartItem))
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem))
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
