import Base from './Pages/Base';
import Player from './Pages/Player';
import Home from './Pages/Home';
import Watch from './Pages/Watch';
import Search from './Pages/Search';
import Library from './Pages/Library';

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
				path: 'poc',
				component: Home
			},
			{
				path: 'discover',
				component: Home
			},
			{
				path: 'library',
				component: Library
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
