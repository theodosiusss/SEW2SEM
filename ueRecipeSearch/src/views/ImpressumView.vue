<script setup lang="ts">
</script>

<template>
  <div class="impressum-container">
    <h1>Impressum</h1>
    <p>Angaben gemäß § 5 TMG</p>

    <div class="section">
      <h2>Betreiber der Website</h2>
      <p><strong>Richhard Jackson</strong></p>
      <p>Sigmastraße 187</p>
      <p>420 Kottingbrunn</p>
      <p>Österreich</p>
    </div>

    <div class="section">
      <h2>Kontakt</h2>
      <p>Telefon: +43 69 420 666 </p>
      <p>E-Mail: <a href="mailto:1198@htl.rennweg.at">1198@htl.rennweg.at</a></p>
    </div>

    <div class="section">
      <h2>Verantwortlich für den Inhalt</h2>
      <p>Ayal Ecken</p>
      <p>(Anschrift wie oben)</p>
    </div>

    <div class="section">
      <h2>Haftungsausschluss</h2>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
        externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>
    </div>

    <div class="section">
      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    </div>
  </div>
</template>

<style scoped>
.impressum-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffd1dc; /* Sanftes Rosa */
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: #5a1a5c;
}

h1, h2 {
  color: #ff3385;
  text-align: center;
}

.section {
  margin-top: 20px;
}

p {
  font-size: 16px;
  line-height: 1.5;
}

a {
  color: #ff3385;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
