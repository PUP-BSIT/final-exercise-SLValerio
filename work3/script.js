function OddOrEven() {
    const input = document.getElementById("odd-even-input").value;
    const result = document.getElementById("odd-even-result");
    result.textContent = input % 2 === 0 ? input + " is an Even Number" : input + " is an Odd Number.";
}

function makeFibonacci() {
    const input = document.getElementById("fibonacci-input").value;
    const result = document.getElementById("fibonacci-result");
    const sequence = [1, 1];
    
    for (let i = 2; i < input; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    
    result.textContent = sequence.join(", ");
}

function getFactorial() {
    const input = document.getElementById("factorial-input").value;
    const result = document.getElementById("factorial-result");
    let factorial = 1;

    for (let i = 2; i <= input; i++) {
        factorial *= i;
    }

    result.textContent = "The Factorial of " + input + " is " + factorial + ".";
}
