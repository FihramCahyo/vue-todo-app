import { defineStore } from 'pinia';
import * as todoService from '../services/todos';
import type { CreateTodoPayload, Todo, UpdateTodoPayload } from '@/types';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    currentTodo: null as Todo | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getTodos: (state) => state.todos,
    getTodoById: (state) => (id: number) => state.todos.find(todo => todo.id === id),
  },

  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = null;

      try {
        this.todos = await todoService.getTodos();
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch todos';
        toast(this.error, { type: "error", autoClose: 3000 });
      } finally {
        this.loading = false;
      }
    },

    async fetchTodo(id: number) {
      this.loading = true;
      this.error = null;

      try {
        this.currentTodo = await todoService.getTodo(id);
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch todo';
        toast(this.error, { type: "error", autoClose: 3000 });
      } finally {
        this.loading = false;
      }
    },

    async createTodo(todo: CreateTodoPayload) {
      this.loading = true;
      this.error = null;

      try {
        const newTodo = await todoService.createTodo(todo);
        this.todos.push(newTodo);
        toast('Todo created successfully', { type: "success", autoClose: 3000 });
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create todo';
        toast(this.error, { type: "error", autoClose: 3000 });
      } finally {
        this.loading = false;
      }
    },

    async updateTodo(id: number, todo: UpdateTodoPayload) {
      this.loading = true;
      this.error = null;

      try {
        const updatedTodo = await todoService.updateTodo(id, todo);
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
        toast('Todo updated successfully', { type: "success", autoClose: 3000 });
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update todo';
        toast(this.error, { type: "error", autoClose: 3000 });
      } finally {
        this.loading = false;
      }
    },

    async deleteTodo(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await todoService.deleteTodo(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        toast('Todo deleted successfully', { type: "success", autoClose: 3000 });
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete todo';
        toast(this.error, { type: "error", autoClose: 3000 });
      } finally {
        this.loading = false;
      }
    },

    async toggleTodoStatus(todo: Todo) {
      const newStatus = todo.completed === 1 ? 0 : 1;
      await this.updateTodo(todo.id, { completed: newStatus });
    },
  },
});
