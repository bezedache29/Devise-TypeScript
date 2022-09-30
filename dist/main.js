"use strict";
const currencies = [];
const dollar = {
    name: "Dollar",
    code: "Dol",
    symbol: "$",
    rate: 1,
};
const euro = {
    name: "Euro",
    code: "Eur",
    symbol: "€",
    rate: 1.2,
};
const livre = {
    name: "Livre",
    code: "Liv",
    symbol: "£",
    rate: 1.39,
};
const yuan = {
    name: "Yuan",
    code: "Yua",
    symbol: "¥",
    rate: 0.15,
};
currencies.push(dollar);
currencies.push(euro);
currencies.push(livre);
currencies.push(yuan);
console.log(currencies);
const currency = document.querySelector("#currency");
const currencyConvert = document.querySelector("#currency-convert");
for (const cur of currencies) {
    const option = document.createElement("option");
    option.value = cur.code;
    option.text = `${cur.name} - ${cur.symbol}`;
    currency.appendChild(option);
}
for (const cur of currencies) {
    const option = document.createElement("option");
    option.value = cur.code;
    option.text = `${cur.name} - ${cur.symbol}`;
    currencyConvert.appendChild(option);
}
//-----
let mount = 0;
let curSelected = currency.value;
let curConvertSelected = currencyConvert.value;
const mountInput = document.querySelector("#mount");
const calcul = (cur, curConvert, mount) => {
    let initCurrencyObject = getCurrency(cur);
    let initCurrencyConvertObject = getCurrency(curConvert);
    let initCurrency;
    let initCurrencyConvert;
    if (initCurrencyObject) {
        initCurrency = initCurrencyObject;
    }
    else {
        throw { message: "La devise initiale n'est pas correcte" };
    }
    if (initCurrencyConvertObject) {
        initCurrencyConvert = initCurrencyConvertObject;
    }
    else {
        throw { message: "La devise finale n'est pas correcte" };
    }
    return (mount * initCurrency.rate) / initCurrencyConvert.rate;
};
const getCurrency = (code) => {
    for (const cur of currencies) {
        if (cur.code === code) {
            return cur;
        }
    }
    return null;
};
const result = () => {
    const resultInput = document.querySelector("#result");
    resultInput.innerHTML = calcul(curSelected, curConvertSelected, mount).toString();
};
mountInput.addEventListener("input", () => {
    mount = +mountInput.value;
    result();
});
currency.addEventListener("change", () => {
    curSelected = currency.value;
    result();
});
currencyConvert.addEventListener("change", () => {
    curConvertSelected = currencyConvert.value;
    result();
});
//# sourceMappingURL=main.js.map