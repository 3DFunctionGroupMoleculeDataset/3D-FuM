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

        <el-row class="custom-row">
          <el-col :span="5">
            <el-card shadow="hover">
              <!-- <img src="../assets/Atom_img/overall/valeric_acid.png" fit="contain"
                preview-src-list="[../assets/Atom_img/overall/valeric_acid.png]"> -->
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getOverallImgUrl(overallImgList[0], 'jpg')" :fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[0], 'jpg')]"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getOverallImgUrl(overallImgList[1], 'jpg')" :fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[1], 'jpg')]"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getOverallImgUrl(overallImgList[2], 'jpg')" :fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[2], 'jpg')]"></el-image>
                </div>
              <!-- <el-card-item v-for="(item, index) in 3" :key="item"> -->
              
              <!-- </el-card-item> -->
              <div style="padding: 14px;">
                <span>Original Molecule</span>
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                </div>
              </div>

            </el-card>
          </el-col>

          <el-col :span="5" :offset="1">
            <el-card shadow="hover">
              <!-- <img src="../assets/Atom_img/overall/valeric_acid.png" fit="contain"
                preview-src-list="[../assets/Atom_img/overall/valeric_acid.png]"> -->

              <!-- <el-card-item v-for="(item, index) in 3" :key="item"> -->
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getPointCloudImgUrl(pointCloudImg[0])" :fit="contain"
                :preview-src-list="[getPointCloudImgUrl(pointCloudImg[0])]"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getPointCloudImgUrl(pointCloudImg[0])" :fit="contain"
                :preview-src-list="[getPointCloudImgUrl(pointCloudImg[0])]"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getPointCloudImgUrl(pointCloudImg[0])" :fit="contain"
                :preview-src-list="[getPointCloudImgUrl(pointCloudImg[0])]"></el-image>
                </div>
              <!-- <el-image v-for="(item, index) in 3" :key="item" style=" height: 130px"
                :src="getPointCloudImgUrl(pointCloudImg[0])" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]" :class="img"></el-image> -->
              <!-- </el-card-item> -->
              <div style="padding: 14px;">
                <div style="height: 35px;">
                  <span>Point Cloud</span>
                </div>
                <!-- <span>Point Cloud</span> -->
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="text" class="button" @click="pointCloudJump">Download</el-button>
                </div>
              </div>

            </el-card>
          </el-col>


          <el-col :span="5" :offset="1">
            <el-card shadow="hover">
              <!-- <img src="../assets/Atom_img/overall/valeric_acid.png" fit="contain"
                preview-src-list="[../assets/Atom_img/overall/valeric_acid.png]"> -->

              <!-- <el-card-item v-for="(item, index) in 3" :key="item"> -->
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getBRICSImgUrl(BRICSImgList[0])" :fit="contain"
                :preview-src-list="[getBRICSImgUrl(BRICSImgList[0])]"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getBRICSImgUrl(BRICSImgList[1])" :fit="contain"
                :preview-src-list="[getBRICSImgUrl(BRICSImgList[1])]"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getBRICSImgUrl(BRICSImgList[2])" :fit="contain"
                :preview-src-list="[getBRICSImgUrl(BRICSImgList[2])]"></el-image>
                </div>
              <!-- <el-image v-for="(item, index) in 3" :key="item" style=" height: 130px"
                :src="getPointCloudImgUrl(pointCloudImg[0])" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]" :class="img"></el-image> -->
              <!-- </el-card-item> -->
              <div style="padding: 14px;">
                <div style="height: 35px;">
                  <span>BRICS</span>
                </div>
                <!-- <span>BRICS</span> -->
                
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="text" class="button" @click="BRICSJump">Download</el-button>
                </div>
              </div>

            </el-card>
          </el-col>

          <el-col :span="6" :offset="1">
            <el-card shadow="hover">
              <!-- <img src="../assets/Atom_img/overall/valeric_acid.png" fit="contain"
                preview-src-list="[../assets/Atom_img/overall/valeric_acid.png]"> -->

              <!-- <el-card-item v-for="(item, index) in 3" :key="item"> -->
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getOursImgUrl(oursImgList[0])" :fit="contain"
                :preview-src-list="[getOursImgUrl(oursImgList[0])]" class="custom-img"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getOursImgUrl(oursImgList[0])" :fit="contain"
                :preview-src-list="[getOursImgUrl(oursImgList[0])]" class="custom-img"></el-image>
                </div>
                <div class="cardImg">
                  <!-- <el-image v-for="(item, index) in 3" :key="item" 
                :src="getOverallImgUrl(overallImgList[index], 'jpg')" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]"></el-image> -->
                <el-image :src="getOursImgUrl(oursImgList[1])" :fit="contain"
                :preview-src-list="[getOursImgUrl(oursImgList[1])]" ></el-image>
                </div>
              <!-- <el-image v-for="(item, index) in 3" :key="item" style=" height: 130px"
                :src="getPointCloudImgUrl(pointCloudImg[0])" fit="contain"
                :preview-src-list="[getOverallImgUrl(overallImgList[index], 'jpg')]" :class="img"></el-image> -->
              <!-- </el-card-item> -->
              <div style="padding: 14px;">
                <div style="height: 35px;">
                  <span>3D Function Groups (ours)</span>
                </div>
                <!-- <span>3D Function Groups (ours)</span> -->
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="text" class="button" @click="oursJump">Download</el-button>
                </div>
              </div>

            </el-card>
          </el-col>

        </el-row>

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

