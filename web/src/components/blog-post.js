import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import PortableText from "./portableText";
import Container from "./container";
import AuthorList from "./author-list";

function BlogPost(props) {
  const { _rawBody, authors, categories, title, mainImage, publishedAt } = props;
  return (
    <article className="article">
      {mainImage && mainImage.asset && (
        <div className="article__main-image">
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit("crop")
              .auto("format")
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className="article__grid">
          <div className="article__main-content">
            <h1 className="article__title">{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>
          <aside className="article__meta-content">
            {publishedAt && (
              <div className="article__published-at">
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), "MMMM Do, YYYY")}
              </div>
            )}
            {authors && <AuthorList items={authors} title="Authors" />}
            {categories && (
              <div className="article__categories">
                <h3 className="article__categories-headline">Categories</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default BlogPost;
