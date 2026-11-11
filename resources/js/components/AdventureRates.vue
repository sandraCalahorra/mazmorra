<script setup>
defineProps({ hidden: Boolean });
</script>

<template>
<section
        id="adventure-rates"
        class="game-rates adventure-catalog"
        :hidden="hidden" aria-labelledby="game-rates-title"
      >
        <p class="eyebrow">AVENTURAS PARA VUESTRA MESA</p>
        <h2 id="game-rates-title">Elige tu aventura y consulta las tarifas.</h2>

        <p>
          Precios por jugador para contratar una partida dirigida. Elige una
          aventura para conocer sus detalles y solicitar una fecha.
        </p>

        <div class="game-rates__filters" aria-label="Tipo de aventura">
          <button type="button" data-rates-origin="mia" aria-pressed="true">
            Mis aventuras
          </button>
          <button
            type="button"
            data-rates-origin="oficial"
            aria-pressed="false"
          >
            Campañas oficiales
          </button>
        </div>

        <div class="game-rates__scroll">
          <div id="game-rates-body" class="adventure-grid"></div>
        </div>

        <p id="game-rates-empty" hidden>
          Todavía no hay aventuras disponibles en esta categoría.
        </p>

        <p class="game-rates__note">
          Tarifas orientativas para grupos de 3 a 5 jugadores. Para 1 o 2
          jugadores, o grupos de 6 o más, consulta las condiciones. En campañas,
          el precio por sesión no corresponde a la campaña completa. La fecha
          queda pendiente de confirmación.
        </p>
      </section>
</template>
