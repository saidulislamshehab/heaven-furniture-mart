import {
  ScrollStoryGallery,
  type ScrollStoryGalleryProps,
  type StoryImage,
} from '@/components/ui/scroll-story-gallery'

export type ScrollRevealImage = StoryImage
export type ScrollRevealGalleryProps = Omit<ScrollStoryGalleryProps, 'direction'>

/** Right → left variant of `ScrollStoryGallery`. */
export function ScrollRevealGallery(props: ScrollRevealGalleryProps) {
  return <ScrollStoryGallery direction="left" {...props} />
}

export default ScrollRevealGallery
