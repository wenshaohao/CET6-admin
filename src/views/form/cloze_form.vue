<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="题目内容">
  <div>
            <el-card style="height: 610px;">
              <quill-editor v-model="form.clozeText" ref="myQuillEditor" style="height: 500px;" id="text">
              </quill-editor>
            </el-card>
          </div>
        <!-- <el-input
            v-model="form.clozeText"
            :rows="20"
            type="textarea"
            placeholder="Please input"
          /> -->
      </el-form-item>
      <el-form-item label="题目问题">
  <div>
            <el-card style="height: 610px;">
              <quill-editor v-model="form.clozeQuestion" ref="myQuillEditor" style="height: 500px;" id="text">
              </quill-editor>
            </el-card>
          </div>
        <!-- <el-input
           v-model="form.clozeQuestion"
           :rows="20"
           type="textarea"
           placeholder="Please input"
         /> -->
      </el-form-item>



<el-form-item label="答案" v-for="(value,index) in answer">
         <el-radio-group v-model="answer[index]">
                 <el-radio label="A" />
                 <el-radio label="B" />
                 <el-radio label="C" />
                 <el-radio label="D" />
         </el-radio-group>
        </el-form-item>

        <el-form-item label="题目解析">
          <div>
            <el-card style="height: 610px;">
              <quill-editor v-model="form.clozeParse" ref="myQuillEditor" style="height: 500px;" id="text">
              </quill-editor>
            </el-card>
          </div>
        <!--  <el-input
             v-model="form.clozeParse"
             :rows="20"
             type="textarea"
             placeholder="Please input"
           /> -->
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
    addCloze,
    getClozeById,
    updateCloze
  } from '@/api/cloze.js'

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
        answer:['','','','','','','','','',''],
        form: {
          id:'',
          type:1,
          clozeText: '',
          clozeAnswer: '',
          clozeQuestion: '',
          clozeParse: '',

        }
      }
    },
    components: {
      quillEditor
    },
    created() {
      // this.fetchData();
      // console.log(this.$route.query.id);
      // console.log(1)

      if (this.$route.query.id != undefined) {
        this.getClozeById(this.$route.query.id);
      }
    },
    methods: {

      getClozeById(clozeId) {

        getClozeById(clozeId).then(response => {
          console.log(response.data)

          this.form.clozeText = response.data.clozeText
          // response.data.clozeAnswer.split("-").forEach(function(value,index){
          //   this.answer[index]=value
          // })
          console.log(response.data.clozeAnswer.split("-"))
          // response.data.clozeAnswer.split("-").forEach(function(value,index){
          //   this.answer[index]=value
          // })
          for(let a=0;a<response.data.clozeAnswer.split("-").length;a++){
            this.answer[a]=response.data.clozeAnswer.split("-")[a]
          }
          this.form.clozeQuestion = response.data.clozeQuestion

          this.form.clozeParse = response.data.clozeParse

        }).catch(err => {

          console.log(thit.list)
        })
      },


      onSubmit(event) {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {


          // this.form.clozeAnswer=this.answer[0]+"-"+this.answer[1]+"-"+this.answer[2]+"-"+this.answer[3]+"-"+this.answer[4]
          this.form.clozeAnswer=this.answer[0]
          for(let i=1;i<10;i++){
            this.form.clozeAnswer=this.form.clozeAnswer+"-"+this.answer[i]
          }
          console.log(this.form.clozeAnswer)
          addCloze(this.form).then(res=>{
            console.log(res)
          })
          this.$router.go(-1);
        }else{
  this.form.clozeAnswer=this.answer[0]
          for(let i=1;i<10;i++){
            this.form.clozeAnswer=this.form.clozeAnswer+"-"+this.answer[i]
          }
          this.form.id=this.$route.query.id;
          updateCloze(this.form).then(res=>{
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
