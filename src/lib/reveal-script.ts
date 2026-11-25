/**
 * Revelação ao rolar, em JavaScript puro e independente do React.
 * Roda no <head>, antes da hidratação: se o React falhar, as seções continuam aparecendo.
 * - Sem JS, sem IntersectionObserver ou com movimento reduzido: nada é escondido.
 * - A classe "reveal-ready" (que esconde os elementos) só é aplicada depois que o observador existe.
 * - Rede de segurança: verificação por posição na rolagem e revelação total após o carregamento + 4 s
 *   para tudo que já estiver acima da dobra.
 */
export const revealScript = `(function(){try{
var d=document.documentElement;d.classList.add('js');
if(!('IntersectionObserver' in window))return;
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var sel='[data-reveal]:not(.is-in)';
function show(e){e.classList.add('is-in');if(io)io.unobserve(e)}
var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting)show(es[i].target)}},{rootMargin:'0px 0px -6% 0px',threshold:0});
function scan(){var l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++)io.observe(l[i])}
function check(){var h=window.innerHeight||d.clientHeight,l=document.querySelectorAll(sel);for(var i=0;i<l.length;i++){if(l[i].getBoundingClientRect().top<h*0.98)show(l[i])}}
var t=0;function onScroll(){if(t)return;t=requestAnimationFrame(function(){t=0;check()})}
d.classList.add('reveal-ready');
function start(){scan();check();
try{new MutationObserver(scan).observe(document.body,{childList:true,subtree:true})}catch(e){}
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
setTimeout(check,4000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
}catch(e){document.documentElement.classList.remove('reveal-ready')}})();`;
