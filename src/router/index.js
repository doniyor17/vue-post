import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/add',
		name: 'Add',
		component: () => import('../views/Add.vue'),
	},
	{
		path: '/edit',
		name: 'Edit',
		component: () => import('../views/Edit.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	let islogged = localStorage.getItem('isLogged');
	if (to.name !== 'Login' && !islogged) {
		next({
			path: 'Login',
			replace: true,
		});
	} else {
		next();
	}
});

export default router;
