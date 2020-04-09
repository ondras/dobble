import * as math from "./math.js";

export default function generate(N) {
	let cards = [];

	for (let i=0;i<N+1;i++) {
		cards.push([0]);
		for (let j=0;j<N;j++) {
			cards[i].push((j+1)+(i*N));
		}
	}

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			let card = [i+1];
			for (let k = 0; k < N; k++) {
				let val = N+1 + N*k + math.add(math.mul(i, k, N), j, N);
				card.push(val);
			}
			cards.push(card);
		}
	}

	check(cards);

	return cards;
}

function check(cards) {
	let warn = 0;
	cards.forEach(A => {
		cards.forEach(B => {
			if (A == B) return;
			let matches = 0;
			A.forEach(v => {
				if (B.includes(v)) matches++;
			});
			if (matches != 1) { warn++; }
		});
	});
	(warn ? console.warn("Incorrect cards", warn) : console.log("Check OK"));
}