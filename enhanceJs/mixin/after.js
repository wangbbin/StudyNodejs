console.log('after');

function Power(n, p)   
{ // 计算n的p次方
    var odd = 1; //oddk用来计算“剩下的”乘积
    while (p > 1)  
    { // 一直计算到指数小于或等于1
       if (( p & 1 )!=0)  
      { // 判断p是否奇数，偶数的最低位必为0
             odd *= n; // 若odd为奇数，则把“剩下的”乘起来
      }  
      n *= n; // 主体乘方
      p = parseInt(p / 2); // 指数除以2
     }  
    return n * odd; // 最后把主体和“剩下的”乘起来作为结果
}  

/*计算n^p*/  
function power(n,p) { 
	var k = 1; 
  for(var i=0;i<p;i++) k*=n;  
  return k;  
} 

// IE6,7支持inline元素转换成inline-block，但不支持block元素转换成inline-block，所以非inline元素在IE6,7下要转换成inline-block，需先转换成inline，然后触发hasLayout，以此来获得和inline-block类似的效果；你可以这样：
// 全兼容的inline-block：
// div {
//   display: inline-block;
//   *display: inline;
//   *zoom: 1;
// }

// 多线程单进程
// 多线程的设计之处就是为了在共享的程序空间中，实现并行处理任务，
// 从而达到充分利用CPU的效果。多线程的缺点在于执行时上下文交换的开销较大，
// 和状态同步（锁）的问题。同样它也使得程序的编写和调用复杂化。创建、销毁线程以及在线程间切换所需的开销和复杂性
// 单线程多进程
// 为了避免多线程造成的使用不便问题，有的语言选择了单线程保持调用简单化，
// 采用启动多进程的方式来达到充分利用CPU和提升总体的并行处理能力。 
// 它的缺点在于业务逻辑复杂时（涉及多个I/O调用），因为业务逻辑不能分布到多个进程之间，
// 事务处理时长要远远大于多线程模式。