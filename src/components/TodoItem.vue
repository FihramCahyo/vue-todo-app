<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td class="w-4 p-4">
      <div class="flex items-center">
        <input
          :id="`checkbox-table-search-${todo.id}`"
          type="checkbox"
          :checked="todo.completed === 1"
          @change="toggleStatus"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <label :for="`checkbox-table-search-${todo.id}`" class="sr-only">checkbox</label>
      </div>
    </td>
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" :class="{ 'line-through text-gray-500 dark:text-gray-400': todo.completed === 1 }">
      {{ todo.title }}
    </th>
    <td class="px-6 py-4" :class="{ 'text-gray-500': todo.completed === 1 }">
      {{ todo.description }}
    </td>
    <td class="px-6 py-4">
      <span v-if="todo.completed === 1" class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Selesai</span>
      <span v-else class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Belum Selesai</span>
    </td>
    <td class="px-6 py-4 flex space-x-2">
      <button @click="$emit('edit', todo)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
      <button @click="$emit('delete', todo.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</button>
    </td>
  </tr>
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
