import S from "@sanity/desk-tool/structure-builder";
import MdSettings from "react-icons/lib/md/settings";

const hiddenDocTypes = listItem =>
  !["author", "siteSettings"].includes(listItem.getId());

export default () =>
  S.list()
    .title("Innhold")
    .items([
      S.listItem()
        .title("Instillinger")
        .icon(MdSettings)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Author")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Author")),

      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
