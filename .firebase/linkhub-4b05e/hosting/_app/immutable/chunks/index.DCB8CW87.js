var B=Object.defineProperty;var F=(t,e,n)=>e in t?B(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var P=(t,e,n)=>(F(t,typeof e!="symbol"?e+"":e,n),n);import{n as x,T as G,f as M,U as L,x as b,D as C,G as j,V as T,P as W,W as z,b as X,X as Y,Y as Z,Z as q,_ as H,$ as A,a0 as J,a1 as K,a2 as Q,a3 as tt,a4 as et}from"./scheduler.D-G8aooA.js";const N=typeof window<"u";let nt=N?()=>window.performance.now():()=>Date.now(),R=N?t=>requestAnimationFrame(t):x;const p=new Set;function U(t){p.forEach(e=>{e.c(t)||(p.delete(e),e.f())}),p.size!==0&&R(U)}function st(t){let e;return p.size===0&&R(U),{promise:new Promise(n=>{p.add(e={c:t,f:n})}),abort(){p.delete(e)}}}const E=new Map;let S=0;function it(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function at(t,e){const n={stylesheet:L(e),rules:{}};return E.set(t,n),n}function rt(t,e,n,s,r,o,f,$=0){const c=16.666/s;let i=`{
`;for(let h=0;h<=1;h+=c){const g=e+(n-e)*o(h);i+=h*100+`%{${f(g,1-g)}}
`}const l=i+`100% {${f(n,1-n)}}
}`,a=`__svelte_${it(l)}_${$}`,d=G(t),{stylesheet:u,rules:_}=E.get(d)||at(d,t);_[a]||(_[a]=!0,u.insertRule(`@keyframes ${a} ${l}`,u.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${a} ${s}ms linear ${r}ms 1 both`,S+=1,a}function D(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-s.length;r&&(t.style.animation=s.join(", "),S-=r,S||ot())}function ot(){R(()=>{S||(E.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&M(e)}),E.clear())})}let w;function ft(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function I(t,e,n){t.dispatchEvent(T(`intro${n}`))}const v=new Set;let m;function yt(){m={r:0,c:[],p:m}}function gt(){m.r||b(m.c),m=m.p}function ut(t,e){t&&t.i&&(v.delete(t),t.i(e))}function pt(t,e,n,s){if(t&&t.o){if(v.has(t))return;v.add(t),m.c.push(()=>{v.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}const ct={duration:0};function wt(t,e,n){const s={direction:"in"};let r=e(t,n,s),o=!1,f,$,c=0;function i(){f&&D(t,f)}function l(){const{delay:d=0,duration:u=300,easing:_=W,tick:y=x,css:h}=r||ct;h&&(f=rt(t,0,1,u,d,_,h,c++)),y(0,1);const g=nt()+d,V=g+u;$&&$.abort(),o=!0,j(()=>I(t,!0,"start")),$=st(O=>{if(o){if(O>=V)return y(1,0),I(t,!0,"end"),i(),o=!1;if(O>=g){const k=_((O-g)/u);y(k,1-k)}}return o})}let a=!1;return{start(){a||(a=!0,D(t),C(r)?(r=r(s),ft().then(l)):l())},invalidate(){a=!1},end(){o&&(i(),o=!1)}}}function xt(t){t&&t.c()}function vt(t,e){t&&t.l(e)}function lt(t,e,n){const{fragment:s,after_update:r}=t.$$;s&&s.m(e,n),j(()=>{const o=t.$$.on_mount.map(J).filter(C);t.$$.on_destroy?t.$$.on_destroy.push(...o):b(o),t.$$.on_mount=[]}),r.forEach(j)}function dt(t,e){const n=t.$$;n.fragment!==null&&(q(n.after_update),b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function _t(t,e){t.$$.dirty[0]===-1&&(K.push(t),Q(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Et(t,e,n,s,r,o,f=null,$=[-1]){const c=H;A(t);const i=t.$$={fragment:null,ctx:[],props:o,update:x,not_equal:r,bound:z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:z(),dirty:$,skip_bound:!1,root:e.target||c.$$.root};f&&f(i.root);let l=!1;if(i.ctx=n?n(t,e.props||{},(a,d,...u)=>{const _=u.length?u[0]:d;return i.ctx&&r(i.ctx[a],i.ctx[a]=_)&&(!i.skip_bound&&i.bound[a]&&i.bound[a](_),l&&_t(t,a)),d}):[],i.update(),l=!0,b(i.before_update),i.fragment=s?s(i.ctx):!1,e.target){if(e.hydrate){tt();const a=X(e.target);i.fragment&&i.fragment.l(a),a.forEach(M)}else i.fragment&&i.fragment.c();e.intro&&ut(t.$$.fragment),lt(t,e.target,e.anchor),et(),Y()}A(c)}class St{constructor(){P(this,"$$");P(this,"$$set")}$destroy(){dt(this,1),this.$destroy=x}$on(e,n){if(!C(n))return x;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}$set(e){this.$$set&&!Z(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const $t="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add($t);export{St as S,vt as a,pt as b,xt as c,dt as d,gt as e,wt as f,yt as g,rt as h,Et as i,D as j,st as l,lt as m,nt as n,ut as t};
