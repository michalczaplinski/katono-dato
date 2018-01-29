import React from 'react'
import Link from 'gatsby-link'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => (
  <Masonry className="showcase">
    {data.allDatoCmsClothingItem.edges.map(({ node: item }) => (
      <div key={item.id} className="showcase__item">
        <figure className="card">
          <Link to={`/items/${item.slug}`} className="card__image">
            <Img sizes={item.coverImage.sizes} />
          </Link>
          <figcaption className="card__caption">
            <h6 className="card__title">
              <Link to={`/items/${item.slug}`}>{item.title}</Link>
            </h6>
          </figcaption>
        </figure>
      </div>
    ))}
  </Masonry>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsClothingItem(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          coverImage {
            sizes(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
