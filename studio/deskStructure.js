import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdPerson from 'react-icons/lib/md/person'

const hiddenDocTypes = listItem =>
  !['category', 'author', 'siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Instillinger')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.listItem()
        .title('Personer')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Personer')),
      S.listItem()
        .title('Kategorier')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Kategorier')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
