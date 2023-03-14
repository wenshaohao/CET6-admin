<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="读本标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="读本作者">

        <el-input v-model="form.author" />
      </el-form-item>
      </el-form-item>

      <form id="image">
        <el-form-item label="封面">
          <input type="file" name="uploadFile" id="file" class='success' @change="changepic($event)" /><br>
          <img v-bind:src="form.image" alt="" id="show" height="500px">
        </el-form-item>

        <el-form-item label="Activity form">
   <!--       <el-input v-model="form.textarea" :autosize="{ minRows: 10, maxRows: 10000000 }" type="textarea"
            placeholder="Please input" /> -->
          <div>
            <el-card style="height: 610px;">
              <quill-editor v-model="form.textarea" ref="myQuillEditor" style="height: 500px;" id="text">
              </quill-editor>
            </el-card>
          </div>
        </el-form-item>
        <el-form-item>
          <!-- <input hidden type="submit" value="保存" > -->
          <el-button type="primary" @click="onSubmit($event)">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
      </form>
    </el-form>
  </div>
</template>




<script>
  import axios from 'axios'
  import {
    addEssay,
    getEssayById,
    updateEssay
  } from '@/api/essay'

  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'


  export default {
    data() {
      return {
        // content: null,
        // editorOption: {},
        file: '',
        form: {
          id: '',
          textarea: '',
          title: '',
          author: '',
          image: '',

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
        this.getEssayById(this.$route.query.id);
      }
    },
    methods: {

      getEssayById(essayId) {

        getEssayById(essayId).then(response => {
          console.log(response.data)

          this.form.title = response.data.essayTitle
          this.form.author = response.data.essayAuthor
          this.form.image = response.data.essayImage
          this.form.textarea = response.data.essayText
          // document.getElementById("text").innerHTML(this.form.textarea)

        }).catch(err => {
          console.log(thit.list)
        })
      },

      changepic(event) {
        var reads = new FileReader();
        var f = document.getElementById('file').files[0];
        // console.log(this.form.image)
        // console.log(1)
        reads.readAsDataURL(f);
        reads.onload = function(e) {
          document.getElementById('show').src = this.result;
        };
        this.file = event.target.files[0];
        console.log(this.file);
      },

      onSubmit(event) {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {
          this.form.image = "http://localhost:8090/image/" + this.form.title + ".jpg"
          console.log(this.form.image)

          addEssay(this.form).then(res => {
            console.log(res)
          })
          let formData = new FormData();
          formData.append('file', this.file);
          formData.append('name', this.form.title);
          console.log(formData)
          axios({
            method: "post",
            url: "http://localhost:8090/essay/upload",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
            data: formData
          }).then((res) => {
            console.log(res);
          });
          this.$router.go(-1);
        } else {
          this.form.image = "http://localhost:8090/image/" + this.form.title + ".jpg"
          console.log(this.form.image)
          this.form.id = this.$route.query.id;
          updateEssay(this.form).then(res => {
            console.log(res)
          })
          let formData = new FormData();
          formData.append('file', this.file);
          formData.append('name', this.form.title);
          console.log(formData)
          axios({
            method: "post",
            url: "http://localhost:8090/essay/upload",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
            data: formData
          }).then((res) => {
            console.log(res);
          });
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
