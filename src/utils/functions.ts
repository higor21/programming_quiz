export const abbreviateName = (name: string | null) => {
  if (name) {
    const array = name.split(' ');
    return array.length > 1 ? `${array[0]} ${array[1]}` : array[0];
  }
  return '';
};

export const objectToArray = (obj: any) => {
  if (obj) {
    const keys = Object.keys(obj);
    return keys.map((k) => ({ value: k, label: obj[k] }));
  }
  return [];
};

export const arrayToSelectValues = (arr: any[], obj: any) => {
  return arr.map((elem) => ({
    value: elem.toString(),
    label: obj[elem],
  }));
};

export const defaultLocal = () => ({
  locate: 'São Gonçalo do Amarante',
  state: 'RN',
});

// remove any caracter that's not a digit
export const stringToNumber = (str: string) => {
  return str && str.replace(/\D/g, '');
};

// transform string in cep, if possible
export const cepLead = (cep: string) => {
  if (cep) {
    const cepTemp = stringToNumber(cep);
    return `${cepTemp.slice(0, 2)}${cepTemp.length > 2 ? '.' : ''}${cepTemp.slice(2, 5)}${
      cepTemp.length > 5 ? '-' : ''
    }${cepTemp.slice(5)}`.slice(0, 10);
  }
  return null;
};

export const validateCPF = (strCPF: string) => {
  let sum;
  let rest;
  sum = 0;
  if (strCPF === '00000000000') {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(strCPF.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(strCPF.substring(10, 11), 10)) {
    return false;
  }
  return true;
};
