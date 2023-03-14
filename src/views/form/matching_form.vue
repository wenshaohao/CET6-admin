<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="题目内容">

       <!--  <el-input
            v-model="form.matchingText"
            :rows="20"
            type="textarea"
            placeholder="Please input"
          /> -->
          <div>
            <el-card style="height: 610px;">
              <quill-editor v-model="form.matchingText" ref="myQuillEditor" style="height: 500px;" id="text">
              </quill-editor>
            </el-card>
          </div>
      </el-form-item>
      <el-form-item label="题目问题">
 <div>
            <el-card style="height: 610px;">
              <quill-editor v-model="form.matchingQuestion" ref="myQuillEditor" style="height: 500px;" id="text">
              </quill-editor>
            </el-card>
          </div>
   <!--     <el-input
           v-model="form.matchingQuestion"
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
                 <el-radio label="E" />
                 <el-radio label="F" />
                 <el-radio label="G" />
                 <el-radio label="H" />
                 <el-radio label="I" />
                 <el-radio label="J" />
                 <el-radio label="K" />
                 <el-radio label="L" />
                 <el-radio label="M" />
                 <el-radio label="N" />
         </el-radio-group>
        </el-form-item>




        <el-form-item label="题目解析">
 <!--         <el-input
             v-model="form.matchingParse"
             :rows="20"
             type="textarea"
             placeholder="Please input"
           /> -->
           <div>
             <el-card style="height: 610px;">
               <quill-editor v-model="form.matchingParse" ref="myQuillEditor" style="height: 500px;" id="text">
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
    addMatching,
    getMatchingById,
    updateMatching
  } from '@/api/matching.js'

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
          matchingText: '',
          matchingAnswer: '',
matchingQuestion:'',
          matchingParse: '',

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
        this.getMatchingById(this.$route.query.id);
      }
    },
    methods: {

      getMatchingById(matchingId) {

        getMatchingById(matchingId).then(response => {
          console.log(response)

          this.form.matchingText = response.data.matchingText
          // response.data.matchingAnswer.split("-").forEach(function(value,index){
          //   this.answer[index]=value
          // })
          // console.log(response.data.matchingAnswer.split("-"))
          // response.data.matchingAnswer.split("-").forEach(function(value,index){
          //   this.answer[index]=value
          // })
          for(let a=0;a<response.data.matchingAnswer.split("-").length;a++){
            this.answer[a]=response.data.matchingAnswer.split("-")[a]
          }
          this.form.matchingQuestion = response.data.matchingQuestion

          this.form.matchingParse = response.data.matchingParse
          this.form.matchingText=response.data.matchingText

        }).catch(err => {

          console.log(thit.list)
        })
      },


      onSubmit(event) {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {


          // this.form.matchingAnswer=this.answer[0]+"-"+this.answer[1]+"-"+this.answer[2]+"-"+this.answer[3]+"-"+this.answer[4]
          this.form.matchingAnswer=this.answer[0]
          for(let i=1;i<10;i++){
            this.form.matchingAnswer=this.form.matchingAnswer+"-"+this.answer[i]
          }
          console.log(this.form.matchingAnswer)
          addMatching(this.form).then(res=>{
            console.log(res)
          })
          this.$router.go(-1);
        }else{
          this.form.matchingAnswer='';
          this.form.matchingAnswer=this.answer[0]
          for(let i=1;i<10;i++){
            this.form.matchingAnswer=this.form.matchingAnswer+"-"+this.answer[i]
          }
          this.form.id=this.$route.query.id;
          updateMatching(this.form).then(res=>{
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
