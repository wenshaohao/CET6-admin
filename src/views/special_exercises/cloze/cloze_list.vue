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
          {{ scope.row.clozeId }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="red" @click="update(scope.row.clozeId)">修改</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">

          <el-button type="primary" @click="deleteCloze(scope.row.clozeId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getReadList,deleteCloze } from '@/api/cloze.js'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    // this.fetchData()
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    deleteCloze(clozeId){
      deleteCloze(clozeId).then(res=>{
        this.fetchData()
      })
    },
    add(){
      this.$router.push({path:'/special_exercises/cloze_form'})
    },
    update(clozeId){
    this.$router.push({path:'/special_exercises/cloze_form',query: {id:clozeId}})
    },
    fetchData() {
      this.listLoading = true
      getReadList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
