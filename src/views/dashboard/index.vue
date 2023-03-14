<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    
    <div>
        <el-card style="height: 610px;">
          <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
          </quill-editor>
        </el-card>
      </div>
    
  </div>



</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';

import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

// var myChart = echarts.init(document.getElementById('main'));
export default {
  name: 'Dashboard',
   data() {
        return {
          content: null,
          editorOption: {}
        }
      },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
    components: {
        quillEditor
      },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
