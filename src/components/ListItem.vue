<template>
  <transition name="todo" appear>
  <li>
    <label>
      <input type="checkbox" @change="handle(todos.id)" :checked="todos.done"/>
      <span v-show="!todos.edit" autofocus>{{ todos.title }}</span>
      <input
             type="text"
             :value="todos.title"
             v-show="todos.edit"
             @blur="unblur(todos,$event)"
             @keyup.enter="unblur(todos,$event)"
             ref="inputf"
      >
    </label>
    <button class="btn btn-danger" @click="hDel(todos.id)">删除</button>
    <button class="btn btn-edit" @click="edit(todos)" v-show="!todos.edit">修改</button>
  </li>
  </transition>
</template>

<script>
export default {
  name: "ListItem",
  props:['todos'],

  methods:{
    handle(id){
      // console.log(this.todos.done);
      this.$bus.$emit('change',id)
      // this.change(id)
    },
    hDel(id){
      if (confirm('确认删除？')) this.$bus.$emit('del',id)
    },
    edit(todos){
     todos.edit = true
      this.$nextTick(()=>{
        this.$refs.inputf.focus()
      })

    },
    unblur(todos,e){
      todos.edit = false
      this.$bus.$emit('edit',todos.id,e.target.value)
    }
  },

}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover{
  background: #ddd;
}
li:hover button{
  display: block;
}
.todo-enter-active{
  animation: anim .5s linear;
}
.todo-leave-active{
  animation: anim .5s reverse;
}
@keyframes anim {
  0%{
    transform: translateX(-100%);
  }
  100%{
    transform: translateX(0);
  }
}
</style>