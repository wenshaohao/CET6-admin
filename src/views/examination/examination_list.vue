<template>
  <div class="app-container">
    <el-button   type="success" style="width: 100px;" @click="add()">添加真题</el-button>
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
          {{ scope.row.examinationId }}
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.examinationYear }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button   type="red" @click="update(scope.row.examinationId)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="删除" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteExamination(scope.row.examinationId)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>
  </div>
</template>

<script>
import { getList,deleteexamination} from '@/api/examination'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
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
    add(){
      this.$router.push({path:'/examination/examination_form'})
    },
    update(examinationId){
    this.$router.push({path:'/examination/examination_form',query: {id:examinationId}})
    },
 deleteExamination(examinationId){
   deleteexamination(examinationId).then(res=>{
     console.log(res)
     var that=this;
     that.fetchData();
   })

 },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(err => {
          console.log(that.list)
        })
    }
  }
}
</script>
