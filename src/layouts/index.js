import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "normalize.css";

import Topbar from "../components/Topbar";

const Layout = ({ children, data }) => (
  <div>
    <HelmetDatoCms
      favicon={data.datoCmsSite.faviconMetaTags}
      seo={data.datoCmsHome.seoMetaTags}
    />
    <Topbar />
    {children()}
  </div>
);

Layout.propTypes = {
  children: PropTypes.func.isRequired
};

export default Layout;

export const query = graphql`
  query LayoutQuery {
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      copyright
    }
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
  }
`;
