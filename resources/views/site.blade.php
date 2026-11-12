<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="app-base-url" content="{{ rtrim(url('/'), '/') }}/">
    <title>{{ $page['title'] }}</title>
    @if ($page['description'])
        <meta name="description" content="{{ $page['description'] }}">
    @endif
    @vite('resources/js/app.js')
</head>
<body>
    <div id="app" class="contents" data-page="{{ $name }}" aria-busy="true"></div>
    <noscript>Activa JavaScript para utilizar La Mazmorra del Roleo.</noscript>
</body>
</html>
