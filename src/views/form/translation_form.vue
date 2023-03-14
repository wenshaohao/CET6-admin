<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="题目标题">

        <el-input placeholder="" v-model="form.translationTitle" />
      </el-form-item>

<el-form-item label="题目问内容">
       <!--   <el-input
             v-model="form.translationText"
             :rows="20"
             type="textarea"
             placeholder="Please input"
           /> -->
           <div>
             <el-card style="height: 610px;">
               <quill-editor v-model="form.translationText" ref="myQuillEditor" style="height: 500px;" id="text">
               </quill-editor>
             </el-card>
           </div>
        </el-form-item>


        <el-form-item label="题目范文">
     <!--     <el-input
             v-model="form.translationAnswer"
             :rows="20"
             type="textarea"
             placeholder="Please input"
           /> -->
           <div>
             <el-card style="height: 610px;">
               <quill-editor v-model="form.translationAnswer" ref="myQuillEditor" style="height: 500px;" id="text">
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
    addTranslation,
    getTranslationById,
    updateTranslation
  } from '@/api/translation.js'

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
          translationText: '',
          translationAnswer: '',
          translationTitle: '',


        }
      }
    },
    components: {
      quillEditor
    },
    created() {


      if (this.$route.query.id != undefined) {
        this.getTranslationById(this.$route.query.id);
      }
    },
    methods: {

      getTranslationById(translationId) {

        getTranslationById(translationId).then(response => {
          console.log(response.data)
          this.form.translationText = response.data.translationText
          this.form.translationAnswer = response.data.translationAnswer
          this.form.translationTitle=response.data.translationTitle
        }).catch(err => {

          console.log(thit.list)
        })
      },


      onSubmit(event) {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {




          addTranslation(this.form).then(res=>{
            console.log(res)
          })
          this.$router.go(-1);
        }else{

          this.form.id=this.$route.query.id;
          updateTranslation(this.form).then(res=>{
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
