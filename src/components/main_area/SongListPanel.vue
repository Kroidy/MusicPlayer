<template>
    <div>
      <div>
        <span>本地音乐</span>
        <span>首音乐</span>
      </div>
      <table id="list">
        <tr>
          <th class="index"></th>
          <th class="title">音乐标题</th>
          <th class="singer">歌手</th>
          <th class="album">专辑</th>
          <th class="duration">时长</th>
        </tr>
      </table>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{
    width: 10%;
  }

  .title{
    width: 30%;
  }
  .singer{
    width: 30%;
  }

  .album{
    width: 15%;
  }

  .duration{
    width: 15%;
  }
</style>
