import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Site, MarkdownRemarkConnection } from '../graphql-types';
import Styles from '../styles/pages/index.module.styl'

type Props = {
  data: {
    site: Site,
    allMarkdownRemark: MarkdownRemarkConnection
  },
  location: Location
}

const monthInEng = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

class BlogIndex extends React.Component<Props> {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div className={Styles['post']} key={node.fields.slug}>
              <div className={Styles['date']}>
                <div className={Styles['up']}>
                  <div className={Styles['month']}>{monthInEng[new Date(node.frontmatter.date).getMonth()]}</div>
                  <div className={Styles['day']}>{new Date(node.frontmatter.date).getDay()}</div>
                </div>
                <div className={Styles['year']}>{new Date(node.frontmatter.date).getFullYear()}</div>
              </div>
              <div className={Styles['content']}>
                <div className={Styles['header']}>
                  <Link className={Styles['title']} to={node.fields.slug}>
                    {title}
                  </Link>
                </div>
                <div className={Styles['info']}>
                  {
                    node.frontmatter.tags.map(tag => (
                      <>
                        <i className='iconfont'>&#xe63e;</i>
                        <Link to='/tags' className={Styles['tag']}>{tag}</Link>
                        <span className={Styles['line']}>·</span>
                      </>
                    ))
                  }
                  {node.timeToRead + 1} min read
                  <span className={Styles['time']}>
                    <span className={Styles['line']}>·</span>
                    {new Date(node.frontmatter.date).getFullYear()}<span>年</span>
                    {new Date(node.frontmatter.date).getMonth() + 1}<span>月</span>
                    {new Date(node.frontmatter.date).getDay()}<span>日</span>
                  </span>
                </div>
                <div className={Styles['brief']}>
                  <p>
                    {node.frontmatter.description || node.excerpt}
                  </p>
                </div>
                <Link to={node.fields.slug} className={Styles['more']}>Read More</Link>
              </div>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            tags
          }
          timeToRead
        }
      }
    }
  }
`
