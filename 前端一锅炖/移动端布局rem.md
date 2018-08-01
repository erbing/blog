### 画外篇 --- 关于 rem 布局方法

```javascript
//针对客户端不能改变浏览器窗口大小的可以这样写 
(function () { var defaultFontSize = 14; 	// 期望浏览器字体大小	
document.documentElement.style.fontSize = Math.min(640, Math.max(document.documentElement.clientWidth, 320)) / 320 * defaultFontSize + 'px' })() 
// 针对客户端可以改边浏览器窗口大小的
(window.__setFontSize__ = function () { var defaultFontSize = 14; 
//期望浏览器字体大小 
document.documentElement.style.fontSize = Math.min(640,Math.max(document.documentElement.clientWidth, 320)) / 320 * defaultFontSize + 'px' })() window.addEventListeners('resize',window.__setFontSize__); 
// 客户端 
// 设计稿宽度 designWidth 
// 期望浏览器字体大小 defaultFontSize 14 
// px 
//设计稿量得实际像素 
// rem =(px/2)/(defaultFontSize/640)/defaultFontSize*1rem 
// sass function 最佳实践如下

/** $designWidth = 750; $ratio = designWidth/640； @function r($px, $isFixed: true) { @if $px != 0 { @return if($isFixed, $px / $ratio + 0.01, $px / $ratio) / $browser-default-font-size * 1rem; } @else { @return 0; } } */

```