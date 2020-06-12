<template>
  <div class="main-container">
    <img src="../assets/whale.svg" />
    <a-form-model layout="vertical" :model="form"  class="flex-form">
      <a-form-model-item label="URL">
        <a-input v-model="form.url" placeholder="input placeholder" />
      </a-form-model-item>
      <a-form-model-item >
        <a-button type="primary">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import ping from '../utils/docker/system.js'

export default {
  data() {
    return {
      form: {
        url: 'http://127.0.0.1:8900',
      },
    };
  },
  methods() {
    connect: function() {
      // TODO  connect the url, and then store it
      ping(this.$ajax, this.form.url, function(error, response, body) {
        if(error) {
          this.$message.error(error);
        }

        if(response.statusCode == 500) {
          data = JSON.parse(body);
          this.$message.error(data.message);
        }

        if(response.statusCode == 200) {
          this.$message.success("connect successful");
          this.$store.commit('storeUrl', this.form.url);

          // TODO 跳转到显示界面
        }


      })
    }
  }
};

</script>

<style>
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