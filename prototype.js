const variants = {
  A: { name: 'In bold', title: 'Work smart.\nGo further.', description: 'Your next step, backed by the right preparation. SSC, HSC and entrance coaching in Mira Road.' },
  B: { name: 'The study journal', title: 'Big ambitions.\nA clear way forward.', description: 'From school foundations to entrance exams. Find your next step with Work Smart Tutorials.' },
  C: { name: 'Find your course', title: 'Your next chapter\nstarts here.', description: 'SSC. HSC. Your dream entrance exam. Choose what you’re working towards.' }
};
const courses = [
  { name: 'SSC', label: 'School foundations', detail: 'Class 10 · Maharashtra Board', subjects: 'Maths, science and board preparation', group: 'School', note: 'Build understanding. Make revision count.' },
  { name: 'HSC', label: 'The next step', detail: 'Classes 11 & 12', subjects: 'Higher secondary preparation', group: 'College', note: 'Give your next two years a clear direction.' },
  { name: 'NEET', label: 'A future in medicine', detail: 'Medical entrance preparation', subjects: 'Physics, chemistry and biology', group: 'Entrance', note: 'Turn concepts into confident problem-solving.' },
  { name: 'JEE', label: 'Think like an engineer', detail: 'Engineering entrance preparation', subjects: 'Physics, chemistry and mathematics', group: 'Entrance', note: 'Build the reasoning behind every answer.' },
  { name: 'MHT-CET', label: 'Your Maharashtra pathway', detail: 'State entrance preparation', subjects: 'Entrance exam preparation', group: 'Entrance', note: 'Prepare for the next step, close to home.' },
  { name: 'Computer Science', label: 'Think beyond the textbook', detail: 'HSC Computer Science', subjects: 'Computer science alongside HSC', group: 'College', note: 'Make room for computer science in your HSC journey.' }
];
const media = {
  quiz: { image: 'https://i.ytimg.com/vi/GWP8aW90lF8/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=GWP8aW90lF8', name: 'Inside a Class 10 quiz session' },
  demo: { image: 'https://i.ytimg.com/vi/h4JfjIbtSCI/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=h4JfjIbtSCI', name: 'A closer look at HSC demo lectures' }
};
let variant = new URLSearchParams(location.search).get('variant') || 'A';
if (!Object.hasOwn(variants, variant)) variant = 'A';
let view = new URLSearchParams(location.search).get('view') === 'student' ? 'student' : 'website';
let selectedCourse = 0;
let courseFilter = 'All';
let resourceTab = 'Resources';
const app = document.querySelector('#app');
const lineTitle = (title) => title.split('\n').map(line => `<span>${line}</span>`).join('');
const brand = () => `<a class="brand" href="#" data-home aria-label="Work Smart Tutorials home"><span class="brand-mark" aria-hidden="true">w<span>s</span></span><span class="brand-name">work smart<span>TUTORIALS</span></span></a>`;
const enquiry = (label = 'Enquire now', style = 'primary') => `<button class="button ${style}" data-enquire>${label}<span aria-hidden="true">↗</span></button>`;
function header() {
  return `<header class="site-header wrap">${brand()}<nav class="desktop-nav" aria-label="Main navigation"><a href="#courses">Courses</a><a href="#results">Results</a><a href="#updates">Dates & updates</a><a href="#classroom">Our classroom</a></nav><button class="student-link" data-student>Student space <span aria-hidden="true">↗</span></button><button class="menu-button" aria-expanded="false" aria-controls="mobile-menu">Menu</button><nav id="mobile-menu" class="mobile-menu" aria-label="Mobile navigation" hidden><a href="#courses">Courses</a><a href="#results">Results</a><a href="#updates">Dates & updates</a><a href="#classroom">Our classroom</a><button data-student>Student space</button></nav></header>`;
}
function lessonImage(key, extra = '') {
  const item = media[key];
  return `<a class="lesson-image ${extra}" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${item.name} on YouTube"><img src="${item.image}" alt="Video thumbnail from Work Smart Tutorials: ${item.name}" width="480" height="360"><span class="play-button" aria-hidden="true"><span class="play-triangle"></span></span><span class="image-caption">${item.name}<span>YouTube ↗</span></span></a>`;
}
function hero() {
  const current = variants[variant];
  if (variant === 'A') return `<section class="hero hero-a wrap"><div class="hero-a-heading"><h1>${lineTitle(current.title)}</h1><div class="hero-intro"><p>${current.description}</p><div class="hero-actions"><a class="button primary" href="#courses">Find your course <span aria-hidden="true">↗</span></a><button class="text-link" data-enquire>Meet Work Smart <span aria-hidden="true">↗</span></button></div></div></div><div class="hero-a-stage">${lessonImage('demo', 'hero-film')}<div class="yellow-note"><span class="note-location">Naya Nagar, Mira Road</span><p>Not just a syllabus.<br>A place to <strong>figure it out.</strong></p><a href="#classroom" class="note-link">Step inside our classroom <span aria-hidden="true">↗</span></a></div></div></section>`;
  if (variant === 'B') return `<section class="hero hero-b wrap"><div class="journal-visual">${lessonImage('demo', 'journal-film')}<div class="journal-caption"><span>Learning looks like this.</span><p>A real moment from a Work Smart classroom.</p></div></div><div class="journal-copy"><div class="location-line">Naya Nagar, Mira Road</div><h1>${lineTitle(current.title)}</h1><p>${current.description}</p><div class="hero-actions"><a class="button primary" href="#courses">Explore courses <span aria-hidden="true">↗</span></a><button class="text-link" data-enquire>Meet Work Smart ↗</button></div><div class="journal-footnote"><span>School. College. What comes next.</span><a href="#updates">Exam dates & updates ↗</a></div></div></section>`;
  return `<section class="hero hero-c wrap"><div class="navigator-title"><h1>${lineTitle(current.title)}</h1><p>${current.description}</p></div><div class="course-navigator"><div class="navigator-options" role="group" aria-label="Choose your course">${courses.map((course, index) => `<button data-course-select="${index}" aria-pressed="${selectedCourse === index}"><span>${course.name}</span><span aria-hidden="true">↗</span></button>`).join('')}</div><div class="navigator-detail" aria-live="polite">${navigatorDetail()}</div></div><div class="hero-c-footer"><span>Work Smart Tutorials, Naya Nagar, Mira Road</span><a href="#classroom">Get to know our classroom ↗</a></div></section>`;
}
function navigatorDetail() {
  const course = courses[selectedCourse];
  return `<span class="navigator-label">${course.detail}</span><h2>${course.label}.</h2><p>${course.note}</p>${enquiry(`Explore ${course.name}`, 'on-accent')}<span class="navigator-subjects">${course.subjects}</span>`;
}
function coursesSection() {
  return `<section id="courses" class="courses-section wrap section"><div class="section-heading"><h2>Start where you are.<br>Go where you want.</h2><p>School, college and entrance preparation. There’s a course for your next step.</p></div><div class="course-filters" role="group" aria-label="Filter courses">${['All', 'School', 'College', 'Entrance'].map(filter => `<button data-filter="${filter}" aria-pressed="${filter === courseFilter}">${filter === 'All' ? 'All courses' : filter}</button>`).join('')}</div><div class="course-list">${courseRows()}</div></section>`;
}
function courseRows() {
  return courses.filter(course => courseFilter === 'All' || course.group === courseFilter).map(course => `<button class="course-row" data-enquire><span class="course-name">${course.name}</span><span class="course-detail">${course.detail}</span><span class="course-action">Explore course <span aria-hidden="true">↗</span></span></button>`).join('');
}
function resultsSection() {
  return `<section id="results" class="results-section section"><div class="wrap results-layout"><div class="results-copy"><h2>Every result<br>has a story.</h2><p>A space for the students, the effort and the milestones worth celebrating.</p><a class="text-link" href="https://www.youtube.com/watch?v=jSsEc1eE5Us" target="_blank" rel="noopener noreferrer">Watch our scorers’ day out ↗</a></div><div class="result-placeholder"><span class="small-label">RESULTS SHOWCASE · DESIGN PREVIEW</span><div class="result-year">Your next<br><span>success story.</span></div><div class="result-bottom"><p>Your approved result posters, student names and scores will appear here, organised by exam and year.</p><span class="pending-label">Awaiting verified results</span></div></div></div></section>`;
}
function updatesSection() {
  return `<section id="updates" class="updates-section wrap section"><div class="section-heading"><h2>A little less last-minute.</h2><p>Exam dates, important notices and what’s happening at Work Smart.</p></div><div class="updates-layout"><div class="exam-board"><div class="board-heading"><h3>Exam calendar</h3><span class="small-label">CONTENT PREVIEW</span></div>${['SSC & HSC Boards', 'NEET UG', 'JEE Main', 'MHT-CET'].map(exam => `<div class="exam-row"><strong>${exam}</strong><span>Official dates to be added</span><span class="calendar-symbol" aria-hidden="true"></span></div>`).join('')}<p class="calendar-note">The finished calendar will show the exam year, official source and last-checked date.</p></div><div class="updates-note"><span class="small-label">FROM THE CLASSROOM</span><h3>Don’t just read<br>about the class.<br>See it.</h3><p>Quizzes, lessons and moments from Work Smart, on our own channels.</p><div class="channel-links"><a href="https://www.youtube.com/@WorkSmartSSC" target="_blank" rel="noopener noreferrer">SSC YouTube <span>↗</span></a><a href="https://www.youtube.com/@WorkSmartHSC" target="_blank" rel="noopener noreferrer">HSC YouTube <span>↗</span></a></div></div></div></section>`;
}
function classroomSection() {
  return `<section id="classroom" class="classroom-section wrap section"><div class="section-heading"><h2>A classroom. A conversation.<br>A clearer understanding.</h2><p>Get a feel for Work Smart through real videos from our channels.</p></div><div class="classroom-films"><article>${lessonImage('demo')}<h3>See what an HSC class feels like.</h3><p>Meet the classroom before you make a decision.</p></article><article>${lessonImage('quiz')}<h3>A different way to check what stuck.</h3><p>A Class 10 circle chapter quiz, inside the classroom.</p></article></div></section>`;
}
function studentSection() {
  return `<section class="student-section section"><div class="wrap student-intro"><div><h2>Class ends.<br>Learning doesn’t.</h2><p>Your notes, lecture recordings and test papers. Together in a student space built around your course.</p><button class="button primary" data-student>Preview student space <span aria-hidden="true">↗</span></button></div><div class="resource-index"><div><span class="resource-type">PDF</span><span><strong>Find your notes</strong><small>Resources by subject and chapter</small></span><span aria-hidden="true">↗</span></div><div><span class="resource-type">PLAY</span><span><strong>Revisit a lesson</strong><small>Lecture recordings in one place</small></span><span aria-hidden="true">↗</span></div><div><span class="resource-type">TEST</span><span><strong>Put it into practice</strong><small>Test papers for your course</small></span><span aria-hidden="true">↗</span></div><p>Preview only. Secure student login will be part of the full build.</p></div></div></section>`;
}
function footer() {
  return `<footer class="wrap site-footer"><div class="footer-cta"><h2>Let’s work on<br>what’s next.</h2><div><p>Work Smart Tutorials<br>Naya Nagar, Mira Road</p>${enquiry()}</div></div><div class="footer-bottom">${brand()}<p>SSC, HSC, NEET, JEE, MHT-CET<br>and HSC Computer Science</p><span>Design preview · Not a live admissions site</span></div></footer>`;
}
function website() {
  return `${header()}<main id="main">${hero()}${coursesSection()}${resultsSection()}${updatesSection()}${classroomSection()}${studentSection()}</main>${footer()}`;
}
function studentSpace() {
  return `<div class="student-app"><header class="student-topbar">${brand()}<button class="text-link" data-home>Back to website ↗</button></header><div class="student-app-layout"><aside class="student-sidebar"><span class="sidebar-label">YOUR WORKSPACE</span><nav aria-label="Student navigation">${['Overview', 'Resources', 'Recordings', 'Test papers'].map(tab => `<button data-resource-tab="${tab}" aria-current="${resourceTab === tab ? 'page' : 'false'}"><span class="sidebar-glyph" aria-hidden="true">${{ Overview: '⌂', Resources: '≡', Recordings: '▷', 'Test papers': '▤' }[tab]}</span>${tab}</button>`).join('')}</nav><div class="sidebar-bottom"><span class="student-avatar">WS</span><span><strong>Student preview</strong><small>No account connected</small></span></div></aside><main id="main" class="student-main"><div class="student-preview-notice"><strong>You’re exploring a demo.</strong> Example subjects and chapter titles are illustrative. No private resources or student data are connected.</div><div class="student-page-heading"><div><span class="small-label">WORK SMART STUDENT SPACE</span><h1>${resourceTab === 'Overview' ? 'A good place to pick up.' : resourceTab === 'Resources' ? 'Your study shelf.' : resourceTab === 'Recordings' ? 'A lesson, on your time.' : 'Ready for a practice run?'}</h1><p>${resourceTab === 'Overview' ? 'Everything for your next study session.' : 'Less searching. More time for what you came to learn.'}</p></div><label class="student-course-label">Your course<select id="student-course"><option>SSC · Class 10</option><option>HSC · Class 12</option><option>NEET</option><option>JEE</option><option>MHT-CET</option><option>HSC Computer Science</option></select></label></div><div class="student-course-status" aria-live="polite"></div><div class="workspace-feature"><div><span class="small-label">MAKE YOUR NEXT SESSION COUNT</span><h2>One chapter.<br>A little more clarity.</h2><p>Pick a subject below to see how your learning materials will be organised.</p></div><span class="workspace-word" aria-hidden="true">ws.</span></div><div class="student-resource-heading"><h2>${resourceTab === 'Overview' ? 'Your subjects' : resourceTab}</h2><span>Illustrative content</span></div><div class="subject-tabs" role="group" aria-label="Filter by subject"><button aria-pressed="true" data-subject="All subjects">All subjects</button><button aria-pressed="false" data-subject="Mathematics">Mathematics</button><button aria-pressed="false" data-subject="Science">Science</button></div><div id="resource-items">${resourceItems()}</div><p class="workspace-hint">In the finished site, you’ll only see the courses and materials your account has access to.</p></main></div></div>`;
}
function resourceItems(subject = 'All subjects') {
  const recording = resourceTab === 'Recordings';
  const test = resourceTab === 'Test papers';
  const items = [
    { subject: 'Mathematics', title: test ? 'Circles · Practice paper' : recording ? 'Circles · Classroom recording' : 'Circles · Chapter notes', type: test ? 'TEST' : recording ? 'VIDEO' : 'PDF' },
    { subject: 'Science', title: test ? 'Gravitation · Practice paper' : recording ? 'Gravitation · Classroom recording' : 'Gravitation · Chapter notes', type: test ? 'TEST' : recording ? 'VIDEO' : 'PDF' },
    { subject: 'Science', title: test ? 'Periodic classification · Practice paper' : recording ? 'Periodic classification · Classroom recording' : 'Periodic classification · Revision notes', type: test ? 'TEST' : recording ? 'VIDEO' : 'PDF' }
  ];
  return items.filter(item => subject === 'All subjects' || item.subject === subject).map(item => `<div class="resource-row"><span class="file-icon">${item.type}</span><span class="resource-row-name"><strong>${item.title}</strong><small>${item.subject} · Example only</small></span><span class="resource-unavailable">Not uploaded</span></div>`).join('');
}
function updateUrl() {
  const params = new URLSearchParams({ variant });
  if (view === 'student') params.set('view', 'student');
  history.replaceState(null, '', `?${params}`);
}
function render() {
  document.body.dataset.variant = variant;
  document.body.dataset.view = view;
  document.title = `Work Smart | ${variants[variant].name} design preview`;
  document.querySelector('meta[name="theme-color"]').content = { A: '#f5c544', B: '#284b3c', C: '#324ed1' }[variant];
  app.innerHTML = view === 'student' ? studentSpace() : website();
  document.querySelector('#variant-name').textContent = `${variant} · ${variants[variant].name}`;
  document.querySelectorAll('[data-choose]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choose === variant)));
  updateUrl();
}
function chooseVariant(next) {
  variant = next;
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function cycle(direction) {
  const keys = Object.keys(variants);
  chooseVariant(keys[(keys.indexOf(variant) + direction + keys.length) % keys.length]);
}
document.querySelector('#previous').addEventListener('click', () => cycle(-1));
document.querySelector('#next').addEventListener('click', () => cycle(1));
document.addEventListener('keydown', event => {
  if (document.querySelector('dialog[open]') || event.target.closest('input, textarea, select, [contenteditable="true"], [role="group"]')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    cycle(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.dataset.choose) chooseVariant(target.dataset.choose);
  if (target.hasAttribute('data-enquire')) document.querySelector('#enquiry-dialog').showModal();
  if (target.hasAttribute('data-close-dialog')) document.querySelector('#enquiry-dialog').close();
  if (target.hasAttribute('data-home')) {
    event.preventDefault();
    view = 'website';
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  if (target.hasAttribute('data-student')) {
    view = 'student';
    resourceTab = 'Resources';
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  if (target.hasAttribute('data-course-select')) {
    selectedCourse = Number(target.dataset.courseSelect);
    document.querySelector('.navigator-detail').innerHTML = navigatorDetail();
    document.querySelectorAll('[data-course-select]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.courseSelect) === selectedCourse)));
  }
  if (target.dataset.filter) {
    courseFilter = target.dataset.filter;
    document.querySelector('.course-list').innerHTML = courseRows();
    document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === courseFilter)));
  }
  if (target.dataset.resourceTab) {
    resourceTab = target.dataset.resourceTab;
    render();
  }
  if (target.dataset.subject) {
    document.querySelector('#resource-items').innerHTML = resourceItems(target.dataset.subject);
    document.querySelectorAll('[data-subject]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.subject === target.dataset.subject)));
  }
  if (target.classList.contains('menu-button')) {
    const expanded = target.getAttribute('aria-expanded') !== 'true';
    target.setAttribute('aria-expanded', String(expanded));
    document.querySelector('#mobile-menu').hidden = !expanded;
  }
  if (target.closest('#mobile-menu') && target.tagName === 'A') {
    document.querySelector('#mobile-menu').hidden = true;
    document.querySelector('.menu-button').setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('change', event => {
  if (event.target.id !== 'student-course') return;
  const course = event.target.value;
  document.querySelector('.student-course-status').textContent = course === 'SSC · Class 10' ? '' : `${course} selected. This course has no materials connected in the preview.`;
  document.querySelector('#resource-items').innerHTML = course === 'SSC · Class 10' ? resourceItems() : '<div class="resource-empty"><h3>Your course materials will live here.</h3><p>Staff will upload resources, recordings and test papers for this course.</p></div>';
  document.querySelectorAll('[data-subject]').forEach(button => button.disabled = course !== 'SSC · Class 10');
});
render();
