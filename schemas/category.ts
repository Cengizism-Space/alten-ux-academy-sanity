import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'section',
      type: 'object',
      fields: [
        {
          title: 'Section',
          name: 'section',
          type: 'reference',
          to: [{ type: 'section' }]
        }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
