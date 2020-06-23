<template>
  <div class="main-container">
    <img src="../assets/whale.svg" />
    <a-form-model layout="vertical" :model="form" class="flex-form">
      <a-radio-group :default-value="connectStyle" v-model="connectStyle" button-style="solid" class="select-radio-group">
        <a-radio-button value="1">
          LocalSocket
        </a-radio-button>
        <a-radio-button value="2">
          RemoteDirect
        </a-radio-button>
        <a-radio-button value="3">
          RemoteTSL
        </a-radio-button>
      </a-radio-group>
      <div v-if="connectStyle == 1">
        <a-form-model-item label="SocketPath">
          <select-file v-model="socketPath"></select-file>
        </a-form-model-item>

      </div>
      <div v-else-if="connectStyle == 2">
        <a-form-model-item label="URL">
          <a-input v-model="form.url" placeholder="input placeholder" />
        </a-form-model-item>
      </div>

      <div v-else>
        <a-form-model-item label="URL">
          <a-input v-model="form.url" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="ca">
          <select-file v-model="caPath"></select-file>
        </a-form-model-item>
        <a-form-model-item label="cert">
          <select-file v-model="certPath"></select-file>
        </a-form-model-item>
        <a-form-model-item label="key">
          <select-file v-model="keyPath"></select-file>
        </a-form-model-item>
      </div>

      <a-form-model-item>
        <a-button type="primary" @click="connect" :loading="connecting">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import SelectFile from '../components/common/SelectFile'
import {connectionTimeOut} from '../config/timerConfig'

export default {
  components: {
    SelectFile
  },
  data() {
    return {
      connectStyle: "1",
      socketPath: '',
      caPath: '',
      certPath: '',
      keyPath: '',
      form: {
        url: "192.168.159.129:5678"
      },
      connecting: false,
    };
  },
  methods: {
    connect() {
      let docker = this.dockers();
      this.$store.commit('setDocker', docker);
      let that = this;
      this.connecting = true;
      this.$store.state.docker.ping()
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
    },
    dockers() {
      let dockerConnection = null;
      if(this.connectStyle == 1) {
        if(!this.socketPath) {
          this.$message.error("socketPath must be selected");
          return;
        }
        dockerConnection = new this.$DOCKER({socketPath: this.socketPath, timeout: connectionTimeOut});
      } else if (this.connectStyle == 2) {
        if(!this.form.url) {
          this.$message.error("url must be selected");
          return;
        }
        let urls = this.form.url.split(":");
        dockerConnection = new this.$DOCKER({host: urls[0], port: urls[1], timeout: connectionTimeOut});
      } else {
        if(!(this.form.url && this.caPath && this.certPath && this.keyPath)) {
          this.$message.error("the all input must be filled");
          return;
        }
        let urls = this.form.url.split(":");
        dockerConnection = new this.$DOCKER({
          host: urls[0],
          port: urls[1],
          ca: this.$fs.readFileSync(this.caPath),
          cert: this.$fs.readFileSync(this.certPath),
          key: this.$fs.readFileSync(this.keyPath),
          timeout: connectionTimeOut
        });
      }
      return dockerConnection;
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
  /* background: url('../assets/login_background.jpg') no-repeat;
  background-size:100% 100%; */
  justify-content: center;
  align-items: center;
}

.flex-form {
  width: 50%;
}

.ant-upload-select,
.full-width {
  width: 100%;
}

.select-radio-group {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>