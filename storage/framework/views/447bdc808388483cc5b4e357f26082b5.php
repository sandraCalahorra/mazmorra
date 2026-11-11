<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="app-base-url" content="<?php echo e(rtrim(url('/'), '/')); ?>/">
    <title><?php echo e($page['title']); ?></title>
    <?php if($page['description']): ?>
        <meta name="description" content="<?php echo e($page['description']); ?>">
    <?php endif; ?>
    <?php echo app('Illuminate\Foundation\Vite')('resources/js/main.js'); ?>
</head>
<body>
    <div id="app" class="contents" data-page="<?php echo e($name); ?>" aria-busy="true"></div>
    <noscript>Activa JavaScript para utilizar La Mazmorra del Roleo.</noscript>
</body>
</html>
<?php /**PATH C:\Users\TEMP.DESKTOP-MBQQOU6\OneDrive\Documentos\GitHub\mazmorra\resources\views/site.blade.php ENDPATH**/ ?>