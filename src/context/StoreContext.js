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
  const [checkout, setCheckout] = useState({})

  useEffect(() => {
    initializeCheckout()
  }, [])

  const initializeCheckout = async () => {
    try {
      const isBrowser = typeof window !== "undefined"

      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      console.log(currentCheckoutId)

      let newCheckout = null
      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      } else {
        if (isBrowser) {
          localStorage.setItem("checkout_id", newCheckout.id)
        }
        newCheckout = await client.checkout.create()
      }
      console.log(newCheckout)

      setCheckout(newCheckout)
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

      const addItems = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )

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
