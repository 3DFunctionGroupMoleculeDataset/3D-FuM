<template>
  <div>
    <el-tabs v-model="activeTab">
      <!-- Tab 1 -->
      <el-tab-pane label="Tab 1" name="tab1">
        <!-- <div>
          <el-form ref="form" :model="form" label-width="80px">
          
          </el-form>
        </div> -->

        <el-alert title="希腊字母 alpha:" type="info" description="这是希腊字母 alpha: &alpha;" show-icon />
        <el-input-number v-model="c1" :controls="false" placeholder="输入c1"></el-input-number>
        <el-input-number v-model="c2" :controls="false" placeholder="输入c2"></el-input-number>
      </el-tab-pane>

      <!-- Tab 2 -->
      <el-tab-pane label="Tab 2" name="tab2">
        <el-input-number v-model="c3" :controls="false" placeholder="输入c3"></el-input-number>
      </el-tab-pane>
    </el-tabs>
    <div>
    <!-- 选择器 -->
    <el-select v-model="selectedValue" placeholder="请选择">
      <el-option label="选项1" value="option1"></el-option>
      <el-option label="选项2" value="option2"></el-option>
      <!-- 其他选项... -->
    </el-select>

    <!-- 文本框 -->
    <el-input  v-model="selectedValue"
      :value="selectedValue"
      readonly
      type="textarea"
      :rows="4" ></el-input>

    <!-- 复制按钮 -->
    <el-button @click="copyToClipboard">复制</el-button>
  </div>
    <!-- 文本框 -->
    <el-input :value="result" placeholder="展示结果" disabled></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: '',
      activeTab: 'tab1',
      c1: 0,
      c2: 0,
      c3: 0,
      result: 0
    };
  },
  watch: {
    activeTab() {
      this.updateResult();
    },
    c1() {
      this.updateResult();
    },
    c2() {
      this.updateResult();
    },
    c3() {
      this.updateResult();
    }
  },
  methods: {
    copyToClipboard() {
      // 创建一个临时的 textarea 元素
      const textarea = document.createElement('textarea');
      textarea.value = this.selectedValue;

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
        this.result = this.c1 + this.c2;
      } else if (this.activeTab === 'tab2') {
        this.result = this.c3;
      }
    }
  }
};
</script>
