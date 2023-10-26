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

import pathType from './schemas/path'
import deckType from './schemas/deck'
import categoryType from './schemas/category'
import cardType from './schemas/card'
import blockContentType from './schemas/blockContent'
import sourceType from './schemas/source'
import settingsType from './schemas/settings'

const schemaTypes = [
  pathType,
  deckType,
  categoryType,
  cardType,
  blockContentType,
  sourceType,
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
      matchTypes: [cardType.name, settingsType.name],
    }),
    unsplashImageAsset(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
