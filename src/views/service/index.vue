<template>
  <div class="viewer">
    <div class="query-block">
      <el-form :inline="true" :model="search" class="min-bottom">
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

    <div class="toolbar">
      <el-button @click="showDialog(1)" type="success" icon="el-icon-plus" size="medium">新增</el-button>
    </div>

    <el-table
      v-loading.body="loading"
      :data="table.items"
      :max-height="height - 140"
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

    <!-- 弹窗框 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.show" center
      :close-on-press-escape="false" :close-on-click-modal="false" class="dialog-form">
      <el-form ref="memeberForm" :model="dialog.form" :rules="dialog.rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="成员名：" prop="name">
              <el-input v-model="dialog.form.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="密码：" prop="pwd">
              <el-input v-model="dialog.form.pwd" type="password" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="手机号码：" prop="mobilePhone">
              <el-input v-model="dialog.form.mobilePhone" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="dialog.form.email" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item prop="userType">
              <el-checkbox v-model="dialog.form.userType" true-label="admin" false-label="normal">是否管理员</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="submitForm" v-loading="dialog.loading">保 存</el-button>
        <el-button size="medium" @click="dialog.show = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- /弹窗框 -->

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
      },
      dialog: {
        type: 1, // 1：新增，2：修改
        title: "",
        show: false,
        loading: false,
        form: {
          name: "",
          pwd: "",
          mobilePhone: "",
          email: "",
          userType: "normal"
        },
        rules: rules
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
     * 显示新增弹窗
     */
    showDialog(type, form) {
      let $form = this.$refs["memeberForm"];
      if ($form && $form.resetFields) {
        $form.resetFields();
      }

      this.dialog.type = type;
      if (type == 1) {
        this.dialog.title = "新增成员";
        this.dialog.form = {
          name: "",
          pwd: "",
          mobilePhone: "",
          email: "",
          userType: "normal"
        };
      } else if (type == 2 && form) {
        this.dialog.title = form.name;

        this.dialog.form = { ...form };
      }
      this.dialog.show = true;
    },

    /**
     * 提交
     */
    async submitForm() {
      try {
        const $form = this.$refs["memeberForm"];
        let valid = await $form.validate();

        if (valid) {
          if (this.dialog.type === 1) {
            // 新增
            this.dialog.loading = true;
            const data = await api.addUser(this.dialog.form);

            if (data && data.code === "OK") {
              this.$message.success("新增成员成功！");
              this.dialog.show = false;
              this.query();
            }
          } else {
            let params = {
              id: this.dialog.form.id,
              name: this.dialog.form.name,
              pwd: this.dialog.form.pwd,
              mobilePhone: this.dialog.form.mobilePhone,
              email: this.dialog.form.email,
              userType: this.dialog.form.userType
            };

            // 编辑
            this.dialog.loading = true;
            const data = await api.updateUserById(params);

            if (data && data.code === "OK") {
              this.$message.success("修改成员成功！");
              this.dialog.show = false;
              this.query();
            }
          }
        }
      } catch (e) {
        if (e.msg) {
          this.$message.warning(e.msg);
        }
      } finally {
        this.dialog.loading = false;
      }
    },

    /**
     * 删除
     */
    async deleteUser(form) {
      try {
        let valid = await this.$confirm(
          `确定要删除权限用户：${form.userName}?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        );

        if (valid) {
          let params = { id: this.edit.form.id, userId: form.userId };
          const data = await api.deleteServiceUser(params);

          if (data && data.code === "OK") {
            this.$message.success(`删除权限用户：${form.userName}成功！`);
            this.getDetailUsers(this.edit.form.id);
          }
        }
      } catch (e) {
        if (e.msg) {
          this.$message.warning(e.msg);
        }
      }
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

const rules = {
  name: [{ required: true, message: "请输入成员名", trigger: "blur" }],
  pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
  mobilePhone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      pattern: /(^[0-9]{11})$|(^86(-){0,3}[0-9]{11})$/,
      message: "请输入正确的手机号码"
    }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      message: "请输入正确的邮箱"
    }
  ]
};

</script>
