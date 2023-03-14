<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="单词内容">
        <el-input v-model="form.wordText" />
      </el-form-item>
      <el-form-item label="单词释义">
        <el-input v-model="form.wordTranslation" />
      </el-form-item>
      <el-form-item label="单词音标">
        <el-input v-model="form.wordStandard" />
      </el-form-item>

      <!-- <form id="image"> -->
 <!--       <el-form-item label="封面">

          <input type="file" name="uploadFile" id="file" class='success' @change="changepic($event)" /><br>
          <img v-bind:src="form.image" alt="" id="show" height="500px">






        </el-form-item> -->

        <el-form-item label="单词例句">
          <el-input v-model="form.wordExample" :autosize="{ minRows: 10, maxRows: 10000000 }" type="textarea"
            placeholder="Please input" />
        </el-form-item>
        <el-form-item>
          <!-- <input hidden type="submit" value="保存" > -->
          <el-button type="primary" @click="onSubmit($event)">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
<!--      </form> -->
    </el-form>
  </div>
</template>




<script>
  import axios from 'axios'
  import {
    addWord,
    getWordById,
    updateWord
  } from '@/api/word'

  export default {
    data() {
      return {
        file: '',
        form: {
          wordId:'',
          wordText: '',
          wordTranslation: '',
          wordExample: '',
          wordStandard: '',

        }
      }
    },
    created() {
      // this.fetchData();
      // console.log(this.$route.query.id);
      // console.log(1)

      if (this.$route.query.id != undefined) {
        this.getWordById(this.$route.query.id);
      }
    },
    methods: {

      getWordById(wordId) {

        getWordById(wordId).then(response => {
          console.log(response.data)
            this.form.wordExample=response.data.wordExample
            this.form.wordStandard=response.data.wordStandard
            this.form.wordText=response.data.wordText
            this.form.wordTranslation=response.data.wordTranslation


        }).catch(err => {
          console.log(thit.list)
        })
      },



      onSubmit(event) {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {
          this.form.image="http://localhost:8090/image/"+this.form.title+".jpg"
          console.log(this.form.image)

          addWord(this.form).then(res=>{
            console.log(res)
          })

          this.$router.go(-1);
        }else{

          console.log(this.form)
          this.form.wordId=this.$route.query.id;
          updateWord(this.form).then(res=>{
            console.log(res)
          })

          this.$router.go(-1);
        }
      },

      onCancel() {

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
