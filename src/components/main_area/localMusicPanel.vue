<template>
    <div id="localMusic">
      <div>
        <span class="title">本地音乐</span>
        <span>{{musicCounts}}首音乐</span>
        <a href="javascript:;" class="file">选择文件
          <input type="file" @change="addMusic" ref="inputer" webkitdirectory directory multiple>
        </a>
      </div>
      <table id="list" class="table">
        <tr>
          <th class="index"></th>
          <th class="title">音乐标题</th>
          <th class="singer">歌手</th>
          <th class="album">专辑</th>
          <th class="duration">时长</th>
          <th class="size">大小</th>
        </tr>
        <tr v-for="item in localMusicList">
          <td>{{item.number}}</td>
          <td>{{item.title}}</td>
          <td>{{item.singer}}</td>
          <td>{{item.album}}</td>
          <td>{{item.duration}}</td>
          <td>{{item.size}}</td>
        </tr>
      </table>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        localMusicList: [],
        musicCounts: 0
      }
    },
    methods: {
      addMusic: function (e) {
        let inputDOM = this.$refs.inputer
        let index = 1
        let itemList = []
        for (let i = 0; i < inputDOM.files.length; i++) {
          if (inputDOM.files[i].type === 'audio/mp3') {
            console.log(inputDOM.files[i])
            let item = {
              number: index,
              title: inputDOM.files[i].name,
              singer: null,
              album: null,
              duration: '未知',
              size: (inputDOM.files[i].size / (1024 * 1024)).toFixed(2) + 'MB',
              path: inputDOM.files[i].webkitRelativePath
            }
            itemList.push(item)
            this.localMusicList.push(item)
            index++
            this.musicCounts++
          }
        }
        this.$store.commit('addLocalMusic', itemList)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .title{
    font-size: 18px;
    margin: 10px;
    border: 1px solid #B22222;
  }

  #localMusic{
    width: 85%;
    display: inline-block;
    float: right;
    height: 560px;
    overflow: scroll;
    border: 1px solid #B22222;
    overflow-x: visible;
  }

  table{
      width: 100%;
  }

  .index{
      width: 5%;
  }

  .title{
    width: 35%;
  }
  .singer{
    width: 15%;
  }

  .album{
    width: 15%;
  }

  .duration{
    width: 15%;
  }

  .size{
    width: 15%;
  }

  th{
    border: 1px solid #B22222;
  }

  .file {
      position: relative;
      display: inline-block;
      background: #D0EEFF;
      border: 1px solid #99D3F5;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      color: #1E88C7;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
  }
  .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
  }
  .file:hover {
      background: #AADFFD;
      border-color: #78C3F3;
      color: #004974;
      text-decoration: none;
  }

  table tr:nth-child(even){
    background: #ccc;
  }

  tr{
    height: 30px;
  }
</style>
