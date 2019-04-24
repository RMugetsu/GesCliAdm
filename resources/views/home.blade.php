<!DOCTYPE html>
	<html>
	<head>
	<!-- Styles -->
	<link rel="stylesheet" href="{{ asset('css/style.css') }}">
	<title>Gestión de Clientes Administrativo</title>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> 
	<script type="text/javascript" src="{{ asset('js/script.js') }}"></script>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<script src="{{asset('js/Components.js')}}"></script>
	
	@yield('ownCSS')
	
	<title></title>
	<style>
		html, body {
			background-color: #fcc5be;
			color: #636b6f;
			font-family: 'Nunito', sans-serif;
			font-weight: 250;
			height: 100vh;
			margin: 0;
		}
		nav.navbar {
			background-color: #44221f;

		}

		.navbar{
			border-radius: 0 !important;
		}
		nav.navbar ul.nav li a {
			font-family:  'Nunito', sans-serif;
			color:#fcc5be;
		}
		nav.navbar  div.nav a{
			color:white;
		}

	</style>
	</head>
	<body>
		@include('navbar')
		<div class="ErrorContainer"></div>
		<!--<div class="Error"></div>-->
		<div class="container flex-center">
			@yield('content')
			@yield('modal')
		</div>
		@if (session('errors'))
			<script>createError("{{session('errors')->first('Error')}}");</script>
		@endif
	</body>
	<script src="{{asset('js/Validator.js')}}"></script>
	</html>