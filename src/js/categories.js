
const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));

function updateCartCount(){
try{
const cart=JSON.parse(localStorage.getItem('mim-cart')||'[]');
document.getElementById('cartCount').textContent=cart.reduce((sum,item)=>sum+(Number(item.quantity)||1),0);
}catch(e){
document.getElementById('cartCount').textContent='0';
}
}
updateCartCount();

const searchInput=document.getElementById('categorySearch');
const cards=[...document.querySelectorAll('.category-card')];
const emptyState=document.getElementById('emptyState');
const resultCount=document.getElementById('resultCount');

function filterCategories(){
const term=searchInput.value.trim().toLowerCase();
let visible=0;
cards.forEach(card=>{
const matches=card.dataset.name.toLowerCase().includes(term);
card.style.display=matches?'block':'none';
if(matches)visible++;
});
emptyState.style.display=visible===0?'block':'none';
resultCount.textContent=visible+' categor'+(visible===1?'y':'ies');
}

searchInput.addEventListener('input',filterCategories);
document.getElementById('searchBtn').addEventListener('click',filterCategories);
searchInput.addEventListener('keydown',e=>{if(e.key==='Enter')filterCategories()});

document.getElementById('resetSearch').addEventListener('click',()=>{
searchInput.value='';
filterCategories();
searchInput.focus();
});

const params=new URLSearchParams(window.location.search);
const selected=params.get('category');

if(selected){
const searchTerms={
personalized:'personalized',
home:'home',
jewelry:'jewellery',
photo:'photo',
birthday:'birthday',
anniversary:'anniversary',
work:'work',
'under-500':'under 500'
};
searchInput.value=searchTerms[selected]||'';
filterCategories();
}
