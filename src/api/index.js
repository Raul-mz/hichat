import { createClient } from "@supabase/supabase-js";
import { ref } from "vue";

const supabase = createClient("SUPABASE_APP_ENDPOINT", "SUPABASE_PRIVATE_KEY");

const getUsername = () => {
    const previousUsername = localStorage.getItem("username");
  
    if (previousUsername) {
      return previousUsername;
    } else {
      const username = `person_${Math.random().toString(36).substring(2, 6)}`;
  
      localStorage.setItem("username", username);
  
      return username;
    }
  };
  const getMessages = async (from, to) => {
    const { data } = await supabase
      .from("messages")
      .select()
      .range(from, to)
      .order("timestamp", { ascending: false });
  
    return data;
  };
  const onNewMessage = (handler) => {
    supabase
      .from("messages")
      .on("INSERT", (payload) => {
        handler(payload.new);
      })
      .subscribe();
  };
  const createNewMessage = async (username, text) => {
      const { data } = await supabase.from("messages").insert({ username, text });
  
      return data;
  }
  
const useMessages = () => {
    const username = getUsername();
    const messages = ref([]);
    const messagesCount = ref(0);
    const maxMessagesPerRequest = 50;
    const loadMessagesBatch = async () => {
      const loadedMessages = await getMessages(
        messagesCount.value,
        maxMessagesPerRequest - 1
      );
  
      messages.value = [...loadedMessages, ...messages.value];
      messagesCount.value += loadedMessages.length;
    };
  
    loadMessagesBatch();
    onNewMessage((newMessage) => {
      messages.value = [newMessage, ...messages.value];
      messagesCount.value += 1;
    });
    messages.value = messages.value.slice().reverse();
    console.log(messages.value )
    return {
      username,
      messages,
      async send(text) {
        if (text) {
          await createNewMessage(username, text);
        }
      },
      loadOlder() {
        return loadMessagesBatch();
      },
    };
  };
  
  export { useMessages };