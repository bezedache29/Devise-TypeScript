type DeviseType = {
  name: string;
  code: string;
  symbol: string;
  rate: number;
};

const currencies: DeviseType[] = [];

const dollar: DeviseType = {
  name: "Dollar",
  code: "Dol",
  symbol: "$",
  rate: 1,
};
const euro: DeviseType = {
  name: "Euro",
  code: "Eur",
  symbol: "€",
  rate: 1.2,
};
const livre: DeviseType = {
  name: "Livre",
  code: "Liv",
  symbol: "£",
  rate: 1.39,
};
const yuan: DeviseType = {
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

const currency = document.querySelector("#currency")! as HTMLSelectElement;
const currencyConvert = document.querySelector(
  "#currency-convert"
)! as HTMLSelectElement;

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

let mount: number = 0;
let curSelected = currency.value;
let curConvertSelected = currencyConvert.value;

const mountInput = document.querySelector("#mount")! as HTMLInputElement;

const calcul = (cur: string, curConvert: string, mount: number): number => {
  let initCurrencyObject: unknown = getCurrency(cur);
  let initCurrencyConvertObject: unknown = getCurrency(curConvert);

  let initCurrency: DeviseType;
  let initCurrencyConvert: DeviseType;

  if (initCurrencyObject) {
    initCurrency = initCurrencyObject as DeviseType;
  } else {
    throw { message: "La devise initiale n'est pas correcte" };
  }

  if (initCurrencyConvertObject) {
    initCurrencyConvert = initCurrencyConvertObject as DeviseType;
  } else {
    throw { message: "La devise finale n'est pas correcte" };
  }

  return (mount * initCurrency.rate) / initCurrencyConvert.rate;
};

const getCurrency = (code: string): DeviseType | null => {
  for (const cur of currencies) {
    if (cur.code === code) {
      return cur;
    }
  }
  return null;
};

const result = () => {
  const resultInput = document.querySelector("#result")!;
  resultInput.innerHTML = calcul(
    curSelected,
    curConvertSelected,
    mount
  ).toString();
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
