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

        <!-- control tab height -->
        
          <el-tabs v-model="activeTab" :tab-position="tabPosition">
            <el-tab-pane label="EDM Base" name="tab1">
              
                <el-form ref="form1"  label-width="200px" style="height:400 px">
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="Condition for Generation:">
                        <!-- <span>Condition for Generation:</span> -->
                        <el-select v-model="form1.genCon" placeholder="Please select">
                          <el-option label="General" value="General"></el-option>
                          <!-- <el-option label="&alpha;" value="alpha"></el-option> -->
                          <el-option value="alpha">&alpha;</el-option>
                          <el-option value="delta">&Delta;<sub>&epsilon;</sub></el-option>
                          <el-option value="HOMO">&epsilon;<sub>HOMO</sub></el-option>
                          <el-option value="LUMO">&epsilon;<sub>LUMO</sub></el-option>
                          <el-option value="mu">&mu;</el-option>
                          <el-option value="cv">C<sub>v</sub></el-option>
                          <el-option value="QED">QED</el-option>
                          <el-option value="LogP">Log P</el-option>
                          <!-- 其他选项... -->
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-switch v-model="form1.saveModel" active-text="Save model" inactive-text="Not save">
                      </el-switch>
                    </el-col>

                  </el-row>


                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="File name for main function:">
                        <!-- <span>File name for main function:</span> -->
                        <el-input v-model="form1.fnameInput" placeholder="Please input">

                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                      <el-form-item label="Model name:">
                        <!-- <span>File name for main function:</span> -->
                        <el-input v-model="form1.mnameInput" placeholder="Please input">

                        </el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="Learning rate:">
                        <el-input-number v-model="form1.learningRate" placeholder="Please input" :step="1e-4">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Number of Feature:">
                        <el-input-number v-model="form1.numberofFeature" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Number of layers:">
                        <el-input-number v-model="form1.n_layers" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Diffusion steps:">
                        <el-input-number v-model="form1.diffusionSteps" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="Number of epochs:">
                        <el-input-number v-model="form1.n_epochs" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Number of stability samples:">
                        <el-input-number v-model="form1.n_stability_samples" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="4" >
                    <el-form-item label="Batch size:">
                      <el-input-number v-model="form1.n_stability_samples" placeholder="Please input" step="1">
                      </el-input-number>
                    </el-form-item>
                  </el-col> -->
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="Batch size:">
                        <el-input-number v-model="form1.batch_size" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Diffusion noise precision:">
                        <el-input-number v-model="form1.diffusion_noise_precision" placeholder="Please input" :step="1e-5">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-form>
              



            </el-tab-pane>

            <el-tab-pane label="PS-VAE Base" name="tab2">

              
                <el-form ref="form2" label-width="200px">



                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="File name for main function:">
                        <!-- <span>File name for main function:</span> -->
                        <el-input v-model="form2.fnameInput" placeholder="Please input">

                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                      <el-form-item label="Condition for Generation:">
                        <!-- <span>Condition for Generation:</span> -->
                        <el-select v-model="form2.genCon" placeholder="Please select">
                     
                          <el-option value="alpha">&alpha;</el-option>
                          <el-option value="delta">&Delta;<sub>&epsilon;</sub></el-option>
                          <el-option value="HOMO">&epsilon;<sub>HOMO</sub></el-option>
                          <el-option value="LUMO">&epsilon;<sub>LUMO</sub></el-option>
                          <el-option value="mu">&mu;</el-option>
                          <el-option value="cv">C<sub>v</sub></el-option>
                          <el-option value="QED">QED</el-option>
                          <el-option value="LogP">Log P</el-option>
                          <!-- 其他选项... -->
                        </el-select>

                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="3" >
                    <el-form-item label="shuffle">
                      <el-switch v-model="form2.shuffle"></el-switch>

                    </el-form-item>
                    </el-col> -->
                  </el-row>

                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="Batch size:">
                        <el-input-number v-model="form2.batch_size" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Alpha value:">
                        <el-input-number v-model="form2.alpha" placeholder="Please input" :step="0.01">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Beta value:">
                        <el-input-number v-model="form2.beta" placeholder="Please input" :step="0.001">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Max beta value:">
                        <el-input-number v-model="form2.maxbeta" placeholder="Please input" :step="0.001">
                        </el-input-number>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Beta step value:">
                        <el-input-number v-model="form2.stepBeta" placeholder="Please input" :step="0.0001">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Latent dimension:">
                        <el-input-number v-model="form2.latentDimension" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="Learning rate:">
                        <el-input-number v-model="form2.learningRate" placeholder="Please input" :step="0.0001">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Number of epochs:">
                        <el-input-number v-model="form2.n_epochs" placeholder="Please input" :step="1">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="Grad clip:">
                        <el-input-number v-model="form2.gradClip" placeholder="Please input" :step="0.1">
                        </el-input-number>

                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <!-- <el-form-item lable="Shuffle"> -->
                      <el-switch v-model="form2.shuffle" inactive-text="Shuffle close" active-text="Shuffle"></el-switch>
                      <!-- </el-form-item> -->


                    </el-col>

                  </el-row>






                </el-form>
              




            </el-tab-pane>

          </el-tabs>
        

        
        
          <el-row>
            <el-col :span="20">
              <el-input :value="result" readonly type="textarea" :rows="4"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button @click="copyToClipboard" icon="el-icon-document-copy">Copy</el-button>
            </el-col>

          </el-row>
        


        <!-- <div>
          <div>
            <el-input :value="result" readonly type="textarea" :rows="2"></el-input>
          </div>

          <br>
          <div>
            <el-button @click="copyToClipboard" icon="el-icon-document-copy">Copy</el-button>
          </div>

        </div> -->

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

