<template>
  <!-- 此处采用一个侧边栏、一个头栏、一个主体的设计容器 -->
  <el-container>
    <!-- 侧边栏部分代码 -->
    <el-aside width="200px">
      <el-menu :default-active="this.$route.path" router>
        <el-menu-item key="Home" index="/Home">
          <!-- <i class="el-icon-s-home"></i> -->
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span slot="title">Home</span>
        </el-menu-item>
        <el-menu-item key="Dataset" index="/Dataset">
          <!-- <i class="el-icon-s-data"></i> -->
          <el-icon>
            <DataAnalysis />
          </el-icon>
          <span slot="title">Dataset</span>
        </el-menu-item>
        <el-menu-item key="Generation" index="/Generation">
          <!-- <i class="el-icon-s-opportunity"></i> -->
          <el-icon>
            <Opportunity />
          </el-icon>
          <span slot="title">Generation</span>
        </el-menu-item>
        <el-menu-item key="Leaderboard" index="/Leaderboard">
          <!-- <i class="el-icon-s-marketing"></i> -->
          <el-icon>
            <TrendCharts />
          </el-icon>
          <span slot="title">Leaderboard</span>
        </el-menu-item>



      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头栏部分 -->
      <el-header>
        <el-row :gutter="20">
          <!-- 搜索框部分布局，在header部分空前16格，占6格（element ui24格布局样式） -->
          <el-col :span="6" :offset="15">
            <!-- 默认展示输出为“请输入搜索内容”，限制搜索词长度为15，限时长度限制 -->
            <el-input type="text" placeholder="Please enter your search" v-model="text" maxlength="15"
              show-word-limit></el-input>
          </el-col>
          <!-- 搜索按钮部分布局，占据搜索框后2格的位置（element ui24格布局样式） -->
          <el-col :span="2">
            <!-- 点击触发函数getSearch -->
            <el-button type="primary" icon="search" @click="getSerach">Search</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主栏部分 -->
      <el-main>

        <el-tabs v-model="resultTab">
          <el-tab-pane label="GuacaMol distribution learning" name="tab2">
            <el-table :data="GuacamolData" :default-sort="{ prop: 'name', order: 'descending' }">
              <el-table-column prop="name" label="Model name" sortable></el-table-column>
              <el-table-column prop="Uniq" label="Unique" sortable></el-table-column>
              <el-table-column prop="Novelty" label="Novelty" sortable></el-table-column>
              <el-table-column prop="KL" label="KL divergence" sortable></el-table-column>
              <el-table-column prop="FCD" label="FCD" sortable></el-table-column>
            </el-table>

          </el-tab-pane>

          <el-tab-pane label="Molecule condition generation" name="tab1">

            <el-table :data="tableData" :default-sort="{ prop: 'name', order: 'descending' }">
              <el-table-column prop="name" label="Model name" width="130" sortable></el-table-column>
              <el-table-column prop="alpha" label="Alpha" width="100" sortable> </el-table-column>
              <el-table-column prop="delta" label="Delta" width="110" sortable> </el-table-column>
              <el-table-column prop="homo" label="HOMO" width="110" sortable> </el-table-column>
              <el-table-column prop="lumo" label="LUMO" width="110" sortable> </el-table-column>
              <el-table-column prop="mu" label="mu" width="110" sortable> </el-table-column>
              <el-table-column prop="cv" label="cv" width="110" sortable> </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Molecule property prediction" name="tab3">
            <el-table :data="predictionData" :default-sort="{ prop: 'name', order: 'descending' }">
              <el-table-column prop="name" label="Model name" width="130" sortable></el-table-column>
              <el-table-column prop="alpha" label="Alpha" width="110" sortable></el-table-column>
              <el-table-column prop="Delta" label="Delta" width="110" sortable></el-table-column>
              <el-table-column prop="HOMO" label="HOMO" width="100" sortable></el-table-column>
              <el-table-column prop="LUMO" label="LUMO" width="100" sortable></el-table-column>
              <el-table-column prop="mu" label="mu" width="100" sortable></el-table-column>
              <el-table-column prop="Cv" label="Cv" width="100" sortable></el-table-column>
              <el-table-column prop="G" label="G" width="100" sortable></el-table-column>
              <el-table-column prop="H" label="H" width="100" sortable></el-table-column>
              <el-table-column prop="ZPVE" label="ZPVE" width="110" sortable></el-table-column>

            </el-table>

          </el-tab-pane>


        </el-tabs>




      </el-main>
    </el-container>
  </el-container>
</template>



<style>
/* 容器布局 */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

/* 跑马灯布局 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  /* width: 1500px; */
}

.el-menu {
  text-align: left;
  /* 将内容向左对齐 */
}

