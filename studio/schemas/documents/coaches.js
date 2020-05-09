export default {
  name: 'coach',
  type: 'document',
  title: 'Coach',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Navn'
    },

    {
      name: 'image',
      type: 'mainImage',
      title: 'Bilde'
    },
    {
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biografi'
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Meritter og utmerkelser'
    }
  ]
}
