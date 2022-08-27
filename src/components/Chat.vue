<template>
  <v-layout>
    <v-navigation-drawer width="72" permanent  elevation="2">
      <v-btn icon v-bind="props">
            <v-avatar color="blue" size="large">
              <span class="white--text text-h5">RM</span>
            </v-avatar>
          </v-btn>
    </v-navigation-drawer>
    <v-navigation-drawer width="150" permanent elevation="2">
      <v-card class="mx-auto" max-width="300">
    <v-list :items="items"></v-list>
  </v-card>
    </v-navigation-drawer>
    <v-app-bar location="bottom" height="48" color="grey-lighten-2" elevation="0">
    <v-text-field
      placeholder="Message"
      v-model="input"
      @keydown="handleSend"
    ></v-text-field>
    <v-btn
      :disabled="!input"
      @click="handleSend"
    >
      Send
    </v-btn>
    </v-app-bar>
    <v-main>
  <v-card
    class="max-w-screen-sm relative overflow-y-auto"
    max-width="100%"
    height="560px"
  >
    <ul
    class="flex flex-col-reverse flex-1"
    @scroll="handleScroll">
    <Message
      v-for="message in messages.slice().reverse()"
      :username="message.username"
      :personal="message.username === username"
      :timestamp="message.timestamp"
      :text="message.text"
      ></Message>
    </ul>
  </v-card>
    </v-main>
  </v-layout>
</template>

<script>

import Message from "./Message.vue";
import { defineComponent, ref } from "vue";
import { useMessages } from "../api/index.js";

export default defineComponent({
  components: { Message },
  setup() {
    const { username, messages, send, loadOlder } = useMessages();
    const input = ref();
    console.log((messages))
    const handleScroll = (event) => {
      if (event.target.scrollTop === 0) {
        loadOlder();
      }
    };
    const handleSend = (event) => {
      if (!event.key || event.key === "Enter") {
        send(input.value);
        input.value = "";
      }
    };

    return {
      input,
      username,
      messages,
      handleScroll,
      handleSend,
    };
  },
});
</script>