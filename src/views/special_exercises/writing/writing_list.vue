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
          {{ scope.row.writingId }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.writingTitle }}
        </template>
      </el-table-column>

   <el-table-column label="Pageviews" width="110" align="center">
     <template slot-scope="scope">
       <el-button type="red" @click="update(scope.row.writingId)">修改</el-button>
     </template>
   </el-table-column>

   <el-table-column align="center" prop="created_at" label="Display_time" width="200">
     <template slot-scope="scope">

       <el-button type="primary" @click="deleteWriting(scope.row.writingId)">删除</el-button>
     </template>
   </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWritingList,deleteWriting } from '@/api/writing.js'

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
    deleteWriting(writingId){
      deleteWriting(writingId).then(res=>{
        this.fetchData()
      })
    },
    add(){
      this.$router.push({path:'/special_exercises/writing_form'})
    },
    update(writingId){
    this.$router.push({path:'/special_exercises/writing_form',query: {id:writingId}})
    },
    fetchData() {
      this.listLoading = true
      getWritingList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
