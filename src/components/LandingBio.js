import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

const Container = styled.div`
  text-align: center;
  width: 100%;
`
const MarkdownContainer = styled.div`
  width: 100%;
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 78vh;
  padding: 1.45rem 1.0875rem;
`

const Description = styled.p`
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  margin-top: 5px;
`

const NameHeader = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0;
`

const LandingBio = () => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
        allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "bio" } } }
          sort: { fields: [frontmatter___index], order: ASC }
        ) {
          totalCount
          edges {
            node {
              id
              html
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
    `}
    render={data => (
      <OuterContainer>
        <Container>
          <NameHeader>{data.site.siteMetadata.title}</NameHeader>
          <Description>by Sachira Chinthana Jayasanka</Description>
        </Container>
        {data.allMarkdownRemark.edges
            .filter(({ node }) => {
                if (process.env.NODE_ENV === 'development') {
                    return true;
                }
                
                return false;
            })
            .map(({ node }) => (
                <MarkdownContainer key={node.id} dangerouslySetInnerHTML={{ __html: node.html }} />
            ))}
      </OuterContainer>
    )}
  />
)

NameHeader.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

NameHeader.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default LandingBio
