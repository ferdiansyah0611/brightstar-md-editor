export default function History() {
	let textarea;

	this.data = [];
	this.index = 0;
	this.setNode = (el) => {
		textarea = el;
	};
	this.update = (value) => {
		if (value !== this.data[this.index]) {
			// Remove any future state history beyond the current index
			this.data.splice(this.index + 1);
			// Add the current value to the end of the state history array
			this.data.push(value);
			// Update the current index to point to the new current state
			this.index = this.data.length - 1;
		}
	};
	this.undo = () => {
		if (this.index > 0) {
			this.index--;
			textarea.value = this.data[this.index];
		}
	};
	this.redo = () => {
		if (this.index < this.data.length - 1) {
			this.index++;
			textarea.value = this.data[this.index];
		}
	};
}