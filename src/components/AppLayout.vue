<script setup></script>

<!-- AppLayout.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 border border-solid border-black text-white">
      <!-- Sidebar content -->
      <div class="flex">
        <!-- Button goes here -->
        <slot name="filterButton"></slot>
      </div>
      <div class="p-4">
        <!-- Logo -->
      </div>
      <nav class="mt-8">
        <!-- Navigation items -->
      </nav>
      <div class="mt-8">
        <!-- Teams section -->
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <!-- Header content -->
      </header>

      <!-- Main content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="container mx-auto px-6 py-8">
          <!-- Slot for card components -->
          <slot name="main"></slot>
        </div>
      </main>
    </div>
  </div>
</template>
