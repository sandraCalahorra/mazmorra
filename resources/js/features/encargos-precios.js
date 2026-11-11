// Tarifas orientativas editables. No representan un presupuesto confirmado.
window.COMMISSION_PACKAGES = {
  adventure: [
    {id:'scene',title:'Escena o encuentro',price:20,description:'Una situación, gancho y posibles resoluciones. Hasta 2 páginas. Sin objetos ni criaturas originales incluidos.'},
    {id:'oneshot',title:'One-shot sencilla',price:40,description:'1 sesión, hasta 5 páginas, trama cerrada, 1 localización principal y 1 objeto mágico. Sin criaturas originales incluidas.'},
    {id:'short',title:'Aventura corta',price:80,description:'2–3 sesiones, hasta 10 páginas, 2 objetos mágicos y 1 criatura original sencilla.'},
    {id:'campaign',title:'Minicampaña',price:150,description:'4–6 sesiones, hasta 20 páginas, 3 objetos mágicos y 2 criaturas originales sencillas.'},
  ],
  collection: [
    {id:'object',title:'Un objeto mágico',price:2.5,description:'Concepto, descripción y funcionamiento de un objeto mágico.'},
    {id:'objects5',title:'Colección de 5 objetos',price:12,description:'Cinco objetos relacionados por una temática.'},
    {id:'creature',title:'Una criatura sencilla',price:5,description:'Concepto y estadísticas de una criatura original sencilla.'},
    {id:'creatures5',title:'Compendio de 5 criaturas sencillas',price:20,description:'Cinco criaturas originales sencillas con temática compartida.'},
    {id:'location',title:'Una localización breve',price:10,description:'Descripción, secretos y ganchos de un lugar. Hasta 2 páginas, sin mapa.'},
    {id:'boss',title:'Jefe con mecánicas especiales',price:8,description:'Jefe con mecánicas especiales. Complejidad pendiente de confirmación.'},
  ]
};
window.COMMISSION_EXTRA_RATES = {objects:2.5,creatures:5,locations:10,pages:10};
window.commissionEstimate = function(service, packageId, quantities, delivery) {
  const pack = window.COMMISSION_PACKAGES[service]?.find(p=>p.id===packageId);
  if (!pack) return null;
  const extras = [['objects','Objetos adicionales'],['creatures','Criaturas sencillas adicionales'],['locations','Localizaciones breves adicionales'],['pages','Bloques narrativos de hasta 2 páginas']].map(([key,label])=>{
    const rate=window.COMMISSION_EXTRA_RATES[key];
    const quantity=Number(quantities[key] ?? 0);
    const max=key==='objects'?30:20;
    if (!Number.isInteger(quantity)||quantity<0||quantity>max) throw Error('Revisa las cantidades de los extras.');
    return {label,quantity,rate,total:quantity*rate};
  });
  return {pack,extras,total:pack.price+extras.reduce((sum,e)=>sum+e.total,0),pending:delivery!=='pdf',from:!!pack.from};
};
