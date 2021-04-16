const form = document.querySelector(".compound-form");
const calculator = document.querySelector(".calculator");
let results = document.querySelector(".results");

let compoundData = [];
let d = new Date();
let year = d.getFullYear();
let xLabels = [year];

form.addEventListener("submit", (e) => {
	e.preventDefault();

	compoundData = [];
	xLabels = [year];

	let P = parseFloat(e.target.principal.value); // principal
	let i = parseFloat(e.target.rate.value); // nominal annual interest rate in percentage terms
	let n = parseFloat(e.target.period.value); // number of compounding periods

	let ci;
	compoundData.push(P);
	for (let x = 1; x < n + 1; x++) {
		xLabels.push(year + x);
		ci = P * (1 + i / 100) ** x;
		compoundData.push(ci.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
	}

	const html = `
		<h2>Results</h2>
		<p class="results-text">
			Given the initial investment of <span class="highlight">${P}</span>, 
			an interest rate of <span class="highlight">${i}%</span> compounded annually for <span class="highlight">${n}</span> years, 
			the compound interest of your investment is: 
			<span class="ci-result-total">${compoundData[compoundData.length - 1]}€</span>
		</p>
		<div class="chart-wrapper">
			<canvas id="chart"></canvas>
		</div>
	`;

	if (results) {
		results.innerHTML = html;
		console.log("already exists");
	} else {
		console.log("just created");
		calculator.innerHTML += `
			<div class="results">
				${html}
			</div>
		`;
		results = document.querySelector(".results");
	}

	const ctx = document.getElementById("chart").getContext("2d");
	const myChart = new Chart(ctx, {
		type: "line",
		data: {
			labels: xLabels,
			datasets: [
				{
					// fill: { target: "origin", above: "rgba(255, 255, 255, 0.38)" },
					label: "Future Value",
					data: compoundData,
					backgroundColor: "#3D7BE2",
					borderColor: "#3D7BE2",
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				x: {
					ticks: {
						color: "rgba(255, 255, 255, 0.74)",
					},
					grid: {
						display: false,
						borderColor: "rgba(255, 255, 255, 0.12)",
					},
				},
				y: {
					beginAtZero: true,
					ticks: {
						// Include a euro sign in the ticks
						callback: function (value, index, values) {
							return "€ " + value;
						},
						color: "rgba(255, 255, 255, 0.74)",
					},
					grid: {
						borderColor: "rgba(255, 255, 255, 0.12)",
						color: "rgba(255, 255, 255, 0.12)",
					},
				},
			},
		},
	});
});
