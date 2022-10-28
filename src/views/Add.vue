<template>
	<navbar></navbar>
	<div v-if="showResult">
		{{ getResult }}
	</div>
	<div class="container">
		<div>
			<p>Post body</p>
			<input type="text" placeholder="Post title" v-model="postTitle" />
			<textarea
				cols="30"
				rows="10"
				placeholder="Post body"
				v-model="postBody"
			></textarea>
		</div>
		<div class="btn-box">
			<button class="add-btn" @click="addPost">Add</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import Navbar from '../components/Navbar.vue';
	export default {
		data() {
			return {
				postTitle: '',
				postBody: '',
				userId: null,
				showResult: false,
			};
		},
		components: {
			Navbar,
		},
		created() {
			let userId = localStorage.getItem('user_id');
			if (userId) this.userId = userId;
		},
		computed: mapGetters(['getResult']),
		methods: {
			...mapActions(['addNewPost']),
			addPost() {
				if (this.postTitle !== '' && this.postBody !== '') {
					let payload = {
						userId: this.userId,
						postTitle: this.postTitle,
						postBody: this.postBody,
					};
					this.addNewPost(JSON.stringify(payload));
					this.postBody = '';
					this.showResult = true;
					setTimeout(() => {
						this.showResult = false;
					}, 3000);
				}
			},
		},
	};
</script>

<style scoped>
	p {
		margin: 30px auto;
		text-align: center;
	}
	textarea {
		width: 100%;
		padding: 10px;
	}
	.btn-box {
		text-align: center;
	}
	.add-btn {
		width: 50%;
		margin: 20px auto 0;
	}
</style>
