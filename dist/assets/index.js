(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();const l=a=>document.createElement(a);function $(){let a;this.data=[],this.index=0,this.setNode=t=>{a=t},this.update=t=>{t!==this.data[this.index]&&(this.data.splice(this.index+1),this.data.push(t),this.index=this.data.length-1)},this.undo=()=>{this.index>0&&(this.index--,a.value=this.data[this.index])},this.redo=()=>{this.index<this.data.length-1&&(this.index++,a.value=this.data[this.index])}}function j(){let a=this.element.querySelector(".preview > div:nth-child(2)"),t=this.toHTML();if(a)a.innerHTML=t;else{let e=l("div"),i=l("div"),s=l("a");s.innerHTML='<i class="fa-solid fa-close"></i>',s.classList.add("close-preview"),s.addEventListener("click",()=>{let n=this.element.querySelector(".preview");n&&(n.remove(),this.$state.set("onPreview",!1))},{once:!0}),a=l("div"),a.classList.add("preview"),e.appendChild(s),a.appendChild(e),a.appendChild(i),i.innerHTML=t,this.textarea.el.parentNode.appendChild(a)}a.querySelectorAll("pre code").forEach(e=>{hljs.highlightElement(e)}),this.$state.set("onPreview",!0)}function I(){let a=l("div"),t=l("div");t.classList.add("toolbar"),a.classList.add("toolbar-container"),this.plugins.forEach(r=>{if(r.hasOwnProperty("hidden")&&r.hidden)return;let d=this.makeIcon(r);t.appendChild(d)});let e=l("div"),i=this.makeIcon({name:"menu",icon:"fa-solid fa-bars",action(){}}),s=r=>{if(!this.$state.onDisable){if(i.classList.contains("active")||!r)return i.classList.remove("active");i.classList.add("active"),setTimeout(()=>{document.body.addEventListener("click",()=>{s()},{once:!0})},500)}};i.addEventListener("click",s),e.classList.add("toolbar-help"),e.appendChild(i),a.appendChild(t),a.appendChild(e);let n=l("div");n.classList.add("mdeditor-dropdown");const o=(r,d,p)=>{let f=l("a");return f.addEventListener("click",r),f.innerHTML=`<i class="${p}"></i> <span>${d}</span>`,this.detachAction.push(()=>f.removeEventListener("click",r)),f};let h=[S(()=>{this.makePreview()},"Preview","fa-solid fa-eye"),S(()=>{let r=this.makeSearch();r&&this.element.insertBefore(r,this.element.querySelector(".textarea-container"))},"Find","fa-solid fa-magnifying-glass"),S(()=>{if(this.element.classList.contains("mdeditor-dark"))return this.setMode();this.setMode(!0)},"Mode","fa-solid fa-circle-half-stroke"),S(()=>{window.open("https://www.markdownguide.org/cheat-sheet")},"Help","fa-solid fa-circle-info")];this.menu=[...this.menu,...h],this.menu.forEach((r,d)=>{n.appendChild(o(r.action,r.text,r.icon))}),this.detachAction.push(()=>help.removeEventListener("click",s)),this.toolbar={root:a},e.appendChild(n)}function S(a,t,e){return{action:a,text:t,icon:e}}function F(){if(this.element.querySelector(".mdeditor-search"))return;let a=l("div"),t=l("div");t.classList.add("mdeditor-search");let e=l("input");e.setAttribute("placeholder","search or search:replace-text"),t.appendChild(e);let i=[];const s=()=>{let p=this.element.querySelector(".list-result");p&&(p.remove(),i.forEach(f=>f()),i=[])},n=()=>e.value.split(":"),o=p=>[...this.textarea.el.value.matchAll(new RegExp(p,"g"))];let h=l("button");h.innerHTML="Find",h.classList.add("find"),h.addEventListener("click",p=>{let[f,M]=n();if(!f)return;s();let g=o(f);if(!g.length)return;let y=l("div");y.classList.add("list-result"),g.forEach((v,C)=>{let x=l("div"),P=l("p"),k=l("button");const D=()=>{let T=v.index+v[0].length,O=parseInt(window.getComputedStyle(this.textarea.el).lineHeight),R=this.textarea.el.value,_=this.textarea.el.clientWidth,b=0,w=0;for(let E=0;E<R.length&&E!==v.index;E++)R[E]===`
`&&(b+=1,w=0),w>=_?(b+=1,w=0):w+=5;this.textarea.el.focus(),this.textarea.el.setSelectionRange(v.index,T),this.textarea.el.scrollTo(0,b===0?0:b*O)},H=()=>k.removeEventListener("click",D);k.innerText="Focus";let L=l("button");L.innerText="Replace",L.classList.add("replace"),L.addEventListener("click",()=>{if(!M)return;let T=this.textarea.el.value.slice(0,v.index)+this.textarea.el.value.slice(v.index).replace(v[0],M);this.textarea.el.value=T,x.remove(),H(),g.splice(C,C),g.length===1&&y.remove()}),k.addEventListener("click",D),i.push(()=>H()),P.innerText=`${C+1}. ${v[0]}`,x.appendChild(P),x.appendChild(k),x.appendChild(L),y.appendChild(x)}),this.element.insertBefore(y,this.element.children[2])});let r=l("button");r.innerHTML="Replace All",r.classList.add("replace"),r.addEventListener("click",()=>{let[p,f]=n();f&&(this.textarea.el.value=this.textarea.el.value.replaceAll(p,f))});let d=l("button");return d.innerHTML="Close",d.classList.add("close"),d.addEventListener("click",p=>{t.remove(),s()},{once:!0}),a.appendChild(h),a.appendChild(r),a.appendChild(d),t.appendChild(a),t}function q(){let a=l("div"),t=l("textarea"),e={root:a,el:t,addEvent:(i,s,n)=>{t.addEventListener(i,s,n),this.detachAction.push(()=>t.removeEventListener(i,s,n))}};this._placeholder&&e.el.setAttribute("placeholder",this._placeholder),t.addEventListener("keyup",i=>{this.$state.onPreview&&this.makePreview()}),a.classList.add("textarea-container"),a.appendChild(e.el),this.textarea=e}function K(a){let t=l("a"),e=l("i"),i=s=>{if(!this.$state.onDisable)return a.action(s)};return e.setAttribute("class",a.icon),t.setAttribute("title",a.name),t.addEventListener("click",i),t.appendChild(e),this.detachAction.push(()=>t.removeEventListener("click",i)),t}function N(){new TextEncoder;let a=l("footer"),t=l("div"),e=l("div"),i=l("p"),s=l("p"),n=l("p");const o=(h=this.textarea.el.value)=>{i.innerText=h.length+" Word",n.innerText=[...h.matchAll(/\n/g)].length+1+" Line"};return s.innerText="Markdown",a.classList.add("mdeditor-footer"),o(),this.textarea.el.addEventListener("keyup",h=>{let r=h.target.value;o(r)}),t.appendChild(s),e.appendChild(i),e.appendChild(n),a.appendChild(t),a.appendChild(e),this.footer=a,this.footer.effect=o,this.element.appendChild(a),a}function u(a,t,e){return a.slice(0,t)+e+a.slice(t)}function c(a){let{selectionStart:t,selectionEnd:e}=a;return{start:t,end:e,get valueSelection(){return a.value.slice(this.start,this.end)}}}const A=(a,t,e,i)=>a.slice(0,t)+a.slice(t).replace(e,i);function B(){const a=()=>{let{start:e,end:i,valueSelection:s}=c(this.textarea.el),n=this.textarea.el.value,o=n.slice(0,e),h=o.split(`
`).at(-1),r=[...h.matchAll("#")].length,d;r===6?(d=o.slice(0,e-h.length)+"# "+n.slice(e-h.length).replace("###### ",""),e-=5):(d=o.slice(0,e-h.length)+"#"+(r?"":" ")+n.slice(e-h.length),r===0&&(e+=1),e+=1),this.textarea.el.value=d,this.textarea.el.setSelectionRange(e,e),this.historyUpdateDefault()};return{onMount:()=>{const e=i=>{i.ctrlKey&&i.shiftKey&&i.key==="H"&&a()};return document.body.addEventListener("keyup",e),()=>{document.body.removeEventListener("keyup",e)}},action:a,icon:"fa-solid fa-heading"}}function X(){const a=()=>{let{start:e,end:i,valueSelection:s}=c(this.textarea.el),n="";e!==i?(n=A(this.textarea.el.value,e,s,"**"+s+"**"),e+=2,i=e+s.length):(n=u(this.textarea.el.value,e,"**TEXT**"),e+=2,i=e+4),this.textarea.el.value=n,this.textarea.el.setSelectionRange(e,i),this.historyUpdateDefault()};return{onMount:()=>{const e=i=>{this.textarea.el.selectionStart,i.ctrlKey&&i.key==="b"&&a()};return document.body.addEventListener("keyup",e),()=>{document.body.removeEventListener("keyup",e)}},action:a,icon:"fa-solid fa-bold"}}function W(){const a=()=>{let{start:e,end:i,valueSelection:s}=c(this.textarea.el),n="";e!==i?(n=A(this.textarea.el.value,e,s,"*"+s+"*"),e+=1,i=e+s.length):(n=u(this.textarea.el.value,e,"*TEXT*"),e+=1,i=e+4),this.textarea.el.value=n,this.textarea.el.setSelectionRange(e,i),this.historyUpdateDefault()};return{onMount:()=>{const e=i=>{this.textarea.el.selectionStart,i.ctrlKey&&i.key==="i"&&a()};return document.body.addEventListener("keyup",e),()=>{document.body.removeEventListener("keyup",e)}},action:a,icon:"fa-solid fa-italic"}}function z(){return{action:()=>{let{start:t,end:e}=c(this.textarea.el);t+=2,this.textarea.el.value=u(this.textarea.el.value,t-2,"> TEXT"),this.textarea.el.setSelectionRange(t,t+4),this.textarea.el.focus(),this.historyUpdateDefault()},icon:"fa-solid fa-quote-left"}}function V(){return{action:()=>{let{start:e}=c(this.textarea.el),i=u(this.textarea.el.value,e,`1. TEXT
2. TEXT`);e+=2,this.textarea.el.value=i,this.textarea.el.setSelectionRange(e,e+4),this.historyUpdateDefault()},onMount:()=>{const e=i=>{if(i.key!=="Enter")return;let{start:s}=c(this.textarea.el),o=this.textarea.el.value.slice(0,s).split(`
`).at(-2).match(/^[0-9]+\./);if(!o)return;let r=parseInt(o[0])+1+". ",d=u(this.textarea.el.value,s,r);this.textarea.el.value=d,this.textarea.el.setSelectionRange(s+r.length,s+r.length),this.historyUpdateDefault()};this.textarea.addEvent("keyup",e)},icon:"fa-solid fa-list-ol"}}function Z(){const a=()=>{let{start:e}=c(this.textarea.el),i=u(this.textarea.el.value,e,"- ");e+=4,this.textarea.el.value=i,this.textarea.el.setSelectionRange(e,e),this.historyUpdateDefault()};return{action:a,onMount:()=>{const e=i=>{if(i.key!=="Enter")return;let{start:s}=c(this.textarea.el),n=this.textarea.el.value.slice(0,s).split(`
`).at(-2);!n.startsWith("- ")||n.startsWith("- [")||a()};this.textarea.addEvent("keyup",e)},icon:"fa-solid fa-list-ul"}}function G(){const a=()=>{let{start:e}=c(this.textarea.el),i=u(this.textarea.el.value,e,"- [x] done");e+=10,this.textarea.el.value=i,this.textarea.el.setSelectionRange(e,e),this.historyUpdateDefault()};return{action:a,onMount:()=>{const e=i=>{if(i.key!=="Enter")return;let{start:s}=c(this.textarea.el);this.textarea.el.value.slice(0,s).split(`
`).at(-2).startsWith("- [")&&a()};this.textarea.addEvent("keyup",e)},icon:"fa-solid fa-list-check"}}function J(){const a=()=>{let{start:e,end:i,valueSelection:s}=c(this.textarea.el),n="";e!==i?(n=A(this.textarea.el.value,e,s,"```languange\n"+s+"\n```"),e+=13,i=e+s.length):(n=u(this.textarea.el.value,e,"```languange\nconsole.log(true)\n```"),e+=3,i+=12),this.textarea.el.value=n,this.textarea.el.setSelectionRange(e,i),this.historyUpdateDefault()};return{onMount:()=>{const e=i=>{this.textarea.el.selectionStart,i.ctrlKey&&i.shiftKey&&i.key==="L"&&a()};return document.body.addEventListener("keyup",e),()=>{document.body.removeEventListener("keyup",e)}},action:a,icon:"fa-solid fa-code"}}function Q(){return{action:()=>{let{start:t}=c(this.textarea.el),e=u(this.textarea.el.value,t,`---
`);this.textarea.el.value=e,this.historyUpdateDefault()},icon:"fa-solid fa-grip-lines"}}function Y(){return{action:()=>{let{start:t}=c(this.textarea.el),e=u(this.textarea.el.value,t,`[title](https://link.com)
`);this.textarea.el.value=e,this.historyUpdateDefault()},icon:"fa-solid fa-link"}}function ee(){return{action:()=>{let{start:t}=c(this.textarea.el),e=u(this.textarea.el.value,t,`![alt](image.jpg)
`);this.textarea.el.value=e,this.historyUpdateDefault()},icon:"fa-solid fa-image"}}function te(){return{action:()=>{let{start:t,end:e,valueSelection:i}=c(this.textarea.el),s="";if(t!==e){let n=this.textarea.el.value.replace(i,"");s=u(n,t,"~~ "+i+" ~~"),t+=i.length+3}else s=u(this.textarea.el.value,t,"~~ TEXT ~~"),t+=7;this.textarea.el.value=s,this.textarea.el.setSelectionRange(t,t),this.historyUpdateDefault()},icon:"fa-solid fa-strikethrough"}}const U=`| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |
`;function ie(){return{action:()=>{let{start:t,valueSelection:e}=c(this.textarea.el),i=u(this.textarea.el.value,t,U);this.textarea.el.value=i,this.textarea.el.setSelectionRange(t,t+U.length),this.historyUpdateDefault()},icon:"fa-solid fa-table"}}class m{constructor({element:t,placeholder:e,option:i}){i.disallow||(i.disallow={}),this.$state={onDisable:!1,onPreview:!1,set:(s,n)=>{if(this.$state[s]=n,s==="onPreview"){let o="preview-active";n?this.element.classList.add(o):this.element.classList.remove(o)}if(s==="onDisable"){let o="mdeditor-disabled";n?(this.element.classList.add(o),this.textarea.el.setAttribute("disabled","")):(this.element.classList.remove(o),this.textarea.el.removeAttribute("disabled"))}return!0}},this.detachAction=[],this.menu=[],this.pluginsOption={},this.history=new $,this.element=t,this.option=i||{},this.plugins=[B,X,W,z,V,Z,G,J,Q,Y,ee,te,ie],this._placeholder=e,this._process()}_process(){this._createDefaultParse(),this._createHighlight(),this._createIcon(),this._createTextArea(),this.history.setNode(this.textarea.el)}_createTextArea(){let t=this.option.autoSave;const e=i=>{this.history.update(i.target.value),t&&t.id&&window.localStorage.setItem(t.id,i.target.value)};this.makeTextArea(),this.historyUpdateDefault(),this.textarea.el.addEventListener("change",e),this.detachAction.push(()=>this.textarea.el.removeEventListener("change",e))}_createPlugins(){let t=[{icon:"fa-solid fa-undo",name:"undo",action:()=>{this.history.undo();let e=this.textarea.el.value;this.$state.onPreview&&this.makePreview(),this.footer&&this.footer.effect(e)}},{icon:"fa-solid fa-redo",name:"redo",action:()=>{this.history.redo();let e=this.textarea.el.value;this.$state.onPreview&&this.makePreview(),this.footer&&this.footer.effect(e)}}];this.plugins=[...t,...this.plugins].map(e=>{if(!e.name)return{name:"anonymous",hidden:!0};let i=ae(e.name.replace("bound ",""));return typeof e=="function"&&(e=e.bind(this)()),this.pluginsOption[i]&&(e=Object.assign(this.pluginsOption[i])),{name:i,...e}})}_createDefaultParse(){if(!this.option.parse){const t="https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js",e=l("script");e.setAttribute("src",t),document.body.appendChild(e)}}_createHighlight(){if(!this.option.disallow.highlight){if(this.highlight)this.highlight.link.remove();else{const i=l("script");i.setAttribute("src","//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"),document.body.appendChild(i),this.highlight={script:i}}let t="https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/styles/github.css";this.getMode()&&(t="https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/styles/github-dark.css");const e=l("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),document.head.appendChild(e),this.highlight.link=e}}_createIcon(){if(!this.option.disallow.icon){const t=l("link");t.setAttribute("href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"),t.setAttribute("rel","stylesheet"),document.head.appendChild(t)}}historyUpdateDefault(){let t=this.textarea.el.value;this.history.update(t),this.$state.onPreview&&this.makePreview(),this.footer&&this.footer.effect(t)}use(t){this.plugins.push(t)}text(t){return t&&typeof t=="string"?(this.textarea.el.value=t,!0):this.textarea.el.value}toHTML(){if(!this.option.parse){let t=new showdown.Converter;return t.setOption("tables",!0),t.setOption("strikethrough",!0),t.setOption("tasklists",!0),t.makeHtml(this.textarea.el.value)}return this.option.parse(this.textarea.el.value)}setMode(t){return t?(this.element.classList.add("mdeditor-dark"),this._createHighlight()):(this.element.classList.remove("mdeditor-dark"),this._createHighlight())}getMode(){return this.element.classList.contains("mdeditor-dark")}setPlugin(t){this.pluginsOption=t}addMenu(t,e,i){this.menu.push({text:t,icon:e,action:i})}mount(){let t=this.option.autoSave;if(this._createPlugins(),this.makeToolbar(),this.element.classList.add("mdeditor"),this.element.editor=this,this.element.appendChild(this.textarea.root),this.element.insertBefore(this.toolbar.root,this.element.firstChild),t&&t.id){let e=window.localStorage.getItem(t.id);e&&(this.textarea.el.value=e,this.historyUpdateDefault())}this.textarea.el.classList.add("mount"),this.plugins.forEach(e=>{if(!e.hasOwnProperty("onMount"))return;let i=e.onMount();this.detachAction.push(i)}),this.makeFooter()}detach(){this.detachAction.forEach(t=>{typeof t=="function"&&t()}),this.element.remove(),this.detachAction=[]}setDisable(t=!1){this.$state.set("onDisable",t)}}m.prototype.makePreview=j;m.prototype.makeToolbar=I;m.prototype.makeSearch=F;m.prototype.makeTextArea=q;m.prototype.makeIcon=K;m.prototype.makeFooter=N;function ae(a){return a.replaceAll(/([A-Z])/g," $1").toLowerCase()}window.BrightstarMdEditor=m;
