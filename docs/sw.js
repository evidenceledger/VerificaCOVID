if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const o={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return o;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./sw.js",["./workbox-3b5792f5"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"9aac7ef2ff1f9bbe66e043e8edd7ae3c"},{url:"assets/all_pages.b4d4dd8a.js",revision:"b01c61f2f23adb39a593a395dcc66444"},{url:"assets/index.244f4542.css",revision:"5ee101d23d7f49f53942dce8404ca83d"},{url:"assets/index.66ef64e5.js",revision:"761d9ba05f77aa699f31ff30d3fbf37f"},{url:"assets/workbox-window.prod.es5.73a2a4cf.js",revision:"786692479fa3c4f791eb2ba6ec2b3f74"},{url:"favicon.ico",revision:"0eb6a3e58fb0f61f080bfd48d9be4a2d"},{url:"icon-152.png",revision:"9aac7ef2ff1f9bbe66e043e8edd7ae3c"},{url:"icon-192.png",revision:"3e20c90593da8a23862b10ee63386454"},{url:"icon-512.png",revision:"818e855ee6105104764c0388190afac9"},{url:"index.html",revision:"8f08d30d19de211880514f497d59e4bf"},{url:"manifest.webmanifest",revision:"62287756331395d85c8aecab6dcb762d"},{url:"notavailable.html",revision:"4710c4390943e5a6eb0356efe30ef887"},{url:"VERSION.txt",revision:"ce663e42eda625369dbc731e1436eb4c"}],{})}));
//# sourceMappingURL=sw.js.map
