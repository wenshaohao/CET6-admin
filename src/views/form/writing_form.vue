<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="题目标题">

        <el-input placeholder="" v-model="form.writingTitle" />
      </el-form-item>

<el-form-item label="题目问内容">
       <!--   <el-input
             v-model="form.writingText"
             :rows="20"
             type="textarea"
             placeholder="Please input"
           /> -->
           <div>
             <el-card style="height: 610px;">
               <quill-editor v-model="form.writingText" ref="myQuillEditor" style="height: 500px;" id="text">
               </quill-editor>
             </el-card>
           </div>
        </el-form-item>


        <el-form-item label="题目范文">
    <!--      <el-input
             v-model="form.writingAnswer"
             :rows="20"
             type="textarea"
             placeholder="Please input"
           /> -->
           <div>
             <el-card style="height: 610px;">
               <quill-editor v-model="form.writingAnswer" ref="myQuillEditor" style="height: 500px;" id="text">
               </quill-editor>
             </el-card>
           </div>
        </el-form-item>
        <el-form-item>
          <!-- <input hidden type="submit" value="保存" > -->
          <el-button type="primary" @click="onSubmit($event)">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>

    </el-form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const textarea = ref('')
</script>

<script>
  import axios from 'axios'
  import {
    addWriting,
    getWritingById,
    updateWriting
  } from '@/api/writing.js'

  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
// import { forEach } from 'core-js/core/dict';

  export default {
    data() {
      return {
        file: '',

        form: {
          id:'',
          type:5,
          writingText: '',
          writingAnswer: '',
          writingTitle: '',


        }
      }
    },
    components: {
      quillEditor
    },
    created() {


      if (this.$route.query.id != undefined) {
        this.getWritingById(this.$route.query.id);
      }
    },
    methods: {

      getWritingById(writingId) {

        getWritingById(writingId).then(response => {
          console.log(response.data)
          this.form.writingText = response.data.writingText
          this.form.writingAnswer = response.data.writingAnswer
          this.form.writingTitle=response.data.writingTitle
        }).catch(err => {

          console.log(thit.list)
        })
      },


      onSubmit(event) {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {




          addWriting(this.form).then(res=>{
            console.log(res)
          })
          this.$router.go(-1);
        }else{

          this.form.id=this.$route.query.id;
          updateWriting(this.form).then(res=>{
            console.log(res)
          })
          this.$router.go(-1);
        }
      },

      onCancel() {
        // this.$message({
        //   message: 'cancel!',
        //   type: 'warning'
        // })
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .inputfile {
    opacity: 0;
  }
</style>
