import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import BlogPostPreviewList from "../components/blog-post-preview-list";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

const EVENT_SIGNUP_URL = "hey";
// process.env.GATSBY_ENQUIRIE_URL;

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const handleFormSubmit = event => {
    // const { isFormValid } = this.state;
    event.preventDefault();

    if (true) {
      this.setState({ submitting: true });
      const sendData = this.createSendableObject();

      fetch(EVENT_SIGNUP_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            formIsSubmitted: true,
            formSubmittedSuccessfully: data.success,
            submitting: false,
            errorMsg:
              !data.success && data.data.error ? (
                <span>
                  Noe gikk galt - vi beklager :/ <br />
                  <small>{data.data.error.message}</small>
                </span>
              ) : (
                ""
              )
          });
        })
        .catch(errorData => {
          this.setState({
            errorMsg: `Noe gikk galt - vi beklager \r\n${errorData}`,
            submitting: false
          });
        });
    }
    // }
  };

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1>Velkommen til {site.title}</h1>
      </Container>
    </Layout>
  );
};

export default IndexPage;
