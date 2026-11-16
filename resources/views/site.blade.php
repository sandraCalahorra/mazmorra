<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="app-base-url" content="{{ rtrim(url('/'), '/') }}/">
    <title>{{ $page['title'] }}</title>
    <link rel="icon" type="image/png" sizes="128x128" href="{{ asset('images/torre-mazmorra.png') }}">
    @if ($page['description'])
        <meta name="description" content="{{ $page['description'] }}">
    @endif
    <style>
        #site-loading {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: grid;
            place-content: center;
            justify-items: center;
            gap: 1rem;
            background: #141c19;
            color: #eee9dd;
            font: 1rem/1.5 system-ui, sans-serif;
        }

        #site-loading::before {
            content: "";
            width: 2rem;
            height: 2rem;
            border: 3px solid #c4aa7350;
            border-top-color: #c4aa73;
            border-radius: 50%;
            animation: site-loading-spin 0.9s linear infinite;
        }

        @keyframes site-loading-spin {
            to { transform: rotate(1turn); }
        }

        @media (prefers-reduced-motion: reduce) {
            #site-loading::before { animation: none; }
        }
    </style>
    <noscript><style>#site-loading { display: none; }</style></noscript>
    @vite('resources/js/app.js')
</head>
<body>
    <div id="site-loading" role="status">Cargando la página…</div>
    <div id="app" class="contents" data-page="{{ $name }}" aria-busy="true" inert></div>
    <noscript>Activa JavaScript para utilizar La Mazmorra del Roleo.</noscript>
</body>
</html>
