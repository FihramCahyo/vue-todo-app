<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold dark:text-white">Daftar Tugas</h1>
      <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
        Logout
      </button>
    </div>

    <!-- Form Tambah Todo -->
    <div class="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4 dark:text-white">Tambah Tugas Baru</h2>
      <form @submit.prevent="addTodo" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
          <input type="text" id="title" v-model="newTodo.title"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
          <textarea id="description" v-model="newTodo.description" rows="3"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Tambah Tugas
          </button>
        </div>
      </form>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Daftar Todo -->
    <div v-else-if="todos.length > 0" class="space-y-4">
      <div v-for="todo in todos" :key="todo.id" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition-all"
        :class="{ 'border-l-4 border-green-500': todo.completed }">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="text-lg font-medium dark:text-white"
              :class="{ 'line-through text-gray-500 dark:text-gray-400': todo.completed }">
              {{ todo.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mt-1">{{ todo.description }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="toggleTodoStatus(todo)" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              :title="todo.completed ? 'Tandai belum selesai' : 'Tandai selesai'">
              <span v-if="todo.completed" class="text-green-500">✓</span>
              <span v-else class="text-gray-400">○</span>
            </button>
            <button @click="startEditTodo(todo)" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Edit">
              ✏️
            </button>
            <button @click="deleteTodo(todo.id)" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Hapus">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pesan Kosong -->
    <div v-else class="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
      <p class="text-gray-500 dark:text-gray-400">Belum ada tugas. Tambahkan tugas baru di atas.</p>
    </div>

    <!-- Modal Edit Todo -->
    <div v-if="editingTodo" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 dark:text-white">Edit Tugas</h2>
        <form @submit.prevent="updateTodo" class="space-y-4">
          <div>
            <label for="edit-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
            <input type="text" id="edit-title" v-model="editingTodo.title"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required />
          </div>
          <div>
            <label for="edit-description"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
            <textarea id="edit-description" v-model="editingTodo.description" rows="3"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="cancelEdit"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Batal
            </button>
            <button type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as todoService from '../services/todos';
import * as authService from '../services/auth';

// Router
const router = useRouter();

// State
const todos = ref<any[]>([]);
const loading = ref(true);
const newTodo = ref({
  title: '',
  description: ''
});
const editingTodo = ref<any>(null);

// Lifecycle hooks
onMounted(async () => {
  try {
    await fetchTodos();
  } catch (error) {
    console.error('Error fetching todos:', error);
    toast('Gagal memuat daftar tugas', {
      type: 'error',
      autoClose: 3000
    });
  }
});

// Methods
const fetchTodos = async () => {
  loading.value = true;
  try {
    const response = await todoService.getTodos();
    todos.value = response;
  } catch (error: any) {
    if (error.response?.status === 401) {
      toast('Sesi Anda telah berakhir. Silakan login kembali', {
        type: 'error',
        autoClose: 3000
      });
      authService.logout();
      router.push('/login');
    } else {
      toast('Gagal memuat daftar tugas', {
        type: 'error',
        autoClose: 3000
      });
    }
    throw error;
  } finally {
    loading.value = false;
  }
};

const addTodo = async () => {
  try {
    const response = await todoService.createTodo({
      title: newTodo.value.title,
      description: newTodo.value.description,
      // completed: 0
    });

    todos.value.push(response);
    newTodo.value = { title: '', description: '' };
    toast('Tugas berhasil ditambahkan', {
      type: 'success',
      autoClose: 3000
    });
  } catch (error) {
    console.error('Error adding todo:', error);
    toast('Gagal menambahkan tugas', {
      type: 'error',
      autoClose: 3000
    });
  }
};

const toggleTodoStatus = async (todo: any) => {
  try {
    const updatedTodo = {
      ...todo,
      completed: todo.completed ? 0 : 1
    };

    await todoService.updateTodo(todo.id, updatedTodo);

    // Update local state
    const index = todos.value.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos.value[index].completed = updatedTodo.completed;
    }

    toast(`Tugas ${updatedTodo.completed ? 'selesai' : 'belum selesai'}`, {
      type: 'success',
      autoClose: 3000
    });
  } catch (error) {
    console.error('Error updating todo status:', error);
    toast('Gagal mengubah status tugas', {
      type: 'error',
      autoClose: 3000
    });
  }
};

const startEditTodo = (todo: any) => {
  editingTodo.value = { ...todo };
};

const cancelEdit = () => {
  editingTodo.value = null;
};

const updateTodo = async () => {
  if (!editingTodo.value) return;

  try {
    const updatedTodo = await todoService.updateTodo(editingTodo.value.id, editingTodo.value);

    // Update local state
    const index = todos.value.findIndex(t => t.id === updatedTodo.id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
    }

    editingTodo.value = null;
    toast('Tugas berhasil diperbarui', {
      type: 'success',
      autoClose: 3000
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    toast('Gagal memperbarui tugas', {
      type: 'error',
      autoClose: 3000
    });
  }
};

const deleteTodo = async (id: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus tugas ini?')) return;

  try {
    await todoService.deleteTodo(id);

    // Update local state
    todos.value = todos.value.filter(todo => todo.id !== id);
    toast('Tugas berhasil dihapus', {
      type: 'success',
      autoClose: 3000
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    toast('Gagal menghapus tugas', {
      type: 'error',
      autoClose: 3000
    });
  }
};

const logout = () => {
  authService.logout();
  router.push('/login');
  toast('Anda telah keluar dari sistem', {
    type: 'info',
    autoClose: 3000
  });
};
</script>
