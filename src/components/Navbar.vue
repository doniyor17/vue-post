<template>
	<nav class="nav">
		<router-link class="logo" :to="{ name: 'Home' }">Logo</router-link>
		<div>
			<router-link class="nav-link" :to="{ name: 'Home' }"
				>My Posts</router-link
			>
			<router-link class="nav-link" :to="{ name: 'Add' }"
				>Add new</router-link
			>
			<router-link class="nav-link" :to="{ name: 'Edit' }"
				>Edit & Delete</router-link
			>
		</div>
	</nav>
</template>

<script>
	export default {};
</script>

<style scoped>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30px 80px;
		background-color: #aaa;
	}
	.nav-link {
		text-decoration: none;
		color: #111;
	}
	.nav-link {
		margin: 0 10px;
	}
	.router-link-exact-active {
		color: rgb(0, 100, 255);
	}
	.logo {
		text-decoration: none;
		color: #111;
	}
</style>
