<template>
	<Navbar></Navbar>
	<Loading v-if="getLoading" />
	<div class="container">
		<ul v-if="!getLoading">
			<li v-for="post of getUserPosts" :key="post.post_id">
				{{ post.post_body }}
			</li>
		</ul>
	</div>
</template>

<script>
	import Loading from '@/components/Loading.vue';
	import Navbar from '../components/Navbar.vue';
	import { mapActions, mapGetters } from 'vuex';
	export default {
		name: 'Home',
		components: {
			Loading,
			Navbar,
		},
		computed: mapGetters(['getLoading', 'getResult', 'getUserPosts']),
		created() {
			let userId = localStorage.getItem('user_id');
			this.fetchUserPosts(userId);
		},
		methods: {
			...mapActions(['fetchUserPosts']),
		},
	};
</script>

<style scoped>
	li {
		padding: 15px;
		list-style-type: none;
	}
</style>
