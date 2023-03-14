<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="单词内容">
        <el-input v-model="form.announcementTitle" />
      </el-form-item>
      <el-form-item label="题目问题">
        <div>
          <el-card style="height: 610px;">
            <quill-editor v-model="form.announcementText" ref="myQuillEditor" style="height: 500px;" id="text">
            </quill-editor>
          </el-card>
        </div>
        <!--       <el-input
           v-model="form.announcementQuestion"
           :rows="20"
           type="textarea"
           placeholder="Please input"
         /> -->
      </el-form-item>



      <el-form-item>
        <!-- <input hidden type="submit" value="保存" > -->
        <el-button type="primary" @click="onSubmit()">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script setup>
  import {
    ref
  } from 'vue'
  const textarea = ref('')
</script>

<script>
  import axios from 'axios'
  import {
    addAnnouncement,
    getAnnouncementById,
    updateAnnouncement
  } from '@/api/announcement.js'
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    data() {
      return {
        file: '',
        answer: ['', '', '', '', ''],
        form: {
          id: '',
          type: 1,
          announcementText: '',
          announcementTitle: '',


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
        this.getannouncementById(this.$route.query.id);
      }
    },
    methods: {

      getannouncementById(announcementId) {

        getAnnouncementById(announcementId).then(response => {
          console.log(response.data)

          this.form.announcementText = response.data.announcementText

          this.form.announcementTitle = response.data.announcementTitle



        }).catch(err => {

          console.log(thit.list)
        })
      },


      onSubmit() {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {



          addAnnouncement(this.form).then(res => {
            console.log(res)
          })
          this.$router.go(-1);
        } else {

          this.form.id = this.$route.query.id;
          updateAnnouncement(this.form).then(res => {
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
