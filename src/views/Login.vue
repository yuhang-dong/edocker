<template>
  <div class="main-container">
    <img src="../assets/whale.svg" />
    <a-form-model layout="vertical" :model="form" class="flex-form">
      <a-form-model-item label="URL">
        <a-input v-model="form.url" placeholder="input placeholder" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="connect" :loading="connecting">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        url: "192.168.159.129:5678"
      },
      connecting: false,
    };
  },
  methods: {
    connect() {
      let urls = this.form.url.split(":");
      let abs = new this.$DOCKER({host: urls[0], port: urls[1], timeout: 2000});
      let that = this;
      this.connecting = true;
      abs.ping()
        .then(function() {
            that.$store.commit("storeUrl", that.form.url);
            that.$router.push({ path: "/main" });
            that.$message.success("connect successful");
        })
        .catch(function(error) {
          console.log(error)
          that.$message.error(error.toString());
        })
        .finally(function() {
          that.connecting = false;
        })
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: lightblue;
  justify-content: center;
  align-items: center;
}

.flex-form {
  width: 50%;
}
</style>