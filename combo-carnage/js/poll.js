(function(){
  var box = document.getElementById("pollBox");
  if(!box) return;
  var opts = ["County Sheriffs","American Bank","Don's Donuts","The whole of GrandView"];
  var key = "cc_gv_poll";
  var voted = window.CCStore ? CCStore.get(key+"_me", null) : null;
  var votes = null;
  try{ votes = JSON.parse((window.CCStore && CCStore.get(key+"_tally","null")) || "null"); }catch(e){ votes = null; }
  if(!votes) votes = {0:11,1:9,2:7,3:18};

  function render(sel){
    var total = 0;
    for(var i=0;i<opts.length;i++) total += votes[i] || 0;
    box.innerHTML = "";
    for(var i=0;i<opts.length;i++){
      (function(i){
        var n = votes[i] || 0;
        var pct = total ? Math.round(n*100/total) : 0;
        var b = document.createElement("button");
        b.type = "button";
        b.innerHTML = "<strong>"+opts[i]+"</strong> — "+pct+"% ("+n+")<div class='pbar'><div class='pfill' style='width:"+pct+"%'></div></div>";
        if(sel === i) b.style.borderColor = "#ff4d00";
        if(!voted){
          b.onclick = function(){
            votes[i] = (votes[i] || 0) + 1;
            if(window.CCStore){
              CCStore.set(key+"_tally", JSON.stringify(votes));
              CCStore.set(key+"_me", String(i));
            }
            voted = String(i);
            render(i);
          };
        }
        box.appendChild(b);
      })(i);
    }
  }
  render(voted == null ? -1 : parseInt(voted,10));
})();
