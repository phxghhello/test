<template>
  <div>
    <el-table border v-loading="loading" :data="list">
      <el-table-column label="指标名称" align="center" prop="name" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="频度" align="center" prop="daily" />
      <el-table-column label="最新值" align="center" prop="lastest" />
      <el-table-column label="数值超过" align="center" prop="over">
        <template inline-template slot-scope="scope">
          <el-input
            v-model="scope.row.over"
            @change="handleChangeOver(scope.$index, scope.row, $event)"
            placeholder="请输入"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="数值低于" align="center" prop="lower">
        <template inline-template slot-scope="scope">
          <el-input v-model="scope.row.lower" placeholder="请输入" @change="handleChangeOver(scope.$index, scope.row, $event)"> </el-input>
        </template>
      </el-table-column>
      <el-table-column label="涨幅超过(%)" align="center" prop="overPercent">
        <template inline-template slot-scope="scope">
          <el-input v-model="scope.row.overPercent" placeholder="请输入">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="跌幅超过(%)" align="center" prop="lowerPercent">
        <template inline-template slot-scope="scope">
          <el-input v-model="scope.row.lowerPercent" placeholder="请输入">
          </el-input>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.open"> </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      list: [{
          name: '收盘价沪深300指数',
          unit: '点',
          daily: '日',
          lastest: '4,265.39'
      }],
    };
  },
  methods: {
    handleChangeOver(index, row, event) {
        console.log(index, row, event);
    },
  },
};
</script>

<style>
</style>