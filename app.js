import * as symbols from "./symbols.js";
import generate from "./generate.js";
import * as build from "./build.js";
import * as custom from "./custom.js";
import { RADIUS } from "./conf.js";


let generated = {
	cards: null,
	symbols: null
}

function showSymbols(picked, style) {
	let node = document.querySelector("aside");
	let count = picked.length;
	node.innerHTML = `<p>Generated ${count} cards with ${count} symbols:</p>`;
	picked.map(s => build.symbol(s, style)).forEach(s => node.appendChild(s));

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

function pickSymbols(n, all) {
	return shuffle(all.slice()).slice(0, n);
}

function go(n, style) {
	if (generated.symbols) { // invalidate symbols?
		let first = generated.symbols[0];
		let isNumber = (typeof(first) == "number");
		let isCustom = (style == "custom");
		if (isCustom ^ isNumber) { generated.symbols = null; } // need to reset symbols; they are incompatible
	}

	if (!generated.cards) {
		generated.cards = generate(n).map(card => shuffle(card));
	}

	if (!generated.symbols) {
		let count = generated.cards.length;
		if (style == "custom") {
			if (custom.images.length < count) {
				alert(`Please drag'n'drop at least ${count} custom images`);
				return;
			}
			let all = new Array(custom.images.length).fill(0).map((_, i) => i);
			generated.symbols = pickSymbols(count, all);
		} else {
			generated.symbols = pickSymbols(count, symbols.all);
		}
	}

	showSymbols(generated.symbols, style);

	let parent = document.querySelector("main");
	parent.innerHTML = "";
	parent.append(build.cards(generated.cards, generated.symbols, style));
}

async function init() {
	custom.init();

	document.body.style.setProperty("--radius", RADIUS);
	await symbols.init();

	const n = document.querySelector("[name=n]");

	const style = document.querySelector("[name=style]");
	style.addEventListener("change", e => {
		custom.toggle(style.value == "custom");
		go(Number(n.value), style.value);
	});

	const form = document.querySelector("form");
	form.addEventListener("submit", e => {
		e.preventDefault();

		generated.symbols = null;
		generated.cards = null;

		go(Number(n.value), style.value);
	});

	custom.toggle(style.value == "custom");
}

init();
