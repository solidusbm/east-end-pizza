// East End Pizza Co. — site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight today's row in the hours table
  var hoursTable = document.getElementById('hoursTable');
  if (hoursTable) {
    var today = new Date().getDay(); // 0 = Sunday
    var row = hoursTable.querySelector('tr[data-day="' + today + '"]');
    if (row) row.classList.add('today');
  }

  // Reservation form
  var form = document.getElementById('reservationForm');
  if (form) {
    var minDateInput = form.querySelector('#date');
    if (minDateInput) {
      var todayStr = new Date().toISOString().split('T')[0];
      minDateInput.setAttribute('min', todayStr);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var submitBtn = document.getElementById('submitBtn');
      var endpoint = form.getAttribute('action');

      if (!endpoint || endpoint.indexOf('YOUR_FORM_ID') !== -1) {
        status.className = 'form-status error';
        status.textContent = 'Online reservation requests aren’t connected yet — please call us at (830) 955-5046 to book your table.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          status.className = 'form-status success';
          status.textContent = 'Thanks! Your reservation request has been sent — we’ll confirm by phone or email shortly.';
          form.reset();
        } else {
          throw new Error('Request failed');
        }
      }).catch(function () {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong sending your request. Please call us at (830) 955-5046 to book your table.';
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Reservation';
        status.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }
});
