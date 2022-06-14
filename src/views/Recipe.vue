<template>
  <div>
    <el-tabs
      @tab-click="handlerTab"
      type="border-card"
      tab-position="top"
      v-model="activeName"
      style="
        margin-top: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0), 0 0 6px rgba(0, 0, 0, 0);
      "
    >
      <el-tab-pane
        :label="item.parent_name"
        :name="item.parent_type"
        v-for="item in classifies"
        :key="item.parent_type"
      >
        <!-- /recipe?classify=query -->
        <router-link
          v-for="option in item.list"
          :key="option.type"
          :to="{ query: { classify: option.type } }"
        >
          <el-tag :class="{ active: classify == option.type }">
            {{ option.name }}</el-tag
          ></router-link
        >
      </el-tab-pane>
    </el-tabs>
    <div>
      <p class="title">家常好味道，给你家一般的温暖</p>
      <el-container>
        <el-aside width="200px" style="margin-top: 30px">
          <h5 style="border-bottom: 1px color #666">筛选</h5>
          <el-collapse v-model="activeProperties">
            <el-collapse-item
              :title="item.parent_name"
              :name="item.parent_type"
              v-for="item in properties"
              :key="item.parent_type"
            >
              <el-tag
                @click="handlerPropertyClick(option)"
                :class="{ active: property[item.title] == option.type }"
                style="margin: 10px; min-width: 70px; text-align: center"
                v-for="option in item.list"
                :key="option.type"
                >{{ option.name }}</el-tag
              >
            </el-collapse-item>
          </el-collapse>
        </el-aside>
        <el-container>
          <el-main height="220px">
            <!-- 列表和首页一致 -->
            <menu-card :menuList="menuList" width="18%"></menu-card>
            <!-- 分页 -->
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pages.currentPage"
              :page-size="pages.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pages.total"
              background
            >
            </el-pagination>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getClassify, getProperty, getMenu } from "@/apis";
import menuCard from "@/components/menu-card.vue";
export default {
  components: { menuCard },
  data() {
    return {
      classifies: [],
      properties: [],
      menuList: [],
      activeName: "1",
      classify: "1-1",
      property: {},
      activeProperties: [], // 存放激活面板的name值
      // 分页信息
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  methods: {
    handlerTab(val, event) {
      // 获取大的分类
      const parentType = this.activeName;

      // 在整个分类中获取到此类别 通过parentType
      // find如果数组中有符合条件的元素 返回第一个符合条件的元素 否则返回undefined
      const item = this.classifies.find(
        (item) => item.parent_type == parentType
      );

      (this.classify = item.list[0].type),
        // 同步更新地址栏的classify classify存放在query中
        this.$router.push({
          query: { ...this.$route.query, classify: this.classify, page: 1 }, // 保持原有的参数 只更新classify
        });
    },

    // 点击事件
    handlerPropertyClick(option) {
      // 将点击的属性值 及对应的title值 存放到property中
      // this.property[option.title] = option.type;
      // $set(target,propertyName/index,value)
      // --- target 目标对象
      // --- propertyName/index 对象属性值
      // --- value 要添加的属性值
      if (this.property[option.title] === option.type) {
        //  再次点击不设置属性值
        this.$set(this.property, option.title);
      } else {
        this.$set(this.property, option.title, option.type);
      }
      // 添加参数
      this.$router.push({
        query: {
          ...this.$route.query,
          ...this.property,
          page: 1,
        },
      });
    },

    // 点击分页
    handleCurrentChange() {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.pages.currentPage,
        },
      });
    },

    // 获取菜单
    getMenu() {
      // 获取地址栏的参数
      let query = { ...this.$route.query };
      let params = {};
      params.classify = query.classify;
      params.page = query.page || this.pages.currentPage;

      // 删除
      delete query.classify;
      delete query.page;

      // 选中的属性高亮显示
      params.property = { ...query };
      this.property = { ...query };

      //  清空折叠面板的name
      this.activeProperties = []; // 添加数据
      for (let i in this.property) {
        if (this.property[i]) {
          this.activeProperties.push(this.property[i].split("-")[0]);
        }
      }

      getMenu(params).then((res) => {
        this.menuList = res.data.list;
        this.pages.currentPage = res.data.current_page;
        this.pages.pageSize = res.data.page_size;
        this.pages.total = res.data.total;
      });
    },
  },

  // 挂载完成
  async mounted() {
    const res = await getClassify();
    this.classifies = res.data;

    const attr = await getProperty();
    this.properties;
    this.properties = attr.data;

    // 判定query中是否包含classify
    if (!this.$route.query.classify) {
      this.$router.push({
        query: { classify: res.data[0].list[0].type },
      });
    }
  },
  watch: {
    $route: {
      handler(val) {
        // this.$route.query 是一个对象 {classify = xx,name = xx}
        const { classify } = this.$route.query;

        if (classify) {
          // 获取大类
          this.activeName = classify.slice("-")[0];
          this.classify = classify;

          // 获取参数并处理数据
          this.getMenu();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.link {
  width: 40px;
  height: 30px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}

.link:hover {
  background-color: red;
}

.title {
  font-size: 1.2em;
  margin-top: 60px;
  margin-bottom: 60px;
}

.el-tag {
  margin-right: 10px;

  &.active {
    background-color: red;
    color: white;
  }

  &.active {
    background-color: red;
    color: white;
  }
}

.el-aside {
  background: white;
  padding: 10px;
}
</style> 