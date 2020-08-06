import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { useContext } from "react"
import ThemeContext from '../theme/ThemeContext';

const Content = styled.div`
  margin: 0 auto;
//   max-width: 80%;
  padding: 1.45rem 1.0875rem;
`

const MarkedHeader = styled.h1`
  display: inline;
  border-radius: 1em 0 1em 0;
//   background-image: linear-gradient(
//     -100deg,
//     rgba(255, 250, 150, 0.15),
//     rgba(255, 250, 150, 0.8) 100%,
//     rgba(255, 250, 150, 0.25)
//   );
`

const HeaderDate = styled.h3`
  margin-top: 10px;
  color: #606060;
`

// STYLE THE TAGS INSIDE THE MARKDOWN HERE
const MarkdownContent = styled.div`
  a {
    text-decoration: none;
    position: relative;

    background-image: linear-gradient(
      rgba(255, 250, 150, 0.8),
      rgba(255, 250, 150, 0.8)
    );
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
    }
  }

  a > code:hover {
    text-decoration: underline;
  }
`

const MarkdownContentLight = styled(MarkdownContent)`
  a {
    background-image: linear-gradient(
        rgba(255, 250, 150, 0.8),
        rgba(255, 250, 150, 0.8)
    );
  }
`

const MarkdownContentDark = styled(MarkdownContent)`
  a {
    background-image: linear-gradient(
        rgba(191, 240, 212, 0.5),
        rgba(191, 240, 212, 0.5)
    );
  }
`

const BlogPostContent = ({post}) => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <Content>
                <MarkedHeader>{post.frontmatter.title}</MarkedHeader>
                <HeaderDate>
                    {post.frontmatter.date} - {post.fields.readingTime.text}
                </HeaderDate>
                {post.frontmatter.legacy && <p><strong>This article was lost in time, but revived using archives at web.archive.org. The original article I wrote lost with the site backups I lost at the time. Original article at web.archive.org can be seen here: <a href={post.frontmatter.archiveUrl} target="_blank" rel="noreferrer">{post.frontmatter.archiveUrl}</a></strong></p>}
                {theme === 'light' ? <MarkdownContentLight dangerouslySetInnerHTML={{ __html: post.html }} /> : <MarkdownContentDark dangerouslySetInnerHTML={{ __html: post.html }} />}
                
            </Content>
        </>
    );
}

export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <BlogPostContent post={post}></BlogPostContent>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
        legacy
        archiveUrl
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
