if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return c;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./sw.js",["./workbox-3b5792f5"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"9aac7ef2ff1f9bbe66e043e8edd7ae3c"},{url:"assets/all_pages.b3f83f2b.js",revision:"579c328fc19edc6e9dba8d93dd517dbe"},{url:"assets/index.ba2c3156.js",revision:"b897364bf13e18328beaa61ea656e397"},{url:"assets/index.d57b4492.css",revision:"bc32dd4c2f425a7e3e37a90995e99914"},{url:"assets/workbox-window.prod.es5.73a2a4cf.js",revision:"786692479fa3c4f791eb2ba6ec2b3f74"},{url:"favicon.ico",revision:"0eb6a3e58fb0f61f080bfd48d9be4a2d"},{url:"icon-152.png",revision:"9aac7ef2ff1f9bbe66e043e8edd7ae3c"},{url:"icon-192.png",revision:"3e20c90593da8a23862b10ee63386454"},{url:"icon-512.png",revision:"818e855ee6105104764c0388190afac9"},{url:"index.html",revision:"428439b924a1e7dddbdc8b5284adc224"},{url:"manifest.webmanifest",revision:"ae3be97c58d41e8945ccfc6ccdfb9425"},{url:"notavailable.html",revision:"485d3a7914b6e345d4c4787df4dde975"},{url:"VERSION.txt",revision:"0bd256e1724cdc5a93a0e064b58af599"}],{})}));
//# sourceMappingURL=sw.js.map
