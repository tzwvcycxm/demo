<template>
  <div class="todo-footer" v-if="num">
    <label>
      <input type="checkbox" @change="ckeak" :checked="falg()"/>
    </label>
    <span>
          <span>已完成{{this.finish}}</span> / 全部{{num}}
        </span>
    <button class="btn btn-danger" @click="cleanall">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  props:['num','finish','todos'],
  data(){
    return{
    }

 },
  methods:{
  ckeak(e){

    console.log(e.target.checked);
    this.$bus.$emit('all',e.target.checked)

    // this.all(e.target.checked)

  },
  falg(){
    return this.finish === this.num

  },
  cleanall() {
    this.$bus.$emit('clean')
  },

  }
}
</script>

<style scoped>

/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>