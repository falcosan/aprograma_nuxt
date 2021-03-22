import StoryblokClient from 'storyblok-js-client'

const api = new StoryblokClient({
    accessToken: process.env.VUE_APP_TOKEN,
    cache: {
        clear: `auto`,
        type: `memory`
    }
});

export default api;
