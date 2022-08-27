<template>
  <div class="flex" :class="personal ? 'd-flex flex-row-reverse' : 'flex-row'">
    <v-chip
    style="height:auto"
    >
      <v-list-item
        :color="!personal ? 'green' : 'primary'"
        class="pa-4 mb-2 flex-1">
        <strong>
          <span
          v-if="!personal"
          v-text="username"
          ></span>
        </strong>
        <div v-text="text"></div>
        <div
          :class="personal ? 'd-flex flex-row-reverse' : 'flex-row'"
          style="font-size: 0.5rem;"
        >{{ messageHour }}</div>
      </v-list-item>
    </v-chip>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return { 
      messageHour:''
    }
  },
  props: {
    personal: Boolean,
    username: String,
    text: String,
    timestamp: String
  },
  computed: {
    messageHour() {
      return this.messageHour;
    }
  },
  mounted(){
    this.messageHour = new Date(this.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  } 
});

</script>