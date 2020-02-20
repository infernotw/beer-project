<template>
  <div>
    <div v-if="isRadio" class="filter-choose">
      <BaseInput
        v-for="item in optionsData"
        :btnTitle="item.name"
        :key="item.name"
        :isActive="item.name == activeBtn"
        v-on:btn-radio-change="changeFilter"
      />
    </div>
    <div v-else class="filter-options" :class="isOptionsClosed ? 'filter-options--closed' : ''">
      <div class="filter-option__head" v-on:click="clickHandler()">
        <h3>{{ fltrTitle }}</h3>
        <img src="/img/arrow-down-black.svg" alt="Стрелка" class="filter-options__img" />
      </div>
      <fieldset class="form__range">
        <div class="form__checkbox">
          <FilterInput
            v-for="item in optionsData"
            v-on:checkbox-change="changeCheckbox"
            :text="item.text"
            :key="item.text"
            :value="item.value"
            :type="item.type"
            :name="item.name"
            :idName="item.idName"
          />
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseInput from "./BaseInput.vue";
import FilterInput from "./FilterInput.vue";
import { IOptionsData, ICheckboxData } from "../interfaces";

@Component({
  components: {
    BaseInput,
    FilterInput
  }
})
/**
 * компонент, включающий в себя все инпуты для фильтрации.
 * в нем происходят смена активного радиобаттона, а так же
 * получение массива чекнутых чекбоксов, и дальнейшая передача
 * этих значений
 */
export default class FilterController extends Vue {
  @Prop() optionsData!: IOptionsData[];
  @Prop() isRadio!: boolean;
  @Prop() fltrTitle!: string;
  protected isOptionsClosed: boolean = true;

  // открытие/закрытие дополнительного фильтра
  clickHandler(): void {
    this.isOptionsClosed = !this.isOptionsClosed;
  }

  data() {
    return {
      activeBtn: "Весь ассортимент",
      checkboxState: []
    };
  }

  /**
   * обработчик события смены активного радиобаттона
   * @param {string} btnStr выбранный тип фильтра
   */
  changeFilter(btnStr: string): void {
    this.$emit("btn-radio-change", btnStr);
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    this.activeBtn = btnStr;
  }

  /**
   * получение массива чекнутых чекбоксов
   * @param {ICheckboxData} data данные для фильтрации
   */
  changeCheckbox(data: ICheckboxData): void {
    // полученное значение чекбокса
    const filterValue = data.value;
    // индекс полученного чекбокса
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    const filterIndex = this.checkboxState.indexOf(filterValue);
    // есть ли уже такой фильтр
    const hasFilter = filterIndex !== -1;

    // если есть, то удаляем его
    if (hasFilter) {
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      this.checkboxState.splice(filterIndex, 1);
    } else {
      // если нет, то добавляем
      // tslint:disable-next-line:ban-ts-ignore
      // @ts-ignore
      this.checkboxState.push(filterValue);
    }

    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    this.$emit("btn-checkbox-change", this.checkboxState);
  }
}
</script>

<style lang="less">
.filter-choose {
  height: 100%;
}
.filter-options {
  position: relative;
  cursor: pointer;
  border: 1px solid rgb(229, 229, 229);
  margin-bottom: 20px;
  border-left: none;
  border-right: none;
}
.form__range {
  border: none;
}
.filter-options--closed .form__range {
  display: none;
}
.filter-options__head {
  display: flex;
}
.filter-options__img {
  width: 12px;
  height: 12px;
  margin: 0;
  right: 20px;
  top: 18px;
  position: absolute;
  transform: scaleY(-1);
  transition: all ease-out 0.3s;
}
.filter-options--closed .filter-options__img {
  transform: scaleY(1);
}
</style>
