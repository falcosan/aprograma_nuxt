<template>
  <div class="carousel_box">
    <img
      class="carousel_image"
      :src="currentImage.filename"
    />
  </div>
</template>
            

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      images: this.content.images,
    };
  },
  created() {
    this.startSlides();
  },

  methods: {
    startSlides() {
      if (this.images) {
        setInterval(this.playSlides, 1750);
      }
    },

    playSlides() {
      if (this.index == this.images.length || this.index > this.images.length) {
        this.index = 0;
      }
      this.index++;
    },
  },

  computed: {
    currentImage() {
      return this.images
        ? this.images[Math.floor(Math.random(this.index) * this.images.length)]
        : null;
    },
  },
  beforeDestroy() {
    delete this.startSlides;
    this.images = {};
    this.index = null;
  },
};
</script>