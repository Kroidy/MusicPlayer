<template>
    <div id="mySong">
      <table id="list">
        <tr>
          <th class="title">音乐标题</th>
          <th class="singer">歌手</th>
          <th class="album">专辑</th>
          <th class="type">类型</th>
        </tr>
        <tr v-for="(item, index) in getSongList" @click="chooseMusic(index)">
          <td>{{item.name}}</td>
          <td>{{item.singer}}</td>
          <td>{{item.album}}</td>
          <td>{{item.type}}</td>
        </tr>
      </table>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        myFavorite: this.$store.getters.getMyFavorite
      }
    },
    methods: {
      chooseMusic (index) {
        console.log('index:' + index)
        this.$store.commit({
          type: 'choosePlay',
          index: index
        })
      }
    },
    created () {
      this.myFavorite = this.$store.getters.getCurrentPlayList
    },
    computed: {
      getSongList () {
//        this.myFavorite = this.$store.getters.getMyFavorite
//        return this.$store.getters.getMyFavorite
        return this.$store.getters.getCurrentPlayList
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mySong{
    border: 1px solid #B22222;
    float: right;
    width: 85%;
    height: 560px;
    display: inline-block;
  }
    #list{
      width: 100%;
      padding: 10px;
      border: 1px solid #B22222;
    }
  .title{
    width: 30%;
  }
  .singer{
    width: 30%;
  }

  .album{
    width: 20%;
  }

  .type{
    width: 20%;
  }

  th,td{
    border: 1px solid #cccccc;
  }

  table tr:nth-child(even){
    background: #ccc;
  }

  tr{
    height: 30px;
  }

</style>
