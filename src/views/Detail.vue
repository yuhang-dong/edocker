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
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>Option 3</span>
        </a-menu-item>
      </a-menu>
    </div>
    <!-- the main info -->
    <div class="index-container">
      <a-row class="row-bar">
        <a-col :span="12">
            address: http://127.0.0.1:5678
        </a-col>
        <a-col :span="12">
    <a-badge status="processing" text="on-line"/>
    <a-badge status="error" text="off-line"/>
        </a-col></a-row>

        <a-card :bordered="false" class="nav-bar" style="margin-top: 20px">
          <router-view></router-view>
        </a-card>
        
      

    </div>
    <!-- main header -->

    <!-- main index -->
  </div>
</template>

<script>
export default {};
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