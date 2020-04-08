import * as symbols from "./symbols.js";
import generate from "./generate.js";
import * as build from "./build.js";
import { RADIUS } from "./conf.js";


function showSymbols(picked) {
	let node = document.querySelector("aside");
	let count = picked.length;
	node.innerHTML = `<p>Generated ${count} cards with ${count} symbols:</p>`;
	picked.map(build.symbol).forEach(s => node.appendChild(s));

	let print = document.createElement("p");
	print.textContent = `Symbols were picked randomly from a large set of ${symbols.all.length} emoji, feel free to re-generate some new. You can also print this page; it is printer-friendly and only the relevant content will get printed.`;
	node.appendChild(print);
}

function shuffle(arr) {
	let shuffled = [];
	while (arr.length) {
		let index = Math.floor(Math.random() * arr.length);
		shuffled.push(arr[index]);
		arr.splice(index, 1);
	}
	return shuffled;
}

function pickSymbols(n) {
	return shuffle(symbols.all.slice()).slice(0, n);
}

function go(n) {
	let cards = generate(n).map(card => shuffle(card));

	let symbols = pickSymbols(cards.length);
	showSymbols(symbols);

	let parent = document.querySelector("main");
	parent.innerHTML = "";
	parent.appendChild(build.cards(cards, symbols));
}

async function init() {
	document.body.style.setProperty("--radius", RADIUS);
	await symbols.init();

	document.querySelector("form").addEventListener("submit", e => {
		e.preventDefault();
		let n = Number(document.querySelector("[name=n]").value);
		go(n);
	});
}

init();
