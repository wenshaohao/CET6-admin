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
          {{ scope.row.matchingId }}
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
          <el-button type="red" @click="update(scope.row.matchingId)">修改</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">

          <el-button type="primary" @click="deleteMatching(scope.row.matchingId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMatchingList,deleteMatching } from '@/api/matching.js'

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
    deleteMatching(matchingId){
      deleteMatching(matchingId).then(res=>{
        this.fetchData()
      })
    },
    add(){
      this.$router.push({path:'/special_exercises/matching_form'})
    },
    update(matchingId){
    this.$router.push({path:'/special_exercises/matching_form',query: {id:matchingId}})
    },
    fetchData() {
      this.listLoading = true
      getMatchingList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
