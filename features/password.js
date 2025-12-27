import {isInside, selectRandom, shuffleString} from './utils.js';

const SYMBOLS = '@$*#&+-='; //Symbols to be chosen.

export function genPassword(size, required_char, symbols_signal = true, upper_signal = true, lower_signal = true, number_signal = true) {
    const arr_chars = [];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    try {
        if (symbols_signal) {
            arr_chars.push(SYMBOLS);
        }
        if (upper_signal) {
            arr_chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        }
        if (lower_signal) {
            arr_chars.push(letters.toLowerCase());
        }
        if (number_signal) {
            arr_chars.push('0123456789');
        }
        const arr_password = [];
        let position = 0;
        for (let i = 0; i < size; i++) {
            arr_password.push(selectRandom(arr_chars[position]))
            position++;
            if (position === arr_chars.length) {
                position = 0;
            }
        }
        arr_password[Math.floor(Math.random() * size)] = required_char;
        const nonChaoticPassword = arr_password.join("");
        const chaoticPassword = shuffleString(nonChaoticPassword);
        return chaoticPassword;
    } catch (err) {
        console.log('SOMETHING WENT WRONG DURING THE CREATION OF THE PASSWORD');
        console.error(err);
    }
}

export function getEntropy(password) {
    
    const freq = {};
    for(let char of password) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    let entropy = 0;
    const len = password.length;
    
    for(let char in freq) {
        const p = freq[char] / len;
        entropy -= p * Math.log2(p);
    }
    
    return entropy * len;
}   

export function getPasswordStrength(entropy) {

    if (entropy < 40) return "very weak";
    if (entropy < 60) return "weak";
    if (entropy < 80) return "fair";
    if (entropy < 100) return "strong";
    return "very strong";
}
