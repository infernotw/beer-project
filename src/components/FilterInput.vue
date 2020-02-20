<template>
  <div class="form__input">
    <input
      class="input-checkbox"
      v-model="isChecked"
      :value="value"
      :name="name"
      :type="type"
      :id="idName"
    />
    <label class="form__type" :for="idName">{{ text }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
/**
 * компонент инпута чекбокса
 * при чеке бокса получаю его значение
 */
export default class FilterInput extends Vue {
  @Prop() protected text!: string;
  @Prop() protected name!: string;
  @Prop() protected idName!: string;
  @Prop() protected value!: string;
  @Prop() protected type!: string;

  data(): Object {
    return {
      isChecked: false
    };
  }

  // получаю значения чекнутого бокса
  beforeUpdate(): void {
    this.$emit("checkbox-change", {
      value: this.value
    });
  }
}
</script>

<style lang="less">
.input-checkbox {
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
      height: 17px;
      width: 17px;
      border-radius: 4px;
      background-color: transparent;
      border: 3px solid #c1c1c1;
      left: 0;
      top: 0;
    }
  }
  &:checked + label::after {
    content: "";
    display: block;
    width: 6px;
    height: 16px;
    background-color: transparent;
    border-radius: 1px;
    position: absolute;
    border-bottom: 5px solid #c1c1c1;
    border-right: 5px solid #c1c1c1;
    transform: rotate(45deg);
    left: 10px;
    top: -4px;
  }
}
.form__type {
  display: inline-flex;
  align-items: center;
  line-height: 23px;
}
</style>
