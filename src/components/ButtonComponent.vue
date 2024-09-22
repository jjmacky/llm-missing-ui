<template>
  <button
    class="border border-black border-solid rounded-md content-center p-2 m-2 flex-grow"
    :class="dynamicClasses"
    @click="$emit('click')"
    ref="buttonRef"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { watch, computed, ref, onMounted } from 'vue'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'cardDropped'])
const buttonRef = ref(null)
const isDraggedOver = ref(false)

const dynamicClasses = computed(() => {
  if (isDraggedOver.value) {
    return 'bg-blue-500 text-white'
  } else if (props.isActive) {
    return 'bg-red-500 text-white'
  } else {
    return 'bg-white text-black'
  }
})

// const dynamicClasses = computed(() => [
//   props.isActive ? 'bg-red-500 text-white' : 'bg-white text-black',
//   isDraggedOver.value ? 'bg-blue-500' : ''
// ])

onMounted(() => {
  const el = buttonRef.value
  if (el) {
    return dropTargetForElements({
      element: el,
      onDragEnter: () => (isDraggedOver.value = true),
      onDragLeave: () => (isDraggedOver.value = false),
      onDrop: ({ source }) => {
        isDraggedOver.value = false
        emit('cardDropped', { cardId: source.data.id, newCategory: props.text })
      }
    })
  }
})
</script>
