<template>
  <div class="activator-wrapper">
    <button class="activator-button" v-on:click="showMap()">На карте</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EventBus } from "../bus";

// подключение сторонних компонентов
@Component
/**
 * компонент кнопки карты.
 * открытие карты по клику.
 */
export default class MapActivator extends Vue {
  showMap(): void {
    EventBus.$emit("map_activator_clicked");
  }
}
</script>

<style lang="less"></style>
