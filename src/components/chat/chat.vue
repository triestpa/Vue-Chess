<template>
  <div class="chat-container u-full-width">
    <div class="u-full-width">
      <input class="u-full-width" type="text" placeholder="Message" v-model="draft">
    </div>
    <input type="submit" v-on:click="send()" value="Send">
    <div class="message-list">
      <div class="message u-full-width" v-for="message in messages">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script src="./chat.js"></script>

<style scoped lang="scss">
@import '../../_variables';

.chat-container {
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
}


</style>
