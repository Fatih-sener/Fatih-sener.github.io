/* NABIZ — ortak davranışlar: mobil menü ve demo formu. */
(function () {
  "use strict";

  /* Mobil menü */
  var dugme = document.getElementById("menuDugmesi");
  var acilir = document.getElementById("gezinmeAcilir");
  if (dugme && acilir) {
    dugme.addEventListener("click", function () {
      var acik = acilir.hidden === false;
      acilir.hidden = acik;
      dugme.setAttribute("aria-expanded", acik ? "false" : "true");
      dugme.textContent = acik ? "☰" : "✕";
    });
  }

  /* Demo formu — istek bir sunucuya gitmiyor, sayfada yanıtlanıyor. */
  var form = document.getElementById("demoForm");
  if (!form) { return; }

  var basari = document.getElementById("formBasari");

  function hataGoster(alan, metin) {
    alan.classList.add("hatali");
    var kutu = alan.querySelector(".hata");
    if (kutu) { kutu.textContent = metin; kutu.hidden = false; }
    var giris = alan.querySelector("input, select, textarea");
    if (giris) { giris.setAttribute("aria-invalid", "true"); }
  }

  function hatayiTemizle(alan) {
    alan.classList.remove("hatali");
    var kutu = alan.querySelector(".hata");
    if (kutu) { kutu.hidden = true; }
    var giris = alan.querySelector("input, select, textarea");
    if (giris) { giris.removeAttribute("aria-invalid"); }
  }

  form.addEventListener("submit", function (olay) {
    olay.preventDefault();

    var alanlar = form.querySelectorAll(".alan");
    Array.prototype.forEach.call(alanlar, hatayiTemizle);

    var adAlani = document.getElementById("adAlani");
    var epostaAlani = document.getElementById("epostaAlani");
    var isletmeAlani = document.getElementById("isletmeAlani");

    var ad = form.elements.ad.value.trim();
    var eposta = form.elements.eposta.value.trim();
    var isletme = form.elements.isletme.value;
    var ilkHata = null;

    if (ad.length < 2) { hataGoster(adAlani, "Adınızı yazın."); ilkHata = ilkHata || form.elements.ad; }
    if (eposta.indexOf("@") === -1 || eposta.indexOf(".") === -1) {
      hataGoster(epostaAlani, "Geçerli bir e-posta adresi yazın.");
      ilkHata = ilkHata || form.elements.eposta;
    }
    if (!isletme) { hataGoster(isletmeAlani, "İşletme türünü seçin."); ilkHata = ilkHata || form.elements.isletme; }

    if (ilkHata) { ilkHata.focus(); return; }

    form.hidden = true;
    basari.hidden = false;
    basari.querySelector("[data-ad]").textContent = ad;
    basari.focus();
  });
})();
