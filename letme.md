### topN 算法 以及 逆算法（随笔）
	
	注解：所谓的 topN 算法指的是 在 海量的数据中进行排序从而活动 前 N 的数据。 这就是所谓的 topN 算法。当然你可以说我就 sort 一下 排序完了直接取 slice(0, n) 不就好咯。 但是这的性能会很差~ 那到底能有多差，这篇文章会给大家一个 直观的感受。

	
#### 第一步、造数据

	有排序，那么必须先得有数据 才能在这基础上进行下一步的操作。

```javascript
    let arr = []
    for (let i = 0; i < 2000; i++) {
        arr.push(i)
    }
	console.log(arr)    // [0, 1, 2, ..., 10000]
```

#### 第二步、 打乱数据

	ok, 现在 数据原料有了，但是呢，现在这个的排序是正常的。我们现在要做的就是打乱这 10000 个数字的顺序。 thinking ， emmmmmm。 好像没什么好的办法。 思路： 既然是要随机乱排列。那么随机数 Math.random() 可以获取一个 随机数 通过这个随机数，我们可以有什么作为呢？

	 这个时候，我们想到了 一个 最low 的办法， sort 排序。 然后再利用 random 随机数。 好了，我们试一试

```javascript
    for (var m = 0; m < arr.length; m++) {
        arr.sort( function() {
            return 0.5 - Math.random()
        })
    }
	console.log(arr)
```

	没错就是这样，数据就被随机打乱了~~~ 但是性能如何呢？
	我们专门来测试了一番。

#### 第三步、 打乱数据 性能测试。

	我们先从 循环 1000 来逐步加大运算量，看看我们的浏览器到哪一步会挂 =。=   --- 代码如下：

```javascript
    let arr = []
    let sTime = new Date().getTime()
    console.log('第一步' + sTime)
    for (let i = 0; i < 1000; i++) {
        arr.push(i)
    }
    console.log('第二步' + arr)
    console.log(new Date().getTime() - sTime)
    for (var m = 0; m < arr.length; m++) {
        arr.sort( function() {
            return 0.5 - Math.random()
        })
    }
    console.log('第三步' + arr)
    console.log(new Date().getTime() - sTime)
```

#####  （1） 1000 循环的结果：
![](http://images2017.cnblogs.com/blog/675289/201710/675289-20171016190858271-1818392687.png)

	造数据：   4 ms
	打乱数据： 600 ms （多次平均值）

#####  （2） 2000 循环的结果：
![](http://images2017.cnblogs.com/blog/675289/201710/675289-20171016191135881-1542868079.png)

![](http://images2017.cnblogs.com/blog/675289/201710/675289-20171016191150349-2073593519.png)

	造数据：   8 ms
	打乱数据： 2500 ms （多次平均值）

#####  （3） 5000 循环的结果：


![](http://images2017.cnblogs.com/blog/675289/201710/675289-20171016191506177-1081515609.png)

![](http://images2017.cnblogs.com/blog/675289/201710/675289-20171016191519427-1782949701.png)

	造数据：   8 ms
	打乱数据： 18000 ms （多次平均值）

实在是 不想测试 10000 次 数据通过 sort 打乱的过程。 时间 tooooooo loooooooong...

#### 第四步、 再获得 topN 个数字 

	我们通过 可以想到的所有方法 对上面的 2000 次计算的数据进行有效的排序。
	sort()？
	二叉树？
	使用最大堆排序，然后取出前N名？
	分成 N * 10 个数组，获取其中的最大值，再排序 ？

##### （1） sort()  排序法
	
	代码如下：

```javascript

    arr.sort(function(a, b) {
        return a - b
    })
    console.log('第四步' + arr)

```

	结果：

![](http://images2017.cnblogs.com/blog/675289/201710/675289-20171016193818490-2142781082.png)

	很神奇，在仅仅只有 5000 的数据量的时候 sort 排序 速度居然也还是很快。 平均值在  6ms 左右。


##### （2） sort()  分成 N * 10 个数组，获取其中的最大值，再排序

	晚上回家继续写~~~ 敬请期待
