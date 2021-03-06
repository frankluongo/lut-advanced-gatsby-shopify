import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
})

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  checkCoupon: () => {},
  removeCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setCartOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const isBrowser = typeof window !== "undefined"

  const toggleCartOpen = () => {
    setCartOpen(!isCartOpen)
  }

  useEffect(() => {
    initializeCheckout()
  }, [])

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create()
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id)
      }
      return newCheckout

    } catch(e) {
      console.error(e)
    }
  }

  const initializeCheckout = async () => {
    try {
      const currentCheckoutId = isBrowser ? localStorage.getItem("checkout_id") : null
      let newCheckout = null

      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)
        if (newCheckout.completedAt) {
          newCheckout = await getNewId()
        }
      } else {
        newCheckout = await getNewId()
      }
      setCheckout(newCheckout)
    } catch (error) {
      console.error(error)
    }
  }

  const addProductToCart = async variantId => {
    try {
      setLoading(true)
      const lineItems = [
        {
          variantId: variantId,
          quantity: 1,
        },
      ]

      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )

      setCheckout(newCheckout)
      setLoading(false)
    } catch (error) {
      console.log('ERROR')
      console.error(error)
    }
  }

  const removeProductFromCart = async lineItemId => {
    try {
      setLoading(true)
      const newCheckout = await client.checkout.removeLineItems(
        checkout.id,
        [lineItemId]
      )

      setCheckout(newCheckout)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const checkCoupon = async (coupon) => {
    setLoading(true)
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon);
    setCheckout(newCheckout)
    setLoading(false)
  }

  const removeCoupon = async (coupon) => {
    setLoading(true)
    const newCheckout = await client.checkout.removeDiscount(checkout.id, coupon);
    setCheckout(newCheckout)
    setLoading(false)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        addProductToCart,
        removeProductFromCart,
        toggleCartOpen,
        isCartOpen,
        checkCoupon,
        removeCoupon,
        isLoading
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
