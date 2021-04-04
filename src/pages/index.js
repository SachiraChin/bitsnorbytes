import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const Content = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
`

const MarkerHeader = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
`

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <SEO title="" />
            <Content>
                <h1>bits nor bytes</h1>
                {data.allMarkdownRemark.edges
                    .filter(({ node }) => {
                        if (process.env.NODE_ENV === 'development') {
                            return true;
                        }
                        const rawDate = node.frontmatter.rawDate
                        const date = new Date(rawDate)
                        return !node.frontmatter.draft && date < new Date()
                    })
                    .map(({ node }) => (
                        <div key={node.id}>
                            <Link
                                to={node.frontmatter.path}
                                css={css`
                                    text-decoration: none;
                                    color: inherit;
                                    `}
                            >
                                <MarkerHeader>{node.frontmatter.title} </MarkerHeader>
                                <div>
                                    <ArticleDate>{node.frontmatter.date}</ArticleDate>
                                    <ReadingTime> - {node.fields.readingTime.text}</ReadingTime>
                                </div>
                                <p>{node.excerpt}</p>
                            </Link>
                        </div>
                    ))}
            </Content>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "blog" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            rawDate: date
            path
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt(pruneLength: 360)
        }
      }
    }
  }
`
