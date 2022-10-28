<template>
	<navbar></navbar>
	<Loading v-if="getLoading" />
	<div class="container">
		<div v-if="showResult">
			{{ getResult }}
		</div>
		<div v-if="showModal" class="modal">
			<div class="content" style="margin-top: 30px">
				<input
					style="display: block; margin-bottom: 20px"
					type="text"
					v-model="newTitle"
				/>
				<textarea cols="30" rows="10" v-model="newBody"></textarea>
				<button @click="postEdit">Edit</button>
			</div>
		</div>
		<ul v-else>
			<li class="post" v-for="post of getUserPosts" :key="post.id">
				<div>
					<h3 class="postBody">
						{{ post.title }}
					</h3>
					<p class="postBody">
						{{ post.body }}
					</p>
				</div>
				<div>
					<i class="fa-solid fa-pen" @click="openModal(post)"></i>
					<i
						class="fa-solid fa-xmark"
						@click="deletePost(post.id)"
					></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="js">
	import { mapActions, mapGetters, mapMutations } from 'vuex';
	import Navbar from '../components/Navbar.vue';
	import Loading from '../components/Loading.vue';
	export default {
		data() {
			return {
				showModal: false,
				newTitle: '',
				newBody: '',
				postId: null,
				showResult: false,
			};
		},
		components: {
			Navbar,
			Loading,
		},
		computed: mapGetters(['getUserPosts', 'getLoading', 'getResult']),
		created(){
			let userId = localStorage.getItem('user_id');
			this.fetchUserPosts(userId);
		},
		methods: {
			...mapActions(['editPost', 'fetchUserPosts', 'delPost']),
			...mapMutations(['setDeletedPost']),
			openModal(post) {
				this.showModal = true;
				this.newTitle = post.title;
				this.newBody = post.body;
				this.postId = post.id;
			},
			postEdit() {
				if (this.newBody !== '' && this.newTitle !== '') {
					let post = {
						id: this.postId,
						title: this.newTitle,
						body: this.newBody,
					};
					this.editPost(post);
					this.showModal = false;
					this.showResult = true;
					setTimeout(() => {
						this.showResult = false;
					}, 3000);
				}
			},
			deletePost(id) {
				let isDelete = confirm('Are you sure?')
				if(isDelete){
					this.delPost(id)
					this.setDeletedPost(id)
				}
			},
		},
	};
</script>

<style>
	.post {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		margin-bottom: 30px;
	}
	.fa-solid {
		cursor: pointer;
		margin: 0 5px;
	}
</style>
