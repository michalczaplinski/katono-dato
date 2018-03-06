import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import styled from "styled-components";

import "normalize.css";
import "../styles/index.css";

import Topbar from "../components/Topbar";

const PageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
  margin-top: 55px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const PageInnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Layout = ({ children, data, location }) => (
  <div>
    <HelmetDatoCms
      favicon={data.datoCmsSite.faviconMetaTags}
      seo={data.datoCmsHome.seoMetaTags}
    />
    <Topbar showBackButton={location.pathname !== "/"} />
    <PageContainer>
      <PageInnerContainer>{children()}</PageInnerContainer>
    </PageContainer>
  </div>
);

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
