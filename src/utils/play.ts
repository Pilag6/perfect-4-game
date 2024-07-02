export function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 10000);

    while (randomNumber < 1000 || hasRepeatedDigits(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 10000);
    }

    return randomNumber;
}

// FUNCTION TO CHECK IF THE NUMBER HAS REPEATED DIGITS
function hasRepeatedDigits(number: number) {
    const digits = String(number).split("");

    const uniqueDigits = digits.filter((digit, index) => {
        return digits.indexOf(digit) === index;
    });

    return digits.length !== uniqueDigits.length;
}
