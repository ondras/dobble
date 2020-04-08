import { RADIUS } from "./conf.js";

export function symbol(symbol) {
	let node = document.createElement("span");
	node.textContent = symbol;
	return node;
}

function positionAndStyle(symbol, index, count) {
	let transforms = [`translate(-50%, -50%)`];
	if (index > 0) {
		let angle = index * 2*Math.PI / (count-1);
		let dist = RADIUS * 0.7;
		let x = Math.cos(angle) * dist;
		let y = Math.sin(angle) * dist;
		transforms.push(`translate(${x}px, ${y}px)`);
	}

	transforms.push(`rotate(${Math.random()*360}deg)`);

	let scale = (Math.random()-0.5) * 0.9;
	transforms.push(`scale(${1 + scale})`);

	symbol.style.transform = transforms.join(" ");
}

function card(card, symbols) {
	let node = document.createElement("div");
	node.classList.add("card");

	card.forEach((sindex, i) => {
		let s = symbol(symbols[sindex]);
		positionAndStyle(s, i, card.length);
		node.appendChild(s);
	});

	return node;
}

export function cards(cards, symbols) {
	let node = document.createDocumentFragment();
	cards.map(c => card(c, symbols)).forEach(c => node.appendChild(c));
	return node;
}