if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const a={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return a;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./sw.js",["./workbox-3b5792f5"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"9aac7ef2ff1f9bbe66e043e8edd7ae3c"},{url:"assets/all_pages.416fdc11.js",revision:"65ce9b64005cb8fb22dfeabced673b85"},{url:"assets/index.33270a2a.js",revision:"3c0dd742bb475029773a19ff777f293a"},{url:"assets/index.d3fc15e0.css",revision:"19a2fb47eb4237a27934d396285aca5e"},{url:"assets/workbox-window.prod.es5.73a2a4cf.js",revision:"786692479fa3c4f791eb2ba6ec2b3f74"},{url:"favicon.ico",revision:"0eb6a3e58fb0f61f080bfd48d9be4a2d"},{url:"icon-152.png",revision:"9aac7ef2ff1f9bbe66e043e8edd7ae3c"},{url:"icon-192.png",revision:"3e20c90593da8a23862b10ee63386454"},{url:"icon-512.png",revision:"818e855ee6105104764c0388190afac9"},{url:"index.html",revision:"a0256e5a93eefc8a1f330e4f3b777435"},{url:"manifest.webmanifest",revision:"62287756331395d85c8aecab6dcb762d"},{url:"notavailable.html",revision:"4710c4390943e5a6eb0356efe30ef887"},{url:"VERSION.txt",revision:"ce663e42eda625369dbc731e1436eb4c"}],{})}));
//# sourceMappingURL=sw.js.map
