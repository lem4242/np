const T={m:['--color-background-secondary','--color-text-secondary'],i:['--color-background-info','--color-text-info'],w:['--color-background-warning','--color-text-warning'],o:['--color-background-success','--color-text-success']};
const E=t=>(t+'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);
const bg=b=>`<span style="font-size:12px;padding:2px 8px;border-radius:8px;background:var(${T[b[1]][0]});color:var(${T[b[1]][1]})">${E(b[0])}</span>`;

export function mount(sel, D, opts={}){
  const R = typeof sel==='string' ? document.querySelector(sel) : sel;
  if(!R) return;
  R.classList.add('nf');
  R.style.cssText += ';padding:1rem 0;font:15px var(--font-sans)';
  if(!document.getElementById('nf-style')){
    const st=document.createElement('style'); st.id='nf-style';
    st.textContent='.nf .r{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px}.nf .r.n{cursor:pointer}.nf .r.n:hover{background:var(--color-background-secondary)}.nf a{cursor:pointer;color:var(--color-text-secondary)}.nf a:hover{text-decoration:underline}';
    document.head.appendChild(st);
  }
  let p=[], s=null;
  const root = opts.root || 'workspace';
  const at = q => { let n={c:D}; for(const x of q) n=n.c.find(e=>e.n===x); return n; };
  function draw(){
    const nd=at(p), cr=[root,...p];
    let h='<div style="margin-bottom:14px;font-size:14px;color:var(--color-text-secondary)">';
    if(p.length) h+='<a data-a="u">‹ up</a> &nbsp;|&nbsp; ';
    cr.forEach((c,i)=>{ h+=(i?' › ':'')+(i<cr.length-1?`<a data-a="c" data-i="${i}">${E(c)}</a>`:`<b style="color:var(--color-text-primary);font-weight:500">${E(c)}</b>`); });
    h+='</div>';
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
    R.innerHTML=h;
  }
  R.addEventListener('click', e=>{
    const t=e.target.closest('[data-a]'); if(!t) return;
    const a=t.dataset.a;
    if(a=='n'){ p.push(t.dataset.n); s=null; }
    else if(a=='u'){ p.pop(); s=null; }
    else if(a=='c'){ p=p.slice(0,+t.dataset.i); s=null; }
    else if(a=='l'){ s = s===t.dataset.n ? null : t.dataset.n; }
    draw();
  });
  draw();
}
