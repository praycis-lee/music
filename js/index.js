

document.addEventListener('readystatechange',
	function(){
        if(document.readyState === 'complete'){
    	// console.log(1)



//音量进度条
    //虚假例子
    	// var obj={a:1.b:2}
    	// el.onclick=function(){
    	// 	obj.a=4
    	// }
    	// obj.onAchange=function(){
    	// 	div.style.height=16*this.a+'px'
    	// }



    	
        //audio对象的属性方法和事件
        var audio = document.querySelector('#audio');
        // var pausebtn=document.querySelector('#pause')
        // var playbtn=document.querySelector('#play');
        var btnplay=document.querySelector('#btnplay');
        btnplay.onclick = function(){
            if(audio.paused){
                audio.play();
                this.title="暂停(P)";
            }else{
                audio.pause();
                this.title="播放(S)";
            }
        }
        audio.onplay=function(){
            btnplay.className='pause_bt';
        }
        audio.onpause=function(){
            btnplay.className='play_bt';
        }
        
        var spanvolume=document.querySelector('#spanvolume');
        var spanmute=document.querySelector('#spanmute');
        var spanvolumeop=document.querySelector('#spanvolumeop');
        var spanvolumebar=document.querySelector('#spanvolumebar');
        spanmute.onclick=(function(){
        	// var oldvolume;
        	// return function(){
        	// 	if(audio.volume!=0){
        	// 		oldvolume = audio.volume;
        	// 		audio.volume=0;
        	// 	}else{
        	// 		audio.volume=oldvolume;
        	// 	}
        	// }
        	var kaiguan=true;
        	var oldvolume;
        	return function(){
        		if(kaiguan){
        			oldvolume = audio.volume;
        			audio.volume=0;
        			kaiguan=false;
        		}else{
        			audio.volume=oldvolume;
        			kaiguan=true;
        		}
        	}
        })()


        spanvolume.onclick=function(ev){
        	var v=ev.offsetX/this.offsetWidth;
        	audio.volume=v
        }
        audio.onvolumechange=function(){
        	if(audio.volume === 0){
        		spanmute.className = 'volume_mute'
        	}else{
                spanmute.className = 'volume_icon'
            }
        	// var r=vol.offsetWidth*audio.volume-volposition.offsetWidth/2;
        	// volposition.style.left=r+'px';
            spanvolumeop.style.left=audio.volume*100+'%';
            spanvolumebar.style.width=audio.volume*100+'%';

        }
        spanvolumeop.onclick=function(ev){
            ev.stopPropagation();
        }
        // playbtn.onclick = function(){
        // 	audio.play()
        // }
        // pausebtn.onclick = function(){
        // 	audio.pause()
        // }

        // audio.onplay=function(){
        // 	playpausebtn.style.background=""//效果一样
        // }


        //console.dir(audio)//看到对象的属性以及方法
        //属性
        //src 歌曲的地址  改掉src会去加载另一首歌曲
        //paused  布尔值  如果audio处于暂停状态 true
        //ended   布尔值  如 果audio播放完毕为true
        //currentTime  歌曲的播放进度
        //duration     歌曲的总播放时长
        //colume       设置音量

        //方法
        //play()   pause()

        //事件
        //ontimeupdate   onplay   onpuse


   //切歌
    //   qiege.onclick=function(){
    //   	audio.src='002.mp3';
    //     audio.play()
    //   }
    // }


    var divsonglist=document.querySelector('#divsonglist');
    var spansongnum1=document.querySelector('#spansongnum1');
    var divplayframe=document.querySelector('#divplayframe');
    var btnfold=document.querySelector('#btnfold');
    var divplayer=document.querySelector('#divplayer');
    var yinyueku=[
    {name:'我们在改变',src:'001.mp3',geshou:'魏晨',duration:'4:02'},
    {name:'胡歌 - 忘记时间',src:'002.mp3',geshou:'胡歌',duration:'4:32'},
    {name:'张敬轩-吻得太逼真',src:'003.mp3',geshou:'张敬轩',duration:'3:51'},
    {name:'(猫步轻悄)',src:'004.mp3',geshou:'AOA (에이오에이)',duration:'3:39'},
    {name:'짧은 치마 (短裙)',src:'005.mp3',geshou:'AOA (에이오에이)',duration:'2:59'},
    {name:'模特',src:'006.mp3',geshou:'李荣浩',duration:'5:06'},
    {name:'信仰',src:'007.mp3',geshou:'张信哲',duration:'4:12'}
    ];
    var currentsongindex;
    var LIEBIAO = 3,SHUNXU = 2,SUIJI = 4,DANQU = 1;
    var currentbofangmoshi=LIEBIAO;
    //列表展开
   var flag1=true;
   var flag=true;
   $('#spansongnum1').click(function(){
      if(flag1){
        divplayframe.style.display="block";
        $('#divplayframe').animate({opacity:1},300);
        flag1=false;
      }else{
        divplayframe.style.display="none";
        $('#divplayframe').animate({opacity:0},0);
        flag1=true;
      }
   })
   $('#btnfold').click(function(){
        if(flag){
            $('#divplayer').animate({left:0},500);
            divplayer.classList.remove("m_player_folded");
            flag=false;
        }else{
            if(divplayframe.style.display="block"){
                    $('#divplayframe').animate({opacity:0},200,function(){
                        $('#divplayer').animate({left:-540},500)
                    })
              }else{
                 $('#divplayer').animate({left:-540},500);
            }
                  divplayer.classList.add("m_player_folded");
                  this.title="点击展开";
                  flag=true;
        } 
   })

    
    var createList = function(){
        var el='';
        for(var i=0;i < yinyueku.length;i++){
            var ac=(i == currentsongindex)?'play_current':'';
            el += '<li mid="j0 class="" class="'+ac+'"><strong class="music_name title="'+yinyueku[i].name+
            '">'+yinyueku[i].name+'</strong> <strong class="singer_name">'+yinyueku[i].geshou+
            '</strong><strong class="play_time">'+yinyueku[i].duration+
            '</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_000Nz08A0aZNuz" mid="000Nz08A0aZNuz"><span> 我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
        }

        divsonglist.firstElementChild.innerHTML = el;

        spansongnum1.innerHTML = '<span>' +yinyueku.length +'</span>';
        


        var lis = divsonglist.firstElementChild.children;
        for(var i = 0;i<lis.length;i++){
            lis[i].index=i;
            lis[i].onclick=function(){
                audio.src = yinyueku[this.index].src;
                currentsongindex=this.index;
                audio.play()
                onsongchange()
            }

        //歌曲滑上效果开始    
        lis[i].onmouseover=function(){
            this.classList.add('play_hover')
        }
        lis[i].onmouseout=function(){
            this.classList.remove('play_hover')
        }
    }
        //歌曲滑上效果结束 
        //删除键开始
        var dels = document.querySelectorAll('.btn_del');
        for(var i = 0;i < dels.length;i++){
            dels[i].index=i;
            dels[i].onclick = function(e){
              e.stopPropagation();
              var newarr = [];
              for(var i = 0;i<yinyueku.length;i++){
                if(yinyueku[this.index] != yinyueku[i]){
                 newarr.push(yinyueku[i]);
             }
         }
         yinyueku = newarr;

         if(this.index == currentsongindex){
            if(currentsongindex == yinyueku.length){//如果是最后一首歌，不播放
                audio.src='';
                uireset();//默认样式
            }else{
               audio.src=yinyueku[currentsongindex].src;
                audio.play();
                onsongchange();
            }
        }

         if(this.index<currentsongindex){currentsongindex -= 1};

         createList()

    }
}

        //删除键结束 
    }
    createList()//调用之后才能够获取到


//清空列表开始
clear_list.onclick = function(){
    yinyueku=[];
    createList();
    uireset();
}
var uireset=function(){
    document.querySelector('.music_name').innerHTML = '<span>听我想听的歌</span>';
    document.querySelector('.singer_name').innerHTML = '<span>QQ音乐</span>';
    ptime.innerHTML = '';
    document.querySelector('.music_op').style.display="none";
    audio.src='';
    stateposition.style.left='0%';
    spanplaybar.style.width='0%';
} 
//清空列表结束

//循环模式
var btnPlayway=document.querySelector('#btnPlayway');
var divselect=document.querySelector('#divselect');
btnPlayway.onclick=function(){
    divselect.style.display="block";
}
setbofangmoshi=function(num){
    divselect.style.display="none";
    currentbofangmoshi=num;
    var data={
        1:'cycle_single_bt',
        2:'ordered_bt',
        3:'cycle_bt',
        4:'unordered_bt',
        6:'单曲播放',
        7:'顺序播放',
        8:'列表播放',
        9:'随机播放'
    }
    btnPlayway.className=data[num];
    btnPlayway.title=data[num+5]
}
   //播放进度条
   var state=document.querySelector('#downloadbar');
   var stateposition=document.querySelector('#spanprogress_op');
   var spanplaybar=document.querySelector('#spanplaybar');
   var tips=document.querySelector('.time_show');
   audio.ontimeupdate= function(){

    var l=this.currentTime/this.duration*state.offsetWidth-stateposition.offsetWidth/2;
    spanplaybar.style.width=l+'px';
    stateposition.style.left=l+'px';
            // if(this.currentTime/this.duration == 1){
            //    nextSong(); 
            // }
            if(audio.ended){
                if(currentbofangmoshi == DANQU){
                    audio.play();
                }else if(currentbofangmoshi == LIEBIAO){
                    nextSong();
                }else if(currentbofangmoshi == SUIJI){
                    randomSong();
                }else if(currentbofangmoshi == SHUNXU){
                    if(currentsongindex!=yinyueku.length-1){
                        nextSong();
                    }
                }
            }
        }     

        var randomSong=function(){
            currentsongindex=Math.floor(Math.random()*yinyueku.length);
            audio.src=yinyueku[currentsongindex].src;
            audio.play();
            onsongchange();
        }
        

        state.onclick=spanplaybar.onclick=function(ev){
            audio.currentTime=ev.offsetX/state.offsetWidth*audio.duration;
        }
        var zhuanhuan=function(time){

        }
        var zhuanhuan=function(time){
            var a,b;
            a=parseInt(time/60);
            b=parseInt(time-a*60)
            if(b>9){
                return '0'+a+':'+b;
            }else{
                return '0'+a+':'+'0'+b;
            }
            
        }
        state.onmouseover=spanplaybar.onmouseover=function(ev){
            tips.style.display="block";
            tips.style.left=ev.offsetX-tips.offsetWidth/2+'px';
            var time=ev.offsetX/this.offsetWidth*audio.duration;
            tips.innerHTML=zhuanhuan(time);
        }
        state.onmouseout=spanplaybar.onmouseout=function(ev){
            tips.style.display="none";
        }
        state.onmousemove=function(ev){
            var time=ev.offsetX/this.offsetWidth*audio.duration;
            tips.style.left=ev.offsetX-tips.offsetWidth/2+'px';
            tips.innerHTML=zhuanhuan(time);
        }

//上下切歌
var nextSong = function(){
    if(currentsongindex == undefined) return;
    if(currentbofangmoshi == SUIJI){
        randomSong();
        return;
    }
    currentsongindex += 1;
    currentsongindex = (currentsongindex==yinyueku.length)?0:currentsongindex;
    audio.src=yinyueku[currentsongindex].src;
    audio.play();
    onsongchange()
}
var prevSong = function(){
    if(currentsongindex == undefined) return;
    if(currentbofangmoshi == SUIJI){
        randomSong();
        return;
    }
    currentsongindex -= 1;
    currentsongindex = (currentsongindex  == -1)?yinyueku.length-1:currentsongindex;
    audio.src=yinyueku[currentsongindex].src;
    audio.play();
    onsongchange()
}
document.querySelector('.next_bt').onclick=nextSong;
document.querySelector('.prev_bt').onclick=prevSong;

var lis = divsonglist.firstElementChild.children;
var onsongchange=function(){
    for(var i=0;i<lis.length;i++){
        lis[i].classList.remove('play_current')
    }
    lis[currentsongindex].classList.add('play_current')
    var cu =yinyueku[currentsongindex];
    document.querySelector('.music_name').innerHTML=cu.name;
    document.querySelector('.singer_name').innerHTML=cu.geshou;
    document.querySelector('.music_op').style.display='block';
    document.querySelector('#ptime').innerHTML=cu.duration;
}


}
},false)