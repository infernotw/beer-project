<template>
  <div class="form__input" v-on:click="changeFilter">
    <input class="input-radio" />
    <label class="form__type" :class="isActive ? 'form__type--checked' : ''">{{ btnTitle }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
/**
 * компонент кнопки радиобаттона
 * при смене варианта передаю это значение выше
 */
export default class BaseInput extends Vue {
  @Prop() btnTitle!: string;
  @Prop() isActive!: boolean;

  /**
   * при смене радиобаттона передаю выбранное значение
   */
  changeFilter(): void {
    this.$emit("btn-radio-change", this.btnTitle);
  }
}
</script>

<style lang="less">
.input-radio {
  display: none;
  & + label {
    display: block;
    margin: 0 0 10px;
    padding: 0 0 0 35px;
    cursor: pointer;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0px;
      width: 16px;
      height: 16px;
      border: 4px solid #b8b8b8;
      border-radius: 50%;
    }
  }
}
.form__type--checked::after {
  content: "";
  position: absolute;
  top: 8px;
  left: 8px;
  width: 8px;
  height: 8px;
  background-color: #b8b8b8;
  border-radius: 50%;
}
</style>
