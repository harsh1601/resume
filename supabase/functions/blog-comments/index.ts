// No third-party dependencies. Secrets stay in Supabase's function environment.
const base = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const origins = new Set(['https://agrharsh.com', 'https://www.agrharsh.com']);
const dbHeaders = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json' };
Deno.serve(async (req: Request) => {
  const origin = req.headers.get('Origin') || '';
  const headers: Record<string,string> = {
    'Content-Type':'application/json', 'Vary':'Origin', 'Cache-Control':'no-store',
    'Access-Control-Allow-Headers':'authorization, apikey, content-type',
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
    'X-Content-Type-Options':'nosniff',
  };
  if(origins.has(origin)) headers['Access-Control-Allow-Origin']=origin;
  const reply = (data:unknown,status=200) => new Response(JSON.stringify(data),{status,headers});
  if(origin && !origins.has(origin)) return reply({error:'This website is not allowed.'},403);
  if(req.method==='OPTIONS') return new Response(null,{status:204,headers});
  try {
    const url = new URL(req.url);
    if(req.method==='GET') {
      const article=url.searchParams.get('article') || '';
      if(!/^\/blog\/articles\/[a-z0-9-]+\.html$/.test(article)) return reply({error:'Invalid article.'},400);
      const offset=Number(url.searchParams.get('offset') || 0);
      if(!Number.isSafeInteger(offset)||offset<0||offset>10000) return reply({error:'Invalid page.'},400);
      const query=new URLSearchParams({select:'id,display_name,body,author_reply,created_at',article_path:`eq.${article}`,status:'eq.approved',order:'created_at.desc,id.desc',limit:'21',offset:String(offset)});
      const result=await fetch(`${base}/rest/v1/blog_comments?${query}`,{headers:dbHeaders});
      if(!result.ok) return reply({error:'Comments are temporarily unavailable.'},503);
      const comments=await result.json();
      return reply({comments:comments.slice(0,20),hasMore:comments.length>20});
    }
    if(req.method!=='POST') return reply({error:'Method not allowed.'},405);
    if(!(req.headers.get('Content-Type')||'').includes('application/json')) return reply({error:'Expected a comment form.'},415);
    if(Number(req.headers.get('Content-Length')||0)>16384) return reply({error:'Comment is too large.'},413);
    // Bound streaming requests too, rather than trusting Content-Length.
    const reader=req.body?.getReader(); let length=0; const chunks:Uint8Array[]=[];
    if(!reader) return reply({error:'Please complete the form.'},400);
    while(true){ const {done,value}=await reader.read(); if(done)break; length+=value.length; if(length>16384){await reader.cancel();return reply({error:'Comment is too large.'},413);} chunks.push(value); }
    const bytes=new Uint8Array(length);let pos=0;for(const chunk of chunks){bytes.set(chunk,pos);pos+=chunk.length;}
    let data; try{data=JSON.parse(new TextDecoder().decode(bytes));}catch{return reply({error:'Please complete the form.'},400);}
    if(!data||typeof data!=='object'||Array.isArray(data))return reply({error:'Please complete the form.'},400);
    if(data.website) return reply({message:'Your comment was received for review.'},202); // Honeypot; store nothing.
    if(!['article','name','comment'].every(k=>typeof data[k]==='string'))return reply({error:'Please complete all fields.'},400);
    const name=data.name.trim(),body=data.comment.trim();
    if(name.length<2||name.length>80||body.length<10||body.length>3000||!/^\/blog\/articles\/[a-z0-9-]+\.html$/.test(data.article))return reply({error:'Check your name and comment (10–3,000 characters).'},400);
    const network=req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || 'unknown';
    const day=new Date().toISOString().slice(0,10);
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${serviceKey}:${day}:${network}`));
    const key=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
    const result=await fetch(`${base}/rest/v1/rpc/submit_blog_comment`,{method:'POST',headers:dbHeaders,body:JSON.stringify({p_article:data.article,p_name:name,p_body:body,p_network_key:key})});
    if(!result.ok){const err=await result.json();if(err.code==='P0001')return reply({error:'You have reached the comment limit. Please try again in an hour.'},429);if(err.code==='22023'||err.code==='23514')return reply({error:'Please check the form and try again.'},400);return reply({error:'We could not submit your comment. Please try again later.'},503);}
    return reply({message:'Thank you. Your comment is awaiting approval and will appear here once approved.'},202);
  } catch { return reply({error:'Comments are temporarily unavailable. Please try again later.'},503); }
});
