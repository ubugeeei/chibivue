<script>
import { ref } from "chibi-vue";

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default {
  setup() {
    const newTodo = ref("");
    const todos = ref(JSON.parse(localStorage.getItem("todos") ?? []));

    const handleInput = (event) => {
      newTodo.value = event.target.value;
    };

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value = [
          ...todos.value,
          {
            id: uuid(),
            text: newTodo.value,
            completed: false,
          },
        ];
        localStorage.setItem("todos", JSON.stringify(todos.value));
        newTodo.value = "";
      } else {
        alert("Please enter a todo");
      }
    };

    const toggleTodoCompletion = (id) => {
      const todo = todos.value.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(todos.value));
      }
    };

    const removeTodo = (id) => {
      todos.value = todos.value.filter((t) => t.id !== id);
      localStorage.setItem("todos", JSON.stringify(todos.value));
    };

    return {
      newTodo,
      todos,
      handleInput,
      addTodo,
      toggleTodoCompletion,
      removeTodo,
    };
  },
};
</script>

<template>
  <div>
    <h1>Todo App</h1>
    <div>
      <input
        type="text"
        placeholder="Enter a new todo"
        :value="newTodo"
        @input="handleInput"
      />
      <button @click="addTodo">Add Todo</button>
    </div>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodoCompletion(todo.id)"
        />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
