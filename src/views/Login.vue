<template>
	<table>
		<tr>
			<th>Username</th>
			<th>Password</th>
		</tr>
		<tr>
			<td>john</td>
			<td>1</td>
		</tr>
		<tr>
			<td>joe</td>
			<td>1</td>
		</tr>
		<tr>
			<td>job</td>
			<td>1</td>
		</tr>
	</table>
	<div class="login container">
		<form class="login-form" @submit.prevent="login">
			<div class="inp-box">
				<label class="block mb-2">Username</label>
				<input
					class="w-full border-1 px-1 py-2 outline-none"
					type="text"
					placeholder="Username"
					v-model="username"
				/>
			</div>
			<div class="mt-5 inp-box">
				<label class="block mb-2">Password</label>
				<input
					class="w-full border-1 px-1 py-2 outline-none"
					type="password"
					v-model="password"
					placeholder="Password"
				/>
			</div>
			<div class="btn-box text-center">
				<button
					type="submit"
					class="bg-blue-300 px-4 py-2 rounded-md text-mainWhite"
					:disabled="getLoading"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				username: '',
				password: '',
			};
		},
		computed: mapGetters(['getLoading']),
		methods: {
			...mapActions(['userLogin']),
			login() {
				let user = {
					username: this.username,
					password: this.password,
				};
				this.userLogin(user);
			},
		},
	};
</script>
<style scoped>
	.login {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login-form {
		margin-top: 100px;
		width: 60%;
		height: 30%;
		box-shadow: 0 0 30px #000;
		padding: 10px;
	}
	.inp-box {
		margin-top: 20px;
		width: 90%;
	}
	.btn-box {
		margin-top: 20px;
		text-align: center;
	}
	label {
		display: block;
		margin-bottom: 10px;
	}
	input {
		width: 100%;
		border: 1px solid #333;
		padding: 7px 18px;
		outline: none;
	}
	.btn-box button {
		padding: 7px;
	}
	table {
		width: 60%;
		padding: 5px;
		margin: 0 auto;
	}
	td,
	th {
		border-collapse: collapse;
		padding: 5px;
		text-align: center;
	}
</style>
