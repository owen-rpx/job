
(function($){$.extend({progressBar:new function(){this.defaults={increment:2,speed:15,showText:true,width:120,boxImage:'images/progressbar.gif',barImage:{0:'images/progressbg_red.gif',30:'images/progressbg_orange.gif',70:'images/progressbg_green.gif'},height:12};this.construct=function(arg1,arg2){var argpercentage=null;var argconfig=null;if(arg1!=null){if(!isNaN(arg1)){argpercentage=arg1;if(arg2!=null){argconfig=arg2;}}else{argconfig=arg1;}}
return this.each(function(child){var pb=this;if(argpercentage!=null&&this.bar!=null&&this.config!=null){this.config.tpercentage=argpercentage;if(argconfig!=null)
pb.config=$.extend(this.config,argconfig);}else{var $this=$(this);var config=$.extend({},$.progressBar.defaults,argconfig);var percentage=argpercentage;if(argpercentage==null)
var percentage=$this.html().replace("%","");$this.html("");var bar=document.createElement('img');var text=document.createElement('span');bar.id=this.id+"_percentImage";text.id=this.id+"_percentText";bar.src=config.boxImage;bar.width=config.width;var $bar=$(bar);var $text=$(text);this.bar=$bar;this.ntext=$text;this.config=config;this.config.cpercentage=0;this.config.tpercentage=percentage;$bar.css("width",config.width+"px");$bar.css("height",config.height+"px");$bar.css("background-image","url("+getBarImage(this.config.cpercentage,config)+")");$bar.css("padding","0");$bar.css("margin","0");$this.append($bar);$this.append($text);}
function getBarImage(percentage,config){var image=config.barImage;if(typeof(config.barImage)=='object'){for(var i in config.barImage){if(percentage>=parseInt(i)){image=config.barImage[i];}else{break;}}}
return image;}
var t=setInterval(function(){var config=pb.config;var cpercentage=parseInt(config.cpercentage);var tpercentage=parseInt(config.tpercentage);var increment=parseInt(config.increment);var bar=pb.bar;var text=pb.ntext;var pixels=config.width/100;bar.css("background-image","url("+getBarImage(cpercentage,config)+")");bar.css("background-position",(((config.width*-1))+(cpercentage*pixels))+'px 50%');if(config.showText)
text.html(" "+Math.round(cpercentage)+"%");if(cpercentage>tpercentage){if(cpercentage-increment<tpercentage){pb.config.cpercentage=0+tpercentage}else{pb.config.cpercentage-=increment;}}
else if(pb.config.cpercentage<pb.config.tpercentage){if(cpercentage+increment>tpercentage){pb.config.cpercentage=tpercentage}else{pb.config.cpercentage+=increment;}}
else{clearInterval(t);}},pb.config.speed);});};}});$.fn.extend({progressBar:$.progressBar.construct});})(jQuery);