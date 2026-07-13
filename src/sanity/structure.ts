import { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Website Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Portfolio Owner')
        .id('author')
        .child(
          S.document()
            .schemaType('author')
            .documentId('author')
        ),
      S.listItem()
        .title('Resume Download')
        .id('resume')
        .child(
          S.document()
            .schemaType('resume')
            .documentId('resume')
        ),
      
      S.divider(),
      
      // Standard Collections
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('experience').title('Experience'),
      S.documentTypeListItem('education').title('Education'),
      S.documentTypeListItem('award').title('Awards'),
      
      S.divider(),
      
      // Secondary Collections
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('technology').title('Technologies'),
      
      S.divider(),
      
      // Expertise
      S.documentTypeListItem('expertiseCategory').title('Expertise Categories'),
      S.documentTypeListItem('expertiseSkill').title('Expertise Skills'),
      
      S.divider(),
      
      // Additional
      S.documentTypeListItem('publication').title('Publications'),
      S.documentTypeListItem('research').title('Research'),
    ]);
