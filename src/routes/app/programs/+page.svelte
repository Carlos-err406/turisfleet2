<script>
	import Table from '$components/Table/Table.svelte';
	const data = [
		{
			id: 1,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 100
		},
		{
			id: 2,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 100
		},
		{
			id: 3,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 100
		},
		{
			id: 4,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 100
		},
		{
			id: 5,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 100
		},
		{
			id: 6,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 100
		},
		{
			id: 7,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 100
		},
		{
			id: 8,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 99
		},
		{
			id: 9,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 101
		},
		{
			id: 10,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 10
		},
		{
			id: 11,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 130
		},
		{
			id: 12,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 140
		},
		{
			id: 13,
			name: 'Carlos',
			bro: 'someone',
			mom: 'the mother',
			dad: 'the dad',
			school: 'CUJAE',
			average: '4.6',
			value: 150
		}
	];
	const headers = ['id', 'name', 'bro', 'mom', 'dad', 'value', 'school', 'average'];
</script>

<div class="overflow-hidden">
	<Table tableName="Programs" {data} {headers} keys={headers} />
</div>
