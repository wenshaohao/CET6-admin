<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户ID">
        <el-input  disabled placeholder="Please input" v-model="form.id"/>
      </el-form-item>
      <el-form-item label="用户账户">
        <el-input v-model="form.userNumber" />
      </el-form-item>
<el-form-item label="用户名称">
        <el-input v-model="form.userName" />
      </el-form-item>


      <form id="image">
        <el-form-item label="头像">
          <input type="file" name="uploadFile" id="file" class='success' @change="changepic($event)" /><br>
          <!-- <el-button for="file" class='success' style="background-color: #00ff00;">Choose a file</el-button> -->
          <img v-bind:src="form.userImage" alt="" id="show" height="100px">
          <!-- <input type="file" name="uploadFile" value="请选择上传文件"> -->
        </el-form-item>

        <el-form-item label="用户电话">
                <el-input
                    v-model="form.userPhone"
                    minlength="11"
                    maxlength="11"
                    placeholder="Please input"
                    show-word-limit
                    type="number"
                  />
              </el-form-item>
          <el-form-item label="用户邮箱">
                <el-input
                    v-model="form.userEmail"

                    placeholder="Please input"
                    show-word-limit
                    type="text"
                  />
              </el-form-item>

   <el-form-item label="用户密码">
         <el-input
            v-model="form.userPassword"
            type="password"
            placeholder="Please input password"
            show-password
          />
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
  import {getUserById, updateUser ,addUser} from '@/api/user'


  export default {
    data() {
      return {
        file: '',
        form: {
          userId:'',
          userName:'',
          userNumber: '',
          userPassword: '',
          userPhone: '',
          userEmail: '',
          userImage:','

        }
      }
    },
    created() {
      // this.fetchData();
      // console.log(this.$route.query.id);
      // console.log(1)

      if (this.$route.query.id != undefined) {
        this.getUserById(this.$route.query.id);
      }
    },
    methods: {
      getUserById(userId){
        getUserById(userId).then(res=>{
          this.form.userId=res.data.userId
          this.form.userName=res.data.userName
          this.form.userNumber=res.data.userNumber
          this.form.userPassword=res.data.userPassword
          this.form.userPhone=res.data.userPhone
          this.form.userEmail=res.data.userEmail
          this.form.userImage=res.data.userImage
          console.log(res)
        })
      },

      changepic(event) {
        var reads = new FileReader();
        var f = document.getElementById('file').files[0];
        console.log(this.form.image)
        console.log(1)
        reads.readAsDataURL(f);
        reads.onload = function(e) {
          document.getElementById('show').src = this.result;
          console.log(document.getElementById('show').src)
        };
        this.file = event.target.files[0];
        console.log(this.file);
      },

      onSubmit(event) {
        // this.$message('submit!');

        if (this.$route.query.id == undefined) {
          this.form.userImage="http://localhost:8090/image/"+this.form.userNumber+".jpg"
          console.log(this.form.userImage)

          addUser(this.form).then(res=>{
            console.log(res)
          })
          let formData = new FormData();
          formData.append('file', this.file);
          formData.append('number',this.form.userNumber);
          console.log(formData)
          axios({
            method: "post",
            url: "http://localhost:8090/user/upload",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
            data: formData
          }).then((res) => {
            console.log(res);
          });
          this.$router.go(-1);
        }else{
          this.form.userImage="http://localhost:8090/image/"+this.form.userNumber+".jpg"
          console.log(this.form.userImage)
          this.form.userId=this.$route.query.id;
          updateUser(this.form).then(res=>{
            console.log(res)
          })
          let formData = new FormData();
          formData.append('file', this.file);
          formData.append('number',this.form.userNumber);
          console.log(formData)
          axios({
            method: "post",
            url: "http://localhost:8090/user/upload",
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }

</style>
