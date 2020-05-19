import clientConfig from "../../client-config";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(clientConfig.sanity);

export const imageUrlFor = source => {
  return builder.image(source);
};
