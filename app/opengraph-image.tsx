import { createSharePreviewImage, SHARE_PREVIEW_ALT, SHARE_PREVIEW_CONTENT_TYPE, SHARE_PREVIEW_SIZE } from '@/lib/share-preview-image'

export const runtime = 'edge'
export const alt = SHARE_PREVIEW_ALT
export const size = SHARE_PREVIEW_SIZE
export const contentType = SHARE_PREVIEW_CONTENT_TYPE

export default function OpenGraphImage() {
  return createSharePreviewImage()
}