<template>
  <ul class="todo-main">
  <ListItem v-for="todo in todos" :key="todo.id" :todos = "todo"/>
  </ul>
</template>

<script>
import ListItem from "./ListItem";
export default {
  name: "Main",
  components:{
    ListItem
  },
  props:['todos','change','del']
}
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>