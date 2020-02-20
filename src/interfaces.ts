/**
 * интерфейс описывающий бар для скролла
 */
export interface IBar {
   showDelay: number;
   onlyShowBarOnScroll: boolean;
   keepShow: boolean;
   background: string;
   opacity: number;
   hoverStyle: boolean;
   specifyBorderRadius: false | string;
   minSize: number;
   size: string;
   disable: boolean;
}

/**
 * общий интерфейс скролла
 */
export interface IScrollOptions {
   bar: IBar;
}

/**
 * интерфейс сдвига скролла по вертикали
 */
export interface IVertical {
   type: string;
   process: number;
   barSize: number;
   scrollTop: number;
}

/**
 * интерфейс для data
 */
export interface IDataObjApp {
   isMainPage: boolean;
   isMapShowed: boolean;
   hasHeaderShadow: boolean;
   scrollOptions: IScrollOptions;
}

export interface IDataObjMainPage {
   blockHeight?: number | null;
   concatedBlockHeight?: string;
}

// интерфейс измененного массива
export interface ICheckboxData {
   photo: string;
   productName: string;
   creater?: string;
   beerType?: string;
   beerSort?: string;
   alcoPercent?: number;
   density?: number;
   price: number;
   type: string;
   description?: string;
   isChecked?: boolean;
   value: string;
}

export interface IOptionsData {
   name?: string;
}
