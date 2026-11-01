for (const button of document.querySelectorAll('.copy')) {
  button.hidden=false;
  button.addEventListener('click',async()=>{
    const box=button.closest('details');const text=box.querySelector('code').textContent;const status=box.querySelector('.copy-status');
    try {if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(text);status.textContent='Copied.';}
    catch {const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(box.querySelector('code'));selection.removeAllRanges();selection.addRange(range);box.querySelector('pre').focus();status.textContent='Text selected. Press Ctrl+C or Command+C to copy.';}
  });
}
for(const button of document.querySelectorAll('.load-video')){
 button.hidden=false;
 button.addEventListener('click',()=>{
  document.querySelectorAll('video').forEach(v=>v.pause());
  document.querySelectorAll('.youtube iframe').forEach(frame=>{frame.src=frame.src.replace('autoplay=1','autoplay=0');});
  const parent=button.parentElement;const frame=document.createElement('iframe');
  frame.title=parent.dataset.title+' — YouTube video';frame.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(parent.dataset.video)}?start=${Number(parent.dataset.start)||0}&autoplay=1&rel=0`;
  frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';parent.replaceChildren(frame);frame.focus();
 });
}
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>{document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();});document.querySelectorAll('.youtube iframe').forEach(frame=>{frame.src=frame.src.replace('autoplay=1','autoplay=0');});}));
