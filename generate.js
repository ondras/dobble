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
				let val = (N+1 + N*k + (i*k+j)%N);
				card.push(val);
			}
			cards.push(card);
		}
	}

	return cards;
}
