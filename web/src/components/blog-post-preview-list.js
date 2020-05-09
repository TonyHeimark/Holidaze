import { Link } from "gatsby";
import React from "react";
import BlogPostPreview from "./blog-post-preview";

function BlogPostPreviewGrid(props) {
  return (
    <div className="preview-list">
      {props.title && <h2 className="preview-list__headline">{props.title}</h2>}
      <ul className="preview-list__grid">
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <BlogPostPreview {...node} isInList />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className="preview-list__browse-more-nav">
          <Link to={props.browseMoreHref}>Les mer</Link>
        </div>
      )}
    </div>
  );
}

BlogPostPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: ""
};

export default BlogPostPreviewGrid;
