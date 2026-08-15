document.addEventListener('DOMContentLoaded', function () {
  var panel = document.getElementById('arch-detail-panel');
  var selected = null;

  function select(node) {
    if (node === selected) { deselect(); return; }
    if (selected) clearHighlight(selected);
    selected = node;
    var rect = node.querySelector('rect');
    if (rect) rect.setAttribute('stroke-width', '3');
    if (panel) {
      panel.textContent = node.getAttribute('data-detail');
      panel.style.display = 'block';
    }
  }

  function deselect() {
    if (selected) clearHighlight(selected);
    selected = null;
    if (panel) { panel.textContent = ''; panel.style.display = 'none'; }
  }

  function clearHighlight(node) {
    var rect = node.querySelector('rect');
    if (rect) rect.setAttribute('stroke-width', '1.5');
  }

  document.querySelectorAll('#arch-svg g[data-detail]').forEach(function (node) {
    node.addEventListener('click', function (e) {
      e.stopPropagation();
      select(node);
    });
  });

  document.addEventListener('click', function () { deselect(); });
  document.addEventListener('touchstart', function (e) {
    var svg = document.getElementById('arch-svg');
    if (svg && !svg.contains(e.target)) deselect();
  }, { passive: true });

  var toggle = document.getElementById('arch-toggle');
  var simplified = document.getElementById('arch-simplified');
  var full = document.getElementById('arch-full');

  if (simplified) simplified.style.display = '';
  if (full) full.style.display = 'none';

  if (toggle && simplified && full) {
    toggle.addEventListener('click', function () {
      var showingFull = full.style.display !== 'none';
      if (showingFull) {
        full.style.display = 'none';
        simplified.style.display = '';
        toggle.textContent = 'Show full architecture ▼';
      } else {
        simplified.style.display = 'none';
        full.style.display = '';
        toggle.textContent = 'Show simplified view ▲';
      }
      deselect();
    });
  }
});
