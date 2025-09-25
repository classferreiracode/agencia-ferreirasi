<template>
    <form @submit.prevent="handleSubmit">
        <FormInput v-model="form.name" label="Nome" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <FormInput v-model="form.email" label="Email" type="email" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>

        <FormInput v-model="form.phone" label="Telefone" />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>

        <FormSelect v-model="form.selectedService" label="Serviço" :options="services" />
        <span v-if="errors.selectedService" class="error">{{ errors.selectedService }}</span>

        <FormTextarea v-model="form.message" label="Mensagem" />
        <span v-if="errors.message" class="error">{{ errors.message }}</span>

        <div class="mt-4">
            <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
            >
                Enviar Mensagem
            </button>
        </div>
        <div>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import FormTextarea from '@/components/FormTextarea.vue'

const form = reactive({
    name: '',
    email: '',
    phone: '',
    selectedService: '',
    message: '',
})

const services = [
    { id: 1, name: 'Domínio e Hospedagem' },
    { id: 2, name: 'Criação de Site' },
    { id: 3, name: 'Marketing Digital' },
    { id: 4, name: 'Design para Redes Sociais' },
    { id: 5, name: 'Manutenção de Site' },
    { id: 6, name: 'Manutenção de Computadores e Notebooks' },
    { id: 7, name: 'Suporte Técnico' },
    { id: 8, name: 'Consultoria em Tecnologia' },
    { id: 8, name: 'Outro' },
]

const successMessage = ref('')
const errorMessage = ref('')
const errors = reactive({})

// 🔹 Validação simples
function validateForm() {
    errors.name = form.name ? '' : 'Nome é obrigatório.'
    errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Email inválido.'
    errors.phone = form.phone ? '' : 'Telefone é obrigatório.'
    errors.selectedService = form.selectedService ? '' : 'Escolha um serviço.'
    errors.message = form.message.length >= 10 ? '' : 'Mensagem deve ter pelo menos 10 caracteres.'

    return !Object.values(errors).some((e) => e) // true se não tiver erro
}

const handleSubmit = async () => {
    if (!validateForm()) {
        errorMessage.value = 'Por favor, corrija os erros antes de enviar.'
        successMessage.value = ''
        return
    }

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (response.ok) {
            successMessage.value = 'Mensagem enviada com sucesso!'
            errorMessage.value = ''
            Object.keys(form).forEach((k) => (form[k] = '')) // limpa form
        } else {
            throw new Error('Erro no envio')
        }
    } catch (err) {
        console.error(err)
        errorMessage.value = 'Não foi possível enviar a mensagem.'
        successMessage.value = ''
    }
}
</script>

<style scoped>
.error {
    color: red;
    font-size: 0.9rem;
}
.success {
    color: green;
    font-size: 0.9rem;
}
</style>
