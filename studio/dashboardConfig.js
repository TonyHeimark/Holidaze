export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e16137f51d613f5a9075bf6',
                  title: 'Sanity Studio',
                  name: 'Holidaze-studio',
                  apiId: '172b2bfd-02f9-498c-8b9b-4f773a142913'
                },
                {
                  buildHookId: '5e16137f51b7d7a9c5a64e9f',
                  title: 'Blog Website',
                  name: 'Holidaze',
                  apiId: 'b89259eb-24f8-4713-9f27-923b0c01868c'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/TonyHeimark/Holidaze',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://holidaze.netlify.com', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
