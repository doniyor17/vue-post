<template>
	<div class="navbar">
		<div class="fa-solid fa-spinner text-8xl text-whitish"></div>
	</div>
</template>

<style scoped>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.fa-spinner {
		font-size: 40px;
		color: #ddd;
		transition: all 0.3s ease;
		animation: spin 1.3s infinite ease-in-out;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
