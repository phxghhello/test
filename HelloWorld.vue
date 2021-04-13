<template>
  <div class="hello">
    <div class="top">
      <div class="screen">
        <div style="width: 30%">筛选</div>
        <el-input
          type="search"
          v-model="search"
          style="width: 70%"
          placeholder="请输入关键字"
        ></el-input>
      </div>
    </div>
    <div class="table">
      <el-table :data="tables" style="width: 100%" max-height="500">
        <el-table-column type="selection" width="55" v-bind:selectable="chkstu">
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.date)"></span>
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.name)"></span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate(scope.row.address)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      search: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "张三",
          address: "上海市普陀区金沙江路1518弄",
          markValue: 0,
        },
        {
          date: "2016-05-04",
          name: "李四",
          address: "上海市普陀区金沙江路1517弄",
          markValue: 1,
        },
        {
          date: "2016-05-01",
          name: "王五",
          address: "上海市普陀区金沙江路1519弄",
          markValue: 0,
        },
        {
          date: "2016-05-03",
          name: "赵六",
          address: "上海市普陀区金沙江路1516弄",
          markValue: 1,
        },
      ],
    };
  },
  computed: {
    //实时监听表格
    tables: function () {
      const search = this.search;
      if (search) {
        return this.tableData.filter((dataNews) => {
          return Object.keys(dataNews).some((key) => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
  methods: {
    chkstu: function (row) {
      return row.markValue == 0 ? true : false;
    },
    //筛选变色
    showDate(val) {
      val = val + "";
      if (val.indexOf(this.search) !== -1 && this.search !== "") {
        return val.replace(
          this.search,
          '<font color="#409EFF">' + this.search + "</font>"
        );
      } else {
        return val;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
