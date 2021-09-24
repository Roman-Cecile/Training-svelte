import { writable, readable } from "svelte/store";

// Initial state
const cable = {};

// Destructuring writable function
// subscribe => follow future updates
// set & update => update value
const { subscribe, set, update } = writable(cable);

// function to update initial state by adding a car
const cableUpdate = (datas) => {
	update((cable) => {
		return [...cable, datas];
	});
};

// function to reset app with initial state
const reset = () => {
	set(cable);
};

export default {
	subscribe,
	cableUpdate,
	reset,
};
