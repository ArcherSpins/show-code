import {
  getCurrentCurrencyIcon,
  getCurrentDepositProductById,
  getCurrentOrderById,
  getCurrentPercent,
  getCurrentMinAmountMoney,
  getCurrentMaxAmountMoney,
  getCurrentMinDayOfPlacement,
  getCurrentMaxDayOfPlacement,
  convertToStringUTCDate,
  getFormattedLastUpdateTime,
} from "./utils";
import { CURRENCIES_LIST } from "../constants";
import { DepositsList } from "../mock-data/deposits-list";
import { OrdersList } from "../mock-data/orders-list";

describe("getCurrentCurrencyIcon", () => {
  test("возвращает кастомизированную иконку валюты по ее коду", () => {
    expect(getCurrentCurrencyIcon("RUB")).toEqual(CURRENCIES_LIST[0].icon());
    expect(getCurrentCurrencyIcon("USD")).toEqual(CURRENCIES_LIST[1].icon());
    expect(getCurrentCurrencyIcon("EUR")).toEqual(CURRENCIES_LIST[2].icon());
    expect(getCurrentCurrencyIcon("USD")).not.toEqual(
      CURRENCIES_LIST[0].icon()
    );
  });
});

describe("getCurrentDeposit", () => {
  test("возвращает элемент из списка (массива) депозитов по его id", () => {
    expect(getCurrentDepositProductById(DepositsList, "DEPO-01")).toEqual(
      DepositsList[0]
    );
    expect(getCurrentDepositProductById(DepositsList, "DEPO-03")).toEqual(
      DepositsList[2]
    );
    expect(getCurrentDepositProductById(DepositsList, "DEPO-02")).not.toEqual(
      DepositsList[3]
    );
  });
});

describe("getCurrentOrderById", () => {
  test("возвращает элемент из списка (массива) заявок по его id", () => {
    expect(
      getCurrentOrderById(OrdersList, "3fa85f64-5717-4562-b3fc-2c963f66afa7")
    ).toEqual(OrdersList[0]);
    expect(
      getCurrentOrderById(OrdersList, "3fa85f64-5717-4562-b3fc-2c963f66afa6")
    ).toEqual(OrdersList[1]);
    expect(
      getCurrentOrderById(OrdersList, "3fa85f64-5717-4562-b3fc-2c963f66afa7")
    ).not.toEqual(OrdersList[1]);
  });
});

describe("getCurrentPercent", () => {
  test("возвращает значение процентов для данной валюты выбранного депозита", () => {
    expect(getCurrentPercent(DepositsList[0].percentCurrencies, "RUB")).toEqual(
      7.5
    );
    expect(getCurrentPercent(DepositsList[0].percentCurrencies, "EUR")).toEqual(
      4.5
    );
    expect(getCurrentPercent(DepositsList[2].percentCurrencies, "RUB")).toEqual(
      6.5
    );
    expect(getCurrentPercent(DepositsList[3].percentCurrencies, "RUB")).toEqual(
      5.5
    );
    expect(
      getCurrentPercent(DepositsList[1].percentCurrencies, "USD")
    ).not.toEqual(11.42);
    expect(
      getCurrentPercent(DepositsList[0].percentCurrencies, "USD")
    ).not.toEqual("23");
  });
});

describe("getCurrentMinAmountMoney", () => {
  test("возвращает минимальное значение возможных к размещению денежных средств для данной валюты выбранного депозита", () => {
    expect(
      getCurrentMinAmountMoney(DepositsList[0].moneyRanges, "RUB")
    ).toEqual(0.01);
    expect(
      getCurrentMinAmountMoney(DepositsList[1].moneyRanges, "USD")
    ).toEqual(1);
    expect(
      getCurrentMinAmountMoney(DepositsList[2].moneyRanges, "EUR")
    ).toEqual(1);
    expect(
      getCurrentMinAmountMoney(DepositsList[0].moneyRanges, "USD")
    ).not.toEqual(3425);
    expect(
      getCurrentMinAmountMoney(DepositsList[0].moneyRanges, "USD")
    ).not.toEqual("0.01");
  });
});

