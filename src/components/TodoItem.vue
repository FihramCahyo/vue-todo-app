<template>
  <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
    <input
      type="checkbox"
      :checked="todo.completed === 1"
      @change="toggleStatus"
      class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700"
    />
    <div class="ml-4 flex-1">
      <h3 :class="{ 'line-through text-gray-500': todo.completed === 1 }" class="text-lg font-medium dark:text-white">
        {{ todo.title }}
      </h3>
      <p :class="{ 'text-gray-500': todo.completed === 1 }" class="text-gray-700 dark:text-gray-300">
        {{ todo.description }}
      </p>
    </div>
    <div class="flex space-x-2">
      <button @click="$emit('edit', todo)" class="btn-secondary btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button @click="$emit('delete', todo.id)" class="btn-secondary btn-sm text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types';
import { useTodoStore } from '../stores/todo';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: 'edit', todo: Todo): void;
  (e: 'delete', id: number): void;
}>();

const todoStore = useTodoStore();

const toggleStatus = async () => {
  await todoStore.toggleTodoStatus(props.todo);
};
</script>

<style scoped>
.btn-sm {
  @apply p-2 rounded-md;
}
</style>
