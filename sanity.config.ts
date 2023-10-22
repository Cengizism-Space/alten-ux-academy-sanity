// import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
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

import blockContentType from './schemas/blockContent'
import categoryType from './schemas/category'
import postType from './schemas/post'
import authorType from './schemas/author'
import settingsType from './schemas/settings'

const schemaTypes = [postType, authorType, categoryType, blockContentType, settingsType]

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
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    // Add the "Open preview" action
    previewUrl({
      base: DRAFT_MODE_ROUTE,
      urlSecretId: previewSecretId,
      matchTypes: [postType.name, settingsType.name],
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
