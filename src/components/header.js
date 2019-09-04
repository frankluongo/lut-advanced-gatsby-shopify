import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useTransition } from "react-spring"

import "../style.scss"
import logo from "../images/logo.svg"
import Cart from "./Cart/Cart"
import { StoreContext } from "../context/StoreContext";

const Header = () => {
  const { isCartOpen, toggleCartOpen, checkout } = useContext(StoreContext);

  const transitions = useTransition(isCartOpen, null, {
    from: { transform: 'translate3d(100%, 0, 0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: 'translate3d(100%, 0, 0)' },
  })

  const qty = checkout.lineItems.reduce((total, item) => {
    return + item.quantity;
  }, 0)

  console.log(qty)

  return (
    <header
      className="level is-mobile"
      style={{ background: "var(--purp)", boxShadow: "var(--elevation-2)" }}
    >
      <div className="level-left">
        <Link to="/" className="navbar-item">
          <img
            style={{ height: 60, maxHeight: "none", marginBottom: 0 }}
            src={logo}
            alt="Level Up Logo"
          />
        </Link>
      </div>
      <div className="level-right">
        <div className="navbar-item">
          <button
            className="button"
            style={{
              border: "none",
              background: "transparent",
              position: 'relative'
            }}
            onClick={toggleCartOpen}
          >
            {
              qty > 0 &&
              <div
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  height: 20,
                  width: 20,
                  lineHeight: '20px',
                  fontSize: '0.75rem',
                  background: 'var(--red)',
                  borderRadius: '50%',
                  color: 'white'
                }}
              >
              {qty}
              </div>
            }
            <FaShoppingCart style={{ color: "white", height: 30, width: 30 }} />
          </button>
        </div>
      </div>
      {transitions.map(({ item, key, props}) => {
        return item && <Cart key={key} style={props} />
      })}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
