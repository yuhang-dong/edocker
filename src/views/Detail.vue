<template>
  <div class="main-container">
    <div class="left-container left-width">
      <img src="../assets/whale.svg" class="icon left-width" />
      <a-menu
        :default-selected-keys="['1']"
        mode="inline"
        theme="dark"
        :inline-collapsed="true"
        class="nav-bar left-width"
      >
        <a-menu-item key="1" title="asd" class="meun-item">
          <router-link :to="{name: 'containerMain'}"><a-icon type="pie-chart" />
          <span>Container</span></router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{name: 'images'}"><a-icon type="desktop" />
          <span>Image</span></router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>Volumn</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="inbox" />
          <span>System</span>
        </a-menu-item>
      </a-menu>
    </div>
    <!-- the main info -->
    <div class="index-container">
      <a-row class="row-bar">
        <a-col :span="12">
            address: {{connectUrl}}
        </a-col>
        <a-col :span="12">
          <a-badge status="processing" text="on-line" v-if="online"/>
          <a-badge status="error" text="off-line" v-else/>
        </a-col></a-row>

        <a-card :bordered="false" class="nav-bar" style="margin-top: 20px">
          <keep-alive>
          <router-view></router-view>
          </keep-alive>
        </a-card>
        
      

    </div>
  </div>
</template>

<script>
import { pingPeriod } from '../config/timerConfig'
import { ping } from "../utils/docker/system";
export default {
  data() {
    return {
      pingTimer: '', // 用于定时发送 ping 命令
      online: true,
      offlineCause: '',
    }
  },
  methods: {
    pingServer() {
      let that = this;
      let _ping = ping(this.connectUrl);
      _ping
        .then(function([response, body]) {
          if(response.statusCode == 200) {
            that.online = true;
            that.offlineCause = '';
          } else {
            that.online = false;
            if(body) {
              let data = JSON.parse(body);
              that.offlineCause = data.message;
            }
            console.log(that.offlineCause)
          }
        })
        .catch(function(error) {
            that.online = false;
            if(error) {
              that.offlineCause = error;
            }
        });

    }
  },
  computed: {
    connectUrl() {
      return this.$store.state.connectUrl;
    }
  },
  mounted() {
    // 页面创建时调用
    this.pingTimer = setInterval(this.pingServer, pingPeriod);
  },
  beforeDestroy() {
    // 离开页面前调用
    clearInterval(this.pingTimer);
  }
};
</script>

<style>
.main-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
}

.left-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.index-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.row-bar {
    height: 60px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.icon {
  background-color: #001529;
}

.nav-bar {
  flex-grow: 1;
}

.left-width {
  width: 60px;
}

.ant-menu-inline-collapsed > .ant-menu-item {
  padding: 0px !important;
}

svg {
  height: 20px;
  width: 20px;
}

.ant-badge-status-dot {
  width: 20px;
  height: 20px;
}
</style>