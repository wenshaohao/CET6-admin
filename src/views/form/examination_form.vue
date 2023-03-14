<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="真题ID">
        <el-input disabled placeholder="" v-model="form.id" />
      </el-form-item>
      <el-form-item label="真题年份">

        <el-date-picker v-model="form.examinationYear" value-format="yyyy" type="year" placeholder="Pick a year" />年
        <el-select v-model="form.examinationYearPart" placeholder="please select">
          <el-option label="上半年" value="上半年" />
          <el-option label="下半年" value="下半年" />
        </el-select>

        卷<el-select v-model="form.examinationNo" placeholder="please select">
          <el-option label="卷一" value="卷一" />
          <el-option label="卷二" value="卷二" />
          <el-option label="卷三" value="卷三" />
        </el-select>
      </el-form-item>


      <form id="image">
        <el-form-item label="封面">

          <input type="file" name="uploadFile0" id="file0" class='success' @change="changepic($event,0)" /><br>
          <img v-bind:src="form.examinationCover" alt="" id="show" height="500px">
        </el-form-item>
        <el-form-item label="真题文件">
          <input type="file" name="uploadFile" id="file" class='success' @change="changepic($event,1)" /><br>
        </el-form-item>
        <el-form-item label="真题解析">
          <input type="file" name="uploadFile1" id="file1" class='success' @change="changepic($event,2)" /><br>
        </el-form-item>
        <el-form-item>
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
    getExaminationById,
    addExamination,
    updateExamination
  } from '@/api/examination'

  export default {
    data() {
      return {
        file0: '',
        file1: '',
        file2: '',
        form: {
          id: '',
          examinationYear: '',
          examinationYearPart: '',
          examinationNo: '',
          examinationText: '',
          examinationParse: '',
          examinationCover:'',


        }
      }
    },
    created() {
      // this.fetchData();
      // console.log(this.$route.query.id);
      // console.log(1)

      if (this.$route.query.id != undefined) {
        this.getExaminationById(this.$route.query.id);
      }
    },
    methods: {

      getExaminationById(examinationById) {

        getExaminationById(examinationById).then(response => {
          // console.log(response.data)
          this.form.examinationText = response.data.examinationText
          this.form.examinationParse = response.data.examinationParse
          this.form.examinationCover = response.data.examinationCover
          // console.log(this.form.examinationCover)
          this.form.examinationYear = response.data.examinationYear.split('-')[0]
          // console.log(this.form.examinationYear)
          this.form.examinationYearPart = response.data.examinationYear.split('-')[1]
          // console.log(this.form.examinationYearPart)
          this.form.examinationNo = response.data.examinationYear.split('-')[2]
          // console.log(this.form.examinationNo)

        }).catch(err => {
          console.log(this.list)
        })
      },

      changepic(event, num) {

        if (num == 1) {
          this.file1 = event.target.files[0];
          console.log(this.file1);
          console.log(this.form.examinationYear)
        } else if (num == 2) {
          this.file2 = event.target.files[0];
          console.log(this.file2);
        } else {
          var reads = new FileReader();
          var f = document.getElementById('file0').files[0];
          reads.readAsDataURL(f);
          reads.onload = function(e) {
            document.getElementById('show').src = this.result;
          };
          this.file0 = event.target.files[0];
          console.log(this.file0);
        }


      },


      onSubmit(event) {


        if (this.$route.query.id == undefined) {
          let name = this.form.examinationYear + "-" + this.form.examinationYearPart + "-" + this.form.examinationNo;
          this.form.examinationCover="http://localhost:8090/image/" + name + ".jpg"
          this.form.examinationText = "http://localhost:8090/pdf/" + name + ".pdf"
          this.form.examinationParse = "http://localhost:8090/pdf/" + name + "-parse.pdf"


          addExamination(this.form).then(res => {
            console.log(res)
          })
          let formData = new FormData();
          formData.append('file0', this.file0);
          formData.append('file', this.file1);
          formData.append('file2', this.file2);
          formData.append('name', name);
          console.log(formData)
          axios({
            method: "post",
            url: "http://localhost:8090/examination/upload",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
            data: formData
          }).then((res) => {

          });

    // let formData1 = new FormData();
    //         formData1.append('file0', this.file0);
    //         formData1.append('name1', name);
    //         axios({
    //           method: "post",
    //           url: "http://localhost:8090/examination/upload1",
    //           headers: {
    //             "Content-Type": "multipart/form-data"
    //           },
    //           withCredentials: true,
    //           data: formData1
    //         }).then((res) => {
    //           console.log("错误");
    //         });

          this.$router.go(-1);
        } else {
          let name = this.form.examinationYear + "-" + this.form.examinationYearPart + "-" + this.form.examinationNo;
          this.form.examinationCover="http://localhost:8090/image/" + name + ".jpg"
          this.form.examinationText = "http://localhost:8090/pdf/" + name + ".pdf"
          this.form.examinationParse = "http://localhost:8090/pdf/" + name + "-parse.pdf"
          this.form.id = this.$route.query.id;
          updateExamination(this.form).then(res => {
            console.log(res)
          }).catch(err=>{
            // console.log("错误")
          })
         let formData = new FormData();
         formData.append('file0', this.file0);
         formData.append('file', this.file1);
         formData.append('file2', this.file2);
         formData.append('name', name);
          console.log(formData)
          axios({
            method: "post",
            url: "http://localhost:8090/examination/upload",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
            data: formData
          }).then((res) => {
            console.log("错误1");
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
