const URL = "https://api.binance.com/api/v3/ticker/price?symbol={0}USDT";

function reCal() {
  console.log(1);
  const z = getVal("x");
  const zz = getVal("vol");
  const zzz = getVal("margin");
  const zzzz = getVal("entry");
  const obj = getObj();
  if (z && (zz || zzz)) {
    handle1(z, zz, zzz);
  } else {
    return;
  }
  if (!zzzz) return;
  console.log("go");
  const { type, x, entry, vol, margin, tp, tpu, tpp, sl, slu, slp } = obj;
  if (tp || tpp || tpu) {
    handle2(type, x, tp, tpp, tpu);
  }
  if (sl || slp || slu) {
    handle3(type, x, sl, slp, slu);
  }
}

function rePri(element) {
  if (element === "coin") {
    const name = document.getElementById("name").value;
    getPri(name);
  }
}

function getPri(name) {
  console.log(name);
  const rq = URL.replace("{0}", name.toUpperCase());
  fetch(rq)
    .then((response) => response.json())
    .then((data) => {
      if (data.price.slice(0, 5) == "0.000") {
        const value = +data.price * 1000;
        setPri(value);
      } else {
        const value = data.price;
        setPri(value);
      }
    })
    .catch(() => setPri(""));
}

function setPri(price) {
  document.getElementById("pri").innerHTML = price.slice(0, 5);
}

function setVal(name, value) {
  document.getElementById(name).innerHTML = value;
}

function getVal(name) {
  return document.getElementById(name).value;
}

function setInp(name, val) {
  document.getElementById(name).value = val;
}

function getObj() {
  const type = document.getElementById("type").value;
  const x = document.getElementById("x").value;
  const entry = document.getElementById("entry").value;
  const vol = document.getElementById("vol").value;
  const margin = document.getElementById("margin").value;
  const tp = document.getElementById("tp").value;
  const tpu = document.getElementById("tpu").value;
  const tpp = document.getElementById("tpp").value;
  const sl = document.getElementById("sl").value;
  const slu = document.getElementById("slu").value;
  const slp = document.getElementById("slp").value;
  return { type, x, entry, vol, margin, tp, tpu, tpp, sl, slu, slp };
}

function getRad() {
  const min = document.getElementById("min").value || 0;
  const max = document.getElementById("max").value || 100;
  setVal("rad", getNum(min, max));
}

function getNum(min, max) {
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return Math.floor(Math.random() * (min - max + 1) + max);
}

function handle1(x, vol, margin) {
  if (vol && x) {
    setInp("margin", vol * x);
    return;
  }
  if (margin && x) {
    setInp("vol", margin / x);
  }
}
function handle2(type, x, tp, tpp, tpu) {}
function handle3(type, x, sl, slp, slu) {}
