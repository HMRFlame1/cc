(function(){
  try{
    if(window.self !== window.top || /[?&]embed=1\b/.test(location.search)){
      document.body.classList.add("in-iframe");
    }
  }catch(e){
    document.body.classList.add("in-iframe");
  }

  var heroN = document.getElementById("heroCombo");
  if(heroN){
    var t = 128, s = performance.now();
    function tick(n){
      var p = Math.min(1,(n-s)/1600);
      heroN.textContent = Math.round(t*(1-Math.pow(1-p,3)))+"x";
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var canvas = document.getElementById("embers");
  if(canvas && canvas.getContext){
    var ctx = canvas.getContext("2d"), w, h, bits;
    function resize(){
      w = canvas.width = canvas.offsetWidth || innerWidth;
      h = canvas.height = canvas.offsetHeight || innerHeight;
      bits = [];
      for(var i=0;i<42;i++){
        bits.push({
          x:Math.random()*w, y:Math.random()*h,
          r:Math.random()*2+.5, s:Math.random()*.7+.25,
          a:Math.random()*.5+.2,
          c:Math.random()>.35?"255,90,20":"80,200,255"
        });
      }
    }
    resize();
    addEventListener("resize", resize);
    (function draw(){
      ctx.clearRect(0,0,w,h);
      for(var i=0;i<bits.length;i++){
        var p = bits[i];
        p.y -= p.s;
        p.x += Math.sin(p.y*.02)*.3;
        if(p.y<-8){p.y=h+8;p.x=Math.random()*w;}
        ctx.beginPath();
        ctx.fillStyle = "rgba("+p.c+","+p.a+")";
        ctx.arc(p.x,p.y,p.r,0,6.28);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    })();
  }

  function storeGet(k, fallback){
    try{ var v = localStorage.getItem(k); return v == null ? fallback : v; }
    catch(e){ return fallback; }
  }
  function storeSet(k, v){
    try{ localStorage.setItem(k, v); }catch(e){}
  }
  window.CCStore = {get:storeGet, set:storeSet};

  function postHeight(){
    try{
      var h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      parent.postMessage({type:"combo-carnage-height", height:h}, "*");
    }catch(e){}
  }
  addEventListener("load", postHeight);
  addEventListener("resize", postHeight);
  setTimeout(postHeight, 300);
  setTimeout(postHeight, 1200);
})();
