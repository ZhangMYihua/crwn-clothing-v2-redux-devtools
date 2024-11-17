import { useDispatch, useSelector } from "react-redux"
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector"
import { setIsCartOpen } from "../../store/cart/cart.reducer"
import * as ShoppingBagIcon from "../../assets/shopping-bag.svg"

import { CartIconContainer, ItemCount } from "./cart-icon.styles"

const CartIcon = () => {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
  const ShoppingIcon = ShoppingBagIcon.ReactComponent
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
