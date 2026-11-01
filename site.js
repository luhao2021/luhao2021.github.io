for (const button of document.querySelectorAll('.copy')) {
  button.hidden=false;
  button.addEventListener('click',async()=>{
    const box=button.closest('details');
    const text=box.querySelector('code').textContent;
    const status=box.querySelector('.copy-status');
    try {
      if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      status.textContent='Copied.';
    } catch {
      const selection=window.getSelection();const range=document.createRange();
      range.selectNodeContents(box.querySelector('code'));
      selection.removeAllRanges();selection.addRange(range);
      box.querySelector('pre').focus();
      status.textContent='Text selected. Press Ctrl+C or Command+C to copy.';
    }
  });
}
// Muted looping previews, with manual controls and a page-level pause control.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduceMotion.matches;
const toggle=document.querySelector('#toggle-videos');
const videos=[...document.querySelectorAll('video')];
function setPaused(value){
  paused=value;
  toggle.textContent=paused?'Play videos':'Pause videos';
  for(const video of videos){if(paused)video.pause();else video.play().catch(()=>{});}
}
for(const video of videos){video.muted=true;video.loop=true;if(paused){video.autoplay=false;video.pause();}}
toggle.hidden=false;toggle.textContent=paused?'Play videos':'Pause videos';
toggle.addEventListener('click',()=>setPaused(!paused));
reduceMotion.addEventListener('change',event=>{if(event.matches)setPaused(true);});
