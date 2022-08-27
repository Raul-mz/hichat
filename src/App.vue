<template>
  <v-app>
    <v-main>
      <Chat/>
    </v-main>
  </v-app>
</template>

<script>
import Chat from './components/Chat.vue'
import { defineComponent } from "vue";

export default defineComponent({
  components: { Chat }
});

</script>
