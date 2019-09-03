import React, { createContext, useState } from "react"
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
  const addProductToCart = async variantId => {
    try {
      const newCheckout = await client.checkout.create()
      const lineItems = [
        {
          variantId: variantId,
          quantity: 1,
        },
      ]

      const addItems = await client.checkout.addLineItems(
        newCheckout.id,
        lineItems
      )

      window.open(addItems.webUrl, "_blank")
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
