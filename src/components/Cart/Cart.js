import React, { useContext } from "react"
import { FaTimes } from "react-icons/fa"
import { animated } from "react-spring"

import { StoreContext } from "../../context/StoreContext"

const Cart = ({ style }) => {
  const { toggleCartOpen, checkout } = useContext(StoreContext)

  return (
    <animated.div
      style={{
        position: "fixed",
        right: "0",
        bottm: "0",
        width: "50%",
        height: "100%",
        background: "white",
        boxShadow: "var(--elevation-4)",
        padding: "1rem",
        ...style
      }}
    >
      <button
        onClick={toggleCartOpen}
      >
        <FaTimes style={{ color: "black", height: 30, width: 30 }} />
      </button>
      <h3>Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>${item.variant.price}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
    </animated.div>
  )
}

export default Cart
