window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  const container = document.getElementById("container");
  let tennis = "";
  let atBounds = false;
  function createElement(initial, left=0, top=0, size=0) {
    if (+(left) >= 400) return atBounds = true;
    const pre = document.createElement("pre");
    pre.innerHTML = "🎾";
    let nleft = initial ? getRandomInt(0,100) : +(left)+5;
    let ntop = initial ? getRandomInt(0,100): +(top)+5;
    let nsize = initial ? 25 : size;
    pre.style.left = nleft+"px";
    pre.style.top = ntop+"px";
    pre.style.fontSize = nsize+"px";
    if (tennis.length > 0) tennis+="**"; // separator
    const cactus = `${nleft},${ntop},${nsize}`;
    tennis+=cactus;
    container.appendChild(pre);
  }

  function moveElements() {
    atob(container.dataset.tennis).split("**").filter((ch)=>ch).forEach((el)=>{
      const pieces=el.split(",");
      if (pieces.length < 3) return;
      createElement(false, pieces[0], pieces[1], pieces[2]);
    });
  }

  if (container.dataset.tennis) moveElements();
  else createElement(true);
  
  function bounce(e) {
    // e.preventDefault();
    const text = `<!DOCTYPE html><html> <head> <title>tennis</title> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://iguannalin.github.io/tennis/index.css"/><script src=https://iguannalin.github.io/tennis/index.js></script></head> <body> <div id="container" data-tennis=${btoa(tennis)}></div></body></html>`;
    const blob = new Blob([text], {type: "text/html"});
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank', `popup,location,status,scrollbars,resizable,width=400,height=400`);
    window.URL.revokeObjectURL(blobUrl);
  }

  if (!atBounds) setTimeout(bounce, 500);
  // document.addEventListener('touchstart', bounce, {passive: false});
  // document.body.addEventListener('click', bounce);
});