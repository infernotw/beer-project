<template>
  <div id="app">
    <div class="main-wrapper">
      <vue-scroll :ops="scrollOptions" @handle-scroll="scrollHandler">
        <header class="page-header" :class="hasHeaderShadow ? 'scroll' : ''">
          <PageChanger v-on:page_change="changePage" />
        </header>
        <MainPage v-if="isMainPage" />
        <Catalog v-if="!isMainPage" />
      </vue-scroll>
      <div class="map-wrapper" v-if="isMapShowed">
        <div class="map-mock"></div>
        <div class="map-container">
          <button class="map-btn" v-on:click="closeMap()">X</button>
          <Map />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Catalog from "./components/Catalog.vue";
import MainPage from "./components/MainPage.vue";
import PageChanger from "./components/PageChanger.vue";
import Block from "./components/Block.vue";
import Map from "./components/Map.vue";
import vuescroll from "vuescroll";
import { EventBus } from "./bus";
import { IBar, IScrollOptions, IVertical, IDataObjApp } from "./interfaces";

// подключаю сторонний scroll
Vue.component("vue-scroll", vuescroll);

@Component({
  data(): IDataObjApp {
    return {
      isMainPage: true,
      hasHeaderShadow: false,
      isMapShowed: false,
      scrollOptions: {
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#c1c1c1",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false
        }
      }
    };
  },

  components: {
    Catalog,
    MainPage,
    PageChanger,
    Map
  },

  created(): void {
    EventBus.$on("map_activator_clicked", () => {
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      this.isMapShowed = true;
    });
  },

  methods: {
    changePage(isMain: boolean): void {
      // поймал событие, поменял флаг - поменял страницу
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      this.isMainPage = isMain;
    },

    closeMap(): void {
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      this.isMapShowed = false;
    },

    /**
     * произошел скролл страницы - добавил тень, в изначальном
     * положении тени у шапки не будет
     * @param {IVertical} vertical параметры вертикального скролла
     */
    scrollHandler(vertical: IVertical): void {
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      this.hasHeaderShadow = !!vertical.scrollTop;
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  font-size: 13px;
}
a {
  text-decoration: none;
}
img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  //   margin-top: 60px;
}
.main-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
}
.page-header {
  width: 100%;
  height: 80px;
  position: fixed;
  z-index: 100;
  background-color: #fff;
}
.catalog-items {
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: center;
  //   align-items: center;
}
.page-header__logo {
}
.map {
  &-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  &-mock {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  &-container {
    position: absolute;
    width: 500px;
    height: 500px;
    left: calc(~"50% - 250px");
    top: calc(~"50% - 250px");
    z-index: 150;
    box-shadow: 0 0 9px 0px rgba(0, 0, 0, 0.4);
  }
  &-btn {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: #000;
    color: #fff;
  }
}
</style>
