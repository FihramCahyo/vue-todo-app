<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        :class="{ 'border-red-500': errors.title }"
        placeholder="Enter todo title"
      />
      <p v-if="errors.title" class="mt-1 text-sm text-red-500">{{ errors.title }}</p>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        :class="{ 'border-red-500': errors.description }"
        rows="3"
        placeholder="Enter todo description"
      ></textarea>
      <p v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</p>
    </div>

    <div class="flex justify-end space-x-3">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
        Cancel
      </button>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" :disabled="isSubmitting">
        {{ isEditing ? 'Update' : 'Create' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { Todo } from '@/types';
import * as yup from 'yup';

const props = defineProps<{
  todo?: Todo;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', data: { title: string; description: string }): void;
  (e: 'cancel'): void;
}>();

const form = reactive({
  title: '',
  description: '',
});

const errors = reactive({
  title: '',
  description: '',
});

const isSubmitting = ref(false);
const isEditing = props.isEditing || false;

onMounted(() => {
  if (props.todo) {
    form.title = props.todo.title;
    form.description = props.todo.description;
  }
});

const schema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required'),
});

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    // Reset errors
    errors.title = '';
    errors.description = '';

    // Validate form
    await schema.validate(form, { abortEarly: false });

    // Submit form
    emit('submit', {
      title: form.title,
      description: form.description,
    });

    // Reset form if not editing
    if (!isEditing) {
      form.title = '';
      form.description = '';
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path as keyof typeof errors] = err.message;
        }
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
