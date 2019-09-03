import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const Cart = () => {
  const { isCartOpen, checkout } = useContext(StoreContext)
  return (
    <div
      style={{
        position: "fixed",
        right: "0",
        bottm: "0",
        width: "50%",
        height: "100%",
        background: "white",
        boxShadow: "var(--elevation-4)",
        padding: "1rem",
      }}
    >
      <h3>Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>${item.variant.price}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart
