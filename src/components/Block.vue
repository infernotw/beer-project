<template>
  <div>
    <div v-if="msg" class="info-block">{{ msg }}</div>
    <div v-if="!msg" class="info-block">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Block extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="less">
.info-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
