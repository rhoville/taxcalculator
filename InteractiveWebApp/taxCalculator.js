function calculateTax() {
    const incomeInput = document.getElementById('income');
    const resultDiv = document.getElementById('result');
    const income = parseFloat(incomeInput.value);

    if (!isNaN(income)) {
        const taxBreakdown = [
            { bracket: 'Up to $14,000', min: 0, max: 14000, rate: 0.105 },
            { bracket: '$14,001 to $48,000', min: 14001, max: 48000, rate: 0.175 },
            { bracket: '$48,001 to $70,000', min: 48001, max: 70000, rate: 0.3 },
            { bracket: '$70,001 to $180,000', min: 70001, max: 180000, rate: 0.33 },
            { bracket: 'Over $180,000', min: 180001, max: Infinity, rate: 0.39 }
        ];

        let tax = 0;

        for (let i = 0; i < taxBreakdown.length; i++) {
            const bracket = taxBreakdown[i];

            if (income >= bracket.min) {
                const taxableIncome = Math.min(income, bracket.max) - bracket.min;
                tax += taxableIncome * bracket.rate;
            }
        }

        const netIncome = income - tax;

        let breakdownHTML = '<table>';
        breakdownHTML += '<tr><th>Tax Bracket</th><th>Tax Rate</th><th>Tax Amount</th></tr>';

        for (let i = 0; i < taxBreakdown.length; i++) {
            const bracket = taxBreakdown[i];
            const taxableIncome = Math.min(income, bracket.max) - bracket.min;
            const bracketTax = taxableIncome * bracket.rate;

            if (taxableIncome > 0) {
                breakdownHTML += `<tr><td>${bracket.bracket}</td><td>${(bracket.rate * 100).toFixed(1)}%</td><td>NZD ${bracketTax.toFixed(2)}</td></tr>`;
            }
        }

        breakdownHTML += '</table>';

        resultDiv.innerHTML = `<p>Tax: NZD ${tax.toFixed(2)}</p>
            <h3>Breakdown of Income Tax</h3>
            ${breakdownHTML}
            <p>Net Income: NZD ${netIncome.toFixed(2)}</p>`;
    } else {
        resultDiv.innerHTML = '<p>Please enter a valid income amount.</p>';
    }
}

function resetForm() {
    document.getElementById('income').value = '';
    document.getElementById('result').innerHTML = '';
}
