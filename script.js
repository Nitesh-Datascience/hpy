const cakeCard=document.querySelector('#cakeCard');
const cakeButton=document.querySelector('#cakeButton');
const cutCta=document.querySelector('#cutCta');
const confetti=document.querySelector('#confetti');
const videoButton=document.querySelector('#videoButton');
const videoModal=document.querySelector('#videoModal');
const closeVideo=document.querySelector('#closeVideo');
const birthdayVideo=document.querySelector('#birthdayVideo');
let cakeCut=false;

function launchConfetti(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const ctx=confetti.getContext('2d'),ratio=devicePixelRatio||1;
  confetti.width=innerWidth*ratio;confetti.height=innerHeight*ratio;confetti.style.width=`${innerWidth}px`;confetti.style.height=`${innerHeight}px`;ctx.setTransform(ratio,0,0,ratio,0,0);
  const colors=['#ff3d9a','#6ef4d2','#ffe55c','#9b7bff','#fff'];
  let pieces=Array.from({length:170},()=>({x:innerWidth*.42,y:innerHeight*.55,vx:(Math.random()-.5)*16,vy:-5-Math.random()*12,size:5+Math.random()*9,color:colors[Math.floor(Math.random()*colors.length)],spin:(Math.random()-.5)*.28,angle:Math.random()*6}));
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.25;p.angle+=p.spin;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle=p.color;ctx.fillRect(-p.size/2,-p.size/3,p.size,p.size*.6);ctx.restore()});pieces=pieces.filter(p=>p.y<innerHeight+30);if(pieces.length)requestAnimationFrame(draw)}draw();
}
function cutCake(){if(cakeCut)return;cakeCut=true;cakeCard.classList.add('is-cut');cakeCard.querySelector('.cut-message').classList.add('show');cutCta.querySelector('span').textContent='CAKE CUT! 🎉';cakeButton.disabled=true;cutCta.disabled=true;launchConfetti()}
cakeButton.addEventListener('click',cutCake);cutCta.addEventListener('click',cutCake);
function openVideo(){videoModal.hidden=false;document.body.style.overflow='hidden';birthdayVideo.currentTime=0;birthdayVideo.play().catch(()=>{})}
function hideVideo(){birthdayVideo.pause();videoModal.hidden=true;document.body.style.overflow='';videoButton.focus()}
videoButton.addEventListener('click',openVideo);closeVideo.addEventListener('click',hideVideo);videoModal.addEventListener('click',e=>{if(e.target===videoModal)hideVideo()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!videoModal.hidden)hideVideo()});
