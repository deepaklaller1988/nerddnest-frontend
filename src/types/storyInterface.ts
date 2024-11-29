export interface StoryFormValues {
  stories: {
    storyCoverImage: File | null;
    storyCoverTitle: string;
    storyLinkText: string;
    storyLink: string;
    storyMedia: File | null;
    duration: number | null;
    visibility: 'Everyone' | 'Onlyme' | 'friends';
  }[] ;
}
