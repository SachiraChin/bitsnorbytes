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
import ThemeProvider from '../theme/ThemeProvider';
import Header from "./Header"
import "../styles/global.js"
const License = require('../content/license.js');

const Content = styled.div`
  margin: 0 auto;
  max-width: ${isMobile ? '100%' : '80%'};
  padding: ${isMobile ? '0' : '0 1.0875rem 1rem;'};
  padding-top: 0;
`

const ExternalLink = styled.a`
//   margin-left: 5px;
//   margin-right: 5px;
`

const Footer = styled.footer`
  
  justify-content: center;
  padding: 0 1.0875rem 1rem;
  display: flex;
  flex-direction: column;

  p {
      margin-bottom: 0;
  }
  
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
`

const DesktopFooter = styled(Footer)`
    div {
        flex-direction: row;
    }
    
    p:not(:first-of-type), div {
        padding-right: 5px;
        padding-left: 5px;
    }
`;
const MobileFooter = styled(Footer)`
    p {
        width: 100%;
        margin-top: 10px;
    }
    div {
        flex-direction: column;
    }
`;

const LicenseContainer = styled.div`
    display: block !important;

    a:not(:last-child) {
        margin-right: 5px;
    }
    
    a:not(:first-of-type) {
        margin-left: 5px;
    }

    span {
        margin-right: 5px;
    }

    img {
        margin-bottom: 0;
    }
`

const Layout = ({ children }) => {
    const CurrentFooter = isMobile ? MobileFooter : DesktopFooter;

    return (
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
                    <ThemeProvider>
                        <Header siteTitle={data.site.siteMetadata.title} />
                        <Content>
                            <main>{children}</main>
                            <CurrentFooter>
                                <div>
                                    <p>
                                        © Copyright {new Date().getFullYear()}, SachiraChin
                                    </p>
                                </div>
                                {/* {!isMobile && <>&#5867;&#5867;</>} */}
                                <div>

                                    <p>
                                        based on <ExternalLink href="https://www.gatsbyjs.org/starters/niklasmtj/gatsby-starter-julia/" target="_blank">gatsby-starter-julia</ExternalLink> by <ExternalLink href="https://github.com/niklasmtj" target="_blank">Niklas Metje</ExternalLink>
                                    </p>
                                    {!isMobile && <>&nbsp;&#5867;&#5867;&nbsp;</>}
                                    <p>
                                        dark mode from <ExternalLink href="https://twitter.com/divyanshu013" target="_blank">Divyanshu Maithani</ExternalLink>'s <ExternalLink href="https://divyanshu013.dev/blog/gatsby-dark-mode/" target="_blank">post</ExternalLink>
                                    </p>
                                    {!isMobile && <>&nbsp;&#5867;&#5867;&nbsp;</>}
                                    <p>
                                        built with <ExternalLink href="https://www.gatsbyjs.org" target="_blank">Gatsby</ExternalLink>
                                    </p>
                                </div>
                                <LicenseContainer dangerouslySetInnerHTML={{ __html: License }} />
                            </CurrentFooter>
                        </Content>
                    </ThemeProvider>
                </>
            )}
        />
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withAppInsights(Layout)
