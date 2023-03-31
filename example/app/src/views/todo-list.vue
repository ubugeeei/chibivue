<script>
import { ref } from "chibi-vue";
import { useCounterStore } from "../store/count.store";
const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
</script>

<script setup>
const newTodo = ref("");
const todos = ref(JSON.parse(localStorage.getItem("todos") ?? []));
const { count: todoMaxLength } = useCounterStore();

const addTodo = () => {
  if (todos.value.length >= todoMaxLength.value) {
    alert("Todo list is full");
    return;
  }
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
</script>

<template>
  <div>
    <h1>Todo App</h1>
    <div>
      <p>todo max length: {{ todoMaxLength }}</p>
      <input v-model="newTodo" type="text" placeholder="Enter a new todo" />
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
