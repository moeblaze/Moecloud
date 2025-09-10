function $id(id){return document.getElementById(id)}
function copyText(el){const txt=(typeof el==='string')?el:(el.value||el.textContent);navigator.clipboard.writeText(txt).then(()=>alert('Copied to clipboard'))}
function downloadFile(filename, content, type='text/plain'){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url)}
function prettyNow(){return new Date().toISOString().replace('T',' ').slice(0,16)}
function prettyBytes(bytes){const u=['B','KB','MB','GB'];let i=0;let v=bytes;while(v>1024&&i<u.length-1){v/=1024;i++}return v.toFixed((i==0)?0:1)+' '+u[i]}
function downloadBlob(name, blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url)}