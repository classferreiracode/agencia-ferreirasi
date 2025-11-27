<script setup>
const props = defineProps({
    label: String,
    options: Array,
    modelValue: String,
    placeholder: String,
    error: String,
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
    emit('update:modelValue', event.target.value)
}

const onBlur = (event) => {
    emit('update:modelValue', event.target.value)
}

const onFocus = (event) => {
    emit('update:modelValue', event.target.value)
}

const onChange = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>
<template>
    <div>
        <label :for="label" class="block text-sm font-medium text-gray-300"
            >{{ label }}
            <select
                :name="label"
                :placeholder="placeholder"
                class="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': error }"
                :value="modelValue"
                @input="onInput"
                @blur="onBlur"
                @focus="onFocus"
                @change="onChange"
            >
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.name }}
                </option>
            </select>
        </label>
        <div v-if="error">
            <p class="mt-2 text-sm text-red-500">{{ error }}</p>
        </div>
    </div>
</template>
