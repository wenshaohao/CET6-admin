<template>

  <div class="app-container">
    <el-button type="success" style="width: 100px;" @click="add()">添加读本</el-button>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.essayId}}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.essayTitle}}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.essayAuthor }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="red" @click="update(scope.row.essayId)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="删除" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteEssay(scope.row.essayId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getEssayList,
    deleteEssay
  } from '@/api/essay.js'


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
      // this.fetchData();
      this.getEssayList()
    },
    methods: {
      add() {
        this.$router.push({
          path: '/essay/essay_form'
        })
      },
      update(essayId) {
        this.$router.push({
          path: '/essay/essay_form',
          query: {
            id: essayId
          }
        })
      },

      deleteEssay(essayId) {
        deleteEssay(essayId).then(res => {
          console.log(res)
          var that = this;
          that.getEssayList();
        })

      },
      getEssayList() {
        var that = this
        this.listLoading = true
        getEssayList().then(response => {
          // console.log(response.data)
          that.listLoading = false
          that.list = response.data
        }).catch(err => {
          console.log(that.list)
        })


      },
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>
