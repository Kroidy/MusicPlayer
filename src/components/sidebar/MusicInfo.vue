<template>
    <div id="info">
      <img id="currentMusic" src=""/>
      <ul>
        <li id="musicName">dfsd</li>
        <li id="composer">dfsd</li>
      </ul>
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
  #info{
    width: 200px;
    height: 10%;
    border: 1px solid #B22222;
  }

  ul{
    border: 1px solid #B22222;
    display: inline-block;
    float: right;
    list-style-type: none;
    height: 100%;
    width: 120px;
  }

  li{
    margin: 5px auto;
  }



  #currentMusic{
    width: 60px;
    height: 100%;
  }

  #musicinfo{
    width: 120px;
  }
</style>
