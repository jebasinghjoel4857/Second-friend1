// ===== Mobile menu =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ===== Concern cards data =====
const concerns = [
  { icon: '😰', name: 'Anxiety', short: 'When your mind won\u2019t stop racing',
    tag: 'What anxiety really looks like', title: 'It\u2019s not just \u201cbeing nervous\u201d',
    looks: 'Your heart pounds before every class presentation. You replay conversations at night, wondering if you said something wrong. You avoid raising your hand even when you know the answer. Your chest feels tight for no reason, and everyone else seems to have it together.',
    quote: '\u201cEveryone thinks I\u2019m calm. Inside, I\u2019m exhausted from pretending.\u201d' },
  { icon: '📚', name: 'Academic Stress', short: 'When marks feel like your whole worth',
    tag: 'What academic stress really looks like', title: 'When one exam feels like your entire future',
    looks: 'You open the textbook and freeze. Backlogs pile up, so you stop opening them at all. You compare your grades with friends constantly. Sleep becomes a luxury \u2014 you study till 3am but retain nothing. A single bad test result ruins your whole week.',
    quote: '\u201cI used to love learning. Now I just fear failing.\u201d' },
  { icon: '🏠', name: 'Homesickness', short: 'When hostel feels like a stranger\u2019s house',
    tag: 'What homesickness really looks like', title: 'Surrounded by people, missing home',
    looks: 'You eat mess food and think of your mom\u2019s cooking. Festivals on campus feel lonelier than being alone. You call home but say \u201cI\u2019m fine\u201d because you don\u2019t want them to worry. Your room in the hostel still doesn\u2019t feel like yours.',
    quote: '\u201cI\u2019m in a city of millions, and I\u2019ve never felt further from home.\u201d' },
  { icon: '💔', name: 'Relationship Issues', short: 'Breakups, friendships, family pressure',
    tag: 'What relationship pain really looks like', title: 'The people closest to you can hurt the most',
    looks: 'A breakup makes campus feel unbearable because you keep running into them. A best friend suddenly became distant and you don\u2019t know why. Family expects one thing, you want another, and every call ends in an argument. You smile in group photos while hurting inside.',
    quote: '\u201cI lost my person. Nobody here even knows we were close.\u201d' },
  { icon: '🌫️', name: 'Loneliness', short: 'Even in a crowd, no one to really talk to',
    tag: 'What loneliness really looks like', title: 'A thousand contacts, zero real connections',
    looks: 'You scroll through Instagram watching others\u2019 friend groups. Lunch is eaten alone with earphones as a shield. You have classmates, not friends. Some days you don\u2019t speak to anyone out loud at all \u2014 and you\u2019re not sure when that started feeling normal.',
    quote: '\u201cI\u2019m not sad about anything specific. I\u2019m just\u2026 alone.\u201d' },
  { icon: '🧭', name: 'Career Confusion', short: 'Everyone asks \u201cwhat next?\u201d and you don\u2019t know',
    tag: 'What career confusion really looks like', title: 'When \u201cwhat do you want to become?\u201d keeps you up at night',
    looks: 'Seniors got placed, relatives keep asking about your plans. You chose this course because someone told you to, not because you wanted it. LinkedIn makes you feel behind. You wonder if you\u2019re wasting years on the wrong path \u2014 but changing feels impossible.',
    quote: '\u201cI\u2019m running a race, but I never chose the track.\u201d' }
];

// ===== Build concern cards =====
const grid = document.getElementById('concernGrid');
concerns.forEach((c, i) => {
  const btn = document.createElement('button');
  btn.className = 'concern-card';
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<div class="concern-icon">' + c.icon + '</div>' +
    '<h3>' + c.name + '</h3>' + '<p>' + c.short + '</p>';
  btn.addEventListener('click', () => showConcern(i, btn));
  grid.appendChild(btn);
});

const detail = document.getElementById('concernDetail');
let activeIndex = null;

function showConcern(i, btn) {
  const c = concerns[i];
  if (activeIndex === i) {
    detail.classList.remove('show');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    activeIndex = null;
    return;
  }
  activeIndex = i;
  document.querySelectorAll('.concern-card').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-expanded', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-expanded', 'true');

  document.getElementById('cdTag').textContent = c.tag;
  document.getElementById('cdTitle').textContent = c.title;
  document.getElementById('cdLooks').textContent = c.looks;
  document.getElementById('cdQuote').textContent = c.quote;

  detail.classList.add('show');
  setTimeout(() => {
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ===== Scroll reveal animations =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Waitlist form (placeholder until Formspree ID added) =====
document.querySelector('.signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.email.value.trim();
  if (!email) return;
  alert('Thank you! ' + email + ' has been added to the waitlist. 🎉');
  this.reset();
});

// ===== Login / Signup modals =====
function openModal(id) {
  closeModals();
  document.getElementById(id).classList.add('show');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function switchModal(id) {
  document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('show'));
  document.getElementById(id).classList.add('show');
}
function closeModals() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('show'));
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModals(); });

// Placeholder auth handler (connect to backend later)
function handleAuth(e, msg) {
  e.preventDefault();
  alert(msg);
  closeModals();
  e.target.reset();
}

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
