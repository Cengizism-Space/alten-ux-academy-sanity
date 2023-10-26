import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import categoryType from './category'
import sourceType from './source'

export default defineType({
  name: 'card',
  title: 'Cards',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publish',
      type: 'boolean',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: categoryType.name }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'related_to',
      title: 'See also',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'card' } }],
    }),
    defineField({
      name: 'also_called',
      title: 'Also called',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'in_contrast',
      title: 'In contrast',
      type: 'reference',
      to: [{ type: 'card' }],
    }),
    defineField({
      name: 'more_to_read',
      title: 'More to read',
      type: 'array',
      of: [{ type: 'url' }],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'reference',
      to: [{ type: sourceType.name }],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      source: 'source.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, source, date }) {
      const subtitles = [
        source && `by ${source}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
