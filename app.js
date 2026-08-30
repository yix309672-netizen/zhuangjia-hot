if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
var RED=[1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46];
var BLUE=[3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];
var GREEN=[5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49];
var SX=[[7,19,31,43],[6,18,30,42],[5,17,29,41],[4,16,28,40],[3,15,27,39],[2,14,26,38],[1,13,25,37,49],[12,24,36,48],[11,23,35,47],[10,22,34,46],[9,21,33,45],[8,20,32,44]];
var SXN=['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
var BATCH_GROUPS={
  '单':[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49],
  '双':[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48],
  '大':[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
  '小':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
  '红':RED,'蓝':BLUE,'绿':GREEN,'红波':RED,'蓝波':BLUE,'绿波':GREEN,
  '大单':[25,27,29,31,33,35,37,39,41,43,45,47,49],'大双':[26,28,30,32,34,36,38,40,42,44,46,48],
  '小单':[1,3,5,7,9,11,13,15,17,19,21,23],'小双':[2,4,6,8,10,12,14,16,18,20,22,24],
  '0尾':[10,20,30,40],'1尾':[1,11,21,31,41],'2尾':[2,12,22,32,42],'3尾':[3,13,23,33,43],
  '4尾':[4,14,24,34,44],'5尾':[5,15,25,35,45],'6尾':[6,16,26,36,46],'7尾':[7,17,27,37,47],
  '8尾':[8,18,28,38,48],'9尾':[9,19,29,39,49]
};
function expandRange(s){
  return s.replace(/(\d{1,2})\+\+(\d{1,2})\+?(\d+)/g,function(m,a,b,amt){
    var start=parseInt(a),end=parseInt(b),price=parseInt(amt);
    var nums=[];for(var i=start;i<=end;i++)nums.push(i);
    return nums.join(',')+'各'+price;
  });
}
function expandStarTotal(s){
  return s.replace(/([\u4e00-\u9fa5]{1,6})\s*(\d+)\s*\*/g,function(m,grp,amt){
    var total=parseInt(amt);
    var nums=[];
    for(var i=0;i<grp.length;i++){
      var c=grp[i];
      if(ZODIAC_MAP[c]!==undefined){SX[ZODIAC_MAP[c]].forEach(function(n){if(nums.indexOf(n)<0)nums.push(n);});}
      else{
        // 尝试匹配批量分组名（2字）
        var two=grp.substring(i,i+2);
        if(BATCH_GROUPS[two]){BATCH_GROUPS[two].forEach(function(n){if(nums.indexOf(n)<0)nums.push(n);});i++;}
        else{
          // 尝试匹配单字分组名
          if(BATCH_GROUPS[c]){BATCH_GROUPS[c].forEach(function(n){if(nums.indexOf(n)<0)nums.push(n);});}
        }
      }
    }
    if(nums.length===0)return m;
    var per=Math.floor(total/nums.length);
    return nums.join(',')+'各'+per;
  });
}
function expandBatchGroups(s){
  Object.keys(BATCH_GROUPS).sort(function(a,b){return b.length-a.length;}).forEach(function(k){
    var re=new RegExp(k+'\\s*各\\s*(\\d+)','g');
    s=s.replace(re,function(m,amt){
      return BATCH_GROUPS[k].join(',')+'各'+amt;
    });
    var re2=new RegExp(k+'\\s*(\\d+)\\s*(?=[，,、\\n]|$)','g');
    s=s.replace(re2,function(m,amt){
      return BATCH_GROUPS[k].join(',')+'各'+amt;
    });
  });
  return s;
}
var numTypes=["tema","eryou","sanyou","siyou","wuyou","tetuo","d1e","d1s","d1si","d1w","e2","s2","s3","s4","l5","s3x","s4x","s5x","s6x"];var O={tema:44,eryou:4,sanyou:10,siyou:30,wuyou:100,tetuo:100,d1e:3.8,d1s:9,d1si:29,d1w:80,e2:60,s2:20,s3:500,s4:1000,l5:0,s3x:3.5,s4x:2.6,s5x:2,s6x:1.8,hong:2.6,lv:2.6,lan:2.6,bdx:1.8,bds:1.8,w0:2,w1:1.8,w2p:3,w3p:7,w4p:15,b5:2,b6:2.5,b7:3,b8:3.5,b9:4,b10:5,b11:6,b12:7,b13:8.5,b14:10,b15:12,b16:15,zx:2,zx1:1.8,tx:11,tx1:9,bsdx:5};
O.eryou=4; O.sanyou=10; O.siyou=30; O.wuyou=100; O.tetuo=100;
O.d1e=3.8; O.d1s=9; O.d1si=29; O.d1w=80; O.e2=60; O.s2=20; O.s3=500; O.s4=1000;
O.s3x=3.5; O.s4x=2.6; O.s5x=2; O.s6x=1.8; O.hong=2.6; O.lv=2.6; O.lan=2.6;
O.bdx=1.8; O.bds=1.8; O.w0=2; O.w1=1.8; O.w2p=3; O.w3p=7; O.w4p=15;
O.b5=2; O.b6=2.5; O.b7=3; O.b8=3.5; O.b9=4; O.b10=5; O.b11=6; O.b12=7; O.b13=8.5; O.b14=10; O.b15=12; O.b16=15;
O.zx=2; O.zx1=1.8; O.tx=11; O.tx1=9; O.bsdx=5;
O.x2l=2; O.x3l=3.5; O.x4l=6; O.x5l=10; O.w2l=2; O.w3l=3.5; O.w4l=6; O.w5l=10;
var TN={tema:'特马',eryou:'2有',sanyou:'3有',siyou:'4有',wuyou:'5有',tetuo:'特托',d1e:'带1的2有',d1s:'带1的3有',d1si:'带1的4有',d1w:'带1的5有',e2:'二中二/二连',s2:'三中二',s3:'三中三/三连',s4:'四中四/四连',l5:'五连',s3x:'三肖中特',s4x:'四肖中特',s5x:'五肖中特',s6x:'六肖中特',hong:'红波',lv:'绿波',lan:'蓝波',bdx:'包大小',bds:'包单双',w0:'0尾',w1:'尾数',w2p:'2尾碰',w3p:'3尾碰',w4p:'四尾碰',b5:'五不中',b6:'六不中',b7:'七不中',b8:'八不中',b9:'九不中',b10:'十不中',b11:'十一不中',b12:'十二不中',b13:'十三不中',b14:'十四不中',b15:'十五不中',b16:'十六不中',zx:'中肖',zx1:'1号中肖',tx:'特肖',tx1:'1号特肖',bsdx:'波色大小单双',x2l:'二肖连',x3l:'三肖连',x4l:'四肖连',x5l:'五肖连',w2l:'二尾连',w3l:'三尾连',w4l:'四尾连',w5l:'五尾连'};
if(window.lottoDb&&window.lottoDb.getRules) window.lottoDb.getRules().then(function(rows){rows.forEach(function(r){if(r.code&&typeof r.odds==='number')O[r.code]=r.odds;});}).catch(function(err){console.error('SQLite规则加载失败',err);});
var customers=JSON.parse(localStorage.getItem('mc')||'[]');
var G=JSON.parse(localStorage.getItem('hg')||'[]');
var drawNumbers=[];
var specialNum=0;
function factorial(n){if(n<=1)return 1;var r=1;for(var i=2;i<=n;i++)r*=i;return r;}
function combinations(list,k){
  var out=[];
  function walk(start,picked){
    if(picked.length===k){out.push(picked.slice());return;}
    for(var i=start;i<=list.length-(k-picked.length);i++)walk(i+1,picked.concat([list[i]]));
  }
  walk(0,[]);
  return out;
}
var hkDraw=[], hkSp=0, amDraw=[], amSp=0;
var hkHist=JSON.parse(localStorage.getItem('hkHist')||'[]');
var amHist=JSON.parse(localStorage.getItem('amHist')||'[]');
var settleFilter=localStorage.getItem('settleFilter')||'all';
var selNums=[];
var cart=[];
var today=getToday();
var __idSeed=Date.now()*1000;
var __batchSeed=Date.now();
function nid(){return __idSeed+ (++__idSeed%9007199254740991) ;}
function getToday(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function save(){
  localStorage.setItem('hg',JSON.stringify(G));
  if(window.lottoDb&&window.lottoDb.syncBets) window.lottoDb.syncBets(G).catch(function(err){console.error('SQLite投注同步失败',err);});
}
function saveC(){
  localStorage.setItem('mc',JSON.stringify(customers));
  if(window.lottoDb&&window.lottoDb.syncCustomers) window.lottoDb.syncCustomers(customers).catch(function(err){console.error('SQLite客户同步失败',err);});
}
setTimeout(function(){
  if(!window.lottoDb)return;
  if(customers.length) window.lottoDb.syncCustomers(customers).catch(function(err){console.error('SQLite客户迁移失败',err);});
  if(G.length) window.lottoDb.syncBets(G).catch(function(err){console.error('SQLite投注迁移失败',err);});
},500);
function getNumSX(n){for(var i=0;i<SX.length;i++){if(SX[i].indexOf(n)>=0)return i;}return-1;}
function getColor(n){return RED.indexOf(n)>=0?'red':BLUE.indexOf(n)>=0?'blue':'green';}
function formatNums(g){ var zTypes=['zx','zx1','tx','tx1','s3x','s4x','s5x','s6x']; if(zTypes.indexOf(g.type)>=0) return g.nums.map(function(n){return SXN[n]||n;}).join(','); return g.nums.join(','); }
function getNumInfo(n){var col=getColor(n);return{num:n,color:col,colorName:col==='red'?'红波':col==='blue'?'蓝波':'绿波',big:n>=25?'大':'小',odd:n%2===1?'单':'双',tail:n%10,zodiac:SXN[getNumSX(n)]};}
function getCustomerRate(name){for(var i=0;i<customers.length;i++){if(customers[i].name===name)return customers[i].rate;}return 0.5;}
function getCustomerOdds(name,type){for(var i=0;i<customers.length;i++){if(customers[i].name===name&&customers[i].odds&&customers[i].odds[type]!==undefined)return customers[i].odds[type];}return O[type]!==undefined?O[type]:2;}
function countMatch(a,b){var c=0;for(var i=0;i<a.length;i++){if(b.indexOf(a[i])>=0)c++;}return c;}
function checkWin(g,drawNums,spNum){
  var t=g.type,nums=g.nums||[],all7=drawNums.concat([spNum]);
  var allZ=all7.map(function(n){return getNumSX(n);});
  var normalZ=drawNums.map(function(n){return getNumSX(n);});
  var spz=getNumSX(spNum);
  if(t==='tema'||t==='tetuo')return nums.indexOf(spNum)>=0;
  if(t==='eryou')return countMatch(nums,allZ)>=2;
  if(t==='sanyou')return countMatch(nums,allZ)>=3;
  if(t==='siyou')return countMatch(nums.filter(function(n,i,a){return a.indexOf(n)===i;}),allZ)>=4;
  if(t==='wuyou')return countMatch(nums,allZ)>=5;
  if(t==='d1e')return nums.indexOf(spz)>=0&&countMatch(nums,normalZ)>=1;
  if(t==='d1s')return nums.indexOf(spz)>=0&&countMatch(nums,normalZ)>=2;
  if(t==='d1si')return nums.indexOf(spz)>=0&&countMatch(nums,normalZ)>=3;
  if(t==='d1w')return nums.indexOf(spz)>=0&&countMatch(nums,normalZ)>=4;
  if(t==='e2')return countMatch(nums,drawNums.concat([spNum]))>=2;
  if(t==='s2')return countMatch(nums,drawNums.concat([spNum]))>=2;
  if(t==='s3')return countMatch(nums,drawNums.concat([spNum]))>=3;
  if(t==='s4')return countMatch(nums,drawNums.concat([spNum]))>=4;
  if(t==='l5')return countMatch(nums,drawNums.concat([spNum]))>=5;
  // 生肖连：nums存生肖索引，检查开奖7个号码中包含几个目标生肖
  if(t==='x2l')return countMatch(nums,allZ)>=2;
  if(t==='x3l')return countMatch(nums,allZ)>=3;
  if(t==='x4l')return countMatch(nums,allZ)>=4;
  if(t==='x5l')return countMatch(nums,allZ)>=5;
  // 尾数连：nums存尾数(0-9)，检查开奖7个号码中包含几个目标尾数
  if(t==='w2l'){var _wt=0;all7.forEach(function(n){if(nums.indexOf(n%10)>=0)_wt++;});return _wt>=2;}
  if(t==='w3l'){var _wt=0;all7.forEach(function(n){if(nums.indexOf(n%10)>=0)_wt++;});return _wt>=3;}
  if(t==='w4l'){var _wt=0;all7.forEach(function(n){if(nums.indexOf(n%10)>=0)_wt++;});return _wt>=4;}
  if(t==='w5l'){var _wt=0;all7.forEach(function(n){if(nums.indexOf(n%10)>=0)_wt++;});return _wt>=5;}
  if(t==='s3x'||t==='s4x'||t==='s5x'||t==='s6x')return nums.indexOf(spz)>=0;
  if(t==='hong')return getColor(spNum)==='red';
  if(t==='lv')return getColor(spNum)==='green';
  if(t==='lan')return getColor(spNum)==='blue';
  if(t==='bdx')return spNum>=25;
  if(t==='bds')return spNum%2===1;
  if(t==='w0')return spNum%10===0;
  if(t==='w1')return true;
  if(t==='w2p')return spNum%10===2;
  if(t==='w3p')return spNum%10===3;
  if(t==='w4p')return spNum%10===4;
  if(t==='b5')return countMatch(nums,all7)===0;
  if(t==='b6')return countMatch(nums,all7)===0;
  if(t==='b7')return countMatch(nums,all7)===0;
  if(t==='b8')return countMatch(nums,all7)===0;
  if(t==='b9')return countMatch(nums,all7)===0;
  if(t==='b10')return countMatch(nums,all7)===0;
  if(t==='b11')return countMatch(nums,all7)===0;
  if(t==='b12')return countMatch(nums,all7)===0;
  if(t==='b13')return countMatch(nums,all7)===0;
  if(t==='b14')return countMatch(nums,all7)===0;
  if(t==='b15')return countMatch(nums,all7)===0;
  if(t==='b16')return countMatch(nums,all7)===0;
  if(t==='zx'||t==='zx1')return allZ.some(function(z){return nums.indexOf(z)>=0;});
  if(t==='tx'||t==='tx1')return nums.indexOf(spz)>=0;
  if(t==='bsdx')return getColor(spNum)==='red';
  return false;
}
function combinationCount(n,k){if(n<k||k<1)return 0;var r=1;for(var i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r);}
function winningCombinationCount(g,drawNums,spNum){if(!g.comboSize)return checkWin(g,drawNums,spNum)?1:0;return combinationCount(countMatch(g.nums||[],drawNums.concat([spNum])),g.comboSize);}
function sp(id){
  document.querySelectorAll('.pg').forEach(function(p){p.classList.remove('on')});
  document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on')});
  document.getElementById('pg-'+id).classList.add('on');
  event.target.classList.add('on');
  if(id==='list')renderRecords();
  if(id==='rs')renderSettlementList();
  if(id==='cust')renderCustomerList();
  if(id==='add')refreshCustomerDropdown();
}
function initSel(){
  var s=document.getElementById('c-type');
  var cats=[{g:'特码/有',items:['tema','eryou','sanyou','siyou','wuyou','tetuo']},{g:'带1',items:['d1e','d1s','d1si','d1w']},{g:'连码',items:['e2','s2','s3','s4','l5']},{g:'胆拖',items:['e2','s3','s4','l5']},{g:'肖连',items:['x2l','x3l','x4l','x5l']},{g:'尾连',items:['w2l','w3l','w4l','w5l']},{g:'肖中特',items:['s3x','s4x','s5x','s6x']},{g:'波色',items:['hong','lv','lan']},{g:'大小单双',items:['bdx','bds']},{g:'尾数',items:['w0','w1','w2p','w3p','w4p']},{g:'不中',items:['b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16']},{g:'肖/特肖',items:['zx','zx1','tx','tx1']},{g:'其他',items:['bsdx']}];
  cats.forEach(function(c){var og=document.createElement('optgroup');og.label=c.g;c.items.forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=TN[k]+' ('+O[k]+')';og.appendChild(o);});s.appendChild(og);});
  uo();// 49选号已取消
}
function uo(){
  var nameEl=document.getElementById('c-name-sel');
  var name=nameEl?nameEl.value:'';
  var t=document.getElementById('c-type').value;
  var odds=getCustomerOdds(name,t);
  document.getElementById('c-odds').value=odds;
  document.getElementById('oi').textContent='赔率：'+odds+'（投100中'+odds*100+'）';
  var needNum=false; // 49选号已取消 // var needNum=numTypes.indexOf(t)<0||['hong','lv','lan','bdx','bds','w0','w1','w2p','w3p','w4p','zx','zx1','tx','tx1','bsdx','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16'].indexOf(t)>=0;
  document.getElementById('num-sel').style.display=needNum?'none':'block';
  if(needNum)selNums=[];
  updateSelNums();
}
function initNumGrid(){
  var grid=document.getElementById('num-grid');
  var html='';
  for(var i=1;i<=49;i++){
    var col=RED.indexOf(i)>=0?'#d32f2f':BLUE.indexOf(i)>=0?'#1565c0':'#2e7d32';
    html+='<div onclick="toggleNum('+i+')" id="nb'+i+'" style="cursor:pointer;padding:8px 4px;background:#1a1a2e;border:2px solid '+col+';border-radius:6px;text-align:center;font-size:13px;font-weight:bold">'+i+'</div>';
  }
  grid.innerHTML=html;
}
function toggleNum(n){
  var idx=selNums.indexOf(n);
  if(idx>=0){selNums.splice(idx,1);}else{selNums.push(n);}
  selNums.sort(function(a,b){return a-b;});
  for(var i=1;i<=49;i++){
    var el=document.getElementById('nb'+i);
    if(selNums.indexOf(i)>=0){el.style.background='#ff5252';}
    else{var c=RED.indexOf(i)>=0?'#d32f2f':BLUE.indexOf(i)>=0?'#1565c0':'#2e7d32';el.style.background=c;}
  }
  updateSelNums();
}
function updateSelNums(){document.getElementById('sel-nums').textContent=selNums.length?selNums.join(', '):'无';}
function refreshCustomerDropdown(){
  var sel=document.getElementById('c-name-sel');
  if(!sel)return;
  var v=sel.value;
  sel.innerHTML='<option value="">-- 选择客户 --</option>';
  customers.forEach(function(c){sel.innerHTML+='<option value="'+c.name+'">'+c.name+'</option>';});
  if(v)sel.value=v;
}
function toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;top:60px;left:50%;transform:translateX(-50%);background:#00b894;color:#fff;padding:8px 20px;border-radius:20px;font-size:13px;font-weight:600;z-index:9999;animation:fadeInOut 2s forwards';
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.remove();},2000);
}
var batchOcrImage=null;
var batchOcrObjectUrl='';
var batchOcrText='';
var __batchPendingPreviewId=null;
function batchOcrStatus(msg,ok){
  var el=document.getElementById('batch-ocr-status');
  if(!el)return;
  el.textContent=msg;
  el.style.color=ok?'#00d2a0':'#ffab00';
  el.style.borderColor=ok?'#176b59':'#5a4520';
}
function getBatchOcrConfig(){
  var cfg={endpoint:'',apiKey:'',apiKeyHeader:'Authorization',apiKeyPrefix:'Bearer ',requestMode:'multipart',imageField:'image',textPath:'text',language:''};
  try{
    var saved=JSON.parse(localStorage.getItem('batchOcrConfig')||'{}');
    if(saved&&typeof saved==='object')Object.keys(saved).forEach(function(k){cfg[k]=saved[k];});
  }catch(e){}
  if(typeof window!=='undefined'&&window.BATCH_OCR_CONFIG&&typeof window.BATCH_OCR_CONFIG==='object'){
    Object.keys(window.BATCH_OCR_CONFIG).forEach(function(k){cfg[k]=window.BATCH_OCR_CONFIG[k];});
  }
  return cfg;
}
function refreshBatchOcrStatus(){
  var cfg=getBatchOcrConfig();
  batchOcrStatus(cfg.endpoint?'已配置在线OCR；也可直接使用离线OCR':'离线OCR可用：首次识别会下载中文模型，无需密钥');
}
function configureBatchOcr(){
  var cfg=getBatchOcrConfig();
  var endpoint=prompt('在线OCR接口地址（POST，支持multipart或JSON）：',cfg.endpoint||'');
  if(endpoint===null)return;
  endpoint=endpoint.trim();
  if(!endpoint){
    localStorage.removeItem('batchOcrConfig');
    refreshBatchOcrStatus();
    return;
  }
  var key=prompt('OCR密钥（可留空；不会写入代码，仅保存在本机）：',cfg.apiKey||'');
  if(key===null)return;
  var mode=prompt('请求模式：multipart 或 json',cfg.requestMode||'multipart');
  if(mode===null)return;
  cfg.endpoint=endpoint;cfg.apiKey=key;cfg.requestMode=/^json$/i.test(mode.trim())?'json':'multipart';
  try{localStorage.setItem('batchOcrConfig',JSON.stringify(cfg));refreshBatchOcrStatus();toast('OCR配置已保存');}
  catch(e){alert('OCR配置保存失败');}
}
function handleBatchImageFile(file){
  if(!file)return;
  if(!file.type||file.type.indexOf('image/')!==0)return alert('这里只支持图片截图');
  if(batchOcrObjectUrl)URL.revokeObjectURL(batchOcrObjectUrl);
  batchOcrImage=file;
  batchOcrText='';
  batchOcrObjectUrl=URL.createObjectURL(file);
  var box=document.getElementById('batch-ocr-preview'),img=document.getElementById('batch-image-preview'),txt=document.getElementById('batch-ocr-text-preview');
  if(img)img.src=batchOcrObjectUrl;
  if(txt)txt.value='';
  if(box)box.classList.add('on');
  batchOcrStatus('已载入截图，请点击“识别截图”（识别结果需确认后才会入账）',true);
}
function cancelBatchImage(){
  if(batchOcrObjectUrl){URL.revokeObjectURL(batchOcrObjectUrl);batchOcrObjectUrl='';}
  batchOcrImage=null;
  batchOcrText='';
  var input=document.getElementById('batch-image-input');
  var img=document.getElementById('batch-image-preview');
  var txt=document.getElementById('batch-ocr-text-preview');
  var box=document.getElementById('batch-ocr-preview');
  if(input)input.value='';
  if(img)img.removeAttribute('src');
  if(txt)txt.value='';
  if(box)box.classList.remove('on');
  batchOcrStatus('截图已取消：可重新选择或粘贴截图',true);
}
function readBatchClipboardImage(){
  if(!navigator.clipboard||!navigator.clipboard.read)return alert('当前环境不支持读取剪贴板图片，请使用“选择截图”或直接粘贴');
  navigator.clipboard.read().then(function(items){
    for(var i=0;i<items.length;i++){
      for(var j=0;j<items[i].types.length;j++){
        if(items[i].types[j].indexOf('image/')===0){
          return items[i].getType(items[i].types[j]).then(handleBatchImageFile);
        }
      }
    }
    alert('剪贴板中没有图片');
  }).catch(function(){alert('无法读取剪贴板，请检查浏览器权限或改用选择截图');});
}
function batchOcrDataUrl(file){
  return new Promise(function(resolve,reject){
    var reader=new FileReader();
    reader.onload=function(){resolve(reader.result);};
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}
function getBatchOcrValue(obj,path){
  if(!path)return obj;
  var cur=obj;
  path.split('.').forEach(function(k){if(cur!==undefined&&cur!==null)cur=cur[k];});
  return cur;
}
function findBatchOcrText(value){
  if(typeof value==='string')return value;
  if(Array.isArray(value))return value.map(findBatchOcrText).filter(Boolean).join('\n');
  if(!value||typeof value!=='object')return '';
  var keys=['text','rawText','result','data','words_result','wordsResult','content'];
  for(var i=0;i<keys.length;i++){
    if(value[keys[i]]!==undefined){
      var found=findBatchOcrText(value[keys[i]]);
      if(found)return found;
    }
  }
  return '';
}
function requestBatchOcr(file,cfg){
  var headers={};
  if(cfg.apiKey)headers[cfg.apiKeyHeader||'Authorization']=(cfg.apiKeyPrefix===undefined?'Bearer ':String(cfg.apiKeyPrefix))+cfg.apiKey;
  if(cfg.extraHeaders&&typeof cfg.extraHeaders==='object')Object.keys(cfg.extraHeaders).forEach(function(k){headers[k]=String(cfg.extraHeaders[k]);});
  var opts={method:cfg.method||'POST',headers:headers};
  if(String(cfg.requestMode).toLowerCase()==='json'){
    return batchOcrDataUrl(file).then(function(dataUrl){
      var body={};body[cfg.imageField||'image']=dataUrl;
      if(cfg.language)body.language=cfg.language;
      if(cfg.extraFields&&typeof cfg.extraFields==='object')Object.keys(cfg.extraFields).forEach(function(k){body[k]=cfg.extraFields[k];});
      opts.headers['Content-Type']='application/json';
      opts.body=JSON.stringify(body);
      return fetch(cfg.endpoint,opts);
    });
  }
  var form=new FormData();
  form.append(cfg.imageField||'image',file,file.name||'screenshot.png');
  if(cfg.language)form.append('language',cfg.language);
  if(cfg.extraFields&&typeof cfg.extraFields==='object')Object.keys(cfg.extraFields).forEach(function(k){form.append(k,String(cfg.extraFields[k]));});
  opts.body=form;
  return fetch(cfg.endpoint,opts);
}
var batchOcrWorker=null;
var batchOcrWorkerPromise=null;
var batchOcrEnginePromise=null;
function loadBatchOfflineOcr(){
  if(window.Tesseract)return Promise.resolve(window.Tesseract);
  if(batchOcrEnginePromise)return batchOcrEnginePromise;
  batchOcrStatus('正在加载离线OCR引擎（首次需要联网下载）…',false);
  batchOcrEnginePromise=new Promise(function(resolve,reject){
    var script=document.createElement('script');
    script.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
    script.onload=function(){window.Tesseract?resolve(window.Tesseract):reject(new Error('OCR引擎加载失败'));};
    script.onerror=function(){reject(new Error('无法下载离线OCR引擎，请检查网络'));};
    document.head.appendChild(script);
  });
  return batchOcrEnginePromise;
}
function runBatchOfflineOcr(file){
  return loadBatchOfflineOcr().then(function(Tesseract){
    if(!batchOcrWorker){
      batchOcrWorkerPromise=Tesseract.createWorker('chi_sim+eng',1,{});
      batchOcrWorker=batchOcrWorkerPromise;
    }
    return batchOcrWorker.then(function(worker){
      batchOcrStatus('正在本机识别截图，图片不会上传…',false);
      return worker.recognize(file);
    });
  }).then(function(result){
    var text=result&&result.data&&result.data.text?result.data.text.trim():'';
    if(!text)throw new Error('离线OCR未识别到文字');
    batchOcrText=text;
    var preview=document.getElementById('batch-ocr-text-preview');
    if(preview)preview.value=text;
    document.getElementById('batch-input').value=text;
    batchOcrStatus('离线识别完成：请核对文字，再预览识别下单',true);
  });
}
function runBatchOcr(){
  if(!batchOcrImage)return alert('请先选择或拖入截图');
  var cfg=getBatchOcrConfig();
  if(!cfg.endpoint){
    runBatchOfflineOcr(batchOcrImage).catch(function(err){
      batchOcrStatus('离线OCR失败：'+(err.message||'请检查网络或图片'),false);
    });
    return;
  }
  batchOcrStatus('OCR识别中，请稍候…',false);
  requestBatchOcr(batchOcrImage,cfg).then(function(res){
    return res.text().then(function(body){
      if(!res.ok)throw new Error('HTTP '+res.status+' '+body.substring(0,160));
      var value;
      try{value=JSON.parse(body);}catch(e){value=body;}
      var text=findBatchOcrText(cfg.textPath?getBatchOcrValue(value,cfg.textPath):value)||findBatchOcrText(value);
      if(!text.trim())throw new Error('接口未返回可识别文字');
      batchOcrText=text.trim();
      var preview=document.getElementById('batch-ocr-text-preview');
      if(preview)preview.value=batchOcrText;
      document.getElementById('batch-input').value=batchOcrText;
      batchOcrStatus('识别完成：请核对下方文字，再点击“预览识别下单”确认',true);
    });
  }).catch(function(err){batchOcrStatus('OCR失败：'+(err.message||'请检查接口配置和网络'),false);});
}
function useOcrTextForBatch(){
  var text=(document.getElementById('batch-ocr-text-preview')||{}).value||batchOcrText;
  if(!text.trim())return alert('暂无OCR文字，请先识别截图');
  document.getElementById('batch-input').value=text;
  parseBatchText(text,{source:'ocr'});
}
function escapeBatchHtml(value){
  return String(value===undefined||value===null?'':value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function discardBatchPreview(silent){
  if(__batchPendingPreviewId!==null){
    G=G.filter(function(g){return g.batchId!==__batchPendingPreviewId;});
    __batchPendingPreviewId=null;
    save();
    try{renderRecords();}catch(e){}
  }
  var panel=document.getElementById('debug-panel');
  if(panel)panel.remove();
  if(!silent)toast('已取消，未入账');
}
function cancelDbg(){discardBatchPreview(false);}
function setAmount(v){document.getElementById('c-bet').value=v;document.getElementById('c-bet').focus();}
function addToCart(){
  var name=document.getElementById('c-name-sel').value||document.getElementById('c-name-input').value.trim();
  var type=document.getElementById('c-type').value;
  var bet=parseFloat(document.getElementById('c-bet').value);
  var multi=parseInt(document.getElementById('c-multi').value)||1;
  var odds=parseFloat(document.getElementById('c-odds').value);
  var rate=parseFloat(document.getElementById('c-rate').value)||0;
  if(!name)return alert('请输入客人姓名');
  if(!bet||bet<=0)return alert('请输入金额');
  var needNum=false; // var needNum=['tema','eryou','sanyou','siyou','wuyou','tetuo','d1e','d1s','d1si','d1w','e2','s2','s3','s3x','s4x','s5x','s6x'].indexOf(type)>=0;
  if(needNum&&selNums.length===0)return alert('请选择号码');
  var tb=bet*multi;
  var cb=tb*rate/100;
  cart.push({type:type,nums:selNums.slice(),bet:bet,multi:multi,odds:odds,rate:rate,tb:tb,cb:cb,draw:'hk'});
  speak('已选 '+selNums.length+' 个号 金额 '+tb+'元');
  selNums=[];updateSelNums();
  for(var i=1;i<=49;i++){var el=document.getElementById('nb'+i);if(el){var c=RED.indexOf(i)>=0?'#d32f2f':BLUE.indexOf(i)>=0?'#1565c0':'#2e7d32';el.style.background=c;}}
  document.getElementById('c-bet').value='';document.getElementById('c-multi').value='1';
  renderCart();
  toast('已添加 '+TN[type]+' '+tb+'元');
}
function renderCart(){
  var box=document.getElementById('cart-box');
  var list=document.getElementById('cart-list');
  var count=document.getElementById('cart-count');
  var total=document.getElementById('cart-total');
  if(cart.length===0){box.style.display='none';return;}
  box.style.display='block';
  count.textContent=cart.length;
  var sum=cart.reduce(function(a,b){return a+b.tb;},0);
  total.textContent='合计: '+sum+'元';
  list.innerHTML=cart.map(function(c,i){
    return '<div class="li"><div class="lh"><span class="ln">'+(TN[c.type]||c.type)+'</span><button class="btn bd" onclick="removeFromCart('+i+')">删除</button></div><div class="ld">'+(c.nums.length?'['+formatNums(c)+'] ':'')+c.bet+'x'+c.multi+'='+c.tb+'元 | 赔率'+c.odds+' | 反水'+c.rate+'%</div></div>';
  }).join('');
}
function removeFromCart(i){cart.splice(i,1);renderCart();}
function clearCart(){cart=[];renderCart();}
function submitCart(){
  var name=document.getElementById('c-name-sel').value||document.getElementById('c-name-input').value.trim();
  if(!name)return alert('请输入客人姓名');
  if(cart.length===0)return alert('投注单为空');
  cart.forEach(function(c){
    G.push({id:nid(),batchId:curBatch,name:name,type:c.type,nums:c.nums,bet:c.bet,multi:c.multi,odds:c.odds,rate:c.rate,tb:c.tb,cb:c.cb,date:(typeof useDate!=="undefined"?useDate:today),draw:c.draw||'hk',settled:false,result:null});
  });
  save();
  var cnt=cart.length;
  cart=[];renderCart();
  document.getElementById('c-name-input').value='';
  toast(name+' 已添加 '+cnt+' 笔投注');
}
function rg(id){if(confirm('确定删除？')){G=G.filter(function(g){return g.id!==id});save();renderRecords();}}
function cl2(){if(confirm('确定清空全部未结算数据？')){G=G.filter(function(g){return g.settled;});save();renderRecords();}}
function getAllDates(){
  var dates=[];
  G.forEach(function(g){if(g.date && dates.indexOf(g.date)<0) dates.push(g.date);});
  dates.sort().reverse();
  return dates;
}
function getBetsByDate(date){
  return G.filter(function(g){return g.date===date;});
}
function renderRecords(){
  var el=document.getElementById('gl');
  if(!G || !G.length){el.innerHTML='<div class="empty">暂无数据</div>';return;}
  var dates=getAllDates();
  if(!dates.length){el.innerHTML='<div class="empty">暂无数据<br><small>G:'+G.length+' 但无日期</small></div>';return;}
  var html='';
  dates.forEach(function(date){
    var bets=getBetsByDate(date);
    var totalBet=bets.reduce(function(a,b){return a+b.tb;},0);
    html+='<div style="margin-bottom:16px">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding:8px 12px;background:#16213e;border-radius:8px"><span style="font-weight:700;color:#ffab00">'+date+'</span><span style="font-size:12px;color:#888">'+bets.length+'笔 | '+totalBet+'元</span></div>';
    var names={};
    bets.forEach(function(g){if(!names[g.name])names[g.name]=[];names[g.name].push(g);});
    Object.keys(names).forEach(function(name){
      var nb=names[name];
      var ntb=nb.reduce(function(a,b){return a+b.tb;},0);
      html+='<div style="margin-left:8px;margin-bottom:8px">';
      html+='<div style="font-weight:600;color:#e94560;font-size:13px;padding:4px 0">'+name+' <span style="color:#888;font-weight:400;font-size:11px">'+ntb+'元</span></div>';
      // 按批次分组，同一次粘贴的多个注在一个单内
      var batches={}; nb.forEach(function(g){ var bid=g.batchId||g.id; if(!batches[bid]) batches[bid]=[]; batches[bid].push(g); });
      Object.keys(batches).forEach(function(bid){
        var grp=batches[bid];
        if(grp.length>1){
          html+='<div class="li" style="margin-left:8px;border-left:3px solid #e94560"><div style="font-size:10px;color:#ffab00;margin-bottom:4px">单 '+bid.toString().slice(-4)+'（'+grp.length+'笔）</div>';
          grp.forEach(function(g){
            var st='';
            if(g.settled&&g.result){st='<span class="'+(g.result.win?'w':'l')+'">'+(g.result.win?'赢 +'+g.result.payout.toFixed(0):'未中')+'</span>';}
            html+='<div style="padding:4px 0;border-bottom:1px solid #1a1a2e"><div style="display:flex;justify-content:space-between"><span style="color:#aaa">'+(TN[g.type]||g.type)+(g.nums&&g.nums.length?' ['+formatNums(g)+']':'')+'</span><span style="color:#666">'+g.tb+'元</span></div>';
            html+='<div style="font-size:10px;color:#666">赔率'+g.odds+' | 反水'+g.rate+'%('+g.cb.toFixed(1)+') '+st+' <button class="btn bd" onclick="editAmount('+g.id+')" style="padding:2px 6px;font-size:9px;margin-right:4px">改金额</button><button class="btn bd" onclick="rg('+g.id+')" style="padding:2px 6px;font-size:9px">删</button></div></div>';
          });
          var gtb=grp.reduce(function(a,b){return a+b.tb;},0);
          html+='<div style="text-align:right;font-size:11px;color:#ffab00;margin-top:4px">小计 '+gtb+'元</div></div>';
        } else {
          var g=grp[0];
          var st='';
          if(g.settled&&g.result){st='<span class="'+(g.result.win?'w':'l')+'">'+(g.result.win?'赢 +'+g.result.payout.toFixed(0):'未中')+'</span>';}
          html+='<div class="li" style="margin-left:8px"><div class="lh"><span style="color:#aaa">'+(TN[g.type]||g.type)+(g.nums&&g.nums.length?' ['+formatNums(g)+']':'')+'</span><span style="color:#666">'+g.tb+'元</span></div>';
          html+='<div class="ld">赔率'+g.odds+' | 反水'+g.rate+'%('+g.cb.toFixed(1)+') '+st+'</div>';
          html+='<div style="text-align:right;margin-top:4px"><button class="btn bd" onclick="editAmount('+g.id+')" style="margin-right:4px">改金额</button><button class="btn bd" onclick="rg('+g.id+')">删</button></div></div>';
        }
      });
      html+='</div>';
    });
    html+='</div>';
  });
  el.innerHTML=html;
}
function renderSettlementList(){
  var el=document.getElementById('sl');
  // 同步顶部筛选按钮高亮
  try{
    document.querySelectorAll('#settle-filter .btn').forEach(function(b){b.style.background='#2a2a4a';b.style.color='#e94560';});
    var active=document.getElementById('sf-'+settleFilter);
    if(active){active.style.background='#e94560';active.style.color='#fff';}
  }catch(e){}
  var dates=getAllDates();
  if(!dates.length){el.innerHTML='<div class="empty">暂无数据</div>';return;}
  var html='';
  dates.forEach(function(date){
    var bets=getBetsByDate(date);
    var hkBets=bets.filter(function(g){return !g.draw || g.draw==='hk';});
    var amBets=bets.filter(function(g){return g.draw==='am';});
    function block(label, arr){
      var isHK=label==='香港';
      var settled=arr.filter(function(g){return g.settled;});
      var unsettled=arr.filter(function(g){return !g.settled;});
      var totalBet=arr.reduce(function(a,b){return a+b.tb;},0);
      var totalPayout=settled.reduce(function(a,b){return a+(b.result?b.result.payout:0);},0);
      var totalCB=arr.reduce(function(a,b){return a+b.cb;},0);
      var profit=settled.length? (settled.reduce(function(a,b){return a+b.tb;},0)-totalPayout) : 0;
      var borderColor=isHK?'#ffab00':'#00b894';
      var bgColor=isHK?'#1a1a2e':'#0f1a1a';
      var h='<div style="flex:1;min-width:280px;background:'+bgColor+';border:1.5px solid '+borderColor+';border-radius:12px;padding:10px;margin-bottom:8px">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:'+(isHK?'#2a1a0a':'#0a2a1a')+';border-radius:8px;margin-bottom:8px;border-left:4px solid '+borderColor+'">';
      h+='<span style="font-weight:700;color:'+borderColor+';font-size:14px">'+label+'</span>';
      h+='<span style="font-size:10px;color:#888">'+arr.length+'笔 '+totalBet+'元</span>';
      h+='</div>';
      if(!arr.length){
        h+='<div style="text-align:center;color:#555;padding:16px;font-size:11px">暂无'+label+'投注</div>';
      } else {
        h+='<div style="display:flex;gap:6px;font-size:10px;color:#888;margin-bottom:8px;padding:0 4px">';
        if(settled.length) h+='<span style="color:#4caf50">✓已结算'+settled.length+'</span>';
        if(unsettled.length) h+='<span style="color:#ff9800">◷未结算'+unsettled.length+'</span>';
        if(settled.length) h+='<span style="margin-left:auto;color:'+(profit>=0?'#4caf50':'#e94560')+'">'+(profit>=0?'庄赢':'庄亏')+' '+Math.abs(profit).toFixed(0)+'</span>';
        h+='</div>';
        if(settled.length){
          var names={};
          settled.forEach(function(g){if(!names[g.name])names[g.name]={bets:[],totalBet:0,totalPayout:0,totalCB:0,winCount:0};names[g.name].bets.push(g);names[g.name].totalBet+=g.tb;names[g.name].totalPayout+=g.result?g.result.payout:0;names[g.name].totalCB+=g.cb;if(g.result&&g.result.win)names[g.name].winCount++;});
          // 按投注额排序，方便对奖
          var sortedNames=Object.keys(names).sort(function(a,b){return names[b].totalBet-names[a].totalBet;});
          sortedNames.forEach(function(name){
            var n=names[name];
            var p=n.totalBet-n.totalPayout;
            var winRate=n.bets.length? Math.round(n.winCount/n.bets.length*100) : 0;
            h+='<div style="background:#0f0f1a;border:1px solid #2a2a4a;border-radius:8px;padding:8px;margin-bottom:6px">';
            h+='<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;color:#e94560;font-size:13px">'+name+'</span><span style="font-size:11px;padding:2px 8px;border-radius:10px;background:'+(p>=0?'#1a3a2a':'#3a1a1a')+';color:'+(p>=0?'#4caf50':'#ff5252')+'">'+(p>=0?'赢':'亏')+' '+Math.abs(p).toFixed(0)+'</span></div>';
            h+='<div style="display:flex;gap:8px;font-size:10px;color:#888;margin-top:4px;flex-wrap:wrap">';
            h+='<span>投'+n.bets.length+'笔 '+n.totalBet+'元</span><span>中'+n.winCount+'笔</span><span>赔'+n.totalPayout.toFixed(0)+'</span><span>反水'+n.totalCB.toFixed(0)+'</span><span>胜率'+winRate+'%</span>';
            h+='</div>';
            // 明细：每注类型+号码+金额+中不中
            h+='<div style="margin-top:6px;border-top:1px dashed #2a2a4a;padding-top:4px">';
            n.bets.forEach(function(g){
              var st=g.result&&g.result.win?'<span style="color:#4caf50">✓中 +'+g.result.payout.toFixed(0)+'</span>':'<span style="color:#666">✗不中</span>';
              h+='<div style="display:flex;justify-content:space-between;font-size:10px;padding:2px 0;color:#aaa"><span>'+(TN[g.type]||g.type)+' ['+formatNums(g)+'] '+g.tb+'元</span><span>'+st+'</span></div>';
            });
            h+='</div>';
            h+='</div>';
          });
        }
        if(unsettled.length){
          h+='<div style="margin-top:6px;padding:6px;background:rgba(255,152,0,0.08);border:1px dashed #ff9800;border-radius:6px">';
          h+='<div style="font-size:10px;color:#ff9800;font-weight:600;margin-bottom:4px">待结算 '+unsettled.length+'笔</div>';
          var uNames={}; unsettled.forEach(function(g){if(!uNames[g.name])uNames[g.name]=[];uNames[g.name].push(g);});
          Object.keys(uNames).forEach(function(nm){
            var arr2=uNames[nm]; var tb2=arr2.reduce(function(a,b){return a+b.tb;},0);
            h+='<div style="font-size:10px;color:#aaa;display:flex;justify-content:space-between"><span>'+nm+' '+arr2.length+'笔</span><span>'+tb2+'元</span></div>';
          });
          h+='</div>';
        }
      }
      h+='</div>';
      return h;
    }
    var hkTotal=hkBets.reduce(function(a,b){return a+b.tb;},0);
    var amTotal=amBets.reduce(function(a,b){return a+b.tb;},0);
    var dayTotal=hkTotal+amTotal;
    html+='<div style="margin-bottom:16px;background:#16213e;border-radius:12px;padding:10px;border:1px solid #2a2a4a">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#0f0f1a;border-radius:8px;margin-bottom:10px">';
    html+='<span style="font-weight:700;color:#ffab00;font-size:13px">'+date+'</span>';
    html+='<span style="font-size:11px;color:#888">'+dayTotal+'元 <span style="color:#ffab00">香港'+hkTotal+'</span> <span style="color:#00b894">澳门'+amTotal+'</span></span>';
    html+='</div>';
    html+='<div style="display:flex;gap:8px;flex-wrap:wrap">';
    if(settleFilter==='all' || settleFilter==='hk') html+=block('香港', hkBets);
    if(settleFilter==='all' || settleFilter==='am') html+=block('澳门', amBets);
    if(settleFilter==='hk' && !hkBets.length) html+='<div style="flex:1;text-align:center;color:#555;padding:16px">无香港数据</div>';
    if(settleFilter==='am' && !amBets.length) html+='<div style="flex:1;text-align:center;color:#555;padding:16px">无澳门数据</div>';
    html+='</div>';
    if(!hkBets.length && !amBets.length){
      html+='<div style="padding:8px;color:#888;text-align:center">无'+date+'数据</div>';
    }
    html+='</div>';
  });
  el.innerHTML=html;
}
function getDraw(dk){ return dk==='am' ? {nums:amDraw, sp:amSp} : {nums:hkDraw, sp:hkSp}; }
function setDraw(dk, nums, sp){ if(dk==='am'){ amDraw=nums; amSp=sp; } else { hkDraw=nums; hkSp=sp; } drawNumbers=nums; specialNum=sp; saveHist(dk, nums, sp); }
function manualInput(dk){
  // 支持一次输入14个号（香港7+澳门7）一起结算
  if(!dk){
    let v=(document.getElementById('dn-hk')&&document.getElementById('dn-hk').value.trim())||'';
    let v2=(document.getElementById('dn-am')&&document.getElementById('dn-am').value.trim())||'';
    if(v && v2){
      // 两盘都填了
      manualInput('hk'); manualInput('am'); return;
    }
    // 尝试从单框读14个号
    let single=document.getElementById('dn')?document.getElementById('dn').value.trim():'';
    if(single){
      let nums=single.split(/[,，\s]+/).map(s=>parseInt(s)).filter(n=>n>=1&&n<=49);
      if(nums.length===14){
        let hk=nums.slice(0,7), am=nums.slice(7,14);
        setDraw('hk', hk.slice(0,6).sort((a,b)=>a-b), hk[6]); setDraw('am', am.slice(0,6).sort((a,b)=>a-b), am[6]);
        displayNumbers('hk'); displayNumbers('am'); return;
      }
    }
    dk='hk';
  }
  dk=dk||'hk';
  var input=document.getElementById(dk==='am'?'dn-am':'dn-hk').value.trim();
  if(!input) input=document.getElementById('dn')?document.getElementById('dn').value.trim():'';
  if(!input) return alert('请输入号码');
  var nums=input.split(/[,，\s]+/).map(function(s){return parseInt(s);}).filter(function(n){return n>=1&&n<=49;});
  if(nums.length!==7) return alert('请输入7个号码');
  var unique=[];nums.forEach(function(n){if(unique.indexOf(n)===-1)unique.push(n);});
  if(unique.length!==7) return alert('号码不能重复');
  var d=nums.slice(0,6).sort(function(a,b){return a-b;}); var s=nums[6];
  setDraw(dk,d,s); displayNumbers(dk);
}
function displayNumbers(dk){
  dk=dk||'hk';
  var dobj=getDraw(dk);
  var drawNumbers2=dobj.nums, specialNum2=dobj.sp;
  var el=document.getElementById(dk==='am'?'draw-display-am':'draw-display-hk');
  var info=document.getElementById(dk==='am'?'draw-info-am':'draw-info-hk');
  if(!el) { el=document.getElementById('draw-display'); info=document.getElementById('draw-info'); }
  if(!el) return;
  var html='';
  drawNumbers2.forEach(function(n){
    var inf=getNumInfo(n);
    html+='<div style="display:inline-block;margin:3px;padding:8px 10px;background:#1a237e;border-radius:8px"><div style="font-size:24px;font-weight:bold;color:#fff">'+n+'</div><div style="font-size:10px">'+inf.colorName+'/'+inf.big+inf.odd+'/'+inf.zodiac+'</div></div>';
  });
  if(specialNum2){
    var sp=getNumInfo(specialNum2);
    html+='<div style="display:inline-block;margin:3px;padding:8px 10px;background:#b71c1c;border-radius:8px;border:2px solid #ff5252"><div style="font-size:24px;font-weight:bold;color:#ff5252">'+specialNum2+'</div><div style="font-size:10px;color:#ff5252">特码 '+sp.colorName+'/'+sp.big+sp.odd+'/'+sp.zodiac+'</div></div>';
  }
  el.innerHTML=html;
  if(info) info.innerHTML='正码：'+drawNumbers2.join(', ')+'<br>特码：<b style="color:#ff5252">'+specialNum2+'</b>';
  // 兼容旧 display
  var el2=document.getElementById('draw-display'); var info2=document.getElementById('draw-info');
  if(el2 && el!==el2) el2.innerHTML=html;
  if(info2 && info!==info2) info2.innerHTML=info?info.innerHTML:'';
}
function settleAll(dk){
  if(!dk || dk==='all'){
    // 一起结算：分别用香港和澳门开奖结算对应盘口
    let hk=false, am=false;
    if(hkSp && hkDraw.length) { settleAll('hk'); hk=true; }
    if(amSp && amDraw.length) { settleAll('am'); am=true; }
    if(!hk && !am){
      // 若只输了一盘的号码（7个），则直接按单盘结算全部
      dk='hk';
    } else return;
  }
  dk=dk||'hk';
  var dobj=getDraw(dk);
  var drawNumbers2=dobj.nums, specialNum2=dobj.sp;
  if(!specialNum2||drawNumbers2.length===0) return alert(dk==='am'?'请先输入澳门开奖':'请先输入香港开奖');
  var todayBets=G.filter(function(g){return !g.settled && (g.draw===dk || (!g.draw && dk==='hk'));});
  if(!todayBets.length) return alert(dk==='am'?'今天没有澳门投注':'今天没有香港投注');
  var unsettled=todayBets.filter(function(g){return !g.settled;});
  if(!unsettled.length) return alert('该盘已全部结算');
  unsettled.forEach(function(g){
    var winningCombos=winningCombinationCount(g,drawNumbers2,specialNum2);
    var win=winningCombos>0;
    var payout=win?g.bet*winningCombos*g.odds:0;
    g.settled=true;
    g.result={win:win,payout:payout,winningCombos:winningCombos};
  });
  save();
  renderSettlementList();
  try{renderImportSettled();}catch(e){}
  alert((dk==='am'?'澳门':'香港')+'结算完成！');
}
function undoSettle(){
  if(!confirm('撤销所有结算？'))return;
  var count=0;
  G.forEach(function(g){if(g.settled){g.settled=false;g.result=null;count++;}});
  save();
  renderSettlementList();
  try{renderImportSettled();}catch(e){}
  toast('已撤销'+count+'笔结算');
}
function saveHist(dk, nums, sp){ var date=new Date().toISOString().slice(0,10); var arr=dk==='hk'?hkHist:amHist; arr.unshift({nums:nums.slice(), sp:sp, date:date}); if(arr.length>100) arr.pop(); localStorage.setItem(dk==='hk'?'hkHist':'amHist', JSON.stringify(arr)); if(window.lottoDb&&window.lottoDb.syncDraw) window.lottoDb.syncDraw(dk,date,nums,sp).catch(function(err){console.error('SQLite开奖同步失败',err);}); }
function saveDraw(dk){
  dk=dk||'hk';
  var dobj=getDraw(dk);
  if(!dobj.sp||dobj.nums.length===0) return alert('请先输入开奖号码');
  var key=(dk==='am'?'draw_am_':'draw_')+today;
  localStorage.setItem(key, JSON.stringify({drawNumbers:dobj.nums,specialNum:dobj.sp}));
  alert((dk==='am'?'澳门':'香港')+'开奖已保存');
}
function loadDraw(){
  var hk=localStorage.getItem('draw_'+today);
  var am=localStorage.getItem('draw_am_'+today);
  if(hk){ try{var d=JSON.parse(hk); hkDraw=d.drawNumbers; hkSp=d.specialNum; setDraw('hk',hkDraw,hkSp); displayNumbers('hk');}catch(e){} }
  if(am){ try{var d=JSON.parse(am); amDraw=d.drawNumbers; amSp=d.specialNum; displayNumbers('am');}catch(e){} }
  if(!hk && !am){
    var key='draw_'+today; var data=localStorage.getItem(key);
    if(data){ try{var d=JSON.parse(data); hkDraw=d.drawNumbers; hkSp=d.specialNum; displayNumbers('hk');}catch(e){} }
  }
}
function setSettleFilter(v){
  settleFilter=v;
  localStorage.setItem('settleFilter', v);
  document.querySelectorAll('#settle-filter .btn').forEach(function(b){b.style.background='#2a2a4a';b.style.color='#e94560';});
  var active=document.getElementById('sf-'+v);
  if(active){active.style.background='#e94560';active.style.color='#fff';}
  try{renderSettlementList();}catch(e){}
  try{renderImportSettled();}catch(e){}
}
function fetchDraw(dk){
  if(dk==='hk') toast('正在获取香港开奖...');
  else if(dk==='am') toast('正在获取澳门开奖...');
  else toast('正在获取开奖号码...');
  var wantHK=!dk || dk==='hk' || dk==='all';
  var wantAM=!dk || dk==='am' || dk==='all';
  var totalWant=(wantHK?1:0)+(wantAM?1:0);
  var done=0, okCount=0;
  function check(ok){
    if(ok) okCount++;
    done++;
    if(done===totalWant){
      if(okCount===0) toast('获取失败，已用本地/手动输入为准');
      else if(okCount < totalWant) toast('已获取'+okCount+'盘开奖');
      else toast('开奖号码已获取');
    }
  }
  function handleResponse(txt, dk){
    try{
      var r=typeof txt==='string'? JSON.parse(txt) : txt;
      // 兼容 allorigins 代理返回的文本
      if(typeof r==='string') r=JSON.parse(r);
      if(r.status==='10'&&r.data&&r.data.data&&r.data.data.length){
        var d=r.data.data[0];
        var nums=d.numbers.split(',').map(function(s){return parseInt(s,10);}).filter(function(n){return n>=1&&n<=49;});
        if(nums.length===7){
          setDraw(dk,nums.slice(0,6).sort(function(a,b){return a-b;}),nums[6]);
          displayNumbers(dk);
          var el=document.getElementById(dk==='am'?'dn-am':'dn-hk');
          if(el) el.value=nums.join(',');
          return true;
        }
      }
    }catch(e){}
    return false;
  }
  function fetchWithFallback(url, dk){
    var isNative = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    var proxies=[
      url,
      'https://api.allorigins.win/raw?url='+encodeURIComponent(url),
      'https://corsproxy.io/?'+encodeURIComponent(url)
    ];
    var idx=0;
    function tryNext(){
      if(idx>=proxies.length){ check(false); return; }
      var u=proxies[idx++];
      // 优先用 Capacitor 原生请求（无跨域）
      if(isNative && window.Capacitor.Plugins && window.Capacitor.Plugins.CapacitorHttp){
        window.Capacitor.Plugins.CapacitorHttp.get({url:u, headers:{}, connectTimeout:8000, readTimeout:8000}).then(function(res){
          var txt=res.data;
          if(typeof txt!=='string') txt=JSON.stringify(txt);
          if(handleResponse(txt, dk)) check(true); else tryNext();
        }).catch(function(){ tryNext(); });
        return;
      }
      // 普通 Web：fetch + 超时
      var ctrl=null, timer=null;
      try{ ctrl=new AbortController(); timer=setTimeout(function(){try{ctrl.abort();}catch(e){}},8000); }catch(e){}
      fetch(u, {mode:'cors', cache:'no-store', signal:ctrl?ctrl.signal:undefined}).then(function(r){
        if(timer) clearTimeout(timer);
        if(!r.ok) throw new Error('http '+r.status);
        return r.text();
      }).then(function(txt){
        if(handleResponse(txt, dk)) check(true); else tryNext();
      }).catch(function(){ if(timer) clearTimeout(timer); tryNext(); });
    }
    tryNext();
  }
  if(wantAM) fetchWithFallback('https://www.kj1868.com/openapi/drawLottery/nam6/last.kj?page=1&pageSize=1','am');
  if(wantHK) fetchWithFallback('https://www.kj1868.com/openapi/drawLottery/xg6/last.kj?page=1&pageSize=1','hk');
  // 额外备选源
  setTimeout(function(){
    if(wantAM && !amSp) fetchWithFallback('https://api.macaumarksix.com/draw/latest','am');
    if(wantHK && !hkSp) fetchWithFallback('https://api.hkmarksix.com/draw/latest','hk');
  },9000);
}
var APP_VERSION='1.0.27';
function applyHotPatch(code){
  try{
    // 用 Function 避免污染局部作用域，直接覆盖全局函数
    var fn=new Function(code+ '\n;return true;');
    // 先备份关键数据，防止被覆盖时丢失
    var _bak={G:G.slice(), customers:customers.slice(), hkDraw:hkDraw.slice(), amDraw:amDraw.slice(), hkSp:hkSp, amSp:amSp, hkHist:hkHist.slice(), amHist:amHist.slice()};
    fn();
    // 热更后尝试恢复数据并重绘
    try{ G=_bak.G; customers=_bak.customers; hkDraw=_bak.hkDraw; amDraw=_bak.amDraw; hkSp=_bak.hkSp; amSp=_bak.amSp; hkHist=_bak.hkHist; amHist=_bak.amHist; save(); saveC(); }catch(e){}
    try{ renderRecords(); renderSettlementList(); renderRisk(); renderTrend(); }catch(e){}
    console.log('热更新应用成功', APP_VERSION);
    return true;
  }catch(e){ console.error('热更新失败',e); return false; }
}
function checkHotUpdate(manual){
  var cfg={url:''};
  try{ var saved=JSON.parse(localStorage.getItem('otaConfig')||'{}'); if(saved&&saved.url) cfg.url=saved.url; }catch(e){}
  var GITHUB_HOT='https://yix309672-netizen.github.io/zhuangjia-hot/version.json';
  // 默认更新源：已为你配置好 GitHub 免费热更，无需手动填
  var defaultUrl=cfg.url || localStorage.getItem('hotUpdateUrl') || GITHUB_HOT;
  if(!defaultUrl){
    if(manual){
      var u=prompt('输入热更新地址（version.json 的完整URL）\n例如 https://你的域名/version.json\n留空则使用内置更新', cfg.url||GITHUB_HOT);
      if(u===null) return;
      u=u.trim();
      if(!u){ toast('未配置更新地址'); return; }
      cfg.url=u; localStorage.setItem('otaConfig', JSON.stringify(cfg)); localStorage.setItem('hotUpdateUrl', u);
      defaultUrl=u;
    } else {
      defaultUrl=GITHUB_HOT;
    }
  }
  // 若用户从未配置过，自动写入默认 GitHub 地址，方便下次静默更新
  if(!cfg.url && !localStorage.getItem('hotUpdateUrl')){
    try{ localStorage.setItem('otaConfig', JSON.stringify({url:GITHUB_HOT})); localStorage.setItem('hotUpdateUrl', GITHUB_HOT); }catch(e){}
  }
  toast('正在检查热更新...');
  fetch(defaultUrl, {cache:'no-store'}).then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.json(); }).then(function(ver){
    if(!ver || !ver.version) throw new Error('版本文件格式错误');
    var cur=localStorage.getItem('__hot_app_ver')||APP_VERSION;
    if(ver.version===cur && !manual){
      console.log('已是最新', cur); return;
    }
    if(ver.version===cur && manual){ toast('已是最新版本 '+cur); return; }
    var appUrl=ver.appUrl || ver.url || defaultUrl.replace('version.json','app.js');
    toast('发现新版本 '+ver.version+'，正在下载...');
    return fetch(appUrl, {cache:'no-store'}).then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.text(); }).then(function(code){
      if(!code || code.length<1000) throw new Error('app.js 内容异常');
      localStorage.setItem('__hot_app_js', code);
      localStorage.setItem('__hot_app_ver', ver.version);
      if(confirm('发现新版本 '+ver.version+'\n'+(ver.desc||'')+'\n是否立即应用？（无需重装）')){
        if(applyHotPatch(code)){
          toast('热更新成功 '+ver.version);
          setTimeout(function(){ location.reload(); },800);
        } else alert('热更新应用失败，请重启重试');
      } else toast('已下载 '+ver.version+'，下次启动自动应用');
    });
  }).catch(function(e){
    console.log('热更新检查失败',e);
    if(manual) toast('检查失败：'+(e.message||'网络错误')+'\n可手动导入app.js');
  });
}
(function tryApplyHotPatch(){
  try{
    var hot=localStorage.getItem('__hot_app_js');
    var ver=localStorage.getItem('__hot_app_ver');
    if(hot && hot.length>1000){
      console.log('检测到热更新缓存', ver);
      // 延迟应用，确保基础脚本已加载
      setTimeout(function(){
        try{ applyHotPatch(hot); console.log('热缓存已应用', ver); }catch(e){ console.error(e); }
      }, 300);
    }
  }catch(e){}
})();
function importHotUpdateFile(input){
  var f=input.files[0]; if(!f) return;
  var r=new FileReader();
  r.onload=function(e){
    try{
      var code=e.target.result;
      if(!code || code.length<1000) throw new Error('文件过小');
      localStorage.setItem('__hot_app_js', code);
      localStorage.setItem('__hot_app_ver', 'manual-'+Date.now());
      if(confirm('已导入热更新文件，是否立即应用？')){ applyHotPatch(code); setTimeout(function(){ location.reload(); },500); }
      else toast('已缓存，重启后生效');
    }catch(err){ alert('导入失败:'+err.message); }
  };
  r.readAsText(f);
}
function configureHotUpdate(){
  var cfg={}; try{cfg=JSON.parse(localStorage.getItem('otaConfig')||'{}');}catch(e){}
  var cur=cfg.url||localStorage.getItem('hotUpdateUrl')||'';
  var u=prompt('热更新地址（version.json URL）\n配置后可一键获取无需重装更新', cur);
  if(u===null) return;
  u=u.trim();
  cfg.url=u; localStorage.setItem('otaConfig', JSON.stringify(cfg));
  if(u) localStorage.setItem('hotUpdateUrl', u); else localStorage.removeItem('hotUpdateUrl');
  toast(u?'已保存更新地址':'已清除更新地址');
}
// ===== 激活校验（方案B：激活码+设备绑定，离线）=====
// 发布者可在 ACTIVATION_CODES 里增删激活码；每个码默认绑定一台设备。
// 若要"一人一个包一码"则每客户一个码。码格式建议: XIAOYI-XXXX-XXXX
var ACTIVATION_CODES=['XIAOYI-2026-0001','XIAOYI-TEST'];
function getDeviceId(){
  try{
    // 优先用 Capacitor 原生设备ID，否则用 UA+时间哈希作为设备指纹
    if(window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Device){
      // Device 插件通常异步，这里用同步兜底
    }
  }catch(e){}
  var base=(navigator.userAgent||'')+'|'+(navigator.language||'')+'|'+(navigator.platform||'')+'|';
  try{ base+=(window.devicePixelRatio||1)+'|'+(screen.width||0)+'x'+(screen.height||0); }catch(e){}
  var h=0;
  for(var i=0;i<base.length;i++){ h=(h*31 + base.charCodeAt(i))>>>0; }
  return 'DEV-'+h.toString(16).toUpperCase().padStart(8,'0');
}
function sha256Code(str){
  // 简易可离线稳定的哈希（非加密，仅一致性校验）
  var h=5381;
  for(var i=0;i<str.length;i++){ h=((h<<5)+h+str.charCodeAt(i))>>>0; }
  return h.toString(16);
}
function validActivation(code){
  code=(code||'').trim().toUpperCase();
  if(!code) return false;
  return ACTIVATION_CODES.indexOf(code)>=0;
}
function ensureActivated(){
  try{
    var stored=localStorage.getItem('xy_activation');
    if(stored){
      try{
        var a=JSON.parse(stored);
        return a && a.code && validActivation(a.code); // 已激活(本机持久化即放行)
      }catch(e){}
    }
  }catch(e){}
  // 未激活：弹窗要求输入激活码
  var code=prompt('【萧易】首次使用需激活。\n请输入激活码（格式 XIAOYI-XXXX-XXXX）：');
  code=(code||'').trim().toUpperCase();
  if(!validActivation(code)){
    alert('激活码无效，无法使用。\n请联系庄家获取正确的激活码。');
    return false;
  }
  try{
    var dev=getDeviceId();
    localStorage.setItem('xy_activation', JSON.stringify({code:code, dev:dev, ts:Date.now()}));
  }catch(e){}
  alert('激活成功！本机已验证，可直接使用。');
  return true;
}
function sp2(name){
  document.querySelectorAll('.pg').forEach(function(p){p.classList.remove('on')});
  document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on')});
  document.getElementById('pg-'+name).classList.add('on');
  var tabs=document.querySelectorAll('.tab');
  var map={cust:0,add:1,list:2,rs:3,odds:4,risk:5,import:6,pick:7};
  if(map[name]!==undefined&&tabs[map[name]])tabs[map[name]].classList.add('on');
  if(name==='list')renderRecords();
  if(name==='rs')renderSettlementList();
  if(name==='cust')renderCustomerList();
  if(name==='add')refreshCustomerDropdown();
  if(name==='import')renderImportSettled();
  if(name==='risk'){ renderRisk(); renderTrend(); }
}
var voiceOn=JSON.parse(localStorage.getItem('voiceOn')||'false');
function speak(txt){
  try{
    if(!voiceOn) return;
    if(!('speechSynthesis' in window)) return;
    var u=new SpeechSynthesisUtterance(txt);
    u.lang='zh-CN'; u.rate=1.1; u.pitch=1;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }catch(e){}
}
function toggleVoice(){ voiceOn=!voiceOn; localStorage.setItem('voiceOn', JSON.stringify(voiceOn)); var el=document.getElementById('voice-toggle'); if(el) el.textContent=voiceOn?'🔊 语音开':'🔇 语音关'; if(voiceOn) speak('语音已开启'); else speechSynthesis.cancel(); }
function renderTrend(){
  var hist=hkHist.length?hkHist:amHist;
  var el=document.getElementById('trend-grid');
  if(!el) return;
  if(!hist.length){ el.innerHTML='<div style="color:#666">暂无历史开奖，请先获取开奖</div>'; return; }
  var freq=new Array(50).fill(0);
  var last=new Array(50).fill(-1);
  hist.slice(0,50).forEach(function(rec, idx){
    rec.nums.forEach(function(n){ freq[n]++; if(last[n]===-1) last[n]=idx; });
    if(last[rec.sp]===-1) last[rec.sp]=idx;
    // also count special as freq
    freq[rec.sp]++;
  });
  var sorted=[];
  for(var i=1;i<=49;i++) sorted.push({n:i, f:freq[i], l:last[i]===-1? '—' : last[i]});
  sorted.sort(function(a,b){return b.f-a.f;});
  var html='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">';
  for(var k=0;k<14;k++){
    var o=sorted[k];
    var hot=o.f>=5? '#ff5252' : o.f>=3? '#ffab00' : '#666';
    html+='<div style="padding:4px;text-align:center;border:1px solid #2a2a4a;border-radius:6px;background:#0f0f1a"><div style="font-weight:700;color:'+hot+'">'+(o.n<10?'0'+o.n:o.n)+'</div><div style="font-size:9px;color:#888">'+o.f+'次/'+o.l+'</div></div>';
  }
  html+='</div>';
  html+='<div style="font-size:10px;color:#888;margin-top:6px">热号(前7) / 冷号(后7)：按近50期频率</div>';
  var cold=sorted.slice(-7).reverse();
  html+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:4px">';
  cold.forEach(function(o){
    html+='<div style="padding:4px;text-align:center;border:1px solid #2a2a4a;border-radius:6px;background:#16213e;color:#8c9eff"><div>'+(o.n<10?'0'+o.n:o.n)+'</div><div style="font-size:9px">'+o.f+'次</div></div>';
  });
  html+='</div>';
  el.innerHTML=html;
}
function renderRisk(){
  var risk=new Array(50).fill(0);
  var cnt=new Array(50).fill(0);
  G.filter(function(g){return !g.settled;}).forEach(function(g){
    var payout=g.tb*(g.odds||0);
    g.nums.forEach(function(n){ if(n>=1&&n<=49){ risk[n]+=payout; cnt[n]+=1; }});
  });
  var max=Math.max.apply(null, risk.slice(1))||1;
  var grid=document.getElementById('risk-grid');
  if(grid){
    grid.innerHTML='';
    for(var i=1;i<=49;i++){
      var v=risk[i];
      var alpha=v/max;
      var bg=v>0? 'rgba(233,69,96,'+(0.15+alpha*0.85)+')' : '#0f0f1a';
      var col=v>max*0.7? '#fff' : v>0? '#ff8a80' : '#666';
      var d=document.createElement('div');
      d.style.cssText='padding:6px 0;text-align:center;border-radius:6px;font-size:10px;border:1px solid #2a2a4a;background:'+bg+';color:'+col;
      d.innerHTML='<div style="font-weight:700">'+(i<10?'0'+i:i)+'</div><div style="font-size:8px">'+(v>0? (v>1000? (v/1000).toFixed(1)+'k' : Math.round(v)) : '-')+'</div>';
      if(v>0) d.title=cnt[i]+'笔 风险'+Math.round(v);
      grid.appendChild(d);
    }
  }
  var top=document.getElementById('risk-top');
  if(top){
    var arr=[];
    for(var j=1;j<=49;j++) if(risk[j]>0) arr.push({n:j, v:risk[j], c:cnt[j]});
    arr.sort(function(a,b){return b.v-a.v;});
    var html='<div style="color:#ffab00">Top5 风险号：</div>';
    arr.slice(0,5).forEach(function(o,i){
      html+='<div>'+(i+1)+'. '+(o.n<10?'0'+o.n:o.n)+' — '+Math.round(o.v)+'元 ('+o.c+'笔)</div>';
    });
    if(arr.length===0) html+='<div style="color:#666">暂无未结算投注</div>';
    top.innerHTML=html;
  }
  var adv=document.getElementById('risk-adv');
  if(adv){
    var total=G.filter(function(g){return !g.settled;}).reduce(function(a,b){return a+b.tb;},0);
    var advHtml='未结总额: <b style="color:#ffab00">'+total+'元</b><br>';
    if(typeof arr!=="undefined" && arr.length) advHtml+='建议：重点关注 <b>'+arr.slice(0,3).map(function(o){return (o.n<10?'0'+o.n:o.n)}).join(', ')+'</b> 的吃码/上报；可按风险比例分流。';
    else advHtml+='暂无建议';
    adv.innerHTML=advHtml;
  }
  var bets=document.getElementById('risk-bets');
  if(bets){
    var list=G.filter(function(g){return !g.settled;});
    if(!list.length) bets.innerHTML='<div style="color:#666">暂无未结投注</div>';
    else {
      var html='<div>未结 '+list.length+' 笔：</div>';
      list.slice(0,50).forEach(function(g){
        var tp=TN[g.type]||g.type;
        html+='<div style="padding:3px 0;border-bottom:1px solid #1a1a2e">'+tp+' ['+g.nums.join(',')+'] x'+g.multi+' @'+g.odds+' → '+g.tb+'元</div>';
      });
      if(list.length>50) html+='<div style="color:#666">…还有 '+(list.length-50)+' 笔</div>';
      bets.innerHTML=html;
    }
  }
}
function handleImportFile(input){
  var f=input.files[0]; if(!f) return;
  var r=new FileReader(); r.onload=function(e){ document.getElementById('import-input').value=e.target.result; }; r.readAsText(f);
}
function checkImport(){
  var txt=document.getElementById('import-input').value.trim();
  if(!txt) return alert('请粘贴或选择TXT');
  if(!hkDraw.length && !amDraw.length) return alert('请先获取开奖');
  // 临时解析不入G，按当前开奖核对（不保存）
  var tmp=[]; var oldG=G.slice(); var oldSave=save; save=function(){}; G=tmp;
  var oldCount=0;
  // 复用parseBatchText的解析但不保存：直接调用内部逻辑需抽离，简化：按行拆分后逐行checkWin
  var lines=txt.split(/[\n;]+/);
  var res=[];
  lines.forEach(function(line){
    line=line.trim(); if(!line) return;
    // 简化：尝试按现有parse逻辑解析单行（复用G的push逻辑需隔离）
    // 为简化，直接按 G 的 checkWin 对已解析的临时G
  });
  // 更直接：先解析到tmp，再核对
  parseBatchText(txt);
  var added=G.slice();
  // 回退并恢复存储，不入正式G
  G=oldG; save=oldSave; localStorage.setItem('hg', JSON.stringify(G));
  var hkD=getDraw('hk'), amD=getDraw('am');
  // 按日期→盘口→客户分组，方便每天结算后对奖
  var byDate={};
  added.forEach(function(g){
    var dk=g.draw==='am'?'am':'hk';
    var dkey=g.date||today;
    if(!byDate[dkey]) byDate[dkey]={hk:{},am:{},hkList:[],amList:[]};
    var bucket=dk==='am'?byDate[dkey].am:byDate[dkey].hk;
    var list=dk==='am'?byDate[dkey].amList:byDate[dkey].hkList;
    if(!bucket[g.name]) bucket[g.name]={bets:[],totalBet:0,totalPayout:0,winCount:0};
    var dobj=dk==='am'?amD:hkD;
    var win=checkWin(g,dobj.nums,dobj.sp);
    var payout=win? g.bet*(g.comboSize? combinationCount(countMatch(g.nums||[],dobj.nums.concat([dobj.sp])),g.comboSize) : 1)*g.odds : 0;
    // 兼容复式 comboSize 的奖金计算
    if(g.comboSize) payout=win? g.bet*combinationCount(countMatch(g.nums||[],dobj.nums.concat([dobj.sp])),g.comboSize)*g.odds : 0;
    else payout=win? g.tb*g.odds : 0;
    g._win=win; g._payout=payout; g._draw=dk;
    bucket[g.name].bets.push(g);
    bucket[g.name].totalBet+=g.tb;
    bucket[g.name].totalPayout+=payout;
    if(win) bucket[g.name].winCount++;
    list.push(g);
  });
  var html='';
  var datesSorted=Object.keys(byDate).sort().reverse();
  if(!added.length) html+='<div style="color:#ffab00;padding:8px">未解析出有效投注，请检查格式</div>';
  else {
    html+='<div style="padding:6px 8px;background:#16213e;border-radius:8px;margin-bottom:8px;font-size:11px;color:#888">核对 '+added.length+'笔 · 分盘分客统计</div>';
    datesSorted.forEach(function(dkey){
      var bd=byDate[dkey];
      var dayTotal=bd.hkList.length+bd.amList.length;
      var hkTotalBet=bd.hkList.reduce(function(a,b){return a+b.tb;},0);
      var amTotalBet=bd.amList.reduce(function(a,b){return a+b.tb;},0);
      html+='<div style="margin-bottom:10px;border:1px solid #2a2a4a;border-radius:10px;overflow:hidden">';
      html+='<div style="padding:8px 10px;background:#0f0f1a;display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;color:#ffab00">'+dkey+'</span><span style="font-size:11px;color:#888">'+dayTotal+'笔 香港'+hkTotalBet+' 澳门'+amTotalBet+'</span></div>';
      html+='<div style="display:flex;gap:8px;padding:8px;flex-wrap:wrap;background:#16213e">';
      function importBlock(label, bucket, list){
        var isHK=label==='香港';
        var borderColor=isHK?'#ffab00':'#00b894';
        var h='<div style="flex:1;min-width:260px;background:#0f0f1a;border:1.5px solid '+borderColor+';border-radius:10px;padding:8px">';
        h+='<div style="font-weight:700;color:'+borderColor+';font-size:12px;padding:4px 6px;background:'+(isHK?'#2a1a0a':'#0a2a1a')+';border-radius:6px;margin-bottom:6px">'+label+' <span style="font-weight:400;color:#888;font-size:10px">'+list.length+'笔</span></div>';
        if(!list.length){ h+='<div style="text-align:center;color:#555;padding:12px;font-size:11px">无'+label+'投注</div>'; h+='</div>'; return h; }
        var names=Object.keys(bucket).sort(function(a,b){return bucket[b].totalBet-bucket[a].totalBet;});
        names.forEach(function(name){
          var n=bucket[name];
          var profit=n.totalBet-n.totalPayout;
          h+='<div style="border:1px solid #2a2a4a;border-radius:8px;padding:6px;margin-bottom:6px;background:#1a1a2e">';
          h+='<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;color:#e94560;font-size:12px">'+name+'</span><span style="font-size:11px;padding:2px 6px;border-radius:10px;background:'+(profit>=0?'#1a3a2a':'#3a1a1a')+';color:'+(profit>=0?'#4caf50':'#ff5252')+'">'+(profit>=0?'庄赢':'庄亏')+' '+Math.abs(profit).toFixed(0)+'</span></div>';
          h+='<div style="font-size:10px;color:#888;margin-top:2px">投'+n.bets.length+'笔 '+n.totalBet+'元 · 中'+n.winCount+'笔 · 赔'+n.totalPayout.toFixed(0)+' · 反水'+n.bets.reduce(function(a,b){return a+b.cb;},0).toFixed(0)+'</div>';
          h+='<div style="margin-top:4px;border-top:1px dashed #2a2a4a;padding-top:4px">';
          n.bets.forEach(function(g){
            var col=g._win?'#4caf50':'#666';
            var st=g._win?'✓中 +'+g._payout.toFixed(0):'✗不中';
            h+='<div style="display:flex;justify-content:space-between;font-size:10px;padding:2px 0;color:'+col+'"><span>'+(TN[g.type]||g.type)+' ['+g.nums.join(',')+'] '+g.tb+'元</span><span>'+st+'</span></div>';
          });
          h+='</div></div>';
        });
        h+='</div>'; return h;
      }
      html+=importBlock('香港', bd.hk, bd.hkList);
      html+=importBlock('澳门', bd.am, bd.amList);
      html+='</div></div>';
    });
  }
  document.getElementById('import-result').innerHTML=html;
  // 同步刷新已结算对奖单
  try{renderImportSettled();}catch(e){}
  // 不自动入G，需手动确认可另加按钮
}
function renderImportSettled(){
  var el=document.getElementById('import-settled');
  if(!el) return;
  var settled=G.filter(function(g){return g.settled;});
  if(!settled.length){el.innerHTML='<div class="empty">暂无已结算数据，请先在结算页结算</div>';return;}
  var byDate={};
  settled.forEach(function(g){
    var dkey=g.date||today;
    if(!byDate[dkey]) byDate[dkey]={hk:{},am:{},hkList:[],amList:[]};
    var dk=g.draw==='am'?'am':'hk';
    var bucket=dk==='am'?byDate[dkey].am:byDate[dkey].hk;
    var list=dk==='am'?byDate[dkey].amList:byDate[dkey].hkList;
    if(!bucket[g.name]) bucket[g.name]={bets:[],totalBet:0,totalPayout:0,winCount:0};
    bucket[g.name].bets.push(g);
    bucket[g.name].totalBet+=g.tb;
    bucket[g.name].totalPayout+=g.result?g.result.payout:0;
    if(g.result&&g.result.win) bucket[g.name].winCount++;
    list.push(g);
  });
  var html='';
  var datesSorted=Object.keys(byDate).sort().reverse();
  datesSorted.forEach(function(dkey){
    var bd=byDate[dkey];
    var dayTotal=bd.hkList.length+bd.amList.length;
    var hkBet=bd.hkList.reduce(function(a,b){return a+b.tb;},0);
    var amBet=bd.amList.reduce(function(a,b){return a+b.tb;},0);
    var hkPay=bd.hkList.reduce(function(a,b){return a+(b.result?b.result.payout:0);},0);
    var amPay=bd.amList.reduce(function(a,b){return a+(b.result?b.result.payout:0);},0);
    html+='<div style="margin-bottom:10px;border:1px solid #2a2a4a;border-radius:10px;overflow:hidden">';
    html+='<div style="padding:8px 10px;background:#0f0f1a;display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;color:#ffab00">'+dkey+'</span><span style="font-size:11px;color:#888">'+dayTotal+'笔 香港'+hkBet+'→赔'+hkPay.toFixed(0)+' 澳门'+amBet+'→赔'+amPay.toFixed(0)+'</span></div>';
    html+='<div style="display:flex;gap:8px;padding:8px;flex-wrap:wrap;background:#16213e">';
    function settledBlock(label, bucket, list){
      var isHK=label==='香港';
      var borderColor=isHK?'#ffab00':'#00b894';
      var h='<div style="flex:1;min-width:260px;background:#0f0f1a;border:1.5px solid '+borderColor+';border-radius:10px;padding:8px">';
      h+='<div style="font-weight:700;color:'+borderColor+';font-size:12px;padding:4px 6px;background:'+(isHK?'#2a1a0a':'#0a2a1a')+';border-radius:6px;margin-bottom:6px">'+label+' <span style="font-weight:400;color:#888;font-size:10px">'+list.length+'笔</span></div>';
      if(!list.length){ h+='<div style="text-align:center;color:#555;padding:12px;font-size:11px">无'+label+'结算</div>'; h+='</div>'; return h; }
      var names=Object.keys(bucket).sort(function(a,b){return bucket[b].totalBet-bucket[a].totalBet;});
      names.forEach(function(name){
        var n=bucket[name];
        var profit=n.totalBet-n.totalPayout;
        h+='<div style="border:1px solid #2a2a4a;border-radius:8px;padding:6px;margin-bottom:6px;background:#1a1a2e">';
        h+='<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;color:#e94560;font-size:12px">'+name+'</span><span style="font-size:11px;padding:2px 6px;border-radius:10px;background:'+(profit>=0?'#1a3a2a':'#3a1a1a')+';color:'+(profit>=0?'#4caf50':'#ff5252')+'">'+(profit>=0?'庄赢':'庄亏')+' '+Math.abs(profit).toFixed(0)+'</span></div>';
        h+='<div style="font-size:10px;color:#888;margin-top:2px">投'+n.bets.length+'笔 '+n.totalBet+'元 · 中'+n.winCount+'笔 · 赔'+n.totalPayout.toFixed(0)+' · 盈亏 '+(profit>=0?'+':'-')+Math.abs(profit).toFixed(0)+'</div>';
        h+='<div style="margin-top:4px;border-top:1px dashed #2a2a4a;padding-top:4px">';
        n.bets.forEach(function(g){
          var st=g.result&&g.result.win?'<span style="color:#4caf50">✓中 +'+g.result.payout.toFixed(0)+'</span>':'<span style="color:#666">✗不中</span>';
          h+='<div style="display:flex;justify-content:space-between;font-size:10px;padding:2px 0;color:#aaa"><span>'+(TN[g.type]||g.type)+' ['+formatNums(g)+'] '+g.tb+'元</span><span>'+st+'</span></div>';
        });
        h+='</div></div>';
      });
      h+='</div>'; return h;
    }
    html+=settledBlock('香港', bd.hk, bd.hkList);
    html+=settledBlock('澳门', bd.am, bd.amList);
    html+='</div></div>';
  });
  el.innerHTML=html;
}
function calcUpper(){
  var ratio=parseFloat(document.getElementById('up-ratio').value)||50;
  var upRate=parseFloat(document.getElementById('up-rate').value)||0;
  var total=G.filter(function(g){return !g.settled;}).reduce(function(a,b){return a+b.tb;},0);
  var upTb=total*ratio/100;
  var keepTb=total-upTb;
  var upCb=upTb*upRate/100;
  var html='未结总额 '+total+'元<br>上报 '+upTb.toFixed(0)+'元 ('+ratio+'%)，上庄反水 '+upCb.toFixed(0)+'元<br>自留 '+keepTb.toFixed(0)+'元';
  document.getElementById('up-result').innerHTML=html;
  speak('上报'+upTb.toFixed(0)+' 自留'+keepTb.toFixed(0));
}
function pickColdHot(){
  var hist=hkHist.length?hkHist:amHist;
  if(!hist.length) return alert('暂无历史');
  var freq=new Array(50).fill(0);
  hist.slice(0,20).forEach(function(r){ r.nums.forEach(function(n){freq[n]++}); freq[r.sp]++; });
  var arr=[]; for(var i=1;i<=49;i++) arr.push({n:i,f:freq[i]});
  arr.sort(function(a,b){return a.f-b.f;});
  var cold=arr.slice(0,6).map(function(o){return o.n;});
  var hot=arr.slice(-6).map(function(o){return o.n;});
  document.getElementById('pick-result').innerHTML='冷6: '+cold.join(',')+'<br>热6: '+hot.join(',')+'<br>建议: 冷热各3平衡';
}
function pickFib(){
  var fib=[1,1,2,3,5,8,13,21,34];
  var nums=fib.map(function(n){ return ((n%49)+1); }).slice(0,6);
  document.getElementById('pick-result').innerHTML='斐波那契: '+nums.join(',')+' (取模49)';
}
function pickGann(){
  var c=25; var nums=[c];
  var step=2; for(var i=0;i<5;i++){ c+=step; nums.push(((c-1)%49)+1); step+=2; }
  document.getElementById('pick-result').innerHTML='江恩螺旋: '+nums.join(',');
}
function pickMagic(){
  var m=[[16,2,3,13],[5,11,10,8],[9,7,6,12],[4,14,15,1]];
  var nums=[]; m.forEach(function(row){ row.forEach(function(n){ if(nums.length<6) nums.push(n); }); });
  document.getElementById('pick-result').innerHTML='幻方4x4: '+nums.join(',');
}
function pickLuo(){
  var luo=[4,9,2,3,5,7,8,1,6];
  var nums=luo.slice(0,6).map(function(n){ return n*5%49+1; });
  document.getElementById('pick-result').innerHTML='洛书九宫: '+nums.join(',');
}
function pickChaos(){
  var nums=[]; var x=0.5; for(var i=0;i<6;i++){ x=3.9*x*(1-x); nums.push(Math.floor(x*49)+1); }
  document.getElementById('pick-result').innerHTML='混沌: '+nums.join(',');
}
function runMC(){
  var n=parseInt(document.getElementById('mc-n').value)||10000;
  var total=G.filter(function(g){return !g.settled;}).length;
  if(!total) return document.getElementById('mc-result').innerHTML='暂无未结投注';
  var win=0; for(var i=0;i<n;i++){ var r=Math.floor(Math.random()*49)+1; if(G.some(function(g){return g.nums.indexOf(r)>=0;})) win++; }
  var p=(win/n*100).toFixed(2);
  var ev=(win/n*10 -1).toFixed(3);
  document.getElementById('mc-result').innerHTML='模拟 '+n+' 次 命中 '+win+' ('+p+'%) EV '+ev;
}
function exportCloud(){
  var data={G:G, customers:customers, hkHist:hkHist, amHist:amHist};
  localStorage.setItem('cloudBackup', JSON.stringify(data));
  try{ navigator.clipboard.writeText(JSON.stringify(data)); }catch(e){}
  document.getElementById('cloud-status').innerHTML='已导出到本地云备份及剪贴板';
}
function importCloud(){
  var txt=prompt('粘贴云端JSON');
  if(!txt) return;
  try{
    var d=JSON.parse(txt);
    if(d.G) { G=d.G; save(); }
    if(d.customers) { customers=d.customers; saveC(); }
    if(d.hkHist) { hkHist=d.hkHist; localStorage.setItem('hkHist', JSON.stringify(hkHist)); }
    if(d.amHist) { amHist=d.amHist; localStorage.setItem('amHist', JSON.stringify(amHist)); }
    document.getElementById('cloud-status').innerHTML='已导入';
    renderRecords(); renderRisk();
  }catch(e){ alert('导入失败'); }
}
function exportFile(){
  var data=JSON.stringify({G:G, customers:customers}, null, 2);
  var blob=new Blob([data], {type:'application/json'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='lotto_'+today+'.json'; a.click();
}
function editAmount(id){
  var g=G.find(function(x){return x.id===id;});
  if(!g) return;
  var nv=prompt('修改金额（当前 '+g.bet+' * '+g.multi+' = '+g.tb+'元）', g.bet);
  if(nv===null) return;
  var v=parseFloat(nv);
  if(isNaN(v)||v<=0) return alert('金额无效');
  g.bet=v;
  g.tb=v*(g.multi||1);
  g.cb=g.tb*g.rate/100;
  save(); renderRecords(); if(typeof renderRisk==='function') renderRisk();
  toast('已改 '+g.bet+' ('+g.tb+'元)');
}
function addCustomer(){
  var name=document.getElementById('new-cust-name').value.trim();
  var rate=parseFloat(document.getElementById('new-cust-rate').value)||0.5;
  if(!name)return alert('请输入客户名称');
  for(var i=0;i<customers.length;i++){if(customers[i].name===name)return alert('客户已存在');}
  var odds={};
  Object.keys(O).forEach(function(k){odds[k]=O[k];});
  customers.push({name:name,rate:rate,odds:odds});
  saveC();
  document.getElementById('new-cust-name').value='';
  renderCustomerList();
  alert('客户 '+name+' 已添加');
}
function deleteCustomer(name){
  if(!confirm('确定删除客户 '+name+'？'))return;
  customers=customers.filter(function(c){return c.name!==name;});
  saveC();
  renderCustomerList();
}
function renderCustomerList(){
  var el=document.getElementById('cust-list');
  if(!customers.length){el.innerHTML='<div class="empty">暂无客户</div>';return;}
  var html='';
  customers.forEach(function(c){
    var betCount=G.filter(function(g){return g.name===c.name;}).length;
    html+='<div class="li"><div class="lh"><span class="ln">'+c.name+'</span><div><button class="btn bd" onclick="editCustomerOdds(\''+c.name+'\')">赔率</button> <button class="btn bd" onclick="deleteCustomer(\''+c.name+'\')">删</button></div></div>';
    html+='<div class="ld">反水：'+c.rate+'% | 投注：'+betCount+'笔</div></div>';
  });
  el.innerHTML=html;
}
function editCustomerOdds(name){
  var c=null;
  for(var i=0;i<customers.length;i++){if(customers[i].name===name){c=customers[i];break;}}
  if(!c)return;
  var html='<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:999;overflow-y:auto;padding:20px" id="odds-modal">';
  html+='<div class="cd"><div class="ct">编辑 '+name+' 赔率</div>';
  html+='<div class="fg" style="margin-bottom:12px"><label>反水%</label><input type="number" id="modal-rate" value="'+c.rate+'" step="0.1" style="width:100%;padding:12px;background:#0f0f1a;border:1px solid #2a2a4a;border-radius:10px;color:#fff;font-size:14px"></div>';
  Object.keys(O).forEach(function(k){
    var val=c.odds&&c.odds[k]!==undefined?c.odds[k]:O[k];
    html+='<div class="fr" style="margin-bottom:6px"><div class="fg" style="flex:2;font-size:12px;padding-top:12px">'+TN[k]+'</div><div class="fg"><input type="number" id="odds-'+k+'" value="'+val+'" step="0.1" style="width:100%;padding:8px;background:#0f0f1a;border:1px solid #2a2a4a;border-radius:8px;color:#fff;font-size:13px"></div></div>';
  });
  html+='<button class="btn ba" onclick="saveCustomerOdds(\''+name+'\')">保存</button>';
  html+='<button class="btn bt" onclick="document.getElementById(\'odds-modal\').remove()">取消</button>';
  html+='</div></div>';
  document.body.insertAdjacentHTML('beforeend',html);
}
function saveCustomerOdds(name){
  var c=null;
  for(var i=0;i<customers.length;i++){if(customers[i].name===name){c=customers[i];break;}}
  if(!c)return;
  c.rate=parseFloat(document.getElementById('modal-rate').value)||0.5;
  if(!c.odds)c.odds={};
  Object.keys(O).forEach(function(k){
    var el=document.getElementById('odds-'+k);
    if(el)c.odds[k]=parseFloat(el.value)||O[k];
  });
  saveC();
  document.getElementById('odds-modal').remove();
  renderCustomerList();
  alert(name+' 赔率已更新');
}
function onCustChange(){
  var name=document.getElementById('c-name-sel').value;
  if(!name)return;
  var rate=getCustomerRate(name);
  document.getElementById('c-rate').value=rate;
  uo();
}
var TYPE_MAP={
  '香港特':'tema','新奥特':'tema','澳特':'tema','澳门特':'tema','门特码':'tema','澳':'tema','新奥':'tema','门特':'tema','香特码':'tema','香特':'tema','香港':'tema',
  '特马':'tema','特码':'tema','特':'tema','tm':'tema',
  '猪平特':'zx','猴平特':'zx','羊平特':'zx','鸡平特':'zx','虎平特':'zx','龙平特':'zx','兔平特':'zx','蛇平特':'zx','狗平特':'zx','鼠平特':'zx','牛平特':'zx','马平特':'zx',
  '平特一肖':'zx','平特':'zx','平肖':'zx','中肖':'zx','中生肖':'zx','1号中肖':'zx1',
  '特肖':'tx','特生肖':'tx','1号特肖':'tx1',
  '2有':'eryou','二有':'eryou','2友':'eryou','二友':'eryou','3有':'sanyou','三有':'sanyou','3友':'sanyou','三友':'sanyou','4有':'siyou','四有':'siyou','4友':'siyou','四友':'siyou','5有':'wuyou','五有':'wuyou','5友':'wuyou','五友':'wuyou','特托':'tetuo',
  '二中二':'e2','2中2':'e2','三中二':'s2','3中2':'s2','三中三':'s3','3中3':'s3','四中四':'s4','4中4':'s4',
  '三肖中特':'s3x','3肖中特':'s3x','四肖中特':'s4x','4肖中特':'s4x','五肖中特':'s5x','5肖中特':'s5x','六肖中特':'s6x','6肖中特':'s6x',
  '红波':'hong','红':'hong','红波色':'hong','绿波':'lv','绿':'lv','绿波色':'lv','蓝波':'lan','蓝':'lan','蓝波色':'lan',
  '包大小':'bdx','大小':'bdx','大':'bdx','包单双':'bds','单双':'bds','单':'bds','双':'bds',
  '0尾':'w0','尾数':'w1','2尾碰':'w2p','二尾碰':'w2p','3尾碰':'w3p','三尾碰':'w3p','四尾碰':'w4p',
  '五不中':'b5','5不中':'b5','六不中':'b6','6不中':'b6','七不中':'b7','7不中':'b7','八不中':'b8','8不中':'b8','九不中':'b9','9不中':'b9','十不中':'b10','10不中':'b10','十一不中':'b11','十二不中':'b12','十三不中':'b13','十四不中':'b14','十五不中':'b15','十六不中':'b16',
  '波色大小单双':'bsdx',
  '特妈':'tema','特碼':'tema','生宵':'zx','生霄':'zx','平恃':'zx','中恃':'zx','特牽':'tx','肖复试':'s3x','肖复式':'s3x'
};
var ZODIAC_MAP={'鼠':0,'牛':1,'虎':2,'兔':3,'龙':4,'蛇':5,'马':6,'羊':7,'猴':8,'鸡':9,'狗':10,'猪':11};
function parseBatchText(text,options){
  options=options||{};
  if(__batchPendingPreviewId!==null)discardBatchPreview(true);
  var curBatch=__batchSeed++;
  var parseSource=options.source||'manual';
  var mDate=text.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  var useDate=today;
  if(mDate){ useDate=mDate[1]+'-'+String(mDate[2]).padStart(2,'0')+'-'+String(mDate[3]).padStart(2,'0'); }
  var name=document.getElementById('c-name-sel').value||document.getElementById('c-name-input').value.trim();
  if(!name){
    if(customers.some(function(c){return c.name==='琴';})) name='琴';
    else if(customers.length) name=customers[0].name;
    else return alert('请先选择客户');
  }
  var rate=parseFloat(document.getElementById('c-rate').value)||0;
  // === 全角→半角及符号归一化 ===
  text=text.replace(/[０-９]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-65248);});
  text=text.replace(/[Ａ-Ｚ]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-65248);});
  text=text.replace(/[ａ-ｚ]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-65248);});
  text=text.replace(/，/g,',').replace(/、/g,',').replace(/；/g,';').replace(/：/g,':').replace(/！/g,'!').replace(/？/g,'?');
  text=text.replace(/（/g,'(').replace(/）/g,')').replace(/【/g,'[').replace(/】/g,']').replace(/《/g,'<').replace(/》/g,'>').replace(/“/g,'"').replace(/”/g,'"').replace(/‘/g,"'").replace(/’/g,"'");
  text=text.replace(/～/g,'~').replace(/—/g,'-').replace(/－/g,'-').replace(/／/g,'/').replace(/＼/g,'\\').replace(/＝/g,'=').replace(/＋/g,'+').replace(/＊/g,'*').replace(/＃/g,'#').replace(/％/g,'%').replace(/＆/g,'&').replace(/｜/g,'|').replace(/　/g,' ');
  text=text.replace(/块钱/g,'块').replace(/米米/g,'米');
  // 常见 OCR 误读与省略金额格式归一化。
  text=text.replace(/[危韦]/g,'兔').replace(/特肖一肖/g,'特肖').replace(/平特一肖/g,'平特一肖');
  text=text.replace(/([0-9]{1,2})尾\s*([0-9]+)(?=[澳门香港，,。\s]|$)/g,function(match,tail,amount,offset,source){
    // “平特0尾100”是平特单注；只有明确写“各”才逐号下注。
    var prefix=source.slice(Math.max(0,offset-4),offset);
    return /平特$/.test(prefix) ? match : tail+'尾各'+amount;
  });
  text=text.replace(/澳彩(?:六合彩)?特码/g,'澳门特码').replace(/澳彩特(?!肖)/g,'澳门特码');
  text=text.replace(/奥特/g,'澳门特码');
  text=text.replace(/奥(?=(?:二中二|三中二|三中三|四中四|五不中|六不中))/g,'澳');
  text=text.replace(/奥门/g,'澳门');
  text=text.replace(/免(?=[各每\d])/g,'兔');
  text=text.replace(/([鼠牛虎兔龙蛇马羊猴鸡狗猪])中(?=\d|各|每)/g,'中肖$1');
  text=text.replace(/奥(?=[鼠牛虎兔龙蛇马羊猴鸡狗猪])/g,'奥特');
  // 玩法与生肖之间的点号只是排版，不是分隔订单。
  text=text.replace(/(特肖|特生肖|平特一肖|平特|中肖|中生肖)[\s,.、，]+(?=[鼠牛虎兔龙蛇马羊猴鸡狗猪])/g,'$1');
  text=text.replace(/((?:特肖|特生肖|平特一肖|平特|中肖|中生肖)[鼠牛虎兔龙蛇马羊猴鸡狗猪])\s*[,，]\s*(\d+(?:元|块|米)?)/g,'$1$2');
  // 同一行连续写多个特肖/平特生肖时，给后续生肖补回玩法。
  text=text.replace(/(特肖|特生肖|平特一肖|平特|中肖|中生肖)([鼠牛虎兔龙蛇马羊猴鸡狗猪])(\d+)[,.、，]+([鼠牛虎兔龙蛇马羊猴鸡狗猪])(\d+)/g,'$1$2$3,$1$4$5');
  text=text.replace(/(特肖|特生肖|平特一肖|平特|中肖|中生肖)([鼠牛虎兔龙蛇马羊猴鸡狗猪])(\d+)[,.、，]+([鼠牛虎兔龙蛇马羊猴鸡狗猪])(?=\D|$)/g,'$1$2$3,$1$4');
  // “各买五块钱一个号码”是聊天中常见的逐号金额写法。
  var cnDigitAmount={'零':'0','〇':'0','一':'1','二':'2','两':'2','三':'3','四':'4','五':'5','六':'6','七':'7','八':'8','九':'9','十':'10','二十':'20','三十':'30','四十':'40','五十':'50','六十':'60','七十':'70','八十':'80','九十':'90','一百':'100','二百':'200','三百':'300'};
  text=text.replace(/各\s*买\s*([零〇一二两三四五六七八九十\d]+)\s*(?:块|元|米)\s*钱?\s*一个(?:号码)?/g,function(m,n){return '各'+(cnDigitAmount[n]||n);});
  text=text.replace(/各\s*买\s*([零〇一二两三四五六七八九十\d]+)(?=[\s,，。；;]|$)/g,function(m,n){return '各'+(cnDigitAmount[n]||n);});
  // “10号特码10元”表示10号的特码单注，不是两个普通数字。
  text=text.replace(/(\d{1,2})\s*号\s*特码\s*(\d+(?:\.\d+)?)\s*(?:元|块|米)?/g,'$1号$2元');
  text=text.replace(/买\s*([零〇一二两三四五六七八九十\d]+)\s*(?:块|元|米)\s*钱?\s*一个(?:号码)?/g,function(m,n){return '各'+(cnDigitAmount[n]||n);});
  text=text.replace(/各\s*([零〇一二两三四五六七八九十\d]+)\s*(?:块|元|米)\s*一个(?:号码)?/g,function(m,n){return '各'+(cnDigitAmount[n]||n);});
  text=text.replace(/各\s*十\s*(?:块|元|米)(?=[澳门香港，,。\s]|$)/g,'各10');
  text=text.replace(/([鼠牛虎兔龙蛇马羊猴鸡狗猪]+)\s*各[号码]\s*([零〇一二两三四五六七八九十百千\d]+)/g,function(m,z,a){return z+'各'+(cnDigitAmount[a]||a);});
  text=text.replace(/([鼠牛虎兔龙蛇马羊猴鸡狗猪]+)\s*各\s*([零〇一二两三四五六七八九十百千\d]+)\s*(?=元|块|米|$)/g,function(m,z,a){return z+'各'+(cnDigitAmount[a]||a);});
  text=text.replace(/(三有|3有|三友|3友)([^；;\n]+?)[，,]\s*羊\s*五十(?=澳门|香港|$)/g,'$1$2,羊各50');
  text=text.replace(/·/g,'.').replace(/•/g,'.').replace(/…/g,'.');
  text=text.replace(/→|⇒|→/g,'=');
  // OCR 常把“拖/组”识别成扡、拽等字，作为分组边界保留。
  text=text.replace(/[扡拽拦]/g,'§');
  text=text.replace(/🐭|🐹/g,'鼠').replace(/🐮|🐂|🐃/g,'牛').replace(/🐯|🐅/g,'虎').replace(/🐰|🐇/g,'兔').replace(/🐲|🐉/g,'龙').replace(/🐍/g,'蛇').replace(/🐴|🐎/g,'马').replace(/🐑|🐐|🐏/g,'羊').replace(/🐒|🐵/g,'猴').replace(/🐔|🐓|🐤|🐥/g,'鸡').replace(/🐶|🐕/g,'狗').replace(/🐷|🐖|🐽/g,'猪');
  text=text.replace(/\s*老板|帮我下|麻烦|辛苦|谢谢|在吗|收到|确认|核对|合计|总计|共计|老板\s*/g,' ');
  text=text.replace(/[★☆●○■□◆◇♯♮]/g,'\n');
  text=text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,' ');
  // 去除常见聊天前缀 [时间] 昵称: 需括号避免误删 10:180 这类投注
  text=text.replace(/^\s*\[\d{1,2}[:：]\d{1,2}\]\s*[^\n]*[:：]\s*/gm,'');
  text=text.replace(/^\s*\d{4}[-/]\d{1,2}[-/]\d{1,2}\s+\d{1,2}[:：]\d{1,2}[^\n]*\n/gm,'');
  // === 157088式预处理 ===
  text=expandRange(text);       // 13++24+40 => 13,14,...,24各40
  text=expandStarTotal(text);   // 单2000* => 各号码均分
  // 空格号：=号后金额被空格拆开（1 0 0=>100）——先处理，避免被下面的号码合并抢先
  text=text.replace(/=\s*([0-9]) ([0-9]) ([0-9])/g,function(x,a,b,c){return '='+a+b+c;});
  text=text.replace(/=\s*([0-9]) ([0-9])/g,function(x,a,b){return '='+a+b;});
  // 空格号：号码被空格拆开的"个位 个位"（0 5=>05、4 5=>45、1 0=>10、2 6=>26），前后非数字
  text=text.replace(/(?<![0-9])([0-9]) ([0-9])(?![0-9])/g,function(x,a,b){var v=parseInt(a+b);return (v>=1&&v<=49)?String(v):x;});
  // 行尾逗号+换行 => 合并成逗号（如 "1 6，\n1 0，" 同属一条消息）
  text=text.replace(/，\s*\n/g,'，');
  // 数字间多余空格+点号清理（如 "01  .17" => "01.17"）
  text=text.replace(/(\d)\s+\.(?=\d)/g,'$1.');
  text=text.replace(/(\d)\.(?=\s+\d)/g,'$1.');
  text=text.replace(/(\d)\s*\.\s*\n\s*(?=\d)/g,'$1.');
  text=text.replace(/\.\s*\n\s*(?=\d)/g,'.');
  // 生肖间的双空格归并为单空格（避免"特 龙  蛇"被拆成两段，龙丢失）
  text=text.replace(/([鼠牛虎兔龙蛇马羊猴鸡狗猪特香澳新门])\s{2,}([鼠牛虎兔龙蛇马羊猴鸡狗猪特香澳新门])/g,'$1 $2');
  text=text.replace(/(\d)\s{2,}(?=\d)/g,'$1 ');
  text=text.replace(/\s{2,}/g,'\n');
  text=text.replace(/(新奥门|澳门|香港|澳特|门特|香特码|新奥|澳|门)([，,])/g,'$1');
  text=text.replace(/。/g,',');
  // 157088式：// 分隔多组
  text=text.replace(/\/{2}/g,'\n');
  text=text.replace(/井/g,'\n');
  text=text.replace(/\/\s*(?=各|每)/g,' ');
  // 批量分组展开：单200 => 1,3,5,...,49各200
  text=expandBatchGroups(text);
  // 更多乱码格式兼容
  text=text.replace(/[！!？?；;。]/g,function(c){return c==='！'||c==='!'?',':c==='？'||c==='?'?',':c==='；'||c===';'?',':c==='。'?'\n':c;});
  // 各/每个前的逗号合并（"蛇，兔各500" => "蛇兔各500"，一笔而非两笔）
  text=text.replace(/([鼠牛虎兔龙蛇马羊猴鸡狗猪])\s*[，,]\s*([鼠牛虎兔龙蛇马羊猴鸡狗猪])/g,'$1$2');
  text=text.replace(/(\d)\s*\+\s*(\d{2,})\s*(?:元|块|米)?/g,'$1=$2');
  text=text.replace(/(?<!\d)(\d{1,2})\s*\+\s*(\d{1,4})(?!\s*\+)/g,'$1=$2');
  text=text.replace(/[;；|｜#＃*★☆●○■□◆◇~～]+/g,'\n');
  var rawSegs=text.split(/[\n;#]+/);
  var mergedSegs=[];
  rawSegs.forEach(function(seg){
    seg=seg.trim();
    if(!seg)return;
    if(mergedSegs.length>0){
      var prev=mergedSegs[mergedSegs.length-1];
      var lastC=prev.charAt(prev.length-1);
      var firstC=seg.charAt(0);
      var zodRe=/鼠|牛|虎|兔|龙|蛇|马|羊|猴|鸡|狗|猪|特|香|澳|新|门/;
      var amountOnly=/^(?:\d+(?:\.\d+)?\s*(?:元|块|米)?|[零〇一二两三四五六七八九十百千]+(?:元|块|米)?)$/;
      if(zodRe.test(lastC) && zodRe.test(firstC) && !/[\d=各每买元块米十百千澳门香港特]/.test(prev) && /\d/.test(seg)){
        mergedSegs[mergedSegs.length-1]=prev+' '+seg;
        return;
      }
      if(amountOnly.test(seg) && /(?:特肖|特生肖|平特一肖|平特|中肖|中生肖|特码|特|鸡|牛|蛇|马|兔|龙|鼠|猴|狗|猪)$/.test(prev)){
        mergedSegs[mergedSegs.length-1]=prev+' '+seg;
        return;
      }
      // 微信里“号码/生肖”和“各10、各数25”经常被换行拆开，必须回接到上一段。
      if(/^(?:各|每个|每号|每码|各数|各号)\s*\d+(?:元|块|米)?$/.test(seg)
        && /(?:\d|鼠|牛|虎|兔|龙|蛇|马|羊|猴|鸡|狗|猪)$/.test(prev)
        && !/(?:各|每个|每号|每码|各数|各号)\s*\d+(?:元|块|米)?$/.test(prev)){
        mergedSegs[mergedSegs.length-1]=prev+' '+seg.replace(/^各数|^各号/,'各');
        return;
      }
      if(/^(?:奥|澳|澳门|香港)?(?:二中二|三中二|三中三|四中四|4中4|3中3|2中2)(?:包特)?$/.test(prev)
        && /\d/.test(seg)){
        mergedSegs[mergedSegs.length-1]=prev+seg;
        return;
      }
    }
    mergedSegs.push(seg);
  });
  var count=0;
  var fail=[];
  var lastType=null;
  var _dbgSegs=[];
  var curDraw='hk';
  mergedSegs.forEach(function(seg){
    var _dbgBefore=G.length;
    if(seg.indexOf('年')>=0 || seg.indexOf('月')>=0 || seg.indexOf('日')>=0) return;
    if(seg.trim()==='琴' || seg.trim()==='特' || seg.trim().length<=1) return;
    seg=seg.trim();
    if(!seg) return;
    if(/^\d{1,2}$/.test(seg) || /^(今晚澳门特码|今晚前码|特码|澳门|澳|香港|新奥门|门特|澳特|奥二中二包特)$/.test(seg)){
      if(seg.indexOf('澳门')>=0||seg.indexOf('新奥')>=0||seg.indexOf('澳特')>=0||seg.indexOf('门特')>=0||seg.indexOf('新奥门')>=0) curDraw='am';
      else if(seg.indexOf('香港')>=0) curDraw='hk';
      else if(seg.indexOf('澳')>=0) curDraw='am';
      return;
    }
    if(!/\d/.test(seg) && /^(特(?:就是|是)?特码?|澳彩(?:六合彩)?特码(?:就是.*)?|澳门特码(?:就是.*)?|澳门平特一肖)$/.test(seg)) return;
    if(!/\d/.test(seg) && /^(?:四有|三有|二有|五有|各数|各号|各10|各\d+|奥特|香港特|特码|特肖|特肖和特码赔率不一样).*(?:就是|表示|指|买|每个|号码|赔率|算中)/.test(seg)) return;
    if(/^(?:\[图片\]|图片[_：:\s]|.*\.(?:dat|jpg|jpeg|png))/.test(seg.trim())) return;
    if(/^(?:\d+(?:\.\d+)?\s*(?:元|块|米)|(?:合计|总计|共计|共)\s*\d+|图片|粘贴的图像|[\[\]()._\-\s]+)$/.test(seg)) return;
    var segDraw;
    var hasAm = seg.indexOf('澳门')>=0||seg.indexOf('新奥')>=0||seg.indexOf('新奥门')>=0||seg.indexOf('澳特')>=0||seg.indexOf('门特')>=0||(seg.indexOf('澳')>=0&&seg.indexOf('香港')<0);
    var hasHk = seg.indexOf('香港')>=0;
    if(hasAm && !hasHk){ segDraw='am'; curDraw='am'; }
    else if(hasHk && !hasAm){ segDraw='hk'; curDraw='hk'; }
    else if(hasAm && hasHk){ segDraw=curDraw; }
    else { segDraw=curDraw; }
    var segCore = seg.replace(/^(?:澳门|新澳门|新奥门|香港|澳特|门特|澳|新奥)\s*/,'').trim();
    if(!segCore) segCore=seg;
    // “复3中3复式二中二每组10”：同一号码池同时下注两种复式玩法。
    var mixedM=seg.match(/复(?:3|三)中(?:3|三).*?复式(?:二中二|2中2).*?(?:各|每组)\s*(\d+)/);
    if(mixedM){
      var mixedSource=seg.replace(/复(?:3|三)中(?:3|三).*?复式(?:二中二|2中2)/,'').replace(/(?:各|每组)\s*\d+.*$/,'');
      var mixedNums=(mixedSource.match(/\d{1,2}/g)||[]).filter(function(n){return parseInt(n,10)>=1&&parseInt(n,10)<=49;}).map(Number);
      mixedNums=mixedNums.filter(function(n,i,a){return a.indexOf(n)===i;});
      var mixedAmt=parseInt(mixedM[1],10),mixedTypes=[{type:'s3',size:3},{type:'e2',size:2}];
      mixedTypes.forEach(function(mt){
        combinations(mixedNums,mt.size).forEach(function(pair){
          var co=getCustomerOdds(name,mt.type),tb2=mixedAmt,cb2=tb2*rate/100;
          G.push({id:nid(),batchId:curBatch,name:name,type:mt.type,nums:pair,bet:mixedAmt,multi:1,odds:co,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
          count++;
        });
      });
      var mixedNew=G.length-_dbgBefore;
      if(mixedNew>0)_dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,60),cnt:mixedNew,tot:mixedNew*mixedAmt,start:_dbgBefore});
      return;
    }
    if(seg.indexOf('二中二')>=0 || seg.indexOf('2中2')>=0){
      // Skip 复试二中二+拖 groups like 复试二中二 龙拖蛇蛇拖虎各50 → handled by fushiZDragM
      var _isE2DragGroup=seg.indexOf('复试')>=0 && /[鼠牛虎兔龙蛇马羊猴鸡狗猪]拖[鼠牛虎兔龙蛇马羊猴鸡狗猪]/.test(seg) && /[鼠牛虎兔龙蛇马羊猴鸡狗猪][鼠牛虎兔龙蛇马羊猴鸡狗猪]/.test(seg);
      if(!_isE2DragGroup){
      var cnAmt=function(cn){var map={'零':0,'一':1,'二':2,'两':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,'百':100,'千':1000};var r=0,t=0;for(var ci=0;ci<cn.length;ci++){var ch=cn[ci];if(ch==='十'){t=t||1;r+=t*10;t=0;}else if(ch==='百'){t=t||1;r+=t*100;t=0;}else if(ch==='千'){t=t||1;r+=t*1000;t=0;}else{t=map[ch]||0;}}r+=t;return r;};
      var e2m=seg.match(/各\s*(\d+)/)||seg.match(/各\s*([零一二三四五六七八九十百千]+)\s*元?/)||seg.match(/每组\s*([零一二三四五六七八九十百千]+)\s*(?:元|块|米)?/)||seg.match(/([零一二三四五六七八九十百千]+)\s*元\s*一组/)||seg.match(/(\d+)\s*元\s*一组/)||seg.match(/=\s*(\d+)/);
      if(e2m){
        var e2amt=/^\d+$/.test(e2m[1])?parseInt(e2m[1]):cnAmt(e2m[1]);
        // 先把「28，一19」这种数字+逗号+一字+数字 规范成 28-19，避免被 . 拆分
        seg=seg.replace(/(\d{1,2})\s*[，,、。\s]+\s*[一]\s*(\d{1,2})/g,'$1-$2');
        var e2text=seg.replace(/一/g,'-');
        var zodiacGroups={
          poultry:['牛','马','羊','鸡','狗','猪'],
          beast:['鼠','虎','兔','龙','蛇','猴'],
          front:['鼠','牛','虎','兔','龙','蛇'],
          back:['马','羊','猴','鸡','狗','猪']
        };
        var tripleGroups=[['猴','鼠','龙'],['蛇','鸡','牛'],['虎','马','狗'],['猪','兔','羊']];
        var sixPairs=[['鼠','牛'],['虎','猪'],['兔','狗'],['龙','鸡'],['蛇','猴'],['马','羊']];
        var classM=e2text.match(/([鼠牛虎兔龙蛇马羊猴鸡狗猪])\s*拖\s*(全盘|全部|11肖|家禽|野兽|前肖|前六肖|后肖|后六肖|三合|六合)/);
        if(classM){
          var anchor=classM[1], targets=[];
          if(classM[2]==='全盘'||classM[2]==='全部'||classM[2]==='11肖'){
            targets=['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
          }else if(classM[2]==='家禽') targets=zodiacGroups.poultry;
          else if(classM[2]==='野兽') targets=zodiacGroups.beast;
          else if(classM[2]==='前肖'||classM[2]==='前六肖') targets=zodiacGroups.front;
          else if(classM[2]==='后肖'||classM[2]==='后六肖') targets=zodiacGroups.back;
          else if(classM[2]==='三合'){
            tripleGroups.forEach(function(group){
              if(group.indexOf(anchor)>=0) targets=group;
            });
          }else if(classM[2]==='六合'){
            sixPairs.forEach(function(pair){
              if(pair.indexOf(anchor)>=0) targets=pair;
            });
          }
          targets.filter(function(z){return z!==anchor;}).forEach(function(target){
            var a1=SX[ZODIAC_MAP[anchor]], a2=SX[ZODIAC_MAP[target]];
            a1.forEach(function(n1){ a2.forEach(function(n2){
              G.push({id:nid(),batchId:curBatch,name:name,type:'e2',nums:[n1,n2],bet:e2amt,multi:1,odds:O.e2,rate:rate,tb:e2amt,cb:e2amt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
              count++;
            });});
          });
          return;
        }
        var dragRe=/(?:包特\s*)?([鼠牛虎兔龙蛇马羊猴鸡狗猪])\s*拖\s*([鼠牛虎兔龙蛇马羊猴鸡狗猪])/g;
        var dragM,hasDrag=false;
        while((dragM=dragRe.exec(e2text))!==null){
          hasDrag=true;
          var z1=ZODIAC_MAP[dragM[1]], z2=ZODIAC_MAP[dragM[2]];
          // 两个生肖各展开为号码，两两组合成二中二（4×4=16组）
          var a1=SX[z1], a2=SX[z2];
          a1.forEach(function(n1){ a2.forEach(function(n2){
            G.push({id:nid(),batchId:curBatch,name:name,type:'e2',nums:[n1,n2],bet:e2amt,multi:1,odds:O.e2,rate:rate,tb:e2amt,cb:e2amt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
            count++;
          });});
        }
        if(hasDrag) return;
        var e2pairs=(e2text.match(/(\d+)\s*[，,]?\s*[-]\s*(\d+)/g)||[]);
        if(e2pairs.length>0){
          var _rep=1;var _rm2=seg.match(/([二三四五六七八九十])组/);if(_rm2){"二三四五六七八九十".indexOf(_rm2[1])>=0&&(_rep="二三四五六七八九十".indexOf(_rm2[1])+2);}
          e2pairs.forEach(function(pair){
            var pm=pair.match(/(\d+)\s*[，,]?\s*[-]\s*(\d+)/);
            if(pm){
              var n1=parseInt(pm[1]),n2=parseInt(pm[2]);
              if(n1>=1&&n1<=49&&n2>=1&&n2<=49){
                for(var _ri=0;_ri<_rep;_ri++){G.push({id:nid(),batchId:curBatch,name:name,type:'e2',nums:[n1,n2],bet:e2amt,multi:1,odds:O.e2,rate:rate,tb:e2amt,cb:e2amt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});count++;}
              }
            }
          });
          return;
        }
      }
      } // end !_isE2DragGroup
    }
    // 复试三中三/四中四 多组逗号拖拽: 复试三中三 牛拖蛇,蛇拖虎各100 → 每组独立C(N,3)
    // Also handles half-width comma case after L1190 removes commas: 牛拖蛇蛇拖虎
    // Must run BEFORE zDragM to intercept merged drag groups
    var fushiZDragM=segCore.match(/^(?:复试|复式)?(二中二|2中2|三中三|3中3|四中四|4中4)[：:]?\s*(.+?)(?:各|每组|每个)\s*(\d+)/);
    if(fushiZDragM && /[鼠牛虎兔龙蛇马羊猴鸡狗猪]拖[鼠牛虎兔龙蛇马羊猴鸡狗猪]/.test(fushiZDragM[2])
      && /[鼠牛虎兔龙蛇马羊猴鸡狗猪][鼠牛虎兔龙蛇马羊猴鸡狗猪]/.test(fushiZDragM[2])){
      var _fzPairs=[];var _dragRe=/([鼠牛虎兔龙蛇马羊猴鸡狗猪])拖([鼠牛虎兔龙蛇马羊猴鸡狗猪])/g;var _dm;
      while((_dm=_dragRe.exec(fushiZDragM[2]))!==null){_fzPairs.push([_dm[1],_dm[2]]);}
      if(_fzPairs.length>=2){
        var _fzRaw=fushiZDragM[1];
        var _fzCode;
        if(_fzRaw.indexOf('二中二')>=0||_fzRaw.indexOf('2中2')>=0) _fzCode='e2';
        else if(_fzRaw.indexOf('四中四')>=0||_fzRaw.indexOf('4中4')>=0) _fzCode='s4';
        else _fzCode='s3';
        var _fzNeed=_fzCode==='s4'?4:_fzCode==='s3'?3:2;
        var _fzAmt=parseInt(fushiZDragM[3]);
        var _fzOdds=getCustomerOdds(name,_fzCode);
        _fzPairs.forEach(function(pair){
          var _fzPool=[],_fzSeen={};
          pair.forEach(function(c){SX[ZODIAC_MAP[c]].forEach(function(n){if(!_fzSeen[n]){_fzSeen[n]=true;_fzPool.push(n);}});});
          if(_fzPool.length>=_fzNeed){
            var _picks=combinations(_fzPool,_fzNeed);
            _picks.forEach(function(pick){var tb2=_fzAmt,cb2=tb2*rate/100;G.push({id:nid(),batchId:curBatch,name:name,type:_fzCode,nums:pick,bet:_fzAmt,multi:1,odds:_fzOdds,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});count++;});
          }
        });
        var _fzNew=G.length-_dbgBefore;if(_fzNew>0){var _fzTot=0;for(var _fzi=G.length-_fzNew;_fzi<G.length;_fzi++)_fzTot+=G[_fzi].tb;_dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:_fzNew,tot:_fzTot,start:G.length-_fzNew});}
        return;
      }
    }
    // 「连肖」/「X连」：如 5连130、五连肖虎兔猴马牛100、猪羊蛇鸡龙5连
    var lianM=seg.match(/((?:[\u4e00-\u9fa5]+?))(?:[\d一二三四五六七八九十百]+)?连肖[^\d]*(\d+)|([\u4e00-\u9fa5]+?)\s*\d+连[^\d]*(\d+)/);
    if(lianM){
      var lianSrc=lianM[1]||lianM[3];
      var lianN=lianM[2]||lianM[4];
      var lianZods=[...lianSrc].filter(function(c){return ZODIAC_MAP[c]!==undefined;}).map(function(c){return ZODIAC_MAP[c];});
      if(lianZods.length>0){
        var lianAmt=parseInt(lianN);
        var lc=getCustomerOdds(name,'sanyou');
        G.push({id:nid(),batchId:curBatch,name:name,type:'sanyou',nums:lianZods,bet:lianAmt,multi:1,odds:lc,rate:rate,tb:lianAmt,cb:lianAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
        count++;
        return;
      }
    }
    // 三中三/四中四 生肖拖拽: 三中三 蛇拖虎拖牛各10 → 4x4x4=64组
    var zDragM=segCore.match(/^(?:复试|复式)?(?:三中三|3中3|四中四|4中4|二中二|2中2)[：:]?\s*([鼠牛虎兔龙蛇马羊猴鸡狗猪](?:[拖\s]*[鼠牛虎兔龙蛇马羊猴鸡狗猪])+)[各每]\s*(\d+)/);
    if(zDragM){
      var _zdType=zDragM[0].replace(/[：:][\s\S]*$/,'');
      var _zdTypeCode=(_zdType.indexOf('四中四')>=0||_zdType.indexOf('4中4')>=0)?'s4':(_zdType.indexOf('三中三')>=0||_zdType.indexOf('3中3')>=0)?'s3':'e2';
      var _zdZods=[...zDragM[1]].filter(function(c){return ZODIAC_MAP[c]!==undefined;}).map(function(c){return SX[ZODIAC_MAP[c]];});
      var _zdAmt=parseInt(zDragM[2]);
      var _zdCombos=[[]];
      _zdZods.forEach(function(zNums){
        var _new=[];
        _zdCombos.forEach(function(combo){
          zNums.forEach(function(n){ _new.push(combo.concat([n])); });
        });
        _zdCombos=_new;
      });
      var _zdOdds=getCustomerOdds(name,_zdTypeCode);
      _zdCombos.forEach(function(combo){
        G.push({id:nid(),batchId:curBatch,name:name,type:_zdTypeCode,nums:combo,bet:_zdAmt,multi:1,odds:_zdOdds,rate:rate,tb:_zdAmt,cb:_zdAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
        count++;
      });
      _dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:_zdCombos.length,tot:_zdAmt*_zdCombos.length,start:G.length-_zdCombos.length});
      return;
    }
    // 「有/友」型组注：三友/3友 等，按、分隔的每组算一注（组内生肖不拆）
    // 预处理：生肖-生肖-生肖复试X友 各N → X友 生肖生肖生肖 各N
    var _hasFushi=segCore.indexOf('复试')>=0;
    var frontZodM=segCore.match(/^([鼠牛虎兔龙蛇马羊猴鸡狗猪\-\s，、]+?)复试\s*(\d*[友有中肖])\s*(?:各|每个|／|每)\s*(\d+)/);
    if(frontZodM){
      var fzZods=frontZodM[1].replace(/[\-\s，、]/g,'');
      seg=frontZodM[2]+fzZods+'各'+frontZodM[3]; segCore=seg;
    }
    // 预处理2：生肖X友各N（无复试）→ X友生肖各N
    var frontZodM2=segCore.match(/^([鼠牛虎兔龙蛇马羊猴鸡狗猪\-\s，、]+?)(\d*[友有中肖])\s*(?:各|每个|／|每)\s*(\d+)/);
    if(!frontZodM && frontZodM2){
      var fzZods2=frontZodM2[1].replace(/[\-\s，、]/g,'');
      seg=frontZodM2[2]+fzZods2+'各'+frontZodM2[3]; segCore=seg;
    }
    var grpM=segCore.match(/^(?:三友|3友|三有|3有|三肖中特|3肖中特|二友|2友|四友|4友|五友|5友)[：:]?\s*([\u4e00-\u9fa5、，,／\/\s]+?)(?:各|每个|／|每)\s*(\d+)/);
    if(grpM){
      var grpAmt=parseInt(grpM[2]);
      var _isFushi=_hasFushi;
      grpM[1].split(/[、，,／\/\s]+/).forEach(function(grp){
        var gz=[...grp].filter(function(c){return ZODIAC_MAP[c]!==undefined;}).map(function(c){return ZODIAC_MAP[c];});
        if(gz.length>0){
          var gt=(TYPE_MAP[grpM[0].replace(/[：:]|[0-9]/g,'')]||'sanyou');
          var _multi=_isFushi?gz.length:1;
          var co=getCustomerOdds(name,gt);
          G.push({id:nid(),batchId:curBatch,name:name,type:gt,nums:gz,bet:grpAmt,multi:_multi,odds:co,rate:rate,tb:grpAmt*_multi,cb:grpAmt*_multi*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
          count++;
        }
      });
      var _dbgNew=G.length-_dbgBefore; if(_dbgNew>0){var _dbgTot=0;for(var _di=G.length-_dbgNew;_di<G.length;_di++)_dbgTot+=G[_di].tb;_dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:_dbgNew,tot:_dbgTot,start:G.length-_dbgNew});}
      return;
    }
    // “香港特码9尾100”表示香港盘9尾，不是特码9号。
    var tailM=seg.match(/(?:香港|澳门|澳彩)?(?:特码)?\s*([0-9])尾\s*(?:各\s*)?(\d+)(?:元|块|米)?/);
    if(tailM){
      var tailOdds=getCustomerOdds(name,'w1'),tailAmt=parseInt(tailM[2],10);
      G.push({id:nid(),batchId:curBatch,name:name,type:'w1',nums:[parseInt(tailM[1],10)],bet:tailAmt,multi:1,odds:tailOdds,rate:rate,tb:tailAmt,cb:tailAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
      count++;
      _dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:1,tot:tailAmt,start:G.length-1});
      return;
    }
    // 特肖按生肖下注：牛、蛇各50 是两注各50，不展开为特码号码。
    var txEachM=seg.match(/(?:澳门|香港)?特肖\s*([鼠牛虎兔龙蛇马羊猴鸡狗猪][鼠牛虎兔龙蛇马羊猴鸡狗猪\s,，、.\/]*)\s*各\s*(\d+)/);
    if(txEachM){
      var txAmt=parseInt(txEachM[2],10);
      var txZods=[].slice.call(txEachM[1]).filter(function(c){return ZODIAC_MAP[c]!==undefined;});
      var txDraw=segDraw;
      txZods.forEach(function(z){
        var txOdds=getCustomerOdds(name,'tx');
        G.push({id:nid(),batchId:curBatch,name:name,type:'tx',nums:[ZODIAC_MAP[z]],bet:txAmt,multi:1,odds:txOdds,rate:rate,tb:txAmt,cb:txAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:txDraw,settled:false,result:null});
        count++;
      });
      if(txZods.length){
        _dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:txZods.length,tot:txAmt*txZods.length,start:G.length-txZods.length});
        var txRest=seg.replace(txEachM[0],'').replace(/^[,，\s]+特[,，\s]*/,'').trim();
        if(/\d/.test(txRest)){ seg=txRest; }
        else return;
      }
    }
    // ============ 胆拖投注 ============
    // 格式: 胆08拖15,22,30二连 / 08胆15,22,30拖三全中 / 胆码08拖码15,22,30,35,37四全中
    var danTuoM=segCore.match(/(?:胆码|胆)\s*(\d+(?:[,，、\s]+\d+)*)\s*(?:拖码|拖)\s*(\d+(?:[,，、\s]+\d+)*)\s*(二连|三连|四连|五连|2连|3连|4连|5连|二全中|三全中|四全中|二中二|2中2|三中三|3中3|四中四|4中4)/);
    if(!danTuoM) danTuoM=segCore.match(/(\d+(?:[,，、\s]+\d+)*)\s*(?:胆码|胆)\s*(\d+(?:[,，、\s]+\d+)*)\s*(?:拖码|拖)\s*(二连|三连|四连|五连|2连|3连|4连|5连|二全中|三全中|四全中|二中二|2中2|三中三|3中3|四中四|4中4)/);
    if(danTuoM){
      var _danRaw=danTuoM[1], _tuoRaw=danTuoM[2], _dtTypeRaw=danTuoM[3];
      // 如果第二组格式匹配(号码胆拖)，调整变量
      if(!danTuoM[2] || /\d/.test(danTuoM[2])===false){
        // 第一种格式：胆X拖Y类型
      } else {
        // 第二种格式：X胆Y拖类型 — 已正确
      }
      var _danNums=(_danRaw.match(/\d+/g)||[]).map(Number).filter(function(n){return n>=1&&n<=49;});
      var _tuoNums=(_tuoRaw.match(/\d+/g)||[]).map(Number).filter(function(n){return n>=1&&n<=49;});
      var _dtK=0;
      if(_dtTypeRaw==='二中二'||_dtTypeRaw==='2中2'||_dtTypeRaw==='二连'||_dtTypeRaw==='2连'||_dtTypeRaw==='二全中') _dtK=2;
      else if(_dtTypeRaw==='三中三'||_dtTypeRaw==='3中3'||_dtTypeRaw==='三连'||_dtTypeRaw==='3连'||_dtTypeRaw==='三全中') _dtK=3;
      else if(_dtTypeRaw==='四中四'||_dtTypeRaw==='4中4'||_dtTypeRaw==='四连'||_dtTypeRaw==='4连'||_dtTypeRaw==='四全中') _dtK=4;
      else if(_dtTypeRaw==='五连'||_dtTypeRaw==='5连') _dtK=5;
      var _dtAmt=0; var _dtAm=segCore.match(/(?:各|每注|每个)\s*(\d+)/); if(_dtAm) _dtAmt=parseInt(_dtAm[1]);
      if(!_dtAmt){ var _dtAm2=segCore.match(/(\d+)\s*(?:元|块|米)\s*(?:一注|一组|一个)?$/); if(_dtAm2) _dtAmt=parseInt(_dtAm2[1]); }
      if(_danNums.length>0 && _tuoNums.length>0 && _dtK>0 && _dtAmt>0){
        var _dtNeed=_dtK-_danNums.length;
        var _dtCode='e2'; if(_dtK===3) _dtCode='s3'; else if(_dtK===4) _dtCode='s4'; else if(_dtK===5) _dtCode='l5';
        var _dtOdds=getCustomerOdds(name,_dtCode);
        if(_dtNeed<=0){ /* 胆码已够，每个拖码配胆码生成一注 */ _tuoNums.forEach(function(tn){var _combo=_danNums.concat([tn]).sort(function(a,b){return a-b;}); G.push({id:nid(),batchId:curBatch,name:name,type:_dtCode,nums:_combo,bet:_dtAmt,multi:1,odds:_dtOdds,rate:rate,tb:_dtAmt,cb:_dtAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null}); count++; }); }
        else if(_dtNeed>0 && _tuoNums.length>=_dtNeed){
          var _dtPicks=combinations(_tuoNums,_dtNeed);
          _dtPicks.forEach(function(pick){var _combo=_danNums.concat(pick).sort(function(a,b){return a-b;}); G.push({id:nid(),batchId:curBatch,name:name,type:_dtCode,nums:_combo,bet:_dtAmt,multi:1,odds:_dtOdds,rate:rate,tb:_dtAmt,cb:_dtAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null}); count++; });
        }
        _dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:G.length-_dbgBefore,tot:_dtAmt*(G.length-_dbgBefore),start:_dbgBefore});
        return;
      }
    }
    // ============ 胆拖投注(号码+各) ============
    // 格式: 胆08拖15,22,30,35各10 → 每组各10
    // 这种格式的各紧跟拖码后面，已在上面处理
    // ============ 生肖连 ============
    // 格式: 二肖连 龙,蛇,马,羊各100 / 三肖连 鼠牛虎兔各50
    var xiaoLianM=segCore.match(/(二肖连|三肖连|四肖连|五肖连|2肖连|3肖连|4肖连|5肖连)[：:]?\s*([鼠牛虎兔龙蛇马羊猴鸡狗猪，、,\s]+?)(?:各|每个|每)\s*(\d+)/);
    if(xiaoLianM){
      var _xlK=0;var _xlRaw=xiaoLianM[1];
      if(_xlRaw==='二肖连'||_xlRaw==='2肖连') _xlK=2;
      else if(_xlRaw==='三肖连'||_xlRaw==='3肖连') _xlK=3;
      else if(_xlRaw==='四肖连'||_xlRaw==='4肖连') _xlK=4;
      else if(_xlRaw==='五肖连'||_xlRaw==='5肖连') _xlK=5;
      var _xlAmt=parseInt(xiaoLianM[3]);
      var _xlZods=[...xiaoLianM[2]].filter(function(c){return ZODIAC_MAP[c]!==undefined;}).map(function(c){return ZODIAC_MAP[c];});
      if(_xlZods.length>=_xlK && _xlAmt>0){
        var _xlPicks=combinations(_xlZods,_xlK);
        var _xlCode='x2l';if(_xlK===3)_xlCode='x3l';else if(_xlK===4)_xlCode='x4l';else if(_xlK===5)_xlCode='x5l';
        var _xlOdds=getCustomerOdds(name,_xlCode);
        _xlPicks.forEach(function(pick){ G.push({id:nid(),batchId:curBatch,name:name,type:_xlCode,nums:pick,bet:_xlAmt,multi:1,odds:_xlOdds,rate:rate,tb:_xlAmt,cb:_xlAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null}); count++; });
        _dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:G.length-_dbgBefore,tot:_xlAmt*(G.length-_dbgBefore),start:_dbgBefore});
        return;
      }
    }
    // ============ 尾数连 ============
    // 格式: 二尾连 1,2,3,4各100 / 三尾连 5,6,7各50
    var weiLianM=segCore.match(/(二尾连|三尾连|四尾连|五尾连|2尾连|3尾连|4尾连|5尾连)[：:]?\s*([\d，、,\s]+?)(?:各|每个|每)\s*(\d+)/);
    if(weiLianM){
      var _wlK=0;var _wlRaw=weiLianM[1];
      if(_wlRaw==='二尾连'||_wlRaw==='2尾连') _wlK=2;
      else if(_wlRaw==='三尾连'||_wlRaw==='3尾连') _wlK=3;
      else if(_wlRaw==='四尾连'||_wlRaw==='4尾连') _wlK=4;
      else if(_wlRaw==='五尾连'||_wlRaw==='5尾连') _wlK=5;
      var _wlAmt=parseInt(weiLianM[3]);
      var _wlTails=(weiLianM[2].match(/\d+/g)||[]).map(Number).filter(function(n){return n>=0&&n<=9;});
      if(_wlTails.length>=_wlK && _wlAmt>0){
        var _wlPicks=combinations(_wlTails,_wlK);
        var _wlCode='w2l';if(_wlK===3)_wlCode='w3l';else if(_wlK===4)_wlCode='w4l';else if(_wlK===5)_wlCode='w5l';
        var _wlOdds=getCustomerOdds(name,_wlCode);
        _wlPicks.forEach(function(pick){ G.push({id:nid(),batchId:curBatch,name:name,type:_wlCode,nums:pick,bet:_wlAmt,multi:1,odds:_wlOdds,rate:rate,tb:_wlAmt,cb:_wlAmt*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null}); count++; });
        _dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:G.length-_dbgBefore,tot:_wlAmt*(G.length-_dbgBefore),start:_dbgBefore});
        return;
      }
    }
    // "号码，金额"（如 特38，100米 / 38,100元 / 特码38,100）合并为 N号M 后再拆分
    // 仅当后跟的2+位数字不像有效号码(>49)或有玩法前缀时才合并
    seg=seg.replace(/(\d{1,2})\s*[，,]\s*(\d{2,})\s*(?:米|元|块)/g,'$1号$2元');
    // 特码/澳特/香港特 + 号码,金额 格式（无单位也合并，但仅当后面没有更多数字/各时）
    seg=seg.replace(/((?:特码|特|澳特|澳门特|香港特|澳彩特码|门特码|香特码)\s*\d{1,2})\s*[，,]\s*(\d{2,})(?!\d|[，,、各每])/g,'$1号$2元');
    // 英文点后跟中文(如 300.兔200) → 视为分隔符逗号
    seg=seg.replace(/\.(?=[\u4e00-\u9fa5])/g,'，');
    // 空格号：=号两侧"个位 个位"合并（2 6 = 1 0 0 => 26=100）
    seg=seg.replace(/^(\d)\s(\d)\s*=\s*([\d\s]+)$/,function(m,a,b,rest){var v=parseInt(a+b);var rv=parseInt(rest.replace(/\s+/g,''));return v+'='+rv;});
    // 空格号：仅当"每个数/每码/每号"前的串全是单个数字时才两两合并（0 5，4 5=>05,45）
    seg=seg.replace(/([\d，,\s]+)(每个数|每码|每号)/g,function(m,p,kw){var tk=p.trim().split(/[，,\s]+/);var ok=tk.length>=4&&tk.every(function(t){return /^\d$/.test(t);});if(!ok)return m;var mg=[];for(var i=0;i<tk.length;i+=2){if(tk[i+1]===undefined)return m;var v=parseInt(tk[i]+tk[i+1]);if(v<1||v>49)return m;mg.push(v);}if(mg.length!==tk.length/2)return m;return mg.join(',')+kw;});
    // 中文逗号在数字间是分组，不是拆注（如 "38-32-01，17-44-38"）仅对三中三/二中二生效
    if(seg.indexOf('四中四')>=0 || seg.indexOf('4中4')>=0 || seg.indexOf('三中三')>=0 || seg.indexOf('3中3')>=0 || seg.indexOf('三中二')>=0 || seg.indexOf('3中2')>=0 || seg.indexOf('二中二')>=0 || seg.indexOf('2中2')>=0){
      seg=seg.replace(/(\d)\s*[，,]\s*(\d)/g,'$1.$2');
    }
    // 三中三/二中二等：按点号分组，每组独立注
    if(seg.indexOf('四中四')>=0 || seg.indexOf('4中4')>=0 || seg.indexOf('三中三')>=0 || seg.indexOf('3中3')>=0 || seg.indexOf('三中二')>=0 || seg.indexOf('3中2')>=0 || seg.indexOf('二中二')>=0 || seg.indexOf('2中2')>=0){      var _grpAmt=0;var _grpAm=seg.match(/(?:各|毎组|每组)\s*(\d+)/);if(_grpAm)_grpAmt=parseInt(_grpAm[1]);      if(_grpAmt>0){
        var _grpType='e2';if(seg.indexOf('四中四')>=0||seg.indexOf('4中4')>=0)_grpType='s4';else if(seg.indexOf('三中三')>=0||seg.indexOf('3中3')>=0)_grpType='s3';        if(seg.indexOf('三中二')>=0||seg.indexOf('3中2')>=0)_grpType='s2';
        // 按点号分组：38-32-01.17-44-38 => [38,32,01] [17,44,38]
        var _grpText=seg.replace(/(?:各|毎组|每组).*/,'').replace(/二组|两组|三组|四组|五组|每组|毎组/g,'').trim();        var _rawGroups=_grpText.indexOf('§')>=0?_grpText.split(/§+/):_grpText.split(/\.(?=\d)/g);        var _need=_grpType==='s4'?4:_grpType==='s3'?3:2;        var _validGroups=_rawGroups.filter(function(g){return (g.match(/\d+/g)||[]).length>=_need;});        if(_grpText.indexOf('§')>=0){
          var _dragNums=[],_dragSeen={};
          _rawGroups.forEach(function(g){(g.match(/\d+/g)||[]).forEach(function(n){var v=parseInt(n,10);if(v>=1&&v<=49&&!_dragSeen[v]){_dragSeen[v]=true;_dragNums.push(v);}});});
          var _dragPicks=combinations(_dragNums,_need),_dragCo=getCustomerOdds(name,_grpType);
          _dragPicks.forEach(function(pair){var tb2=_grpAmt,cb2=tb2*rate/100;G.push({id:nid(),batchId:curBatch,name:name,type:_grpType,nums:pair,bet:_grpAmt,multi:1,odds:_dragCo,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});count++;});
          var _dragNew=G.length-_dbgBefore;if(_dragNew>0){var _dragTot=0;for(var _d=G.length-_dragNew;_d<G.length;_d++)_dragTot+=G[_d].tb;_dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:_dragNew,tot:_dragTot,start:G.length-_dragNew});}
          return;
        }        if(_validGroups.length>=2){
          _validGroups.forEach(function(g){
            var ns=(g.match(/\d+/g)||[]).map(Number), picks=combinations(ns,_need);
            var co=getCustomerOdds(name,_grpType);
            picks.forEach(function(pair){var tb2=_grpAmt,cb2=tb2*rate/100;G.push({id:nid(),batchId:curBatch,name:name,type:_grpType,nums:pair,bet:_grpAmt,multi:1,odds:co,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});count++;});
          });
          var _dbgNew=G.length-_dbgBefore; if(_dbgNew>0){var _dbgTot=0;for(var _di=G.length-_dbgNew;_di<G.length;_di++)_dbgTot+=G[_di].tb;_dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:_dbgNew,tot:_dbgTot,start:G.length-_dbgNew});}
      return;
        }else if(_rawGroups.length===1 || (_validGroups.length===0 && _rawGroups.length>1)){          var _ns=(_rawGroups.length===1?_rawGroups[0]:_rawGroups.join(',')).match(/\d+/g)||[];
          // 二组=重复2次
          var _repeat=1;var _rm=seg.match(/([二三四五六])组/);if(_rm){"二三四五六".indexOf(_rm[1])+2||2;_repeat="二三四五六".indexOf(_rm[1])+2;}
          if(_ns.length>=_need){
            var _hasFushi2=seg.indexOf('复试')>=0||seg.indexOf('复式')>=0||(_validGroups.length===0&&_rawGroups.length>1);
            if(_hasFushi2){
              var picks2=combinations(_ns.map(Number),_need),co=getCustomerOdds(name,_grpType);
              picks2.forEach(function(pair){var tb2=_grpAmt,cb2=tb2*rate/100;G.push({id:nid(),batchId:curBatch,name:name,type:_grpType,nums:pair,bet:_grpAmt,multi:1,odds:co,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});count++;});
            } else {
              for(var _ri=0;_ri<_repeat;_ri++){var co=getCustomerOdds(name,_grpType);var tb2=_grpAmt,cb2=tb2*rate/100;G.push({id:nid(),batchId:curBatch,name:name,type:_grpType,nums:_ns.map(Number),bet:_grpAmt,multi:1,odds:co,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});count++;}
            }
            var _dbgNew=G.length-_dbgBefore; if(_dbgNew>0){var _dbgTot=0;for(var _di=G.length-_dbgNew;_di<G.length;_di++)_dbgTot+=G[_di].tb;_dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:_dbgNew,tot:_dbgTot,start:G.length-_dbgNew});}
      return;}
        }
      }
    }
    var parts=seg.split(/[,，、]+/);
    var pendingNums=[], pendingZods=[]; var pendingType=null;
    parts.forEach(function(p){
      p=p.trim();
      if(!p) return;
      var orig=p;
      if(!/\d/.test(orig) && /^(特|澳门特码|澳彩特码|门特|澳特|香港|澳门|特码)$/.test(orig)) return;
      // 阿拉伯数字+千/百(如 1千=1000, 5百=500) → 数字
      p=p.replace(/(\d+)\s*千/g,function(m,n){return parseInt(n)+'000';});
      p=p.replace(/(\d+)\s*百\s*(?=[^\d]|$)/g,function(m,n){return parseInt(n)+'00';});
      // 玩法说明中常省略“各”：中肖羊三百、三有蛇马羊50。
      p=p.replace(/(中肖|中生肖|平特|平特一肖|特肖|特生肖)([鼠牛虎兔龙蛇马羊猴鸡狗猪]+)([零〇一二两三四五六七八九十百千\d]+)(?=澳门|香港|$)/g,function(m,t,z,a){return t+z+'各'+(cnDigitAmount[a]||a);});
      p=p.replace(/((?:二|三|四|五|2|3|4|5)[有友])([鼠牛虎兔龙蛇马羊猴鸡狗猪]+)([零〇一二两三四五六七八九十百千\d]+)(?=澳门|香港|$)/g,function(m,t,z,a){return t+z+'各'+(cnDigitAmount[a]||a);});
      var s=p.replace(/今晚澳门特码，?/g,'').replace(/今晚前码，?/g,'').replace(/\\/g,' ').replace(/\.\./g,'.').replace(/米/g,' ').replace(/\*/g,'').replace(/O(\d)/gi,'$1').replace(/斤/g,'元').replace(/每码各/g,'各').replace(/每个数/g,'各').replace(/各数/g,'各').replace(/每号/g,'各').replace(/每个号/g,'各').replace(/数字.*?个/g,'各').replace(/拖/g,' ').replace(/：/g,' ').replace(/:/g,' ').replace(/(\d{1,2})-(\d{2,})(?=[^\d]|$)/g,'$1号$2元').replace(/\.(?=[\u4e00-\u9fa5])/g,'，');
      // N号M(米/元/块)：号码N、金额M，单独成注（如 34号10米 = 34号10元）；注意要先于"号"转空格处理
      var haoM=p.match(/(\d+)号\s*(?:特码\s*)?(\d+)\s*(?:米|元|块)?/);
      if(!haoM) haoM=p.match(/(\d+)买\s*(\d+)/);
      if(haoM){
        var hN=parseInt(haoM[1]),hM=parseInt(haoM[2]);
        if(hN>=1&&hN<=49&&hM>0){
          var hCo=getCustomerOdds(name,'tema');var hTb=hM;
          G.push({id:nid(),batchId:curBatch,name:name,type:'tema',nums:[hN],bet:hM,multi:1,odds:hCo,rate:rate,tb:hTb,cb:hM*rate/100,date:(typeof useDate!=="undefined"?useDate:today),draw:segDraw,settled:false,result:null});
          count++;
          // 从原文本整体摘除"N号M"，再重建s，避免数字残留
          p=p.replace(haoM[0],' ');
          s=p.replace(/今晚澳门特码，?/g,'').replace(/今晚前码，?/g,'').replace(/\\/g,' ').replace(/\.\./g,'.').replace(/米/g,' ').replace(/\*/g,'').replace(/O(\d)/gi,'$1').replace(/斤/g,'元').replace(/每码各/g,'各').replace(/每个数/g,'各').replace(/各数/g,'各').replace(/每号/g,'各').replace(/每个号/g,'各').replace(/数字.*?个/g,'各').replace(/拖/g,' ').replace(/：/g,' ').replace(/:/g,' ');
        }
      }
      if(!p.trim()) return;
      if(!/\d/.test(p) && /^(特|澳门特码|澳彩特码|门特|澳特|香港|澳门|特码|.*就是.*)$/.test(p.trim())) return;
      if(/就是/.test(p) && !/\d+号\s*(?:特码\s*)?\d+/.test(p) && !/[鼠牛虎兔龙蛇马羊猴鸡狗猪]\s*(?:各|每|\d)/.test(p)) return;
      s=s.replace(/号/g,' ');
      var type=null;
      var keys=Object.keys(TYPE_MAP).sort(function(a,b){return b.length-a.length;});
      var matchedKey='';
      for(var i=0;i<keys.length;i++){var k=keys[i];if(k.length<=1)continue;if(s.indexOf(k)>=0){type=TYPE_MAP[k];matchedKey=k;break;}}
      if(matchedKey&&/^\d[有中友]$/.test(matchedKey)){s=s.replace(matchedKey,' ');}
      if(matchedKey&&/^\d中\d$/.test(matchedKey)){s=s.replace(/^\d中\d/,'');}
      // "特肖/中肖/平特"字样优先于"澳门特/澳特"等前缀，强制为特肖/中肖类型(不拆)
      if(s.indexOf('特肖')>=0||s.indexOf('特生肖')>=0){type='tx';lastType='tx';}
      else if(s.indexOf('中肖')>=0||s.indexOf('中生肖')>=0||s.indexOf('平特一肖')>=0||s.indexOf('平特')>=0){type='zx';lastType='zx';}
      var hasZod=[...s].some(function(c){return ZODIAC_MAP[c]!==undefined;});
      var draw=segDraw;
      if(s.indexOf('澳门')>=0 || s.indexOf('新奥')>=0 || s.indexOf('新奥门')>=0) draw='am';
      else if(s.indexOf('澳特')>=0 || s.indexOf('门特')>=0) draw='am';
      else if(s.indexOf('澳')>=0 && s.indexOf('香港')<0) draw='am';
      else if(s.indexOf('香港')>=0) draw='hk';
      if(!type){
        if(hasZod && lastType) type=lastType;
        else type='tema';
      } else {
        lastType=type;
      }
      // 整段明确是"特肖/中肖/平特"则整段不拆；否则"各/每X"且在特码语境时拆号码
      var segIsZodWhole=/特肖|中肖|中生肖|平特|特生肖|1号特肖|1号中肖/.test(seg);
      if(!segIsZodWhole && /每个|每号|每码|每肖|每数|每只|各号|各数/.test(orig) && hasZod){
        type='tema'; lastType='tema';
      }
      var isEach=/各|每个|每组/.test(s);
      // 中文金额 -> 数字 (general: any Chinese number before 元/块/米)
      var cnFn=function(m,cn){
        var map={'零':0,'一':1,'二':2,'两':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,'百':100,'千':1000,'万':10000};
        var r=0,t=0;
        for(var ci=0;ci<cn.length;ci++){var ch=cn[ci];if(ch==='十'){t=t||1;r+=t*10;t=0;}else if(ch==='百'){t=t||1;r+=t*100;t=0;}else if(ch==='千'){t=t||1;r+=t*1000;t=0;}else if(ch==='万'){t=t||1;r+=t*10000;t=0;}else{t=map[ch]||0;}}
        r+=t;return r;
      };
      s=s.replace(/([零一二三四五六七八九十百千]+)\s*元/g,function(m,cn){return cnFn(m,cn)+'元';});
      s=s.replace(/([零一二三四五六七八九十百千]+)\s*块/g,function(m,cn){return cnFn(m,cn)+'块';});
      s=s.replace(/([零一二三四五六七八九十百千]+)\s*米/g,function(m,cn){return cnFn(m,cn)+'米';});
      s=s.replace(/([0-9]*\.?[0-9]+)\s*万\s*(?=元|块|米|$)/g,function(m,n){return Math.round(parseFloat(n)*10000)+'元';});
  s=s.replace(/([0-9]*\.?[0-9]+)\s*千\s*(?=元|块|米|$)/g,function(m,n){return Math.round(parseFloat(n)*1000)+'元';});
  s=s.replace(/各\s*([0-9]*\.?[0-9]+)\s*千\s*(?=元|块|米|$)/g,function(m,n){return '各'+Math.round(parseFloat(n)*1000);});
  s=s.replace(/各\s*([0-9]*\.?[0-9]+)\s*万\s*(?=元|块|米|$)/g,function(m,n){return '各'+Math.round(parseFloat(n)*10000);});
  s=s.replace(/各\s*([零一二三四五六七八九十百千]+)\s*(?=元|块|米|$)/g,function(m,cn){return '各'+cnFn(m,cn);});
      s=s.replace(/每个\s*([零一二三四五六七八九十百千]+)\s*(?=元|块|米|$)/g,function(m,cn){return '每个'+cnFn(m,cn);});
      s=s.replace(/元|块/g,' ');
      // Handle multiple 各 in one part: split by 各 and process each group
      var eachMatches=[]; var eachRe=/各\s*(\d+)\s*(?:百|元|块|米)?/g; var eachM;
      while((eachM=eachRe.exec(s))!==null) eachMatches.push({pos:eachM.index,len:eachM[0].length,amt:parseInt(eachM[1])*(eachM[0].indexOf('百')>=0?100:1)});
      if(isEach && eachMatches.length>1){
        var prevEnd=0;
        eachMatches.forEach(function(em,gi){
          var numPart=s.substring(prevEnd,em.pos).trim();
          if(numPart){
            var nums=(numPart.match(/\d+/g)||[]).map(function(x){return parseInt(x,10);});
            var zods=[].slice.call(numPart).filter(function(c){return ZODIAC_MAP[c]!==undefined;}).map(function(c){return ZODIAC_MAP[c];});
            var allN=nums.concat(zods);
            if(allN.length>0){
              var am=em.amt;
              var co=getCustomerOdds(name,type);var tb2=allN.length*am,cb2=tb2*rate/100;
              G.push({id:nid(),batchId:curBatch,name:name,type:type,nums:allN,bet:am,multi:allN.length,odds:co,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:draw,settled:false,result:null});count++;
      }
    }
          prevEnd=em.pos+em.len;
        });
        var lastPart=s.substring(prevEnd).trim();
        if(lastPart){
          var lnums=(lastPart.match(/\d+/g)||[]).map(function(x){return parseInt(x,10);});
          var lzods=[].slice.call(lastPart).filter(function(c){return ZODIAC_MAP[c]!==undefined;}).map(function(c){return ZODIAC_MAP[c];});
          var lall=lnums.concat(lzods);
          if(lall.length>0){var lam=eachMatches[eachMatches.length-1].amt;var co2=getCustomerOdds(name,type);var tb3=lall.length*lam,cb3=tb3*rate/100;G.push({id:nid(),batchId:curBatch,name:name,type:type,nums:lall,bet:lam,multi:lall.length,odds:co2,rate:rate,tb:tb3,cb:cb3,date:(typeof useDate!=="undefined"?useDate:today),draw:draw,settled:false,result:null});count++;}
        }
        return;
      }
      var amount=null; var m;
      var sClean=s.replace(/包特/g,'');
      // X-Y 为两个独立号码（不是区间），把 - 变为空格以便分别提取
      if(m=sClean.match(/各\s*([0-9]*\.?[0-9]+)\s*百/)) amount=Math.round(parseFloat(m[1])*100);
      else if(m=sClean.match(/各\s*([0-9]*\.?[0-9]+)/)) amount=parseFloat(m[1]);
      else if(m=sClean.match(/每个\s*([0-9]*\.?[0-9]+)/)) amount=parseFloat(m[1]);
      else if(m=sClean.match(/([0-9]*\.?[0-9]+)\s*百\s*$/)) amount=Math.round(parseFloat(m[1])*100);
      if(!amount){
        var mm=sClean.match(/(?:=|\/\/|:)\s*(\d+)\s*$/);
        if(!mm && sClean.indexOf('/')>=0 && !isEach){
          // 处理 05/30 或 猴/100 这种单斜杠金额
          var slashNums=(sClean.match(/\d+/g)||[]).map(function(x){return parseInt(x,10);});
          var slashZods=[...sClean].filter(function(c){return ZODIAC_MAP[c]!==undefined;});
          if(slashZods.length===1 && slashNums.length===1){
            mm=['',''+slashNums[0]]; // 猴/100
          } else if(slashNums.length===2 && sClean.split('/').length===2){
            // 05/30 -> 视为 [05] 金额30
            amount=slashNums[1];
            // 下面会清理 allNums，这里先占位
            mm=['',''+amount];
      }
    }
        if(mm) amount=parseFloat(mm[1]);
      }
      var allNums=(sClean.match(/\d+/g)||[]).map(function(x){return parseInt(x,10);});
      var allZods=[...sClean].filter(function(c){return ZODIAC_MAP[c]!==undefined;});
      if(amount!==null){
        if(sClean.indexOf('百')>=0 && allNums.length && allNums[allNums.length-1]*100===amount){
          allNums=allNums.slice(0,-1);
        } else if(allNums.length && allNums[allNums.length-1]===amount){
          allNums=allNums.slice(0,-1);
        } else if(sClean.indexOf('百')>=0){
          var v=amount/100; var idx=allNums.indexOf(v); if(idx>=0) allNums.splice(idx,1);
        }
      }
      if(amount===null){
        if(allZods.length>=1 && allNums.length===1){ amount=allNums[0]; allNums=[]; }
        else if(orig.indexOf('号')>=0 || orig.indexOf('=')>=0 || sClean.indexOf('//')>=0){
          if(allNums.length>=1){ amount=allNums[allNums.length-1]; allNums=allNums.slice(0,-1); }
        }
        else if(allNums.length>=2 && sClean.indexOf(' ')>=0){
          // 处理 平特38 100 这种空格分隔的金额
          amount=allNums[allNums.length-1]; allNums=allNums.slice(0,-1);
        }
      }
      var betNums=allNums.filter(function(n){return n>=1&&n<=49;});
      var zodNums=allZods.map(function(z){return ZODIAC_MAP[z];});
      // 平特/中肖等后跟真实号码（非生肖）=> 特马(tema)
      if((type==='zx'||type==='zx1'||type==='tx'||type==='tx1') && betNums.length>0 && zodNums.length===0){
        type='tema';lastType='tema';
      }
      // 生肖+每个/每号/每码/每数/各：展开为该生肖的4个号码，每个买金额
      // 特肖/中肖(押生肖整体)不拆；特码/特马类(押号码)带各/每则拆
      var wantZodExpand=/每个|每号|每码|每肖|每数|每只|每注|各/.test(orig);
      var zodiacWhole=(type==='tx'||type==='tx1'||type==='zx'||type==='zx1');
      var forceEach=/每个|每号|每码|每肖|每数|每码各|每个数/.test(orig); // 明确"每码/每号"必拆号码，不受特肖影响
      if(wantZodExpand && (!zodiacWhole||forceEach) && (zodNums.length>0 || pendingZods.length>0)){
        var allZod=zodNums.concat(pendingZods);
        var expNums=[];
        allZod.forEach(function(z){ SX[z].forEach(function(n){ if(expNums.indexOf(n)<0) expNums.push(n); }); });
        betNums=betNums.concat(expNums.filter(function(n){return betNums.indexOf(n)<0;}));
        zodNums=[]; pendingZods=[]; pendingNums=[];
        if(betNums.length>0) type='tema';
        lastType='tema';
      }
      // 特码+纯生肖 => 特肖(tx)，非特马(tema)
      if(type==='tema' && betNums.length===0 && zodNums.length>0){type='tx';lastType='tx';}
      // 处理 31，43，各350 这种分散的 各：暂存
      if((!amount || amount<=0) && (betNums.length>0 || zodNums.length>0)){
        pendingNums = pendingNums.concat(betNums);
        pendingZods = pendingZods.concat(zodNums);
        if(type) pendingType=type;
        return;
      }
      if((betNums.length===0 && zodNums.length===0) && (pendingNums.length>0 || pendingZods.length>0) && amount){
        betNums = pendingNums.slice();
        zodNums = pendingZods.slice();
        if(pendingType) type=pendingType;
        pendingNums=[]; pendingZods=[]; pendingType=null;
      } else {
        // 有号码则暂不清 pending，若当前是 各 则合并
        if(isEach && (pendingNums.length>0 || pendingZods.length>0)){
          betNums = pendingNums.concat(betNums);
          zodNums = pendingZods.concat(zodNums);
          pendingNums=[]; pendingZods=[]; pendingType=null;
        } else if(betNums.length>0 || zodNums.length>0){ pendingNums=[]; pendingZods=[]; pendingType=null; }
      }
      if(betNums.length===0 && zodNums.length===0){ fail.push(orig+'=>无法识别号码/生肖'); return; }
      var customerOdds;
      // 各/每个 → 合并为一笔（多号×单价）
      var allBetNums=betNums.concat(zodNums);
      var isGroupType=['eryou','sanyou','siyou','wuyou'].indexOf(type)>=0;
      var isComboType=['e2','s3','s4'].indexOf(type)>=0;
      if(isEach && !isGroupType && allBetNums.length>0 && amount>0){
        if(isComboType && zodNums.length>0){
          var _expanded=[];
          zodNums.forEach(function(zi){_expanded=_expanded.concat(SX[zi]);});
          var _all=(_expanded.length>0?_expanded:allBetNums);
          var _need=type==='s4'?4:3;
          if(_all.length>=_need){
            var _picks=combinations(_all,_need),_co=getCustomerOdds(name,type);
            _picks.forEach(function(pick){var tb2=amount,cb2=tb2*rate/100;G.push({id:nid(),batchId:curBatch,name:name,type:type,nums:pick,bet:amount,multi:1,odds:_co,rate:rate,tb:tb2,cb:cb2,date:(typeof useDate!=="undefined"?useDate:today),draw:draw,settled:false,result:null});count++;});
          }
        } else {
          customerOdds=getCustomerOdds(name,type);
          var tb=allBetNums.length*amount, cb=tb*rate/100;
          G.push({id:nid(),batchId:curBatch,name:name,type:type,nums:allBetNums,bet:amount,multi:allBetNums.length,odds:customerOdds,rate:rate,tb:tb,cb:cb,date:(typeof useDate!=="undefined"?useDate:today),draw:draw,settled:false,result:null});
          count++;
        }
        return;
      }
      var nums = betNums.length>0 ? betNums : zodNums;
      customerOdds=getCustomerOdds(name,type);
      var tb=amount, cb=tb*rate/100;
      G.push({id:nid(),batchId:curBatch,name:name,type:type,nums:nums,bet:amount,multi:1,odds:customerOdds,rate:rate,tb:tb,cb:cb,date:(typeof useDate!=="undefined"?useDate:today),draw:draw,settled:false,result:null});
      count++;
    });
    var _dbgNew=G.length-_dbgBefore;
    if(_dbgNew>0){var _dbgTot=0;for(var _di=G.length-_dbgNew;_di<G.length;_di++)_dbgTot+=G[_di].tb;_dbgSegs.push({text:seg.replace(/\n/g,' ').substring(0,40),cnt:_dbgNew,tot:_dbgTot,start:G.length-_dbgNew});}
  });
  var _previewStart=G.length-count;
  var _dbgTotal=G.slice(_previewStart).reduce(function(a,b){return a+b.tb;},0);
  if(count>0){
    var _covered={};
    _dbgSegs.forEach(function(s){
      if(typeof s.start!=='number')return;
      for(var ci=s.start;ci<s.start+s.cnt;ci++)_covered[ci]=true;
    });
    for(var ui=_previewStart;ui<G.length;ui++){
      if(!_covered[ui]){
        var _ug=G[ui];
        var _ud=_ug.draw==='am'?'澳门':_ug.draw==='hk'?'香港':'';
        _dbgSegs.push({text:_ud+(TN[_ug.type]||'投注')+' '+formatNums(_ug)+' '+(_ug.multi>1?'各':'')+_ug.bet+'元',cnt:1,tot:_ug.tb,start:ui});
      }
    }
    if(_dbgSegs.length===0)_dbgSegs.push({text:'识别结果',cnt:count,tot:_dbgTotal,start:_previewStart});
  }
  if(count>0){
    try{renderRecords();}catch(e){}
    let realFail=fail.filter(function(s){
      var base=(s.split('=>')[0]||'').trim();
      return !/^(今晚澳门特码|今晚前码|香港二中二包特|特码|新奥门|澳|澳门|香港|门特|澳特|特肖|中肖|平特|平特一肖|平特一肖|二友|三友|四友|五友)$/.test(base)
        && !/^(?:四有|三有|二有|五有|各(?:数|号)?\d+|奥特|香港特)$/.test(base)
        && !/^(?:\d+(?:\.\d+)?\s*(?:元|块|米)?|(?:合计|总计|共计|共)\s*\d+|图片|粘贴的图像)$/.test(base);
    });
    toast('批量添加 '+count+' 笔投注'+(realFail.length?'（'+realFail.length+'条未识别）':''));
    speak('批量添加 '+count+' 笔 共'+_dbgTotal+'元');
    document.getElementById('batch-input').value='';
    if(fail.length) console.log('未识别:',fail);
    // 调试面板
    var _sourceLabel=parseSource==='ocr'?'🔶 OCR截图识别（自动推断，请确认）':'聊天文字解析（自动推断，请确认）';
    var _dhtml='<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.94);border:3px solid #ffab00;z-index:999;overflow-y:auto;padding:10px;font-size:11px;color:#ccc;font-family:monospace" id="debug-panel">';
    _dhtml+='<div style="color:#ffab00;font-size:14px;font-weight:700;margin-bottom:6px">'+_sourceLabel+'</div>';
    _dhtml+='<div style="color:#ffab00;font-size:13px;margin-bottom:6px">解析明细 ('+count+'笔 共'+_dbgTotal+'元)</div>';
    _dhtml+='<div style="color:#666;font-size:10px;margin-bottom:8px">可改金额后点确认；点空白处关闭不改</div>';
    _dbgSegs.forEach(function(s,i){_dhtml+='<div style="padding:5px 0;border-bottom:1px solid #1a1a2e;display:flex;gap:6px;align-items:center"><span style="color:#666;min-width:18px">'+(i+1)+'</span><input id="dbg-amt-'+i+'" value="'+s.tot+'" style="width:70px;padding:4px;background:#0f0f1a;border:1px solid #2a2a4a;border-radius:6px;color:#ffab00;font-size:11px" inputmode="decimal"><span style="color:#888;flex:1">'+escapeBatchHtml(s.text)+'</span></div>';});
    if(realFail.length){
      _dhtml+='<div style="color:#ff5252;font-size:12px;font-weight:700;margin-top:8px;padding-top:8px;border-top:1px solid #ff5252">未识别 '+realFail.length+' 条：</div>';
      realFail.forEach(function(s,i){_dhtml+='<div style="padding:2px 0;color:#ff8a80">'+(i+1)+'. '+escapeBatchHtml(s)+'</div>';});
    }
    _dhtml+='<div style="display:flex;gap:8px;margin-top:10px"><button class="btn ba" onclick="confirmDbg()" style="flex:1">确认入账</button><button class="btn bt" onclick="cancelDbg()" style="flex:1">取消</button></div>';
    _dhtml+='<div style="color:#ffab00;font-weight:700;margin-top:8px;padding-top:8px;border-top:2px solid #ffab00;font-size:13px">总计: <span id="dbg-total">'+_dbgTotal+'</span>元</div>';
    _dhtml+='<div style="display:none" id="dbg-count">'+count+'</div>';
    _dhtml+='</div>';
    var _op=document.getElementById('debug-panel');if(_op&&_op.remove)_op.remove();
    document.body.insertAdjacentHTML('beforeend',_dhtml);
    // 绑定确认与输入事件（替代原<script>内联）
    __batchPendingPreviewId=curBatch;
    (function(){
      var cnt=count;
      window.confirmDbg=function(){
        var tot=0;
        _dbgSegs.forEach(function(segInfo,i){
          var el=document.getElementById('dbg-amt-'+i);
          var v=el? parseFloat(el.value)||0 : 0;
          tot+=v;
          var start=segInfo.start, end=start+segInfo.cnt;
          var original=0;
          for(var j=start;j<end;j++)if(G[j]&&G[j].batchId===curBatch)original+=G[j].tb||0;
          var ratio=original?v/original:0;
          for(var j=start;j<end;j++){
            var g=G[j];
            if(g&&g.batchId===curBatch){g.tb=original?g.tb*ratio:(j===start?v:0);g.bet=g.tb/(g.multi||1);}
          }
        });
        var te=document.getElementById('dbg-total'); if(te) te.textContent=tot;
        save(); renderRecords(); if(typeof renderRisk==='function') renderRisk();
        var p=document.getElementById('debug-panel'); if(p) p.remove();
        __batchPendingPreviewId=null;
        toast('已确认 '+tot+'元');
      };
      var panel=document.getElementById('debug-panel');
      if(panel) panel.addEventListener('click', function(e){ if(e.target.id==='debug-panel') cancelDbg(); });
      var _inputs=document.querySelectorAll('[id^=dbg-amt-]');
      _inputs.forEach(function(inp){
        inp.addEventListener('input', function(){
          var t=0; _inputs.forEach(function(x){ t+=parseFloat(x.value)||0; });
          var te=document.getElementById('dbg-total'); if(te) te.textContent=t;
        });
      });
    })();
  }else{
    // 增强：即使0笔也展示未识别明细，便于一分不差核对
    var _failHtml='<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:999;overflow-y:auto;padding:10px;font-size:11px;color:#ccc;font-family:monospace" id="debug-panel" onclick="this.remove()">';
    _failHtml+='<div style="color:#ff5252;font-size:14px;font-weight:700;margin-bottom:6px">未识别 '+fail.length+' 条</div>';
    _failHtml+='<div style="color:#666;font-size:10px;margin-bottom:8px">点击任意处关闭；请检查是否为笔误或特殊符号</div>';
    fail.forEach(function(s,i){_failHtml+='<div style="padding:3px 0;border-bottom:1px solid #1a1a2e"><span style="color:#666">'+(i+1)+'</span> <span style="color:#ff5252">'+escapeBatchHtml(s)+'</span></div>';});
    _failHtml+='</div>';
    var _op2=document.getElementById('debug-panel');if(_op2&&_op2.remove)_op2.remove();
    document.body.insertAdjacentHTML('beforeend',_failHtml);
    alert('未识别有效投注\n'+fail.slice(0,3).join('\n')+'\n\n格式示例：\n香港特：16-28-40各50\n05号400\n特肖虎300\n平特一肖猴=500');
  }
}



