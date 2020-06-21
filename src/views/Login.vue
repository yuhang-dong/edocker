<template>
  <div class="main-container">
    <img src="../assets/whale.svg" />
    <a-form-model layout="vertical" :model="form" class="flex-form">
      <a-form-model-item label="URL">
        <a-input v-model="form.url" placeholder="input placeholder" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click.native="connect">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { ping } from "../utils/docker/system";
export default {
  data() {
    return {
      form: {
        url: "192.168.159.129:5678"
      }
    };
  },
  methods: {
    connect() {
      let that = this;
      let _ping = ping(this.form.url);
      _ping
        .then(function([response, body]) {
          if (response.statusCode == 200) {
            that.$store.commit("storeUrl", that.form.url);

            that.$router.push({ path: "/main" });
            that.$message.success("connect successful");
          } else {
            try {
              let data = JSON.parse(body);
              that.$message.error(data.message);
            } catch(err) {
              // other error process
              that.$message.error(response.statusCode + " " + body);
              console.log(response.statusCode + " " + body);
            }
          }
        })
        .catch(function(error) {
          console.log(error)
          that.$message.error(error);
        });
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