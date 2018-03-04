import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { range } from "lodash";
import styled from "styled-components";

import "normalize.css";
import "../styles/index.css";

import Topbar from "../components/Topbar";
import { Grid, Column } from "../components/Grid";

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

const Layout = ({ children, data }) => (
  <div>
    <HelmetDatoCms
      favicon={data.datoCmsSite.faviconMetaTags}
      seo={data.datoCmsHome.seoMetaTags}
    />
    <Topbar />
    {/* {children()} */}
    <PageContainer>
      <PageInnerContainer>
        <Grid>
          {range(30).map(n => (
            <Column>
              <h1>{n}</h1>
            </Column>
          ))}
        </Grid>
      </PageInnerContainer>
    </PageContainer>
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
