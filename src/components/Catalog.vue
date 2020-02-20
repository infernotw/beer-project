<template>
  <section class="catalog">
    <div class="container">
      <div class="catalog__container">
        <div class="filter">
          <h3 class="catalog__title">Фильтр:</h3>
          <div class="filter__form" method="post" action="#" name="filter">
            <fieldset class="form__range">
              <FilterController
                v-on:btn-radio-change="filterHandler"
                :optionsData="btnsOpts"
                :isRadio="true"
              />
            </fieldset>

            <FilterController
              v-on:btn-checkbox-change="filterBeerHandler"
              :optionsData="filterOptionsBeer"
              :isRadio="false"
              fltrTitle="Пиво"
            />

            <FilterController
              v-on:btn-checkbox-change="filterSnacksHandler"
              :optionsData="filterOptionsSnacks"
              :isRadio="false"
              fltrTitle="Закуски"
            />
          </div>
        </div>
        <div class="catalog__products">
          <div class="catalog__sort">
            <h3 class="catalog__name">Сортировка:</h3>
            <ul class="sort__list">
              <Sort
                v-for="item in sortOptions"
                :name="item.name"
                :key="item.name"
                :isActive="item.isActive"
              />
            </ul>
          </div>
          <div class="catalog-items">
            <div class="catalog-items-wrapper" v-if="filterType !== 'Только закуски'">
              <h1 class="title">Ассортимент пива:</h1>
              <Product
                v-for="item of usedBeerData"
                :photo="item.photo"
                :key="item.productName"
                :productName="item.productName"
                :creater="item.creater"
                :beerType="item.beerType"
                :beerSort="item.beerSort"
                :alcoPercent="item.alcoPercent"
                :density="item.density"
                :price="item.price"
                :isBeerCard="true"
              />
            </div>
            <div class="catalog-items-wrapper" v-if="filterType !== 'Только пиво'">
              <h1 class="title">Ассортимент закусок:</h1>
              <Product
                v-for="item in usedSnacksData"
                :photo="item.photo"
                :key="item.productName"
                :description="item.description"
                :productName="item.productName"
                :price="item.price"
                :isBeerCard="false"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="catalog__container">
        <div class="catalog-items"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Product from "./Card.vue";
import FilterInput from "./FilterInput.vue";
import Sort from "./Sort.vue";
import FilterController from "./FilterController.vue";
import {
  beerData,
  snacksData,
  filterOptionsChoose,
  filterOptionsSnacks,
  filterOptionsBeer,
  sortOptions,
  btnsOpts
} from "../data";
import { ICheckboxData } from "../interfaces";

// подключение сторонних компонентов
@Component({
  components: {
    Product,
    FilterInput,
    Sort,
    FilterController
  }
})
/**
 * полный компонент каталога, учитывающий все кнопки и массивы данных.
 * тут происходит финальная фильтрация массива по чекбоксам и отображение его на странцие.
 * так же смена активного фильтра радиобаттона.
 */
export default class Catalog extends Vue {
  data(): Object {
    return {
      usedBeerData: beerData,
      usedSnacksData: snacksData,
      filterOptionsChoose,
      sortOptions,
      filterType: "Весь ассортимент",
      btnsOpts,
      filterOptionsSnacks,
      filterOptionsBeer
    };
  }

  /**
   * обработчик события смены фильтра
   * @param {string} filterType тип фильтра все/пиво/закуски
   */
  filterHandler(filterType: string): void {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    this.filterType = filterType;
  }

  /**
   * получение нового массива, соответствующего чекнутым инпутам
   * @param {[]} checkboxState полученный массив инпутов
   * @param {ICheckboxData[]} data данные для фильтрации
   * @returns {Object[]}
   */
  getFiltredData(checkboxState: [], data: ICheckboxData[]): Object[] {
    // копия массива
    const sourceData = [...data];

    // условие, если ни один чекбокс не чекнут, возвращаю изначальный массив без изменений
    if (!checkboxState.length) {
      return sourceData;
    }

    const newData: any = [];

    // проверяю наличие условия в изначальном массиве
    checkboxState.forEach(filter => {
      sourceData.forEach(el => {
        if (el.type === filter) {
          newData.push(el);
        }
      });
    });

    return newData;
  }

  /**
   * обработчик события нажатия на чекбокс фильтра пива
   * @param {ICheckboxData[]} data данные для фильтрации
   */
  filterBeerHandler(data: ICheckboxData[]): void {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    this.usedBeerData = this.getFiltredData(data, beerData);
  }

  /**
   * обработчик события нажатия на чекбокс фильтра закусок
   * @param {ICheckboxData[]} data данные для фильтрации
   */
  filterSnacksHandler(data: ICheckboxData[]): void {
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    this.usedSnacksData = this.getFiltredData(data, snacksData);
  }
}
</script>

<style lang="less">
h3 {
  margin-left: 20px;
}
.catalog {
  max-width: 1440px;
  padding: 80px 0;
  margin: 0 auto;
}
.catalog__products {
  width: 100%;
}
.catalog-items {
  padding: 0;
  margin: 0 -10px;
}
.title {
  font-size: 30px;
  width: 100%;
  line-height: 1;
  font-weight: 400;
  padding-top: 20px;
  margin: 0 0 20px;
  display: flex;
  justify-content: center;
}
.container {
  padding: 0 20px;
}
.filter {
  flex-basis: 33.3333%;
  margin: 0 20px 0 0;
  text-transform: uppercase;
}
.catalog__title,
.catalog__sort {
  font-size: 13px;
  margin: 0 0 10px;
  padding: 11px 19px;
  background: #f5d6a1;
  border-radius: 3px;
  font-weight: 400;
  color: #000;
  text-transform: uppercase;
}
.catalog__container {
  display: flex;
}
.catalog__sort {
  display: flex;
  justify-content: space-between;
}
.catalog-items-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.catalog__name {
  font-size: 13px;
  margin: 0;
  font-weight: 400;
  color: #000;
  text-transform: uppercase;
}
.sort__list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}
.sort__item {
  color: #111;
  text-align: center;
  margin: 0;
  padding: 0 10px;
  margin-right: 10px;
  box-sizing: border-box;
}
@media (min-width: 1280px) {
  .filter {
    flex-basis: 20%;
  }
}
@media (min-width: 1440px) {
  .filter {
    flex-basis: 17%;
  }
}
</style>
