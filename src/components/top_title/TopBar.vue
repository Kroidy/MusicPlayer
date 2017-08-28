<template>
    <div class="all">
      <span class="item">我的音乐</span>
      <div class="item search">
        <input type="text" placeholder="搜索音乐"/><button type="button">搜索</button>
      </div>
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
    .all{
      height: 45px;
      width: 100%;
      background-color: #c62f2f;
      border: 1px solid #9966cc;
      margin: 0;
    }

    .item{
      margin: 10px 20px;
      border: 1px solid #9966cc;
    }

    .search{
      display: inline-block;
    }

</style>
