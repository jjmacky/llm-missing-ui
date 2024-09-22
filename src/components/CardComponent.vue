<template>
  <div
    class="max-w-md bg-white border rounded-lg shadow-lg hover:drop-shadow-card-hover overflow-hidden"
  >
    <div class="p-6">
      <div class="cursor-grab active:cursor-grabbing" ref="dragHandle">
        <div class="flex items-start text-blue-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <span class="text-sm font-medium">{{ cardData.category }}</span>
        </div>
      </div>

      <h2 class="font-serif text-2xl font-bold mb-2">{{ cardData.conversation_title }}</h2>

      <div class="text-orange-500 font-bold mb-4">Claude Sonnet 3.5</div>

      <div class="text-sm text-gray-600 mb-4">
        <div><span class="font-medium">Created: </span>{{ cardData.created_at }}</div>
        <div><span class="font-medium">Last updated: </span>{{ cardData.last_updated }}</div>
        <div>
          <span class="font-medium">Stats: </span
          >{{ cardData.word_count.toLocaleString('en-US') }} words |
          {{ cardData.message_count }} messages
        </div>
      </div>

      <p class="text-sm text-gray-700">{{ cardData.summary }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'

const props = defineProps({
  cardData: {
    type: Object,
    required: true
  }
})

const dragHandle = ref(null)

onMounted(() => {
  const el = dragHandle.value
  if (el) {
    return combine(
      draggable({
        element: el,
        getInitialData: () => ({
          id: props.cardData.id,
          category: props.cardData.category
        }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            render: ({ container }) => {
              container.innerHTML = `
                <div style="
                  padding: 8px 12px;
                  background: white;
                  border-radius: 4px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                ">
                  ${props.cardData.conversation_title}
                </div>
              `
            },
            nativeSetDragImage
          })
        }
      })
    )
  }
})
</script>
