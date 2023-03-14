<template>

  <div class="app-container">
    <el-button type="success" style="width: 100px;" @click="add()">添加读本</el-button>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.wordId}}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.wordText}}
        </template>
      </el-table-column>
  
      <el-table-column class-name="status-col" label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="red" @click="update(scope.row.wordId)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="删除" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteWord(scope.row.wordId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getWordList,
    deleteWord
  } from '@/api/word.js'


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
      this.getWordList()
    },
    methods: {
      add() {
        this.$router.push({
          path: '/word/word_form'
        })
      },
      update(wordId) {
        this.$router.push({
          path: '/word/word_form',
          query: {
            id: wordId
          }
        })
      },

      deleteWord(wordId) {
        deleteWord(wordId).then(res => {
          console.log(res)
          var that = this;
          that.getWordList();
        })

      },
      getWordList() {
        var that = this
        this.listLoading = true
        getWordList().then(response => {
          // console.log(response.data)
          that.listLoading = false
          that.list = response.data
        }).catch(err => {
          console.log(that.list)
        })


      },
      // fetchData() {
      //   this.listLoading = true
      //   getList().then(response => {
      //     this.list = response.data.items
      //     this.listLoading = false
      //   })
      // }
    }
  }
</script>
