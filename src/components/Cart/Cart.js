import React, { useContext, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { animated } from "react-spring"

import { StoreContext } from "../../context/StoreContext"

const Cart = ({ style }) => {
  const { toggleCartOpen, checkout, removeProductFromCart, checkCoupon } = useContext(StoreContext)
  const [ coupon, setCoupon ] = useState('')

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
              onClick={() => {
                removeProductFromCart(item.id)
              }}
              className="is-small button is-danger is-outlined"
            >Remove</button>
          </div>
        </div>
      ))}

      <hr />

      <form onSubmit={(e) => {
        e.preventDefault();
        checkCoupon(coupon)
      }}>
        <div className="field">
          <label htmlFor="coupon" className="label">Coupon Code</label>
          <input
            id="coupon"
            className="input"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            type="text"
          />
        </div>
        <button
          className="button"
          type="submit">Check Coupon</button>
      </form>

      <hr />

      <h3 className="subtitle">Total Price:</h3>
      <p className="title">{checkout.totalPrice}</p>

      <hr />
      <a className="button is-fullwidth is-success" href={checkout.webUrl}>Place Order</a>

    </animated.div>
  )
}

export default Cart
