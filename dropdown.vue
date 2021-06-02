<template>
  <el-row>
      {{visibility}}
    <el-col :span="12">
      <el-dropdown trigger="click" @visible-change="bool => visibility = bool">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right" :class="visibility? 'marginRight90':'marginRight10'"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data() {
        return {
            visibility: false
        }
    },
};
</script>

<style>
.marginRight90 {
    margin-right: 90px;
}
.marginRight10 {
    margin-right: 0px;
}
.marginRight90 {
    margin-right: 90px;
}
.marginRight10 {
    margin-right: 0px;
}
</style>