<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold dark:text-white">Daftar Tugas</h1>
      <div class="flex space-x-3">
        <button id="theme-toggle" type="button" @click="toggleDarkMode"
          class="text-yellow-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
          <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </button>
        <button @click="logout" class="px-4 py-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Logout
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Daftar Todo dalam Format Tabel -->
    <div v-else-if="todos.length > 0" class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="pb-4 bg-gray-100 dark:bg-gray-800 p-4">
        <div class="flex justify-between items-center">
          <div class="relative">
            <label for="table-search" class="sr-only">Search</label>
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search" v-model="searchTerm"
              class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari tugas...">
          </div>
          <button @click="showAddTodoModal = true"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition">
            Tambah Tugas
          </button>
        </div>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <!-- <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox" @change="toggleAllTodos" :checked="allTodosSelected" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div> -->
            </th>
            <th scope="col" class="px-6 py-3">Judul</th>
            <th scope="col" class="px-6 py-3">Deskripsi</th>
            <th scope="col" class="px-6 py-3 w-32">Status</th>
            <th scope="col" class="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in filteredTodos" :key="todo.id"
            class="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input :id="`checkbox-table-search-${todo.id}`" type="checkbox" :checked="todo.completed === 1"
                  @change="toggleTodoStatus(todo)"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label :for="`checkbox-table-search-${todo.id}`" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              :class="{ 'line-through text-gray-500 dark:text-gray-400': todo.completed === 1 }">
              {{ todo.title }}
            </th>
            <td class="px-6 py-4" :class="{ 'text-gray-500': todo.completed === 1 }">
              {{ todo.description }}
            </td>
            <td class="px-6 py-4 w-32">
              <span v-if="todo.completed === 1"
                class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs whitespace-nowrap">Selesai</span>
              <span v-else class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs whitespace-nowrap">Belum
                Selesai</span>
            </td>
            <td class="px-6 py-4 flex space-x-2">
              <button @click="startEditTodo(todo)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              <button @click="deleteTodo(todo.id)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pesan Kosong -->
    <div v-else class="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
      <p class="text-gray-500 dark:text-gray-400">Belum ada tugas. Tambahkan tugas baru dengan klik tombol "Tambah
        Tugas".</p>
    </div>

    <!-- Modal Tambah Todo -->
    <div v-if="showAddTodoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 dark:text-white">Tambah Tugas Baru</h2>
        <form @submit.prevent="addTodo" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
            <input type="text" id="title" v-model="newTodo.title"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required />
          </div>
          <div>
            <label for="description"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
            <textarea id="description" v-model="newTodo.description" rows="3"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showAddTodoModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Batal
            </button>
            <button type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit Todo -->
    <div v-if="editingTodo" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 dark:text-white">Edit Tugas</h2>
        <form @submit.prevent="updateTodo" class="space-y-4">
          <div>
            <label for="edit-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
            <input type="text" id="edit-title" v-model="editingTodo.title"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required />
          </div>
          <div>
            <label for="edit-description"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
            <textarea id="edit-description" v-model="editingTodo.description" rows="3"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="cancelEdit"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Batal
            </button>
            <button type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Konfirmasi Delete -->
    <div v-if="todoToDelete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 dark:text-white">Konfirmasi Hapus</h2>
        <p class="mb-6 text-gray-700 dark:text-gray-300">
          Apakah Anda yakin ingin menghapus tugas "<span class="font-semibold">{{ todoToDelete.title }}</span>"?
        </p>
        <div class="flex justify-end space-x-3">
          <button type="button" @click="cancelDelete"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Batal
          </button>
          <button type="button" @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as todoService from '../services/todos';
import * as authService from '../services/auth';
import { useAuthStore } from '@/stores/auth';

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
const searchTerm = ref('');
const showAddTodoModal = ref(false);

// Computed properties
const filteredTodos = computed(() => {
  if (!searchTerm.value) return todos.value;

  const term = searchTerm.value.toLowerCase();
  return todos.value.filter(todo =>
    todo.title.toLowerCase().includes(term) ||
    todo.description.toLowerCase().includes(term)
  );
});

const allTodosSelected = computed(() => {
  return todos.value.length > 0 && todos.value.every(todo => todo.completed === 1);
});

