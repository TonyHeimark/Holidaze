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
                  buildHookId: '5eb74abac2f2d257dc28739a',
                  title: 'Holidaze',
                  name: 'Holidaze',
                  apiId: '3a8b2c61-cef6-45eb-8cff-3b774dd0da04'
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
          }
          // { title: 'Frontend', value: 'https://holidaze.netlify.com', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } }
  ]
}
