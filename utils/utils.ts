import { AmountCurrencyType } from "@rshb/core-ui";
import { convertIsoDateToObject } from "@rshb/deprecated/utils";
import { CURRENCIES_LIST, PAYMENT_TYPE_LIST } from "../constants";
import {
  DepositsProductsList,
  PercentCurrencies,
  MoneyRanges,
  PlacementRanges,
} from "../../model/deposits-products/types";
import { PaymentType } from "../../model/orders/types";
import { OrdersList } from "../../model/deposits/types";

export const getCurrentCurrencyIcon = (currency: string) =>
  CURRENCIES_LIST.find((item) => item.value === currency).icon();

export const getCurrentDepositProductById = (
  depositsProductsList: DepositsProductsList,
  idSelectedDepositProduct: string
) => {
  const currentDepositProductIndex = depositsProductsList.findIndex(
    (depositProduct) => depositProduct.id === idSelectedDepositProduct
  );
  const currentDepositProduct =
    depositsProductsList[currentDepositProductIndex];
  return currentDepositProduct;
};

export const getCurrentOrderById = (
  ordersList: OrdersList,
  orderId: string
) => {
  const currentOrderIndex = ordersList.findIndex(
    (order) => order.id === orderId
  );
  const currentOrder = ordersList?.[currentOrderIndex];
  return currentOrder;
};

export const getCurrentDepositProductByName = (
  depositsProductsList: DepositsProductsList,
  nameSelectedDepositProduct: string
) => {
  const currentDepositProductIndex = depositsProductsList.findIndex(
    (depositProduct) => depositProduct.name === nameSelectedDepositProduct
  );
  const currentDepositProduct =
    depositsProductsList[currentDepositProductIndex];
  return currentDepositProduct;
};

export const getCurrentPercent = (
  percentCurrencies: PercentCurrencies,
  currentCurrency: string
) =>
  percentCurrencies.filter((item) => item.currency === currentCurrency)?.[0]
    ?.percent;

export const getCurrentMinAmountMoney = (
  moneyRanges: MoneyRanges,
  currentCurrency: string
) =>
  moneyRanges.filter((item) => item.currency === currentCurrency)?.[0]
    ?.minAmountMoney;

export const getCurrentMaxAmountMoney = (
  moneyRanges: MoneyRanges,
  currentCurrency: string
) =>
  moneyRanges.filter((item) => item.currency === currentCurrency)?.[0]
    ?.maxAmountMoney;

export const getCurrentMinDayOfPlacement = (
  placementRanges: PlacementRanges,
  currentCurrency: string
) =>
  placementRanges.filter((item) => item.currency === currentCurrency)?.[0]
    ?.minPeriod;

export const getCurrentMaxDayOfPlacement = (
  placementRanges: PlacementRanges,
  currentCurrency: string
) =>
  placementRanges.filter((item) => item.currency === currentCurrency)?.[0]
    ?.maxPeriod;

// функция для получения соответствия типов для корректной работы с компонентом Amount при мультивалютности
export const getCurrencyType = (currency: string) =>
  currency as AmountCurrencyType;

// функция для получения соответствия типов переменной paymentType при отравке запросов на сервер
export const getPaymentType = (payment: string) => payment as PaymentType;

export const convertToStringUTCDate = (date: string) => {
  const updDate = new Date(date);
  const updYear = updDate.getFullYear();
  const updMonth = updDate.getMonth();
  const updDay = updDate.getDate();
  const updHour = updDate.getHours();
  const updMinutes = updDate.getMinutes();

  return String(
    new Date(Date.UTC(updYear, updMonth, updDay, updHour, updMinutes))
  );
};

export const getFormattedLastUpdateTime = (date: string) => {
  const dateAsObj = convertIsoDateToObject(date);
  return `${dateAsObj.hour}:${dateAsObj.min} ${dateAsObj.date}.${dateAsObj.month}.${dateAsObj.year}`;
};

export const getPaymentTypeLabel = (paymentType: string) =>
  PAYMENT_TYPE_LIST.find((type) => type?.value === paymentType)?.label;
