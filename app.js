const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
$("#year").textContent=new Date().getFullYear();

// Scroll progress + subtle active navigation state
const progress=$("#scrollProgress");
const navLinks=$$(".nav-link");
const sections=$$("main section[id]");
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max>0?scrollY/max*100:0)+"%";
  let current="home";
  sections.forEach(section=>{if(scrollY>=section.offsetTop-160)current=section.id});
  navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
}
addEventListener("scroll",onScroll,{passive:true});onScroll();

// Reveal on scroll
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

// Mobile navigation
const menu=$("#menuToggle"),nav=$("#mainNav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
navLinks.forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));

// Toast utility
let toastTimer;
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3400)}

// Authentication UI: intentionally a frontend preview, not real account creation.
const modal=$("#authModal"),authForm=$("#authForm");
let authMode="register";
function openAuth(mode){authMode=mode;modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";renderAuth()}
function closeAuth(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function renderAuth(){
  const register=authMode==="register";
  $("#modalTitle").textContent=register?"Join the academy.":"Welcome back.";
  $("#modalDescription").textContent=register?"Create your learner profile to get started.":"Sign-in will be enabled when the secure member system is connected.";
  $("#nameField").style.display=register?"grid":"none";
  $("#authSubmit").textContent=register?"Create learner profile ↗":"Continue to login ↗";
  $("#authHint").textContent="Preview only. No account or password is stored. Configure Supabase before enabling real authentication.";
  $("#authSwitch").textContent=register?"Already have an account? Log in":"New to VEXARO? Create a profile";
}
$$("[data-open-auth]").forEach(btn=>btn.addEventListener("click",()=>openAuth(btn.dataset.openAuth)));
$$("[data-close-modal]").forEach(btn=>btn.addEventListener("click",closeAuth));
modal.addEventListener("click",e=>{if(e.target===modal)closeAuth()});
addEventListener("keydown",e=>{if(e.key==="Escape")closeAuth()});
$("#authSwitch").addEventListener("click",()=>{authMode=authMode==="register"?"login":"register";renderAuth()});
authForm.addEventListener("submit",e=>{e.preventDefault();toast("Member accounts are not active yet. Backend setup is required.");});

// Course actions
$$("[data-course]").forEach(btn=>btn.addEventListener("click",()=>toast(`${btn.dataset.course}: course information will be published soon.`)));
$$("[data-event-register]").forEach(btn=>btn.addEventListener("click",()=>{openAuth("register");toast("Create a learner profile to express interest in upcoming events.")}));

// Contact: opens the visitor's mail app without storing data on this static site.
$("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const subject=encodeURIComponent(`[VEXARO Enquiry] ${data.get("subject")}`);
  const body=encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}\n\nPlease configure the academy contact email in app.js before launch.`);
  const recipient="REPLACE_WITH_VEXARO_CONTACT_EMAIL";
  if(recipient.startsWith("REPLACE_")){toast("Contact form is ready, but add your official VEXARO email in app.js before launch.");return;}
  location.href=`mailto:${recipient}?subject=${subject}&body=${body}`;
});
