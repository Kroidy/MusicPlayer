<template>
    <div id="mySong">
      <table id="list">
        <tr>
          <th class="title">音乐标题</th>
          <th class="singer">歌手</th>
          <th class="album">专辑</th>
          <th class="type">类型</th>
          <th class="add"></th>
          <th class="delete"></th>
        </tr>
        <tr v-for="(item, index) in getSongList" @click="chooseMusic(index)">
          <td>{{item.name}}</td>
          <td>{{item.singer}}</td>
          <td>{{item.album}}</td>
          <td>{{item.type}}</td>
          <td><img @click.prevent.stop="addMusic(index)" class="addBtn" src="../../../static/img/add.png"/></td>
          <td><img @click.prevent.stop="deleteMusic(index)" class="deleBtn" src="../../../static/img/delete.png"/></td>
        </tr>
      </table>
      <div id="selfDialogPanel" v-show="showDialog">
        <div class="selfDialog">
          <span>请选择歌单：</span>
          <div class="listArea">
            <ul>
              <li v-for="item in this.getSongListsName"><input type="checkbox" name="songList" :value="item"/>{{item}}</li>
            </ul>
          </div>
          <div>
            <input type="button" @click="confirmAdd" value="确认"/>
            <input type="button" @click="cancelAdd" value="取消"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        currentList: '',
        showDialog: false,
        songListsName: [],
        musicToBeAddedIndex: 0
      }
    },
    methods: {
      chooseMusic (index) {
        this.$store.dispatch('set_CurrentPlayList', this.currentList)
        this.$store.commit({
          type: 'choosePlay',
          index: index
        })
      },
      deleteMusic (index) {
        this.$store.dispatch('delete_CurrentShowSong', index)
      },
      addMusic (index) {
        let all = this.$store.getters.getAllSongListsName
        for (let i = 0; i < all.length; i++) {
          this.songListsName.push(all[i])
        }
        this.musicToBeAddedIndex = index
        this.showDialog = true
      },
      confirmAdd () {
        let listChose = []
        let result = document.getElementsByName('songList')
        let allSongLists = this.$store.getters.getAllSongsList
        let choseMusicId = this.$store.getters.getCurrentShowList[this.musicToBeAddedIndex].id
        for (let i = 0; i < result.length; i++) {
          if (result[i].checked) {
            let flag = true
            for (let j = 0; j < allSongLists[result[i].value].length; j++) {
              let list = allSongLists[result[i].value]
              if (list[j].id === choseMusicId) {
                flag = false
                break
              }
            }
            if (flag) {
              listChose.push(result[i].value)
            }
          }
        }
        this.$store.dispatch('add_SongToLists', {
          'list': listChose,
          'musicIndex': this.musicToBeAddedIndex
        })
        this.showDialog = false
      },
      cancelAdd () {
        this.showDialog = false
      }
    },
    computed: {
      getSongList () {
        this.currentList = this.$store.getters.getCurrentShowList
        return this.$store.getters.getCurrentShowList
      },
      getSongListsName () {
        return this.$store.getters.getAllSongListsName
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

  #selfDialogPanel{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #B22222;
    opacity: 0.5;
  }

  .selfDialog{
    background-color: #3CB371;
    width: 40%;
    height: 50%;
    margin: 15% auto;
  }

  #list{
    width: 100%;
    padding: 10px;
    border: 1px solid #B22222;
  }

  .listArea{
    width: 100%;
    height: 50%;
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
    width: 10%;
  }

  .add{
    width: 5%;
  }

  .delete{
    width: 5%;
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

  .deleBtn{
    width: 20px;
    height: 20px;
    margin: auto 15px;
    border: 1px solid #B22222;
  }

  .deleBtn:hover{
    background-color: #B22222;
  }

  .addBtn{
    width: 20px;
    height: 20px;
    margin: auto 15px;
    border: 1px solid #B22222;
  }

  .addBtn:hover{
    background-color: #B22222;
  }

</style>
