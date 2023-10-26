import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'deck',
  title: 'Decks',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'path',
      type: 'object',
      fields: [
        {
          title: 'Path',
          name: 'path',
          type: 'reference',
          to: [{ type: 'path' }]
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
