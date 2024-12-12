// oyun.js
const oyun = document.getElementById('oyun');
const gemi1 = document.createElement('div');
gemi1.className = 'gemi1';
oyun.appendChild(gemi1);

const gemi2 = document.createElement('div');
gemi2.className = 'gemi2';
oyun.appendChild(gemi2);

let gemi1X = 100;
let gemi1Y = 300;
let gemi2X = 0; // Başlangıç pozisyonu solda
let gemi2Y = 0;

let skor1 = 0;
const skor1El = document.getElementById('skor1');

let canlar = 3;
const canlarEl = document.getElementById('canlar');

function oyunBitir(mesaj) {
  alert(mesaj);
  window.location.reload(); // Sayfayı yeniden yükleyerek oyunu yeniden başlat
}

function lazerAt(gemi, yon) {
  const lazer = document.createElement('div');
  lazer.className = 'lazer';
  lazer.style.left = `${parseInt(gemi.style.left) + 20}px`;
  lazer.style.top = `${parseInt(gemi.style.top) - 10}px`;
  oyun.appendChild(lazer);

  let vurdu = false;

  function hareket() {
    lazer.style.top = `${parseInt(lazer.style.top) + yon}px`;

    if (parseInt(lazer.style.top) < 0 || parseInt(lazer.style.top) > 600) {
      lazer.remove();
      return;
    }

    if (yon < 0 && parseInt(lazer.style.left) > gemi2X && parseInt(lazer.style.left) < gemi2X + 40 &&
        parseInt(lazer.style.top) > gemi2Y && parseInt(lazer.style.top) < gemi2Y + 40) {
      vurdu = true;
      skor1 += 1;
      skor1El.textContent = skor1;
      lazer.remove();
      if (skor1 >= 5) {
        oyunBitir('Tebrikler! Oyunu kazandınız!');
      }
    }

    if (!vurdu) {
      requestAnimationFrame(hareket);
    } else {
      lazer.remove();
    }
  }

  requestAnimationFrame(hareket);

  setTimeout(() => {
    if (!vurdu) {
      canlar -= 1;
      if (canlar >= 0) {
        canlarEl.children[canlar].classList.add('kapali'); // Kalp söndürme
      }
      if (canlar === 0) {
        oyunBitir('Kaybettiniz. Canınız bitti.');
      }
    }
  }, 200); // Lazer hareketi bittiğinde kalp kontrolü
}

function hareket() {
  gemi1.style.left = `${gemi1X}px`;
  gemi1.style.top = `${gemi1Y}px`;
  gemi2.style.left = `${gemi2X}px`;
  gemi2.style.top = `${gemi2Y}px`;

  // Düşman gemisinin soldan sağa doğru hareketi
  gemi2X += 2; // Hız
  if (gemi2X > 760) { // Ekranın sonuna geldiğinde tekrar başlasın
    gemi2X = 0;
  }

  requestAnimationFrame(hareket);
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      gemi1X -= 5;
      break;
    case 'ArrowRight':
      gemi1X += 5;
      break;
    case 'ArrowUp':
      gemi1Y -= 5;
      break;
    case 'ArrowDown':
      gemi1Y += 5;
      break;
    case ' ':
      lazerAt(gemi1, -5);
      break;
  }
});

document.getElementById('sol').addEventListener('click', () => gemi1X -= 5);
document.getElementById('sag').addEventListener('click', () => gemi1X += 5);
document.getElementById('yukari').addEventListener('click', () => gemi1Y -= 5);
document.getElementById('asagi').addEventListener('click', () => gemi1Y += 5);
document.getElementById('at').addEventListener('click', () => lazerAt(gemi1, -5)); // Lazer atış butonu

hareket();
