(function(){
  var arena = document.getElementById("arena");
  if(!arena) return;

  var start = document.getElementById("gStart");
  var go = document.getElementById("gGo");
  var comboEl = document.getElementById("gCombo");
  var scoreEl = document.getElementById("gScore");
  var timeEl = document.getElementById("gTime");
  var bestEl = document.getElementById("gBest");

  var insults = ["Rack off!","Get stuffed!","Too slow, GrandView!","Combo's on!","Donut time!","Pay up!","No filter!","Carnage!"];
  var types = [
    {cls:"t-cop", emoji:"🚓", pts:15},
    {cls:"t-donut", emoji:"🍩", pts:10},
    {cls:"t-bank", emoji:"🏦", pts:20},
    {cls:"t-beer", emoji:"🍺", pts:12}
  ];

  var playing = false, combo = 0, score = 0, timeLeft = 30;
  var spawnT = null, clockT = null, targets = [];
  var best = parseInt((window.CCStore && CCStore.get("cc_gv_best","0")) || "0", 10) || 0;
  if(bestEl) bestEl.textContent = "Best: " + best;

  function clearTargets(){
    for(var i=0;i<targets.length;i++){
      if(targets[i].el && targets[i].el.parentNode) targets[i].el.parentNode.removeChild(targets[i].el);
      if(targets[i].timer) clearTimeout(targets[i].timer);
    }
    targets = [];
  }

  function pop(xPct, yPct, text){
    var f = document.createElement("div");
    f.className = "float";
    f.textContent = text;
    f.style.left = xPct;
    f.style.top = yPct;
    f.style.color = "#ffb000";
    arena.appendChild(f);
    setTimeout(function(){ if(f.parentNode) f.parentNode.removeChild(f); }, 700);
  }

  function hitTarget(item){
    if(!playing || !item || item.dead) return;
    item.dead = true;
    combo += 1;
    var add = item.spec.pts * Math.max(1, combo);
    score += add;
    if(comboEl) comboEl.textContent = combo + "x";
    if(scoreEl) scoreEl.textContent = String(score);
    pop(item.el.style.left, item.el.style.top, "+" + add + "  " + insults[Math.floor(Math.random()*insults.length)]);
    if(item.timer) clearTimeout(item.timer);
    if(item.el.parentNode) item.el.parentNode.removeChild(item.el);
  }

  function spawn(){
    if(!playing) return;
    var spec = types[Math.floor(Math.random()*types.length)];
    var el = document.createElement("button");
    el.type = "button";
    el.className = "target " + spec.cls;
    el.textContent = spec.emoji;
    el.setAttribute("aria-label", "Hit target");
    el.style.left = (12 + Math.random()*76) + "%";
    el.style.top = (28 + Math.random()*60) + "%";

    var item = {el:el, spec:spec, dead:false, timer:null};
    el.addEventListener("pointerdown", function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      hitTarget(item);
    });

    arena.appendChild(el);
    targets.push(item);
    item.timer = setTimeout(function(){
      if(item.dead) return;
      item.dead = true;
      if(el.parentNode) el.parentNode.removeChild(el);
      combo = 0;
      if(comboEl) comboEl.textContent = "0x";
    }, 1500);
  }

  function end(){
    playing = false;
    clearInterval(spawnT);
    clearInterval(clockT);
    spawnT = clockT = null;
    clearTargets();
    if(score > best){
      best = score;
      if(window.CCStore) CCStore.set("cc_gv_best", String(best));
    }
    if(start){
      start.classList.remove("hidden");
      start.style.display = "flex";
    }
    if(bestEl) bestEl.textContent = "Score " + score + "  ·  Best " + best;
    if(go) go.textContent = "Run it back";
  }

  function startGame(){
    playing = true;
    combo = 0;
    score = 0;
    timeLeft = 30;
    if(comboEl) comboEl.textContent = "0x";
    if(scoreEl) scoreEl.textContent = "0";
    if(timeEl) timeEl.textContent = "30";
    if(start){
      start.classList.add("hidden");
      start.style.display = "none";
    }
    clearTargets();
    spawn();
    spawnT = setInterval(spawn, 620);
    clockT = setInterval(function(){
      timeLeft -= 1;
      if(timeEl) timeEl.textContent = String(timeLeft);
      if(timeLeft <= 0) end();
    }, 1000);
  }

  if(go){
    go.addEventListener("click", function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      startGame();
    });
  }

  arena.addEventListener("pointerdown", function(e){
    if(!playing) return;
    if(e.target === arena){
      combo = 0;
      if(comboEl) comboEl.textContent = "0x";
    }
  });
})();
