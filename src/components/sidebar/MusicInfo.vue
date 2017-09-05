<template>
    <div id="info" @click="goToMusicDetail">
      <img id="currentMusicImg" :src="getCurrentMusicInfo[2]"/>
      <ul>
        <li>{{getCurrentMusicInfo[0]}}</li>
        <li>{{getCurrentMusicInfo[1]}}</li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
      }
    },
    computed: {
      getCurrentMusicInfo () {
        return this.$store.getters.getCurrentMusicInfo
      }
    },
    methods: {
      goToMusicDetail () {
        return this.$store.dispatch('toggle_IsShow')
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
    width: 70%;
    border: 1px solid #000000;
  }

  li{
    margin: 5px auto;
    font-size: 10px;
    border: 1px solid #B22222;
    text-align: center;
    margin-left: -20px;
  }

  #currentMusicImg{
    width: 30%;
    height: 100%;
  }
</style>
