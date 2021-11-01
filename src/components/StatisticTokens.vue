<template>
  <div>

      <keep-alive>
      <component :is="component"></component>
      </keep-alive>
      <button style="margin: 20px; line-height: 30px; " @click="component = 'ETH'">Show ETH</button>
      <button class="arr" style="margin: 20px; line-height: 30px; " @click="component = 'BSC'">Show BSC</button>


  </div>

</template>

<script>





import Loader from "./Loader";
import ETH from "./ETH";
import BCS from "./BSC";
// import {mapGetters} from "vuex/dist/vuex.mjs";
export default {
  name: "TodoList",
  components: {
    Loader,
    'ETH': ETH,
    'BSC': BCS

  },

  data(){

    return{
      component: 'ETH'
    }
  },

}
</script>

<style scoped>
li{
  list-style: none;
}
</style>