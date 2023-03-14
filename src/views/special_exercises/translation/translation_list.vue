<template>
  <div class="app-container">
    <el-button   type="success" style="width: 100px;" @click="add()">添加题目</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.translationId }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.translationTitle }}
        </template>
      </el-table-column>

   <el-table-column label="Pageviews" width="110" align="center">
     <template slot-scope="scope">
       <el-button type="red" @click="update(scope.row.translationId)">修改</el-button>
     </template>
   </el-table-column>

   <el-table-column align="center" prop="created_at" label="Display_time" width="200">
     <template slot-scope="scope">

       <el-button type="primary" @click="deleteTranslation(scope.row.translationId)">删除</el-button>
     </template>
   </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTranslationList,deleteTranslation } from '@/api/translation.js'

export default {

  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    deleteTranslation(translationId){
      deleteTranslation(translationId).then(res=>{
        this.fetchData()
      })
    },
    add(){
      this.$router.push({path:'/special_exercises/translation_form'})
    },
    update(translationId){
    this.$router.push({path:'/special_exercises/translation_form',query: {id:translationId}})
    },
    fetchData() {
      this.listLoading = true
      getTranslationList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
