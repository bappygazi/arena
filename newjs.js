function startFight() {
  let aHealth = 100;
  let bHealth = 100;
  
  const message = document.createElement('div');
  message.classList.add('message');
  message.innerHTML = 'Fight starts in 3 seconds!';
  document.body.appendChild(message);

  setTimeout(() => {
    message.style.display = 'none';
    animateA();
  }, 3000);

  function animateA() {
    const elem = document.getElementById('characterA');
    let pos = 0;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 550) {
        clearInterval(id);
        reduceBHealth();
      } else {
        pos++;
        elem.style.left = pos + 'px';
      }
    }
  }

  function reduceBHealth() {
    bHealth -= 10;
    document.getElementById('healthBarB').style.width = bHealth + '%';
    if (bHealth <= 0) {
      endFight('A');
      return;
    }
    animateBackA();
  }

  function animateBackA() {
    const elem = document.getElementById('characterA');
    let pos = 550;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 0) {
        clearInterval(id);
        animateB();
      } else {
        pos--;
        elem.style.left = pos + 'px';
      }
    }
  }

  function animateB() {
    const elem = document.getElementById('characterB');
    let pos = 550;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 0) {
        clearInterval(id);
        reduceAHealth();
      } else {
        pos--;
        elem.style.left = pos + 'px';
      }
    }
  }

  function reduceAHealth() {
    aHealth -= 10;
    document.getElementById('healthBarA').style.width = aHealth + '%';
    if (aHealth <= 0) {
      endFight('B');
      return;
    }
    animateBackB();
  }

  function animateBackB() {
    const elem = document.getElementById('characterB');
    let pos = 0;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 550) {
        clearInterval(id);
        animateA();
      } else {
        pos++;
        elem.style.left = pos + 'px';
      }
    }
  }

  function endFight(winner) {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = `The winner is ${winner}!`;
    document.body.appendChild(message);
  }
}
