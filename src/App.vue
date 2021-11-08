<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Top @addtodo="addTodo"/>
        <Main :todos="todos"/>
        <Bottom :num="this.todos.length" :finish="finish" @all="all" @clean="clean"/>
      </div>
    </div>
  </div>
</template>

<script>
import Bottom from "./components/Bottom";
import Main from "./components/Main";
import Top from "./components/Top";

export default {
  name: "App",
  components: {
    Bottom, Main, Top
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('Todos')) || [],
      //
      // [
      //   // {id: "001", title: "吃饭", done: false},
      //   // {id: "002", title: "睡觉", done: true},
      //   // {id: "003", title: "打豆豆", done: false},
      // ],
    }
  },

  methods: {
    addTodo(tode) {
      this.todos.unshift(tode)
    },
    change(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    edit(id,title) {
      if (title.trim()) this.todos.forEach((todo) => {
          if (todo.id === id) todo.title = title
        })
      else return alert("输入不能为空！")

    },
    del(id){
      this.todos.forEach((todo,index)=>{
        if (todo.id === id) this.todos.splice(index,1)
      })
    },
    all(f){
      console.log(f);
      this.todos.forEach((todo) => {
        todo.done = f;
      })
    },
    clean(){
      this.todos.forEach((todo,index)=>{
        if (todo.done) this.todos.splice(index,this.finish)
      })
    }
  },
  computed:{
    finish(){
      return this.todos.reduce((pre,cun)=>{
        return pre + (cun.done? 1 : 0)
      },0)
      // let  i=0
      // this.todos.forEach((todo) => {
      //   if (todo.done)  i++
      // })
      // return i
    },
  },
  watch: {
    todos:{
      deep:true,
      handler(v){
        localStorage.setItem('Todos',JSON.stringify(v))
      }

    }
  },
  mounted() {
    this.$bus.$on('change',this.change)
    this.$bus.$on('del',this.del)
    this.$bus.$on('edit',this.edit)
    this.$bus.$on('clean',this.clean)
    this.$bus.$on('all',this.all)
  },
  beforeDestroy() {
    this.$bus.$off('change')
    this.$bus.$off('del')
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  margin-right: 5px;
  background-color: skyblue;
  border: 1px solid skyblue;
}
.btn-edit:hover {
  color: #fff;
  background-color: deepskyblue;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>