<template>
  <div class="viewer">
    <div class="query-block">
      <el-form :inline="true" :model="search">
        <el-form-item>
          <el-input v-model="search.name" placeholder="名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="small"
            clearable
            v-model="search.createDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clear" size="small">清空</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading.body="loading"
      :data="table.items"
      :max-height="height - 100"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        prop="marry"
        label="婚姻"
        width="120">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="400">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pull-right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="table.pager.page"
      :page-sizes="[20, 50, 100, 500]"
      :page-size="table.pager.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="table.pager.total">
    </el-pagination>

  </div>
</template>
<script>

let data = [];
for (let i = 0, len = 100; i < len; i++) {
  data.push({
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
    marry: '未婚',
    remark: '农业农村经济高质量发展开局良好(经济形势年中看)'
  });
}
Object.freeze(data);

export default {
  props: {
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      loading: false,
      search: {
        name: "",
        createDate: null
      },
      table: {
        items: data,
        pager: {
          pageSize: 20,
          pageNo: 1,
          total: 100
        }
      }
    };
  },
  mounted() {
    console.log(this.table.items);
  },
  methods: {
    handleClick() {

    },

    /**
     * 查询
     */
    query() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 500);
    },

    /**
     * 每页显示条数变化
     * @param val
     */
    handleSizeChange(val) {
      this.table.pager.pageSize = val;
      this.query();
    },

    /**
     * 页码变化
     * @param val
     */
    handleCurrentChange(val) {
      if (this.table.pager.pageNo) {
        this.table.pager.pageNo = val;
        this.query();
      }
    },

    /**
     * 清空
     */
    clear() {
      this.search = {
        name: "",
        createDate: null
      };
    }
  }
};
</script>
