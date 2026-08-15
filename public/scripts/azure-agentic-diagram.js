document.addEventListener('DOMContentLoaded', function () {
  var tooltip = document.createElement('div');
  tooltip.id = 'arch-tooltip';
  tooltip.style.cssText = [
    'position:fixed',
    'background:var(--color-surface)',
    'border:1px solid var(--color-line)',
    'padding:0.5rem 0.75rem',
    'border-radius:4px',
    'font-size:0.8rem',
    'max-width:280px',
    'pointer-events:none',
    'display:none',
    'z-index:100',
    'color:var(--color-text)',
    'line-height:1.4',
    'box-shadow:0 2px 8px rgba(0,0,0,0.12)'
  ].join(';');
  document.body.appendChild(tooltip);

  var nodes = document.querySelectorAll('#arch-svg g[data-detail]');
  nodes.forEach(function (node) {
    node.addEventListener('mouseover', function (e) {
      tooltip.textContent = node.getAttribute('data-detail');
      tooltip.style.display = 'block';
      var x = e.clientX + 14;
      var y = e.clientY + 8;
      if (x + 280 > window.innerWidth) x = e.clientX - 294;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });
    node.addEventListener('mousemove', function (e) {
      var x = e.clientX + 14;
      var y = e.clientY + 8;
      if (x + 280 > window.innerWidth) x = e.clientX - 294;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });
    node.addEventListener('mouseout', function () {
      tooltip.style.display = 'none';
    });
    node.addEventListener('click', function () {
      tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
    });
  });

  document.addEventListener('touchstart', function (e) {
    var svg = document.getElementById('arch-svg');
    if (svg && !svg.contains(e.target)) {
      tooltip.style.display = 'none';
    }
  }, { passive: true });

  var toggle = document.getElementById('arch-toggle');
  var simplified = document.getElementById('arch-simplified');
  var full = document.getElementById('arch-full');
  if (toggle && simplified && full) {
    toggle.addEventListener('click', function () {
      var showingFull = !full.hasAttribute('hidden');
      if (showingFull) {
        full.setAttribute('hidden', 'true');
        simplified.removeAttribute('hidden');
        toggle.textContent = 'Show full architecture ▼';
      } else {
        simplified.setAttribute('hidden', 'true');
        full.removeAttribute('hidden');
        toggle.textContent = 'Show simplified view ▲';
      }
      tooltip.style.display = 'none';
    });
  }
});
