<template>
  <button
    class="page-changer"
    v-on:click="clickHandler()"
  >{{ isMainPage ? "В каталог" : "На главную" }}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
/**
 * компонент переключения между главной и каталогом
 * изменение текста, отображаемого на кнопке
 */
export default class PageChanger extends Vue {
  // флаг на то, главная ли страница или каталог
  private isMainPage: boolean = true;

  clickHandler(): void {
    // подписка на событие клика, при клике меняю флаг и шлю событие выше чтобы поменять страницу
    this.isMainPage = !this.isMainPage;
    this.$emit("page_change", this.isMainPage);
  }
}
</script>

<style lang="less">
.page-changer {
  margin: 0;
  padding: 15px;
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 100;
  cursor: pointer;
}
.scroll {
  box-shadow: 0 2px 24px 0 rgba(83, 92, 90, 0.38);
}
</style>
