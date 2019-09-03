import React, { useContext } from "react"
import { FaTimes } from "react-icons/fa"
import { animated } from "react-spring"

import { StoreContext } from "../../context/StoreContext"

const Cart = ({ style }) => {
  const { toggleCartOpen, checkout } = useContext(StoreContext)

  return (
    <animated.div
      style={{
        zIndex: 100,
        position: "fixed",
        top: "0",
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
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "1rem",
          border: "none"

        }}
        onClick={toggleCartOpen}
      >
        <FaTimes style={{ color: "var(--red)", height: 30, width: 30 }} />
      </button>
      <h3 className="title">Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id} style={{display: "flex"}}>
          <div style={{
            width: 60,
            height: 60,
            marginRight: "1rem",
            overflow: "hidden"
          }}>
            <img src={item.variant.image.src} alt={item.title} />
          </div>
          <div>
            <h4 className="title is-4">{item.title}</h4>
            <p className="subtitle is-5">${item.variant.price}</p>
            <p className="subtitle is-5">QTY: {item.quantity}</p>
            <button
              className="is-small button is-danger is-outlined"
            >Remove</button>
          </div>
        </div>
      ))}

      <hr />

      <h3 class="subtitle">Total Price:</h3>
      <p class="title">{checkout.totalPrice}</p>
    </animated.div>
  )
}

export default Cart
