import{a as f,S as b,i as p}from"./assets/vendor-tnUJPedx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const d of e.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(o){if(o.ep)return;o.ep=!0;const e=r(o);fetch(o.href,e)}})();async function h(n,t){try{return(await f.get(`https://pixabay.com/api/?key=48639504-554e542bc8495b3a6c3499497&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=15`)).data}catch(r){console.log(r)}}const u=document.querySelector(".gallery"),s=document.createElement("button");s.classList.add("loadButton");s.textContent="Load More";let F=new b(".gallery a",{captionsData:"alt",captionDelay:250});function g(n){let t="";const r=u.children.length;n.forEach(e=>{t+=`
      <li class="image">
        <a class="gallery-link" href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" width="360" height="200">
          <div class="imageStats">
          <p><span>Likes</span>${e.likes}</p>
          <p><span>Views</span> ${e.views}</p>
          <p><span>Comments</span> ${e.comments}</p>
          <p><span>Downloads</span> ${e.downloads}</p>
          </div>
          </a>
      </li>
    `}),u.insertAdjacentHTML("beforeend",t),F.refresh(),s.style.display="block",document.body.append(s);const a=document.querySelectorAll(".image"),o=a[r];if(a.length>15){const e=o.getBoundingClientRect();window.scrollBy({top:e.top-20,behavior:"smooth"})}}const i=document.createElement("span");i.classList.add("loader");const y=document.querySelector(".searchPhoto");let c=1,l="",m=15;y.addEventListener("submit",async n=>{n.preventDefault(),document.body.append(i);try{let t=y.inputText.value.trim();l!=t&&(l=t,c=1,m=15,u.innerHTML="",s.style.display="none");const r=await h(l,c);if(!t){p.error({color:"#EF4040",message:"Error, input field is empty",messageColor:"#FAFAFB",maxWidth:"432",iconColor:"#FAFAFB"});return}if(r.hits.length===0){p.error({color:"#EF4040",message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"#FAFAFB",maxWidth:"432",iconColor:"#FAFAFB"});return}g(r.hits)}catch(t){console.error(t)}finally{document.body.removeChild(i)}});s.addEventListener("click",async n=>{document.body.append(i),s.style.display="none";try{m+=15,c++;const t=await h(l,c);if(t.totalHits<=m){s.style.display="none",p.info({message:"We're sorry, but you've reached the end of search results."});return}g(t.hits),s.style.display="block"}catch(t){console.error(t)}finally{document.body.removeChild(i)}});
//# sourceMappingURL=index.js.map
