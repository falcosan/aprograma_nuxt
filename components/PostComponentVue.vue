<template>
  <div class="post grid grid-cols-8 py-5 mx-auto h-50 w-9/12">
    <div
      @mouseover="hoverIn()"
      @mouseleave="hoverOut()"
      class="post_wrapper grid grid-cols-7 grid-rows-2 gap-x-10 h-full row-start-1 row-end-1 col-start-1 col-end-3 bg-red-400 relative z-10"
    >
      <component
        :is="lookFile()"
        class="post_file w-full h-full row-start-1 row-end-3 object-cover"
        :alt="getAlt"
        :src="getFile"
      />
      <div
        class="post_text row-start-1 row-end-3 flex overflow-hidden h-full justify-center flex-col"
        v-html="getPost"
      />
    </div>
    <div class="post_expanded row-start-1 row-end-1 col-start-2 col-end-2 w-28">
      <div
        :class="`post_date ${hovered} row-start-2 col-start-3 self-end flex flex-col justify-center items-center h-full transition-transform duration-150 ease-in transform`"
      >
        <h1
          class="date_text h-auto transform rotate-90 w-max whitespace-nowrap text-3xl"
          v-text="changeDate(content.date)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
import DOMPurify from "dompurify";
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      getFile: "",
      getAlt: "",
      hovered: "not_moved",
    };
  },
  methods: {
    changeDate(date) {
      let current_datetime = new Date(date.replace(" ", "T"));
      let formatted_date = `${current_datetime.getDate()} / ${
        current_datetime.getMonth() + 1
      } / ${current_datetime.getFullYear()}`;
      return formatted_date.toString();
    },
    lookFile() {
      switch (this.getFile.toLowerCase().split(".").pop()) {
        case "jpg":
        case "png":
        case "gif":
        case "svg":
          return "img";
        case "pdf":
          return "embed";
        case "mp4":
          return "video";
      }
    },
    hoverIn() {
      this.hovered = "moved translate-x-28";
    },
    hoverOut() {
      this.hovered = "not_moved translate-x-0";
    },
    setDefaultFile() {
      if (this.content.file.filename) {
        this.getFile = this.content.file.filename;
        this.getAlt = this.content.file.alt;
      } else {
        this.getFile =
          "https://a.storyblok.com/f/106240/470x314/fcb457a1eb/giphy.gif";
        this.getAlt = "illegal site funny website"
      }
    },
  },
  created() {
    this.setDefaultFile();
  },
  computed: {
    getPost() {
      return DOMPurify.sanitize(marked(this.content.text));
    },
  },
};
</script>
