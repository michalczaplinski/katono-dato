import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { connect } from "react-redux";
import { intersection } from "lodash";

import "normalize.css";
import "../styles/index.css";

import colors from "../styles/colors";
import Topbar from "../components/Topbar";

import appleTouchIcon from "../static/favicon/apple-touch-icon.png";
import favicon16x16 from "../static/favicon/favicon-16x16.png";
import favicon32x32 from "../static/favicon/favicon-32x32.png";
import safariIcon from "../static/favicon/safari-pinned-tab.svg";

const favicon = "../static/favicon/favicon.ico";
const siteManifest = "../static/favicon/site.webmanifest";
const browserconfig = "../static/favicon/browserconfig.xml";

const PageContainer = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 45px;
  left: 0;
  right: 0;
  min-height: 100%;
  min-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${colors.backgroundColor};
`;

const Layout = class extends React.Component {
  componentDidMount() {
    const {
      data: { allDatoCmsClothingItem: { edges } },
      cart: reduxCart,
      syncCart
    } = this.props;

    const datoCart = edges.map(({ node }) => node.id);
    const updatedCart = intersection(datoCart, reduxCart);
    console.log(updatedCart);
    this.props.syncCart(updatedCart);
  }

  render() {
    const { children, location, history } = this.props;

    return (
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
        <PageContainer>{children()}</PageContainer>
      </div>
    );
  }
};

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = dispatch => ({
  syncCart: cart => dispatch({ type: "SYNC_STORE_WITH_DATOCMS_DATA", cart })
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

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
    allDatoCmsClothingItem(filter: { available: { eq: true } }) {
      edges {
        node {
          id
        }
      }
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
