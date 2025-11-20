// ==========================
// CONFIGURACIÓN
// ==========================
const APP_SCHEME = "keter://"; // Scheme de tu app

// TODO: reemplaza por tus URLs reales de tienda:
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=TU.PAQUETE.ANDROID";
const IOS_STORE_URL = "https://apps.apple.com/app/idTU_ID_DE_APPLE";

const statusMessageEl = document.getElementById("statusMessage");

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function openStoreForPlatform() {
  if (isAndroid()) {
    window.location.href = ANDROID_STORE_URL;
  } else if (isIOS()) {
    window.location.href = IOS_STORE_URL;
  }
}

function openApp() {
  statusMessageEl.textContent = "Intentando abrir la app…";

  const start = Date.now();

  // Intento de abrir la app mediante el scheme
  window.location.href = APP_SCHEME;

  // Fallback: si la app no está instalada, redirigir a la tienda
  setTimeout(function () {
    const elapsed = Date.now() - start;

    // Si seguimos visibles, probablemente no se abrió la app
    if (document.visibilityState === "visible") {
      statusMessageEl.textContent = "No pudimos abrir la app. Redirigiendo a la tienda…";
      openStoreForPlatform();
    }
  }, 1500); // Ajusta el tiempo si lo necesitas
}

document.addEventListener("DOMContentLoaded", function () {
  const openAppBtn = document.getElementById("openAppBtn");
  const downloadAndroidBtn = document.getElementById("downloadAndroidBtn");
  const downloadIosBtn = document.getElementById("downloadIosBtn");

  openAppBtn.addEventListener("click", function () {
    openApp();
  });

  downloadAndroidBtn.addEventListener("click", function () {
    window.location.href = ANDROID_STORE_URL;
  });

  downloadIosBtn.addEventListener("click", function () {
    window.location.href = IOS_STORE_URL;
  });

  // Intento automático solo en móviles
  if (isAndroid() || isIOS()) {
    statusMessageEl.textContent = "Detectamos un dispositivo móvil. Abriendo la app…";
    setTimeout(openApp, 800);
  } else {
    statusMessageEl.textContent = "Estás en un navegador de escritorio. Usa tu móvil para abrir la app.";
  }
});
