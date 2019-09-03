import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client,
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkoutId, setCheckoutId] = useState({})

  useEffect(() => {
    initializeCheckout()
  }, [])

  const initializeCheckout = async () => {
    try {
      const newCheckout = await client.checkout.create()
      setCheckoutId(newCheckout.id)
    } catch (error) {
      console.error(error)
    }
  }

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId: variantId,
          quantity: 1,
        },
      ]

      const addItems = await client.checkout.addLineItems(checkoutId, lineItems)

      // window.open(addItems.webUrl, "_blank")
      console.log(addItems.webUrl)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addProductToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
