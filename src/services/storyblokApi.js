import StoryblokClient from 'storyblok-js-client';

const storyblok = new StoryblokClient({
  accessToken: process.env.REACT_APP_STORYBLOK_PREVIEW_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});

export const getGallery = () => {
  return storyblok.get('cdn/stories/gallery');
};
