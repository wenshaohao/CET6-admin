<template>
  <form action="http://localhost:8090/essay/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="uploadFile" value="请选择上传文件">
      <input type="submit" value="保存">
  </form>
</template>

<script>

  export default{
    data(){
      return {
      pdfUrl:''
      }
    },
    created() {
      // this.fetchData();
      // console.log(this.$route.query.id);
      // console.log(1)

    },
    methods: {

  },
  }
</script>

<style>
</style>
