const sampleDataSimple: Array<{
	name: string;
	species: string;
	color: string;
	food: string;
	age: number;
	location: string;
	gender: string;
}> = [
	{
		name: 'April',
		species: 'Duck',
		color: 'brown',
		food: 'bread',
		age: 29,
		location: 'garden',
		gender: 'nb'
	},
	{
		name: 'Beth',
		species: 'Duck',
		color: 'red',
		food: 'bread',
		age: 28,
		location: 'garden',
		gender: 'f'
	},
	{
		name: 'Clint',
		species: 'Duck',
		color: 'blue',
		food: 'grain',
		age: 55,
		location: 'river',
		gender: 'm'
	},
	{
		name: 'Debby',
		species: 'Duck',
		color: 'white',
		food: 'grain',
		age: 44,
		location: 'shed',
		gender: 'f'
	},
	{
		name: 'Eve',
		species: 'Duck',
		color: 'red',
		food: 'bread',
		age: 29,
		location: 'garden',
		gender: 'nb'
	},
	{
		name: 'Fred',
		species: 'Duck',
		color: 'black',
		food: 'bread',
		age: 25,
		location: 'garden',
		gender: 'm'
	},
	{
		name: 'Goku',
		species: 'Duck',
		color: 'gold',
		food: 'yes',
		age: 43,
		location: 'river',
		gender: 'm'
	},
	{
		name: 'Hank',
		species: 'Duck',
		color: 'gray',
		food: 'insects',
		age: 50,
		location: 'field',
		gender: 'm'
	},
	{
		name: 'Ingrid',
		species: 'Duck',
		color: 'purple',
		food: 'insects',
		age: 20,
		location: 'garden',
		gender: 'f'
	},
	{
		name: 'Jill',
		species: 'Duck',
		color: 'green',
		food: 'beans',
		age: 60,
		location: 'field',
		gender: 'f'
	},
	{
		name: 'Kim',
		species: 'Duck',
		color: 'yellow',
		food: 'bread',
		age: 19,
		location: 'river',
		gender: 'f'
	},
	{
		name: 'Lilly',
		species: 'Duck',
		color: 'blue',
		food: 'bread',
		age: 42,
		location: 'garden',
		gender: 'f'
	}
];

export const sampleData = [
	...sampleDataSimple,
	...sampleDataSimple.map((d, ind) => ({ ...d, species: ind % 2 ? 'Goose' : 'Swan' }))
];

export const sampleHeaders = [
	{ label: 'name', prop: 'name' },
	{ label: 'species', prop: 'species' },
	{ label: 'color', prop: 'color' },
	{ label: 'favorite food', prop: 'food' },
	{ label: 'age', prop: 'age' },
	{ label: 'location', prop: 'location' },
    { label: 'gender', prop: 'gender' },
];
