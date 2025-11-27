<script setup>
const { modelValue, label, placeholder, rows, error } = defineProps([
    'modelValue',
    'label',
    'placeholder',
    'rows',
    'error',
])

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>

<template>
    <div>
        <label :for="label" class="block text-sm font-medium text-gray-300"
            >{{ label }}
            <textarea
                :name="label"
                :placeholder="placeholder"
                :rows="rows"
                class="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': error }"
                :value="modelValue"
                @input="updateValue"
            ></textarea>
        </label>
        <div v-if="error">
            <p class="mt-2 text-sm text-red-500">{{ error }}</p>
        </div>
    </div>
</template>
