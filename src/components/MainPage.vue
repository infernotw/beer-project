<template>
  <div class="main-page">
    <div class="block-wrapper" :style="concatedBlockHeight">
      <Block msg="qwe" />
    </div>
    <div class="block-wrapper" :style="concatedBlockHeight">
      <Block msg="ewq" />
    </div>
    <div class="block-wrapper" :style="concatedBlockHeight">
      <Block msg="wqe" />
    </div>
    <div class="block-wrapper" :style="concatedBlockHeight">
      <Block>
        <MapActivator />
      </Block>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Block from "./Block.vue";
import MapActivator from "./MapActivator.vue";
import { IDataObjMainPage } from "../interfaces";

// подключение сторонних компонентов
@Component({
  components: {
    Block,
    MapActivator
  }
})
/**
 * компонент главной страницы, где происходит
 * изменение размеров страницы, исходя из пользовательского разрешения
 */
export default class MainPage extends Vue {
  // изменяемая дата
  data(): IDataObjMainPage {
    return {
      blockHeight: null,
      concatedBlockHeight: ""
    };
  }

  // до монтирования
  beforeMount(): void {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    this.blockHeight = document.documentElement.clientHeight;
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    this.concatedBlockHeight = this.getBlockHeight(this.blockHeight);
  }

  // когда экземпляр был создан
  created(): void {
    // подписываюсь на ресайз окна
    window.addEventListener("resize", () => {
      const newClientHeight = document.documentElement.clientHeight;
      // смотрю за высотой клиентского окна
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      if (newClientHeight !== this.blockHeight) {
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        this.blockHeight = document.documentElement.clientHeight;
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        this.concatedBlockHeight = this.getBlockHeight(this.blockHeight);
      }
    });
  }

  /**
   * метод для вычисления высоты блока
   * @param {number} height высота блока
   */
  getBlockHeight(height: number): string {
    return "height: " + (height - 80) + "px";
  }
}
</script>

<style lang="less">
.main-page {
  margin: 0;
  padding: 80px 0 0;
}
.block-wrapper {
  width: 100%;
  &:nth-child(even) {
    background-color: rgb(226, 172, 172);
  }
  &:nth-child(odd) {
    background-color: rgb(163, 165, 156);
  }
}
</style>
