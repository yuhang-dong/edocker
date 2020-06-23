<template>
  <a-upload :file-list="fileList" :before-upload="beforeUpload" :showUploadList="false">
    <a-button class="full-width">
      <slot><a-icon type="file" /></slot>
      {{value || text || 'Select File'}}
    </a-button>
  </a-upload>
</template>

<script>
export default {
  name: "select-file",
  props: {
      value: {
          type: String,
          required: true
      },
      text: {
          type: String,
          required: false
      }
  },
  data() {
    return {
      fileList: [],
      socketPath: ""
    };
  },
  methods: {
    beforeUpload(file) {
      // 只能选择一个
      console.log(file);
      this.socketPath = file.path;
      this.$emit('input', this.socketPath);
      this.fileList = [file];
      return false;
    }
  }
};
</script>

<style>
</style>