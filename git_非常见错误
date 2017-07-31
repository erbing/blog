### 在使用 Git pull 时候报错  error: inflate

		具体的错误是 这样的 error: inflate: data stream error (unknown compression method)

![](http://images2017.cnblogs.com/blog/675289/201707/675289-20170731154138693-1826087548.png)

		最后经过排查是 因为 git 记录一些文件的版本指针 被损坏了， （被损坏的过程，可能不是认为导致的，而是 可能你正在 push 或者 pull 一些文件的时候，电脑突然断电或者关机了。 就可能会导致这个异常发生）

		那，我们怎么去解决了？？？

		这个时候就需要 一个 git 利器指令， git fsck --full

		如图


![](http://images2017.cnblogs.com/blog/675289/201707/675289-20170731154627349-1538767729.png)

		然后， 对。 就是然后。  这里提示的 一串 字符串： 128f146......a7f

		这串 字符串的 前 2 位  是 你的 .git/objects/ 文件夹下 对应的 文件夹目录， 然后 cd  ./12   删除掉 这个 字符串（我的理解这个是 指针） rm 8f146...


		删除掉之后， 再 回来 执行 git fask --full

		如果还是 报类似的 错误， 继续去 .git/objects/ 文件夹下 删除对应的 文件就好了， 直到 显示如图

![](http://images2017.cnblogs.com/blog/675289/201707/675289-20170731155242630-1238632277.png)

		这个时候，就只剩下最后一步了： 删除 .git/refs/remotes/origin 文件夹下面的  master 文件 即可。

		最后你就可以再 愉快的 抽（pull）推（push）啦~~
