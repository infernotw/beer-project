<template>
  <li>
    <a
      href="#"
      class="sort__item"
      :class="isActive ? '' : 'sort__item--active'"
      v-on:click="clickHandler()"
    >{{ name }}</a>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Sort extends Vue {
  @Prop() protected name!: string;
  protected isActive: boolean = true;

  clickHandler(): void {
    this.isActive = !this.isActive;
  }
}
</script>

<style lang="less">
.sort__item--active {
  border-bottom: 2px solid #111;
}
</style>
