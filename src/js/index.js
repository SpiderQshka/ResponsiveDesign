var burgerMenu = document.getElementById('burger-menu');

burgerMenu.addEventListener('click', function(e){
	var nav = document.querySelector('#header #nav');

	nav.classList.toggle('active');

	console.log('click!');
});