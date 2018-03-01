import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";

export default ({ data }) => (
  <article className="sheet">
    <HelmetDatoCms seo={data.datoCmsClothingItem.seoMetaTags} />
    <div className="sheet__inner">
      <h1 className="sheet__title">{data.datoCmsClothingItem.title}</h1>
      <p className="sheet__lead">{data.datoCmsClothingItem.excerpt}</p>
      <div className="sheet__slider" />
      <div
        className="sheet__body"
        dangerouslySetInnerHTML={{
          __html:
            data.datoCmsClothingItem.descriptionNode.childMarkdownRemark.html
        }}
      />
      <div className="sheet__gallery">
        <Img sizes={data.datoCmsClothingItem.coverImage.sizes} />
      </div>
    </div>
  </article>
);

export const query = graphql`
  query ClothingItemQuery($slug: String!) {
    datoCmsClothingItem(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      gallery {
        resize(height: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        sizes(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
