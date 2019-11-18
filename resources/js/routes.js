import Base from './Pages/Base';
import Player from './Pages/Player';
import Home from './Pages/Home';
import Watch from './Pages/Watch';
import Search from './Pages/Search';

export default [
	{
		path: '/',
		component: Base,
		children: [
			{
				path: 'dashboard',
				component: Home
			},
			{
				path: 'discover',
				component: Home
			},
			{
				path: 'library',
				component: Home
			},
			{
				path: 'search',
				component: Search
			},
			{
				path: 'errors/*',
				component: Home
			}
		]
	},
	{
		path: '/watch/:id',
		component: Watch
	}
];
