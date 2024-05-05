function calcularBhaskara() {
    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert("Por favor, forneça valores para todos os campos.");
        return;
    }

    let passos = document.getElementById('passos');
    passos.innerHTML = '';

    let delta = b * b - 4 * a * c;
    passos.innerHTML += "<h4>Passo 1:</h4> Calculando o discriminante (Δ):<br>";
    passos.innerHTML += "Δ = b² - 4ac<br>";
    passos.innerHTML += "Δ = (" + b + ")² - 4 * " + a + " * " + c + "<br>";
    passos.innerHTML += "Δ = " + delta + "<br><br>";

    if (delta > 0) {
        passos.innerHTML += "<h4>Passo 2:</h4> Como Δ é maior que zero, a equação possui duas raízes reais distintas.<br>";
        let raiz_1 = calcularRaiz((-b + Math.sqrt(delta)) / (2 * a));
        let raiz_2 = calcularRaiz((-b - Math.sqrt(delta)) / (2 * a));
        passos.innerHTML += "<h4>Passo 3:</h4> Calculando as raízes usando a fórmula de Bhaskara:<br>";
        passos.innerHTML += "x₁ = (-b + √Δ) / 2a<br>";
        passos.innerHTML += "x₁ = (-(" + b + ") + √" + delta + ") / (2 * " + a + ")<br>";
        passos.innerHTML += "x₁ = " + raiz_1 + "<br><br>";
        passos.innerHTML += "x₂ = (-b - √Δ) / 2a<br>";
        passos.innerHTML += "x₂ = (-(" + b + ") - √" + delta + ") / (2 * " + a + ")<br>";
        passos.innerHTML += "x₂ = " + raiz_2 + "<br><br>";


        document.getElementById('resultado').innerHTML = "As raízes são: <br><br>x₁ = " + raiz_1 + " <br> x₂ = " + raiz_2;

    } else if (delta == 0) {
        let x = toFraction(-b / (2 * a))
        passos.innerHTML += "<h4>Passo 2:</h4> Como Δ é igual a zero, a equação possui uma raiz real dupla.<br>";
        passos.innerHTML += "<h4>Passo 3:</h4> Calculando a raiz usando a fórmula de Bhaskara:<br>";
        passos.innerHTML += "x = -b / 2a<br>";
        passos.innerHTML += "x = -(" + b + ") / (2 * " + a + ")<br>";
        passos.innerHTML += "x = " + x + "<br><br>";
        document.getElementById('resultado').innerHTML = "A raiz dupla é:<br><br>x = " + x
    } else {
        passos.innerHTML += "Passo 2: Como Δ é menor que zero, a equação não possui raízes reais.";
        document.getElementById('resultado').innerHTML = "Não existem raízes reais";
    }
}

function calcularRaiz(numero) {
    if (Number.isInteger(numero)) {
        return numero;
    } else {
        let fracao = toFraction(numero);
        return fracao;
    }
}

function toFraction(numero) {
    const tolerance = 1.0E-6;
    let h1 = 1;
    let h2 = 0;
    let k1 = 0;
    let k2 = 1;
    let b = numero;
    do {
        let a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(numero - h1 / k1) > numero * tolerance);

    return h1 + "/" + k1;
}