/* img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
</style>


<script>
// 用于处理接口调用
import axios from "axios";
export default {
  data() {
    return {
      text: "",
      resultTab: "tab2",
      subText: null,
      imgList: ["Dataset.jpg", "Generation.jpg", "Leaderboard.jpg"],
      dataList: [],
      tableData: [{ name: 'EDM', alpha: '2.76', delta: '655', homo: '356', lumo: '584', mu: '1.111', cv: '1.101' },
      { name: 'GeoLDM', alpha: '2.37', delta: '587', homo: '340', lumo: '522', mu: '1.108', cv: '1.025' },
      { name: 'EEGSDE', alpha: '2.5', delta: '487', homo: '302', lumo: '447', mu: '0.777', cv: '0.941' },
      ],
      GuacamolData: [{ name: 'PS-VAE', Uniq: '0.673', Novelty: '0.523', KL: '0.921', FCD: '0.659' },
      { name: 'HierVAE', Uniq: '0.416', Novelty: '0.285', KL: '0.802', FCD: '0.426' },
      { name: 'MARS', Uniq: '0.659', Novelty: '0.612', KL: '0.547', FCD: '0.123' },
      { name: 'GA', Uniq: '0.008', Novelty: '0.008', KL: '0.429', FCD: '0.004' },
      { name: 'GraphDF', Uniq: '0.672', Novelty: '0.672', KL: '0.601', FCD: '0.137' },
      { name: 'GraphAF', Uniq: '0.500', Novelty: '0.452', KL: '0.761', FCD: '0.326' },
      { name: 'GCPN', Uniq: '0.533', Novelty: '0.320', KL: '0.552', FCD: '0.174' },
      { name: 'JT-VAE', Uniq: '0.549', Novelty: '0.386', KL: '0.891', FCD: '0.588' }],
      predictionData: [{ name: 'Equiformer', alpha: '.046', Delta: '30', HOMO: '15', LUMO: '14', mu: '.011', Cv: '.023', G: '7.63', H: '6.63', ZPVE: '1.26' },
      { name: 'EQGAT', alpha: '.053', Delta: '32', HOMO: '20', LUMO: '16', mu: '.011', Cv: '.024', G: '23', H: '24', ZPVE: '2.00' },
      { name: 'SphereNet', alpha: '.046', Delta: '32', HOMO: '23', LUMO: '18', mu: '.026', Cv: '.021', G: '8', H: '6', ZPVE: '1.12' },
      { name: 'TorchMD-NET', alpha: '.059', Delta: '36', HOMO: '20', LUMO: '18', mu: '.011', Cv: '.026', G: '7.62', H: '6.16', ZPVE: '1.84' },
      { name: 'PaiNN', alpha: '.045', Delta: '46', HOMO: '28', LUMO: '20', mu: '.012', Cv: '.024', G: '7.35', H: '5.98', ZPVE: '1.28' },
      { name: 'DimeNet++', alpha: '.044', Delta: '33', HOMO: '25', LUMO: '20', mu: '.030', Cv: '.023', G: '8', H: '7', ZPVE: '1.21' },
      { name: 'SchNet', alpha: '.235', Delta: '63', HOMO: '41', LUMO: '34', mu: '.033', Cv: '.033', G: '14', H: '14', ZPVE: '1.70' }],
      navList: [
        { name: '/ct2', navItem: 'Dataset', navIcon: 'el-icon-s-data' },
        { name: '/ct2', navItem: 'Generation', navIcon: 'el-icon-s-opportunity' },
        { name: '/', navItem: 'Leaderboard', navIcon: 'el-icon-s-marketing' },

      ]
    };
  },

  methods: {

    handleImageClick(index) {
      if (index === 0) { // 如果点击了第一张图片（索引为0）
        this.$router.push({ name: 'Dataset' }); // 使用 Vue Router 跳转到名为 Dataset 的页面
      }
      if (index === 1) { // 如果点击了第一张图片（索引为0）
        this.$router.push({ name: 'Generation' }); // 使用 Vue Router 跳转到名为 Dataset 的页面
      }
      // 其他情况，可以添加其他图片点击的逻辑
    },

    // getImgUrl方法，用于获取展示的图片的url信息，其中url对应图片名称，type分为png和jpg，
    // 路径写死为assets文件夹下，后期发生存放位置变更需更改2个const中的路径
    // png格式名字中无需带后缀，jpg格式需要带后缀
    getImgUrl(url, type) {
      if (type == "png") {
        const a = require("../assets/" + url + ".png");
        // console.log("a", a);
        return a;
      } else if (type == "jpg") {
        const b = require("../assets/" + url);
        // console.log("b", b);
        return b;
      }
    },
    // getSearch方法，根据输入框中的文字，对于后端进行接口的请求
    getSerach() {
      this.subText = this.text;

      // if (this.subText.toLowercase()=='dataset'){
      //   this.$router.push({name:'test'});
      // }
      if (this.subText.toLowerCase().includes('dataset')) {
        this.$router.push({ name: 'Dataset' });
      }
      else if (this.subText.toLowerCase().includes('generation')) {
        this.$router.push({ name: 'Generation' });
      }
      else if (this.subText.toLowerCase().includes('leaderboard')) {
        this.$router.push({ name: 'Leaderboard' });
      }
      else if (this.subText.toLowerCase().includes('home')) {
        this.$router.push({ name: 'Home' });
      }
      else {
        // window.open("http://www.google.com");
        window.location.href = 'https://www.google.com';
      }

      // axios.post(`/pmc/test?name=${this.subText}`).then((res) => {
      //   this.dataList = res.data;
      //   // console.log(res.data);
      //   // this.dataList = res.data.dataList;
      //   // this.links = res.data.links;
      //   // this.$nextTick(() => {
      //   //   this.myET();
      //   // });
      // });
      // console.log(this.text);
    },
  },
};
</script>