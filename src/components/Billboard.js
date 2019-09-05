import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import AddToCart from "../components/Cart/AddToCart"

const Billboard = () => {
  const { shopifyProduct: product } = useStaticQuery(
    graphql`
      query billboardProduct {
        shopifyProduct(tags: { eq: "billboard" }) {
          id
          handle
          title
          productType
          description
          variants {
            id
            title
            price
            sku
            availableForSale
            shopifyId
          }
          images {
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `
  )

  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product

  return (
    <div className="columns">
      <div className="column">
        <Image fluid={firstImage.localFile.childImageSharp.fluid} />
      </div>
      <div className="column">
        <h2 className="title">Now Available!</h2>
        <h3 className="title">{product.title}</h3>
        <p className="subtitle is-4">${firstVariant.price}</p>
        <p>{product.description}</p>
        <br />
        <Link className="button" to={`/product/${product.handle}`}>
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default Billboard
