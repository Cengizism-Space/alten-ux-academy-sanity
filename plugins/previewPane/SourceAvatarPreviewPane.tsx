import { Card, Flex } from '@sanity/ui'
import SourceAvatar from '../../components/SourceAvatar'
import type { Source } from '../../lib/sanity.queries'

export default function SourceAvatarPreviewPane(props: Source) {
  const { name, picture } = props
  return (
    <Card padding={6}>
      <Flex justify="center">
        <SourceAvatar name={name || 'Untitled'} picture={picture} />
      </Flex>
    </Card>
  )
}
