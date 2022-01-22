function calculator(str) {
    const arabNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const romNumber = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const operations = ['+', '-', '*', '/'];
    const arrOfParametrs = str.toUpperCase().split(' ');
    const leftParametr = arrOfParametrs[0];
    const operationParametr = arrOfParametrs[1];
    const rightParametr = arrOfParametrs[2];
    const arab_values = [1, 4, 5, 9, 10, 40, 50, 90, 100];
    const rom_values = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C'];
    let isRom = false;
    //проверки:
    if (arrOfParametrs.length !== 3) {
        throw 'Недопустимое колличество операндов' + str;
    }
    if (!containsValue(arrOfParametrs[1], operations)) {
        throw 'Недопустимая операция' + str;
    }
    //делаем конвертор arab-to-rom:
    function arabToRom(text) {
        if (!text) {
            return '';
        }
        let result = '';
        let n = arab_values.length - 1;
        while (text > 0) {
            if (text >= arab_values[n]) {
                result += rom_values[n];
                text -= arab_values[n];
            } else {
                n--;
            }
        }
        return result;
    }
    //делаем конвертер rom-to-arab:
    function romToArab(text) {
        text = text.toUpperCase();
        let result = 0;
        let numSign = 0;
        let n = arab_values.length - 1;
        while (n >= 0 && numSign < text.length) {
            if (text.substr(numSign, rom_values[n].length) == rom_values[n]) {
                result += arab_values[n];
                numSign += rom_values[n].length;
            } else {
                n--;
            }
        }
        return result;
    }

    function containsValue(text, values) {
        let result = false;
        for (let i = 0; i < values.length; i++) {
            if (text == values[i]) {
                return result = true;
            }
        }
        return result;
    }
    //функция калькулирования:
    function calculate(leftParam, oper, rightParam) {
        let left;
        let right;
        let result;
        getOperationsType(leftParam, rightParam);
        if (!isRom) {
            left = parseInt(leftParam);
            right = parseInt(rightParam);
        } else {
            left = romToArab(leftParam);
            right = romToArab(rightParam);
        }
        switch (oper) {
            case '+':
                result = String(left + right);
                return isRom ? arabToRom(result) : result;
            case '-':
                result = String(left - right);
                return isRom ? arabToRom(result) : result;
            case '*':
                result = String(left * right);
                return isRom ? arabToRom(result) : result;
            case '/':
                if (rightParam === 0) {
                    throw 'На ноль делить нельзя' + str;
                } else {
                    result = String(Math.trunc(left / right));
                    return isRom ? arabToRom(result) : result;
                }
            }
    }
    //проверяем на соответсвие операндов:
    function getOperationsType(leftParam, rightParam) {
        isRom = false;
        if (arabNumber.includes(+leftParam) && arabNumber.includes(+rightParam)) {
            isRom = false;
        } else if (romNumber.includes(leftParam) && romNumber.includes(rightParam)) {
            isRom = true;
        } else {
            throw 'Оба числа должны быть либо арабскими, либо римскими.' + str;
        }
    }
    return calculate(leftParametr, operationParametr, rightParametr);
}
console.log(calculator('1 + 2'));//3
console.log(calculator('3 + 5'));//8
console.log(calculator('8 - 1'));//7
console.log(calculator('4 / 2'));//2
console.log(calculator('10 - 10'));//0
console.log(calculator('10 / 10'));//1
console.log(calculator('10 + 10'));//20
console.log(calculator('10 * 10'));//100
console.log(calculator('5 / 2'));//2
console.log(calculator('2 / 4'));//0
console.log(calculator('I + I'));//2
console.log(calculator('III - I'));//2
console.log(calculator('V - iv'));//1
console.log(calculator('x + x'));//20
console.log(calculator('VI / II'));//3
console.log(calculator('II / III'));// пустая строка
console.log(calculator('1 - 10'));// -9





