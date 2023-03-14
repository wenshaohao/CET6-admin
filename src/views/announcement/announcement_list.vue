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
          {{ scope.row.announcementId }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.announcementTitle }}
        </template>
      </el-table-column>

      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="red" @click="update(scope.row.announcementId)">修改</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">

          <el-button type="primary" @click="deleteannouncement(scope.row.announcementId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAllAnnouncement,deleteAnnouncement } from '@/api/announcement.js'

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
  methods: {
    deleteannouncement(announcementId){
      deleteAnnouncement(announcementId).then(res=>{
        this.fetchData()
      })
    },
    add(){
      this.$router.push({path:'/announcement/announcement_form'})
    },
    update(announcementId){
    this.$router.push({path:'/announcement/announcement_form',query: {id:announcementId}})
    },
    fetchData() {
      this.listLoading = true
      getAllAnnouncement().then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    }
  },
  created() {
    this.fetchData()
  },

  mounted() {
    this.fetchData()
  },

}
</script>
