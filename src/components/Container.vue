<template>
<div>
        <a-table 
  :columns="columns" :data-source="data" :row-key="record => record.Id" :loading="loading"
  :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
    <router-link slot="name" slot-scope="text, record" :to="{name: 'containerDetails', params: {id: record.Id}}">{{ text }}</router-link>
    <span slot="Labels" slot-scope="Labels">
      <a-tag
        v-for="label in Labels"
        :key="label"
        color="green"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>

    <span slot="State" slot-scope="State, record">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{record.Status}}</span>
        </template>
        <span>{{State}}</span>
      </a-tooltip>
    </span>

    <span slot="Created" slot-scope="Created">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{longToTime(Created)}}</span>
        </template>
        <span>{{timeAgo(Created)}}</span>
      </a-tooltip>
    </span>

    <span slot="Action" slot-scope="Action, record">
      <a-button-group size="small">
          <a-button type="primary" @click="run(record.Id)">RUN</a-button>
          <a-button type="dashed" @click="stop(record.Id)">STOP</a-button>
          <a-button type="danger" @click="del(record.Id)">DELETE</a-button>
      </a-button-group>
    </span>
  </a-table>
</div>


</template>
<script>
import { getContainersPeriod } from '../config/timerConfig'
import  {dateFtt} from '../utils/commonUtil'
import { format } from 'timeago.js';
const columns = [
  {
    dataIndex: 'Names',
    key: 'Names',
    title: 'Names' ,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Image',
    dataIndex: 'Image',
    key: 'Image',
  },
  {
    title: 'State',
    key: 'State',
    dataIndex: 'State',
    scopedSlots: { customRender: 'State' },
  },
  {
    title: 'Created',
    dataIndex: 'Created',
    key: 'Created',
    scopedSlots: {customRender: 'Created'},
  },
  {
    title: 'Action',
    key: 'Action',
    scopedSlots: {customRender: 'Action'},
  }
];

export default {
  data() {
    return {
      data: [],
      columns,
      getContainersTimer: '',
      loading: true,
      selectedRowKeys: [],
    };
  },
  methods: {
    getContainers(first) {
      if(first) {
        this.loading = true;
      }
      let that = this;
      this.$docker.listContainers({all: 1})
        .then(function(data) {
            // 成功访问
            that.data = JSON.parse(data);
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {
          that.loading = false;
        })
    },
    longToTime(long) {
      return dateFtt("yyyy-MM-dd hh:mm:ss", new Date(long*1000));
    },
    timeAgo(time) {
      return format(time*1000);
    },
    onSelectChange(selectKey) {
      this.selectedRowKeys = selectKey;
    }
  },
  mounted() {
    this.getContainers(true);
    // 轮询 container 信息
    this.getContainersTimer = setInterval(this.getContainers, getContainersPeriod);
  },
  beforeDestroy() {
    // 离开页面前调用
    clearInterval(this.getContainersTimer);
  }
};
</script>
<style>
.ant-table-pagination {
  display: none;
}

.ant-table-row-cell-last {
  min-width: 202px;
}
</style>