<main class="p-2 md:p-4 flex flex-row justify-center">
  <div class="min-w-0 flex-1 flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8">
    <div
      class="w-full md:w-80 self-start flex flex-col gap-4 md:sticky md:top-4"
    >
      <slot name="sidebar" />
    </div>
    <div class="min-w-0 flex-1 flex flex-col gap-4">
      <slot />
    </div>
  </div>
</main>
