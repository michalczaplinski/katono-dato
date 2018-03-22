import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import "normalize.css";
import "../styles/index.css";

import Topbar from "../components/Topbar";

import appleTouchIcon from "../static/favicon/apple-touch-icon.png";
import favicon16x16 from "../static/favicon/favicon-16x16.png";
import favicon32x32 from "../static/favicon/favicon-32x32.png";
import safariIcon from "../static/favicon/safari-pinned-tab.svg";

const favicon = "../static/favicon/favicon.ico";
const siteManifest = "../static/favicon/site.webmanifest";
const browserconfig = "../static/favicon/browserconfig.xml";

const PageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 55px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const PageInnerContainer = styled.div`
  position: absolute;
  max-width: 1000px;
  width: 100%;
  height: 100%;
`;

const Layout = ({ children, data, location, history }) => (
  <div>
    <Helmet>
      <title>Katono.clothing</title>
      <meta
        name="description"
        content="KATONO.CLOTHING -- thrift clothing with flair."
      />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
      <link rel="manifest" href={siteManifest} />
      <link rel="mask-icon" href={safariIcon} color="#5bbad5" />
      <link rel="shortcut icon" href={favicon} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content={browserconfig} />

      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <Topbar
      showBackButton={
        location.pathname !== "/" && location.pathname !== "/success"
      }
      goBack={history.goBack}
    />
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
