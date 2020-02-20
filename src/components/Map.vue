<template>
  <div id="ymap" style="width: 100%; height: 100%;"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Map extends Vue {
  // когда экземпляр был создан
  created(): void {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    ymaps.ready(() => {
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      const map = new ymaps.Map("ymap", {
        center: [59.838349, 30.174401],
        zoom: 17
      });

      if (map) {
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        ymaps.modules.require(["Placemark", "Circle"], function(
          Placemark: any,
          Circle: any
        ) {
          const placemark = new Placemark([59.838349, 30.174401]);
          map.geoObjects.add(placemark);
        });
      }
    });
  }
}
</script>

<style lang="less"></style>
