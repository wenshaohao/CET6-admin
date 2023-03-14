<template>
</template>

<script>
</script>

<style>
</style>a<template>
  <div class="app-container">
    <el-button   type="success" style="width: 100px;" @click="add()">添加用户</el-button>
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
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="用户密码" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userPassword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="210" align="center">
        <template slot-scope="scope">
          <img v-bind:src="scope.row.userImage" alt="" style="height:80px">
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.userEmail }}
        </template>
      </el-table-column>
      <el-table-column label="用户电话" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.userPhone }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button   type="red" @click="update(scope.row.userId)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="删除" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteUser(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getALLUser,deleteUser } from '@/api/user'

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
    // this.fetchData()
  },
  methods: {
    add(){
      this.$router.push({path:'/user/user_form'})
    },
    update(userId){
    this.$router.push({path:'/user/user_form',query: {id:userId}})
    },

    deleteUser(userId){
      deleteUser(userId).then(res=>{
        console.log(res)
        var that=this;
        that.fetchData();
      })

    },

    fetchData() {
      // this.listLoading = true
      getALLUser().then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(err => {
          console.log(this.list)
        })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