/* .el-row{
  margin-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
} */

.el-menu {
  text-align: left;
  /* 将内容向左对齐 */
}

/* img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

sub {
  vertical-align: sub;
  font-size: smaller;
}
</style>


<script>
// 用于处理接口调用
import axios from "axios";

export default {
  data() {
    return {
      tabPosition: 'left',
      activeTab: 'tab1',
      
      text: "",
      subText: null,
      result: "",
      form2: {
        fnameInput: "train.py",
        genCon: "",
        shuffle: true,
        batch_size: 32,
        alpha: 0.1,
        beta: 0,
        maxbeta: 0.01,
        stepBeta: 0.002,
        latentDimension: 56,
        learningRate: 1e-3,
        n_epochs: 6,
        gradClip: 10,
      },

      form1: {
        genCon: "",
        fnameInput: "main_qm9.py",
        mnameInput: "egnn_dynamics",
        learningRate: 1e-4,
        numberofFeature: 192,
        n_layers: 9,
        diffusionSteps: 1000,
        saveModel: true,
        n_epochs: 3000,
        n_stability_samples: 1000,
        batch_size: 64,
        diffusion_noise_precision: 1e-5,
      }
    };
  },
  // mounted() {
  //   // 在组件挂载后刷新页面
  //   window.location.reload();
  // },
  watch: {
    activeTab() {
      this.updateResult();
    },
    'form2.fnameInput'() {
      this.updateResult();
    },
    'form2.genCon'() {
      this.updateResult();
    },
    'form2.shuffle'() {
      this.updateResult();
    },
    'form2.batch_size'() {
      this.updateResult();
    },
    'form2.alpha'() {
      this.updateResult();
    },
    'form2.beta'() {
      this.updateResult();
    },
    'form2.maxbeta'() {
      this.updateResult();
    },
    'form2.stepBeta'() {
      this.updateResult();
    },
    'form2.latentDimension'() {
      this.updateResult();
    },
    'form2.learningRate'() {
      this.updateResult();
    },
    'form2.n_epochs'() {
      this.updateResult();
    },
    'form2.gradClip'() {
      this.updateResult();
    },
    'form1.batch_size'() {
      this.updateResult();
    },
    'form1.diffusion_noise_precision'() {
      this.updateResult();
    },
    'form1.n_epochs'() {
      this.updateResult();
    },
    'form1.n_stability_samples'() {
      this.updateResult();
    },
    'form1.genCon'() {
      this.updateResult();
    },
    'form1.fnameInput'() {
      this.updateResult();
    },
    'form1.mnameInput'() {
      this.updateResult();
    },
    'form1.learningRate'() {
      this.updateResult();
    },
    'form1.numberofFeature'() {
      this.updateResult();
    },
    'form1.n_layers'() {
      this.updateResult();
    },
    'form1.diffusionSteps'() {
      this.updateResult();
    },
    'form1.saveModel'() {
      this.updateResult();
    },
    // form1(){
    //   deep:true,
    //   // this.result=this.updateResult();
    //   handler(val) {
    //     this.updateResult();
    //   }
    // },

    // form1.genCon(){
    //   this.updateResult();
    // },
  },

  computed: {
    // generate input box for copy
    // updateResult(){
    //   if(this.activeTab === 'tab1'){
    //     if(this.form1.genCon === ""){
    //       this.result=""+"python "+form1.fnameInput+" --exp_name edm_qm9";
    //       // return this.result
    //     }
    //     else{
    //       this.result=""+"python "+form1.fnameInput+" --exp_name exp_cond_"+form1.genCon;
    //       // return this.result
    //     }
    //   }
    // },
  },
  methods: {
    copyToClipboard() {
      // 创建一个临时的 textarea 元素
      const textarea = document.createElement('textarea');
      textarea.value = this.result;

      // 将 textarea 插入到 DOM 中
      document.body.appendChild(textarea);

      // 选中 textarea 内容并执行复制操作
      textarea.select();
      document.execCommand('copy');

      // 清理临时元素
      document.body.removeChild(textarea);

      // 可以在控制台输出一些信息，或者使用 Element UI 的 Message 提示用户
      console.log('已复制到剪贴板');
    },

    updateResult() {
      if (this.activeTab === 'tab1') {
        this.result = "";
        if (this.form1.genCon === "General") {
          this.result = "python " + this.form1.fnameInput + " --exp_name edm_qm9 " + "--model " + this.form1.mnameInput + " --lr " + this.form1.learningRate + " --nf " + this.form1.numberofFeature + " --n_layers " + this.form1.n_layers + " --diffusion_steps " + this.form1.diffusionSteps + " --save_model " + this.form1.saveModel + " --batch_size " + this.form1.batch_size + " --diffusion_noise_precision " + this.form1.diffusion_noise_precision + " --diffusion_noise_schedule polynomial_2 --diffusion_loss_type l2 --normalize_factors [1,4,10] --test_epochs 20 --ema_decay 0.9999";
          // return this.result
        }
        else if (this.form1.genCon !== "") {
          this.result = "python " + this.form1.fnameInput + " --exp_name exp_cond_" + this.form1.genCon + " --model " + this.form1.mnameInput + " --lr " + this.form1.learningRate + " --nf " + this.form1.numberofFeature + " --n_layers " + this.form1.n_layers + " --diffusion_steps " + this.form1.diffusionSteps + " --save_model " + this.form1.saveModel + " --batch_size " + this.form1.batch_size + " --diffusion_noise_precision " + this.form1.diffusion_noise_precision + " --conditioning " + this.form1.genCon + " --sin_embedding False --diffusion_noise_schedule polynomial_2 --dequantization deterministic --include_charges False --diffusion_loss_type l2 --normalize_factors [1,8,1] --dataset qm9_second_half";
          // return this.result
        }
      }
      else if (this.activeTab === 'tab2') {
        this.result = "";
        if (this.form2.genCon !== "") {
          this.result = "";
          this.result = "python " + this.form2.fnameInput + " --train_set ../data/qm9/train.txt --valid_set ../data/qm9/valid.txt";
          this.result = this.result + " --test_set ../data/qm9/test.txt --vocab ../ckpts/qm9/prop_opt/qm9_bpe_300.txt";
          this.result = this.result + " --batch_size " + this.form2.batch_size;
          if (this.form2.shuffle === true) {
            this.result = this.result + " --shuffle";
          }
          this.result = this.result + " --alpha " + this.form2.alpha + " --beta" + this.form2.beta;
          this.result = this.result + " --max_beta" + this.form2.maxbeta + " --step_beta " + this.form2.stepBeta;
          this.result = this.result + " --kl_anneal_iter 1000 --kl_warmup 0 --lr " + this.form2.learningRate;
          this.result = this.result + " --save_dir qm9_exps/ckpt/myQM9 --grad_clip " + this.form2.gradClip;
          this.result = this.result + " --epochs " + this.form2.n_epochs + " --gpus 0 --props " + this.form2.genCon;
          this.result = this.result + " --latent_dim " + this.form2.latentDimension + " --node_hidden_dim 300";
          this.result = this.result + " --graph_embedding_dim 400 --patience 3";
        }

      }
      else {
        this.result = "Not available";
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