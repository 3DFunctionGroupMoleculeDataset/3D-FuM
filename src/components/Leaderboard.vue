<template>
  <!-- 此处采用一个侧边栏、一个头栏、一个主体的设计容器 -->
  <el-container>
    <!-- 侧边栏部分代码 -->
    <el-aside width="200px">
      <el-menu :default-active="this.$route.path" router>
        <el-menu-item key="Home" index="/Home">
          <!-- <i class="el-icon-s-home"></i> -->
          <el-icon><HomeFilled /></el-icon>
          <span slot="title">Home</span>
        </el-menu-item>
        <el-menu-item key="Dataset" index="/Dataset">
          <!-- <i class="el-icon-s-data"></i> -->
          <el-icon><DataAnalysis /></el-icon>
          <span slot="title">Dataset</span>
        </el-menu-item>
        <el-menu-item key="Generation" index="/Generation">
          <!-- <i class="el-icon-s-opportunity"></i> -->
          <el-icon><Opportunity /></el-icon>
          <span slot="title">Generation</span>
        </el-menu-item>
        <el-menu-item key="Leaderboard" index="/Leaderboard">
          <!-- <i class="el-icon-s-marketing"></i> -->
          <el-icon> <TrendCharts /> </el-icon>
          <span slot="title">Leaderboard</span>
        </el-menu-item>

        <!-- <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name"> -->
          <!-- <i class={{ item.navIcon }}></i> -->
          <!-- <span slot="title">Dataset</span> -->
          <!-- {{ item.navItem }} -->
        <!-- </el-menu-item> -->

      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头栏部分 -->
      <el-header>
        <el-row :gutter="20">
          <!-- 搜索框部分布局，在header部分空前16格，占6格（element ui24格布局样式） -->
          <el-col :span="6" :offset="15">
            <!-- 默认展示输出为“请输入搜索内容”，限制搜索词长度为15，限时长度限制 -->
            <el-input type="text" placeholder="Please enter your search" v-model="text" maxlength="15" show-word-limit></el-input>
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
        <el-table :data="tableData"  :default-sort = "{prop: 'name', order: 'descending'}">
        <el-table-column prop="name" label="Model name" width="130" sortable></el-table-column>
        <el-table-column prop="alpha" label="Alpha" width="100" sortable> </el-table-column>
        <el-table-column prop="delta" label="Delta" width="110" sortable> </el-table-column>
        <el-table-column prop="homo" label="HOMO" width="110" sortable> </el-table-column>
        <el-table-column prop="lumo" label="LUMO" width="110" sortable> </el-table-column>
        <el-table-column prop="mu" label="mu" width="110" sortable> </el-table-column>
        <el-table-column prop="cv" label="cv" width="110" sortable> </el-table-column>
        
        </el-table>

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

.el-menu{
  text-align: left; /* 将内容向左对齐 */
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
      subText: null,
      imgList: ["Dataset.jpg", "Generation.jpg", "Leaderboard.jpg"],
      dataList: [],
      tableData:[{name:'EDM',alpha:'2.76',delta:'655',homo:'356',lumo:'584',mu:'1.111',cv:'1.101'},
      {name:'GeoLDM',alpha:'2.37',delta:'587',homo:'340',lumo:'522',mu:'1.108',cv:'1.025'},
      {name:'EEGSDE',alpha:'2.5',delta:'487',homo:'302',lumo:'447',mu:'0.777',cv:'0.941'},
      ],
      navList:[
            {name:'/ct2',navItem:'Dataset',navIcon:'el-icon-s-data'},
            {name:'/ct2',navItem:'Generation',navIcon:'el-icon-s-opportunity'},
            {name:'/',navItem:'Leaderboard',navIcon:'el-icon-s-marketing'},
            
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
      if (this.subText.toLowerCase().includes('dataset')){
        this.$router.push({name:'Dataset'});
      }
      else if(this.subText.toLowerCase().includes('generation')){
        this.$router.push({name:'Generation'});
      }
      else if(this.subText.toLowerCase().includes('leaderboard')){
        this.$router.push({name:'Leaderboard'});
      }
      else if(this.subText.toLowerCase().includes('home')){
        this.$router.push({name:'Home'});
      }
      else{
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