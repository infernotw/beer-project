<template>
  <div class="product">
    <div class="product-container">
      <div class="product-block" :class="isItemClass ? '' : 'flip'" v-on:click="clickHandler()">
        <figure class="product-card product-card--front">
          <img :src="photo" alt="Фотография" class="product-block__img" />
          <h2 class="product-card-title">{{ productName }}</h2>
          <span v-if="price" class="product-about">
            от {{ Math.round(price - price * 0.2) }} ₽/
            <sub>{{ isBeerCard ? "л" : "100гр" }}</sub>
          </span>
          <span v-else-if="price" class="product-about">
            от {{ Math.round(price - price * 0.2) }} ₽/
            <sub>100гр</sub>
          </span>
        </figure>
        <figure class="product-card product-card--back">
          <table class="product-card-info">
            <caption class="product-card-title">
              {{
              productName
              }}
            </caption>
            <tr v-if="creater" class="product-card-cell product-card-cell--creater">
              <td>Производитель:</td>
              <td>{{ creater }}</td>
            </tr>
            <tr v-if="beerType" class="product-card-cell">
              <td>Тип:</td>
              <td>{{ beerType }}</td>
            </tr>
            <tr v-if="beerSort" class="product-card-cell">
              <td>Сорт:</td>
              <td>{{ beerSort }}</td>
            </tr>
            <tr v-if="alcoPercent" class="product-card-cell">
              <td>Крепость:</td>
              <td>{{ alcoPercent }} %</td>
            </tr>
            <tr v-if="density" class="product-card-cell">
              <td>Плотность:</td>
              <td>{{ density }} %</td>
            </tr>
            <tr v-if="description" class="product-card-cell">
              <td>Описание:</td>
              <td>{{ description }}</td>
            </tr>
          </table>
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
/**
 * компонент карточки товара, в котором просиходит анимация
 * показа дополнительной информации, а так же правильное отображение
 * информации, в зависимости от типа карточки (пиво, закуски)
 */
export default class Product extends Vue {
  @Prop() protected productName!: string;
  @Prop() protected creater!: string;
  @Prop() protected beerType!: string;
  @Prop() protected beerSort!: string;
  @Prop() protected alcoPercent!: string;
  @Prop() protected density!: string;
  @Prop() protected price!: number;
  @Prop() protected photo!: string;
  @Prop() protected description!: string;
  @Prop() protected isBeerCard!: boolean;
  protected isItemClass: boolean = true;

  /**
   * обработчик на показ доп инфы
   */
  clickHandler(): void {
    this.isItemClass = !this.isItemClass;
  }
}
</script>

<style lang="less">
.product {
  text-align: center;
  margin: 0;
  flex-basis: 50%;
  height: 365px;
  padding: 10px;
  box-sizing: border-box;
  &-container {
    position: relative;
    perspective: 600px;
    height: 100%;
  }
  &-about {
    display: inline-block;
    text-align: center;
    font-weight: 500;
    width: 100%;
    padding: 10px 15px;
    text-transform: uppercase;
    border: none;
    background: #fff;
    color: #111;
    font-size: 16px;
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: 0 5px 0 #cdcdcd;
  }
  &-block {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    cursor: pointer;
  }
  &-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    position: absolute;
    background-color: #ecebeb;
    backface-visibility: hidden;
    height: 100%;
    user-select: none;
    &--front {
      margin: 0;
    }
    &--back {
      margin: 0;
      height: inherit;
      transform: rotateY(180deg);
    }
    &--back .product-card-title {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    &-cell {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      text-align: right;
      border-bottom: 1px solid #cdcdcd;
      &--creater {
        text-align: center;
        align-items: center;
        flex-direction: column;
        & td {
          min-height: 25px;
          &:first-child {
            font-weight: bold;
          }
          &:last-child {
            font-weight: 400;
            margin-bottom: 5px;
          }
        }
      }
    }
    &-info {
      height: 100%;
      justify-content: center;
      display: flex;
      flex-direction: column;
    }
  }
  .flip {
    transform: rotateY(180deg);
  }
}
.product-block__img {
  height: 160px;
  margin: 0 auto;
}
td {
  display: flex;
  align-items: center;
  min-height: 34px;
  max-width: 140px;
}
td:last-child {
  font-weight: bold;
}
@media (min-width: 1280px) {
  .product {
    flex-basis: 25%;
  }
}
@media (min-width: 1440px) {
  .product {
    flex-basis: 20%;
  }
}
</style>
