<template>
  <div class="main-container">
    <img src="../assets/whale.svg" />
    <a-form-model layout="vertical" :model="form"  class="flex-form">
      <a-form-model-item label="URL">
        <a-input v-model="form.url" placeholder="input placeholder" />
      </a-form-model-item>
      <a-form-model-item >
        <a-button type="primary" @click="connect">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        url: 'http://192.168.159.129:5678'
      }
    };
      
  },
  methods: {
    connect() {
      // TODO  connect the url, and then store it
      let that = this;
      this.$ajax({
        url: this.form.url + "/_ping",
        method: "GET",
      },function(error, response, body) {
        if(error) {
          that.$message.error(error);
        }

        if(response.statusCode == 500) {
          let data = JSON.parse(body);
          that.$message.error(data.message);
        }

        if(response.statusCode == 200) {
          that.$message.success("connect successful");
          that.$store.commit('storeUrl', that.form.url);

          // TODO 跳转到显示界面
        }


      });
    }
  },
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