// Lifecycle hooks
onMounted(async () => {
  try {
    await fetchTodos();
  } catch (error) {
    console.error('Error fetching todos:', error);
    toast('Gagal memuat daftar tugas', {
      type: 'error',
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
      });
      authService.logout();
      router.push('/login');
    } else {
      toast('Gagal memuat daftar tugas', {
        type: 'error',
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
    });

    todos.value.push(response);
    newTodo.value = { title: '', description: '' };
    showAddTodoModal.value = false;
    toast('Tugas berhasil ditambahkan', {
      type: 'success',
    });
  } catch (error) {
    console.error('Error adding todo:', error);
    toast('Gagal menambahkan tugas', {
      type: 'error',
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

    toast(`Tugas ${updatedTodo.completed ? 'selesai' : 'di batalkan'}`, {
      type: updatedTodo.completed ? 'success' : 'warning',
    });
  } catch (error) {
    console.error('Error updating todo status:', error);
    toast('Gagal mengubah status tugas', {
      type: 'error',
    });
  }
};

const toggleAllTodos = async () => {
  const setToCompleted = !allTodosSelected.value;

  try {
    // Update all todos in the UI first for better UX
    todos.value.forEach(todo => {
      todo.completed = setToCompleted ? 1 : 0;
    });

    // Then update in the backend
    for (const todo of todos.value) {
      await todoService.updateTodo(todo.id, {
        ...todo,
        completed: setToCompleted ? 1 : 0
      });
    }

    toast(`Semua tugas telah ${setToCompleted ? 'diselesaikan' : 'diatur belum selesai'}`, {
      type: 'success',
    });
  } catch (error) {
    console.error('Error toggling all todos:', error);
    toast('Gagal mengubah status semua tugas', {
      type: 'error',
    });
    // Refresh to get the correct state
    await fetchTodos();
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
    const updatedTodo = await todoService.updateTodo(
      editingTodo.value.id,
      {
        title: editingTodo.value.title,
        description: editingTodo.value.description,
        completed: editingTodo.value.completed
      }
    );

    // Fetch fresh data to ensure UI is in sync
    await fetchTodos();

    // Close edit modal
    editingTodo.value = null;

    toast('Tugas berhasil diperbarui', {
      type: 'success',
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    toast('Gagal memperbarui tugas', {
      type: 'error',
    });
  }
};
// State untuk modal konfirmasi delete
const todoToDelete = ref<any>(null);

const startDeleteTodo = (todo: any) => {
  todoToDelete.value = todo;
};

// Fungsi untuk membatalkan delete
const cancelDelete = () => {
  todoToDelete.value = null;
};

// Fungsi untuk mengkonfirmasi dan melakukan delete
const confirmDelete = async () => {
  if (!todoToDelete.value) return;

  try {
    await todoService.deleteTodo(todoToDelete.value.id);

    // Update local state
    todos.value = todos.value.filter(todo => todo.id !== todoToDelete.value.id);

    toast('Tugas berhasil dihapus', {
      type: 'success',
    });

    // Tutup modal
    todoToDelete.value = null;
  } catch (error) {
    console.error('Error deleting todo:', error);
    toast('Gagal menghapus tugas', {
      type: 'error',
    });
  }
};

// Ganti fungsi deleteTodo yang lama dengan startDeleteTodo
const deleteTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    startDeleteTodo(todo);
  }
};

const logout = () => {
  // Gunakan store untuk logout
  const authStore = useAuthStore();
  authStore.logout();

  // Redirect ke halaman login
  router.push('/login');

  toast('Anda telah keluar dari sistem', {
    type: 'info',
  });
};


const toggleDarkMode = () => {
  // Dapatkan referensi ke elemen icon
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Toggle icon
  themeToggleDarkIcon?.classList.toggle('hidden');
  themeToggleLightIcon?.classList.toggle('hidden');

  // Periksa apakah tema sudah disimpan di localStorage
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  } else {
    // Jika belum ada di localStorage
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
};

// Inisialisasi icon dark mode saat komponen dimuat
onMounted(() => {

  // Inisialisasi icon dark mode
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Tampilkan icon yang sesuai berdasarkan tema saat ini
  if (localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon?.classList.remove('hidden');
  } else {
    themeToggleDarkIcon?.classList.remove('hidden');
  }
});

</script>
