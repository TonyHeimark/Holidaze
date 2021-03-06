// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Documents schemas
import siteSettings from "./documents/siteSettings";
import author from "./documents/author";
import enquiries from "./documents/enquiries";
import establishments from "./documents/establishments";
import contact from "./documents/contact";
import facilities from "./documents/facilities";

// Object types
import bodyPortableText from "./objects/bodyPortableText";
import bioPortableText from "./objects/bioPortableText";
import excerptPortableText from "./objects/excerptPortableText";
import mainImage from "./objects/mainImage";
import authorReference from "./objects/authorReference";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    siteSettings,
    author,
    enquiries,
    establishments,
    contact,
    facilities,
    mainImage,
    authorReference,
    bodyPortableText,
    bioPortableText,
    excerptPortableText
  ])
});
