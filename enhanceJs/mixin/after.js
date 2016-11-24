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