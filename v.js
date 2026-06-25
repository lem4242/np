const T={m:['--color-background-secondary','--color-text-secondary'],i:['--color-background-info','--color-text-info'],w:['--color-background-warning','--color-text-warning'],o:['--color-background-success','--color-text-success']};
const E=t=>(t+'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
const bg=b=>`<span style="font-size:12px;padding:2px 8px;border-radius:8px;background:var(${T[b[1]][0]});color:var(${T[b[1]][1]})">${E(b[0])}</span>`;
const CSS=`.nf{margin:0;padding:0;font:15px var(--font-sans)}.nf .bar{display:flex;align-items:center;gap:10px;padding:12px 14px;cursor:pointer;background:#000;color:#fff}.nf .bar:hover{background:#141414}.nf .bar .arrow{color:rgba(255,255,255,.7);transition:transform .15s}.nf .bar.open .arrow{transform:rotate(180deg)}.nf .bar .path{flex:1;font-size:14px}.nf .pathseg{cursor:pointer}.nf .bar.open .pathseg:hover{text-decoration:underline}.nf .tree{margin-top:8px}.nf .r{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px}.nf .r.n{cursor:pointer}.nf .r.n:hover{background:var(--color-background-secondary)}`;

// mount(container, data, opts?) — engine + CSS live here; caller injects only `data`.
// opts: { root='nuco', sep='>', open=false }
export function mount(sel, D, opts={}){
  const R = typeof sel==='string' ? document.querySelector(sel) : sel;
  if(!R) return;
  R.classList.add('nf');
  if(!document.getElementById('nf-style')){
    const st=document.createElement('style'); st.id='nf-style'; st.textContent=CSS;
    document.head.appendChild(st);
  }
  const root = opts.root || 'nuco';
  const sep = opts.sep || '>';
  let open = !!opts.open, p=[], s=null;
  const at = q => { let n={c:D}; for(const x of q) n=n.c.find(e=>e.n===x); return n; };
  function pathHtml(){
    const segs=[root,...p,...(s?[s]:[])];
    return segs.map((c,i)=>{
      const last=i===segs.length-1;
      const sty=last?'color:#fff;font-weight:500':'color:rgba(255,255,255,.55)';
      return `<span class="pathseg" data-seg="${i}" style="${sty}">${E(c)}</span>`;
    }).join(`<span style="color:rgba(255,255,255,.35);padding:0 4px">${E(sep)}</span>`);
  }
  function draw(){
    let h=`<div class="bar ${open?'open':''}" data-a="bar"><span class="path">${pathHtml()}</span><i class="ti ti-chevron-down arrow" aria-hidden="true"></i></div>`;
    if(open){
      const nd=at(p);
      h+='<div class="tree">';
      nd.c.forEach(e=>{
        const f=e.c&&e.c.length, ic=f?'folder':(e.b?(e.b[1]=='o'?'world':'lock'):'file');
        h+=`<div class="r ${f?'n':''}" data-a="${f?'n':'l'}" data-n="${E(e.n)}"${!f&&s===e.n?' style="background:var(--color-background-secondary)"':''}>`;
        h+=`<i class="ti ti-${ic}" style="color:var(--color-text-secondary)" aria-hidden="true"></i><span style="flex:1">${E(e.n)}</span>`;
        if(e.b) h+=bg(e.b);
        if(e.m) h+=`<span style="font-size:13px;color:var(--color-text-tertiary)">${E(e.m)}</span>`;
        if(f) h+='<i class="ti ti-chevron-right" style="color:var(--color-text-tertiary)" aria-hidden="true"></i>';
        h+='</div>';
      });
      if(s){ const l=nd.c.find(e=>e.n===s&&!(e.c&&e.c.length)); if(l&&l.note) h+=`<div style="margin-top:10px;padding:10px 12px;background:var(--color-background-secondary);border-radius:8px;font-size:13px;color:var(--color-text-secondary)">${E(l.note)}</div>`; }
      h+='</div>';
    }
    R.innerHTML=h;
  }
  R.addEventListener('click', e=>{
    const seg=e.target.closest('.pathseg');
    if(open&&seg){ const i=+seg.dataset.seg; if(i<=p.length){ p=p.slice(0,i); s=null; draw(); } return; }
    const row=e.target.closest('.r');
    if(open&&row){ const a=row.dataset.a, n=row.dataset.n; if(a=='n'){ p.push(n); s=null; } else if(a=='l'){ s=s===n?null:n; } draw(); return; }
    if(e.target.closest('.bar')){ open=!open; draw(); return; }
  });
  draw();
}
