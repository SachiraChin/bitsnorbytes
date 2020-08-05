/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import withAppInsights from '../services/AppInsights';
import { isMobile } from "react-device-detect";

import Header from "./Header"
import "./layout.css"

const Content = styled.div`
  margin: 0 auto;
  max-width: ${isMobile ? '100%' : '80%'};
  padding: ${isMobile ? '0' : '0 1.0875rem 1rem;'};
  padding-top: 0;
`

const GatsbyLink = styled.a`
  margin-left: 5px;
  margin-right: 5px;
`

const GatsbyJuliaLink = styled.a`
  margin-left: 5px;
`

const Footer = styled.footer`
  
  justify-content: center;
  padding: 0 1.0875rem 1rem;

  p {
      padding-right: 5px;
  }
  ${isMobile ? `
  p {
      width: 100%;
  }
  ` : 'display: flex;'}
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Content>
          <main>{children}</main>
          <Footer>
            <p>
                ©SachiraChin {new Date().getFullYear()}{!isMobile && ','}
            </p>
            <p>
                based on
                <GatsbyJuliaLink href="https://www.gatsbyjs.org/starters/niklasmtj/gatsby-starter-julia/">gatsby-starter-julia</GatsbyJuliaLink>,
            </p>
            <p>
                built with
                <GatsbyLink href="https://www.gatsbyjs.org">Gatsby</GatsbyLink>
            </p>
          </Footer>
        </Content>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withAppInsights(Layout)
