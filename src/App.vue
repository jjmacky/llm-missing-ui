<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import '@/assets/main.css'
import AppLayout from '@/components/AppLayout.vue'
import CardComponent from '@/components/CardComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const cards = ref([])
const loading = ref(true)
const error = ref(null)
const filterActive = ref(false)
const filteredCards = ref([])
let uniqueCardCategories = []

const fetchData = async () => {
  try {
    const response = await api.getData()
    cards.value = response.data
    filteredCards.value = cards.value
    uniqueCardCategories = [...new Set(cards.value.map((card) => card.category))]
  } catch (err) {
    error.value = 'Failed to fetch data: ' + (err.response?.data?.message || err.message)
  } finally {
    loading.value = false
  }
}

// const uniqueCardCategories = computed(() => {
//   return [...new Set(cards.value.map((card) => card.category))]
// })

const toggleFilter = (category) => {
  if (filterActive.value === category) {
    filteredCards.value = cards.value
    filterActive.value = false
  } else {
    filteredCards.value = cards.value.filter((card) => card.category === category)
    filterActive.value = category
  }
}

const handleCardDrop = ({ cardId, newCategory }) => {
  const cardIndex = cards.value.findIndex((card) => card.id === cardId)
  if (cardIndex !== -1) {
    cards.value[cardIndex].category = newCategory
    if (filterActive.value) {
      filteredCards.value = cards.value.filter((card) => card.category === filterActive.value)
    } else {
      filteredCards.value = [...cards.value]
    }
  }
}

onMounted(fetchData)
</script>

<template>
  <AppLayout>
    <template #filterButton>
      <div class="flex flex-col">
        <ButtonComponent
          v-for="category in uniqueCardCategories"
          :key="category"
          :text="category"
          :isActive="filterActive === category"
          @click="toggleFilter(category)"
          @cardDropped="handleCardDrop"
        >
          {{ category }}</ButtonComponent
        >
      </div>
    </template>
    <template #main>
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="loading">Loading...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardComponent v-for="card in filteredCards" :key="card.id" :cardData="card" />
      </div>
    </template>
  </AppLayout>
</template>