document.addEventListener('DOMContentLoaded',function(){
  // 激活校验：失败则覆盖为提示页并终止初始化
  if(!ensureActivated()){
    try{
      document.body.innerHTML='<div style="position:fixed;inset:0;background:#0f0f1a;color:#e94560;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center;font-family:Microsoft YaHei"><div style="font-size:40px;margin-bottom:14px">🔒</div><div style="font-size:20px;font-weight:700;margin-bottom:8px">萧易 · 未激活</div><div style="font-size:14px;color:#888;line-height:1.8">本安装包仅供授权用户使用。<br>请输入正确的激活码后重新打开。</div></div>';
    }catch(e){}
    return;
  }
  if(!customers.some(function(c){return c.name==="琴";})){var odds={};Object.keys(O).forEach(function(k){odds[k]=O[k];});customers.push({name:"琴",rate:0.5,odds:odds});saveC();}initSel();renderRecords();loadDraw();
  var bi=document.getElementById('batch-input');
  if(bi){
    // 拖拽视觉反馈（不自动提交，需点按钮）
    bi.addEventListener('dragover',function(e){e.preventDefault();e.stopPropagation();bi.style.borderColor='#e94560';bi.style.background='#1a1a2e';});
    bi.addEventListener('dragleave',function(e){bi.style.borderColor='#2a2a4a';bi.style.background='#0f0f1a';});
    bi.addEventListener('drop',function(e){
      e.preventDefault();e.stopPropagation();
      bi.style.borderColor='#2a2a4a';bi.style.background='#0f0f1a';
      var dt=e.dataTransfer;var txt='';
      if(dt.files&&dt.files.length){for(var fi=0;fi<dt.files.length;fi++){var f=dt.files[fi];if(f.type&&f.type.indexOf('image/')===0){handleBatchImageFile(f);return;}if(f.type&&f.type.match(/text/)){var reader=new FileReader();reader.onload=function(ev){bi.value=ev.target.result;};reader.readAsText(f);return;}}}
      if(dt.getData){txt=dt.getData('text')||'';}
      if(!txt&&e.clipboardData){txt=e.clipboardData.getData('text')||'';}
      if(txt){bi.value=txt;}
    });
  }
  refreshBatchOcrStatus();
  document.addEventListener('paste',function(e){
    var items=e.clipboardData&&e.clipboardData.items;
    if(!items)return;
    for(var i=0;i<items.length;i++){
      if(items[i].type&&items[i].type.indexOf('image/')===0){
        e.preventDefault();
        handleBatchImageFile(items[i].getAsFile());
        return;
      }
    }
  });
});
