let dropzone;

export let images = [];

export function toggle(show) {
	dropzone.hidden = !show;
}

export function init() {
	dropzone = document.querySelector("#drop-images");

	dropzone.addEventListener("dragover", e => {
		e.preventDefault();
	})

	dropzone.addEventListener("drop", e => {
		e.preventDefault();
		[...e.dataTransfer.files].forEach(file => {
			let url = URL.createObjectURL(file);
			images.push(url);

			let img = new Image();
			img.src = url;
			dropzone.append(img);
		})
	})
}
