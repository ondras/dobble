export let all = [];

export async function init() {
	let r = await fetch("emoji-list.txt")
	let data = await r.text();
	data.split("\n").forEach(line => {
		let parts = line.split("..");
		let first = parseInt(parts.shift(), 16);
		let last = (parts.length ? parseInt(parts.shift(), 16) : first);

		for (let i=first; i<=last; i++) {
			all.push(String.fromCodePoint(i));
		}
	});
}
