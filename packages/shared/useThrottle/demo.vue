<script setup lang="ts">
import { ref, watch } from 'vue-demi'
import { useThrottle } from '.'

const trailing = ref(true)
const input = ref('')
const throttled = useThrottle(input, 1000, trailing.value)
const updated = ref(0)

watch(throttled, () => {
  updated.value += 1
})
</script>

<template>
  <div>
    <input v-model="input" placeholder="Try to type anything..." type="text">
    <note>Delay is set to 1000ms for this demo.</note>

    <p>Throttled: {{ throttled }}</p>
    <p>Times Updated: {{ updated }}</p>
    <p>Trailing: {{ trailing }}</p>
  </div>
</template>
