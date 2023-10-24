// import {defineConfig} from 'sanity'
import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  previewSecretId,
  projectId,
} from './lib/sanity.api'
import { previewDocumentNode } from './plugins/previewPane'
import { settingsPlugin, settingsStructure } from './plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'

import careerType from './schemas/career'
import sectionType from './schemas/section'
import categoryType from './schemas/category'
import postType from './schemas/post'
import blockContentType from './schemas/blockContent'
import authorType from './schemas/author'
import settingsType from './schemas/settings'

const schemaTypes = [
  careerType,
  sectionType,
  categoryType,
  postType,
  blockContentType,
  authorType,
  settingsType
]

export default defineConfig({
  name: 'default',
  title: 'Alten UX Academy',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      structure: settingsStructure(settingsType),
      defaultDocumentNode: previewDocumentNode(),
    }),
    settingsPlugin({ type: settingsType.name }),
    previewUrl({
      base: DRAFT_MODE_ROUTE,
      urlSecretId: previewSecretId,
      matchTypes: [postType.name, settingsType.name],
    }),
    unsplashImageAsset(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
