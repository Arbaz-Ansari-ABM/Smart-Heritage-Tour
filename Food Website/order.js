(function () {
  function ensureStylesInjected() {
    if (document.getElementById('food-order-toast-styles')) return;
    const style = document.createElement('style');
    style.id = 'food-order-toast-styles';
    style.textContent = `
      @keyframes toast-in {
        0% { transform: translateY(20px) scale(0.96); opacity: 0; }
        60% { transform: translateY(-4px) scale(1.02); opacity: 1; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes toast-out {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(10px) scale(0.98); opacity: 0; }
      }
      .order-toast {
        position: fixed;
        left: 50%;
        bottom: 28px;
        transform: translateX(-50%);
        z-index: 9999;
        background: #000;
        color: #fff;
        border-radius: 10px;
        padding: 14px 18px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 260px;
        max-width: 90vw;
        font-family: inherit;
        animation: toast-in 380ms ease forwards;
      }
      .order-toast__icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #ffa500;
        color: #000;
        font-weight: 900;
      }
      .order-toast__text { line-height: 1.35; }
      .order-toast--leaving { animation: toast-out 260ms ease forwards; }
    `;
    document.head.appendChild(style);
  }

  function showOrderToast(message, durationMs) {
    ensureStylesInjected();

    const toast = document.createElement('div');
    toast.className = 'order-toast';

    const icon = document.createElement('div');
    icon.className = 'order-toast__icon';
    icon.textContent = '✓';

    const text = document.createElement('div');
    text.className = 'order-toast__text';
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);

    const hide = () => {
      toast.classList.add('order-toast--leaving');
      setTimeout(() => toast.remove(), 260);
    };

    if (durationMs > 0) {
      setTimeout(hide, durationMs);
    }

    return { update: (msg) => (text.textContent = msg), hide };
  }

  function handleOrderClick(event) {
    event.preventDefault();
    const toast = showOrderToast('Order confirm — now wait for ready…', 0);
    setTimeout(() => toast.update('Preparing your order…'), 900);
    setTimeout(() => toast.update('Almost done…'), 1800);
    setTimeout(() => toast.update('Order confirmed! Please wait while its ready.'), 2700);
    setTimeout(() => toast.hide(), 4000);
  }

  function init() {
    const buttons = document.querySelectorAll('.menu_btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', handleOrderClick, { passive: false });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


