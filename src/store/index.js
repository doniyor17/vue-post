import { createStore } from 'vuex';
const url = process.env.VUE_APP_BASE_URL;
import router from '../router/index';

export default createStore({
	state: {
		loading: false,
		result: '',
		user: null,
		posts: [],
	},
	getters: {
		getLoading: state => state.loading,
		getResult: state => state.result,
		getUser: state => state.user,
		getUserPosts: state => state.posts,
	},
	actions: {
		async userLogin({ commit }, payload) {
			try {
				commit('setLoading', true);

				const rawdata = await fetch(
					url +
						`users?username=${payload.username}&email${payload.email}`,
				);
				const [user] = await rawdata.json();
				if (user) {
					commit('setLoading', false);
					commit('setUser', user);
					router.push({ name: 'Home' });
				} else {
					setTimeout(() => {
						commit('setLoading', false);
					}, 3000);
				}
			} catch (err) {
				commit('setResult', err.message);
			}
		},
		async fetchUserPosts({ commit }, payload) {
			try {
				commit('setLoading', true);
				const rawdata = await fetch(url + `posts?userId=${payload}`);
				const posts = await rawdata.json();

				commit('setLoading', false);
				commit('setUserPosts', posts);
			} catch (err) {
				commit('setResult', err.message);
			}
		},
		async addNewPost({ commit }, payload) {
			try {
				commit('setLoading', true);
				const rawdata = await fetch(url + `posts`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: payload,
				});
				const post = await rawdata.json();
				if (post) {
					commit('setLoading', false);
					alert(`Post created successfully post id is ${post.id}`);
				}
			} catch (err) {
				commit('setResult', err.message);
			}
		},
		async editPost({ commit }, payload) {
			try {
				commit('setLoading', true);
				const rawdata = await fetch(url + `posts/${payload.id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ payload }),
				});
				const post = await rawdata.json();
				commit('setLoading', false);
				alert(`Post edited successfully. Post is is ${post.id}`);
				commit('setUpdatedPost', payload);
			} catch (err) {
				commit('setResult', err.message);
			}
		},
		async delPost({ commit }, payload) {
			try {
				commit('setLoading', true);
				const rawdata = await fetch(url + `posts/${payload}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const post = await rawdata.json();
				commit('setLoading', false);
				alert(`Post deleted`);
			} catch (err) {
				commit('setResult', err.message);
			}
		},
	},
	mutations: {
		setLoading: (state, loading) => (state.loading = loading),
		setResult: (state, result) => {
			state.result = result;
		},
		setUser: (state, payload) => {
			localStorage.setItem('user_id', payload.id);
			localStorage.setItem('isLogged', true);
			state.user = payload;
		},
		setUserPosts: (state, payload) => {
			state.posts = payload;
		},
		setUpdatedPost: (state, payload) => {
			state.posts.find((p, i) => {
				if (p.id === payload.id) {
					state.posts[i] = payload;
				}
			});
		},
		setDeletedPost: (state, payload) => {
			state.posts = state.posts.filter(p => p.id !== payload);
		},
	},
});
