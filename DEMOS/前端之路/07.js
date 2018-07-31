function currying(fn, n) {
    return function (m) {
      return fn.call(this, m, n);
    };
  }
  
  function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
  }
  
  const factorial = currying(tailFactorial, 1);
  
  factorial(5)