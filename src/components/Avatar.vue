<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {}
  },
  // 创建的时候获取用户的信息
  created() {
    this.setUser()
  },
  methods:{
    ...mapActions({
      'setUser':'checkLogin'
      }

    )
  },
  computed:{
    ...mapGetters([
      'username',
      'slug'
    ]),
  }
};
</script>
<style scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  /*字体文本大写*/
  font-size: 18px;
  margin-top: 15px;
}

</style>