describe("getCurrentMaxAmountMoney", () => {
  test("возвращает максимальное значение возможных к размещению денежных средств для данной валюты выбранного депозита", () => {
    expect(
      getCurrentMaxAmountMoney(DepositsList[0].moneyRanges, "RUB")
    ).toEqual(1000000000);
    expect(
      getCurrentMaxAmountMoney(DepositsList[1].moneyRanges, "USD")
    ).toEqual(1000000000);
    expect(
      getCurrentMaxAmountMoney(DepositsList[2].moneyRanges, "EUR")
    ).toEqual(1000000000);
    expect(
      getCurrentMaxAmountMoney(DepositsList[0].moneyRanges, "USD")
    ).not.toEqual(3425);
    expect(
      getCurrentMaxAmountMoney(DepositsList[0].moneyRanges, "USD")
    ).not.toEqual("0.01");
  });
});

describe("getCurrentMinDayOfPlacement", () => {
  test("возвращает минимальное значение периода размещения денежных средств для данной валюты выбранного депозита", () => {
    expect(
      getCurrentMinDayOfPlacement(DepositsList[0].placementRanges, "RUB")
    ).toEqual(1);
    expect(
      getCurrentMinDayOfPlacement(DepositsList[1].placementRanges, "USD")
    ).toEqual(1);
    expect(
      getCurrentMinDayOfPlacement(DepositsList[2].placementRanges, "EUR")
    ).toEqual(1);
    expect(
      getCurrentMinDayOfPlacement(DepositsList[0].placementRanges, "USD")
    ).not.toEqual(561);
    expect(
      getCurrentMinDayOfPlacement(DepositsList[0].placementRanges, "USD")
    ).not.toEqual("23");
  });
});

describe("getCurrentMaxDayOfPlacement", () => {
  test("возвращает максимальное значение периода размещения денежных средств для данной валюты выбранного депозита", () => {
    expect(
      getCurrentMaxDayOfPlacement(DepositsList[0].placementRanges, "RUB")
    ).toEqual(3);
    expect(
      getCurrentMaxDayOfPlacement(DepositsList[1].placementRanges, "USD")
    ).toEqual(2);
    expect(
      getCurrentMaxDayOfPlacement(DepositsList[2].placementRanges, "EUR")
    ).toEqual(2);
    expect(
      getCurrentMaxDayOfPlacement(DepositsList[0].placementRanges, "USD")
    ).not.toEqual(56);
    expect(
      getCurrentMaxDayOfPlacement(DepositsList[0].placementRanges, "USD")
    ).not.toEqual("23");
  });
});

describe("convertToStringUTCDate", () => {
  test("возвращает дату в UTC согласно часовому поясу", () => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const currentDateTest1 = new Date("2022-01-08T15:00:00");
    currentDateTest1.setMinutes(currentDateTest1.getMinutes() - timezoneOffset);
    const currentDateTest2 = new Date("2022-01-05T17:00:00");
    currentDateTest2.setMinutes(currentDateTest2.getMinutes() - timezoneOffset);

    expect(convertToStringUTCDate("2022-01-08T15:00:00")).toEqual(
      String(currentDateTest1)
    );
    expect(convertToStringUTCDate("2022-01-05T17:00:00")).toEqual(
      String(currentDateTest2)
    );
    expect(convertToStringUTCDate("2022-01-08T15:00:00")).not.toEqual(
      String(currentDateTest2)
    );
  });
});

describe("getFormattedLastUpdateTime", () => {
  test("возвращает форматированную дату последнего обновления для отображения на главной странице раздела", () => {
    expect(getFormattedLastUpdateTime("Sat Jan 08 2022 18:00:00")).toEqual(
      "18:00 08.01.2022"
    );
    expect(getFormattedLastUpdateTime("Wed Jan 05 2022 20:00:00")).toEqual(
      "20:00 05.01.2022"
    );
    expect(getFormattedLastUpdateTime("Sat Jan 08 2022 18:00:00")).not.toEqual(
      "20:00 05.01.2022"
    );
  });
});
