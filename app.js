function formatNumberInput(event) {
    let input = event.target.value.replace(/[^0-9]/g, '');
    let number = parseInt(input, 10) / 100;

    if (!isNaN(number)) {
        event.target.value = number.toFixed(2);
    } else {
        event.target.value = '0.00';
    }
}

function calculateAndUpdateResults() {
    let originalPrice = parseFloat(document.getElementById('originalPrice').value) || 0;
    let shippingCost = parseFloat(document.getElementById('shippingCost').value) || 0;
    let originalTax = parseFloat(document.getElementById('originalTax').value) || 0;
    let newPrice = parseFloat(document.getElementById('newPrice').value) || 0;

    let taxRate = originalPrice ? originalTax / originalPrice : 0;
    let newTax = newPrice * taxRate;
    let total = newPrice + newTax + shippingCost;

    document.getElementById('result').innerHTML = `
        <div class="alert alert-info">
            <div class="result-item"><strong>Nuevo Precio:</strong> $<span id="newPriceResult">${newPrice.toFixed(2)}</span><button onclick="copyToClipboard('#newPriceResult')">Copiar</button></div>
            <div class="result-item"><strong>Costo de Envío:</strong> $<span id="shippingCostResult">${shippingCost.toFixed(2)}</span><button onclick="copyToClipboard('#shippingCostResult')">Copiar</button></div>
            <div class="result-item"><strong>Nuevo Impuesto:</strong> $<span id="newTaxResult">${newTax.toFixed(2)}</span><button onclick="copyToClipboard('#newTaxResult')">Copiar</button></div>
            <div class="result-item"><strong>Total:</strong> $<span id="totalResult">${total.toFixed(2)}</span><button onclick="copyToClipboard('#totalResult')">Copiar</button></div>
        </div>`;
}

function copyToClipboard(elementId) {
    let text = document.querySelector(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}

// Asegúrate de que el DOM esté completamente cargado antes de añadir los eventos
document.addEventListener('DOMContentLoaded', () => {
    ['originalPrice', 'shippingCost', 'originalTax', 'newPrice'].forEach(id => {
        document.getElementById(id).addEventListener('input', formatNumberInput);
        document.getElementById(id).addEventListener('input', calculateAndUpdateResults);
    });
});
