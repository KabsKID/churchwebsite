  function moveWhatsapp() {
    const btn = document.querySelector('[script-id="QYFCB"]');
    if (btn) {
      btn.style.setProperty('right', 'auto', 'important');
      btn.style.setProperty('left', '20px', 'important');
    } else {
      setTimeout(moveWhatsapp, 500);
    }
  }
  moveWhatsapp();
