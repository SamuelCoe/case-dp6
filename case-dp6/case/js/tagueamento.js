// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.
<!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KSLD2Q94');

<!-- End Google Tag Manager -->
document.addEventListener('DOMContentLoaded', function () {
  // preencheu campos
  var camposDisparados = {
    nome: false,
    email: false,
    telefone: false
  };
  var popupDisparado = false;

  // Função genérica para monitorar os campos
  function monitorarCampo(campo, seletor) {
    var input = document.querySelector(seletor);
    if (!input) return;

    input.addEventListener('blur', function () {
      if (!camposDisparados[campo] && input.value.trim().length > 1) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'form_start',
          form_id: input.id || 'undefined',
          form_name: 'sobre:contato',
          form_destination: 'http://www.destinodoformulario.com.br'
        });
        camposDisparados[campo] = true;
      }
    });
  }

  // Monitoramento dos 3 campos
  monitorarCampo('nome', '#nome');
  monitorarCampo('email', '#email');
  monitorarCampo('telefone', '#telefone');

  //submit
  var form = document.querySelector('form.contato');
  if (form) {
    form.addEventListener('submit', function () {
      var nomeInput = document.querySelector('#nome');
      var botao = document.querySelector("body > main > section > form > ul > li:nth-child(5) > button");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submit',
        form_id: nomeInput ? nomeInput.id || 'undefined' : 'undefined',
        form_name: 'sobre:contato',
        form_destination: 'http://www.destinodoformulario.com.br',
        X: botao ? botao.innerText.trim() : 'undefined'
      });
    });
  }

  //pop-up aparecer
  var intervalo = setInterval(function () {
    var popup = document.querySelector('.lightbox-content');

    if (!popupDisparado && popup && popup.innerText.includes('Obrigado pelo seu contato!')) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_success',
        form_id: 'enviar',
        form_name: 'sobre:contato',
        page_location: window.location.href
      });

      popupDisparado = true;
      clearInterval(intervalo);
    }
  }, 300);
});