.cardImg {
  width: 100%;
  height: 130px;
  object-fit: contain;
}

.custom-img {
  width: 50%;
  height: 50%;
  object-fit: cover;
}
/* .el-row{
  margin-bottom: 480px;
  display: flex;
  flex-wrap: wrap;
} */

.custom-row{
  margin-bottom: 480px;
  display: flex;
  flex-wrap: wrap;
}

.el-card{
  height:100%
}
</style>


<script>
// 用于处理接口调用
import axios from "axios";

export default {
  data() {
    return {
      text: "",
      subText: null,
      imgList: ["1.jpg", "2.jpg", "3.jpg"],
      overallImgList: ["valeric_acid.png", "butyric_acid.png", "3.png"],
      pointCloudImg:["CHO1.png"],
      BRICSImgList:["valeric_acid.png", "butyric_acid1.png", "3.png"],
      oursImgList:["acid.png","3.png"],
      dataList: [],
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
    getPointCloudImgUrl(url){
      // const a =require("../assets/Atom_img/point_cloud/"+url);
      const a = new URL('../assets/Atom_img/point_cloud/'+url,import.meta.url)
      return a;
    },
    getBRICSImgUrl(url){
      // const a =require("../assets/Atom_img/BRICS/"+url);
      const a =new URL('../assets/Atom_img/BRICS/'+url,import.meta.url)
      return a;
    },
    getOursImgUrl(url){
      // const a =require("../assets/Atom_img/ours/"+url);
      const a =new URL('../assets/Atom_img/ours/'+url,import.meta.url)
      return a;
    },
    getOverallImgUrl(url, type) {
      // const a = require("../assets/Atom_img/overall/" + url);
      const a =new URL('../assets/Atom_img/overall/'+url,import.meta.url)
      return a;
      // if (type == "png") {
      //   const a = require("../assets/" + url + ".png");
      //   // console.log("a", a);
      //   return a;
      // } else if (type == "jpg") {
      //   const b = require("../assets/" + url);
      //   // console.log("b", b);
      //   return b;
      // }
    },
    pointCloudJump(){
      window.location.href = 'https://www.google.com';
    },
    BRICSJump(){
      window.location.href = 'https://www.google.com';
    },
    oursJump(){
      window.location.href = 'https://www.google.com';
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