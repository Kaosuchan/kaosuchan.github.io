---
title: vanitas 开发日志-1
tags: [vanitas]
draft: false
publishDate: 2023-08-07
description: 工欲善其事，必先？
---

## Foreword

没错我又来更新 vanitas 这一系列的博客了！虽说现在因为竞赛集训进入组队训练阶段，不敢摸鱼了，导致这边进度缓慢。但我还是以~~做一天和尚撞一天钟~~千里之行始于足下的心态，每周做一点工作，总比没有好。今天趁着休息时间赶了一点进度，刚刚在写代码的时候把 `tab` 键给扣了下来，安不回去了 QwQ，没办法只有用机械键盘来顶着用。（顺便复习了一波 VSCode 的快捷键）趁离入睡还有一会儿，写篇博客来记录这一周的工作(?)。

## Scripting

除非你搞的是纯视觉小说（文艺模式），无论什么样的类 galgame 游戏都或多或少需要编写脚本。这个脚本可能是 python、perl 这样的文本脚本，也可能是使用 UI 来编辑的脚本，当然也可以是二进制代码脚本（不过不推荐这么做）。相较于 UI 脚本，文本脚本更容易实现，也更容易编辑，故在此我们优先考虑文本脚本。

一个很自然的思路是直接使用现有的脚本语言，如 python3。不过如果是 python3 的话脚本可能长这样：

```python
def scene114():
    dialog("", ".")
    dialog("", "..")
    dialog("", "...")
    dialog("Li Hua", "Please write a short essay about the food in Listenbourg.")
    result = choices(["Yes, I will.", "No, GO TO HELL!!"])
    if(result == 0):
        dialog("", "So you write something...")
        monolog(".")
        monolog("..")
        monolog("...")
        monolog("\"something\"")
    else:
        dialog("I", "I'm a teapot.")
        gameover()
    pass
```

嗯……我想应该没有人喜欢这样吧？事实上，python 和 perl 这类语言更适合用来写逻辑代码，而非像上面这个例子，嵌入大量文本。（试想一下，有一款 galgame 中有十万文本，如果每句话都要像上面使用函数调用，不是很烦吗）事实上，绝大多数类 galgame 的引擎中的脚本都是定制的，vanitas 也应如此。目前设想的脚本大概长这样(?)：

```
!scene[114]
    >.<
    >..<
    >...<
    >[Li Hua] Please write a short essay about the food in Listenbourg.<
    ?
        1.[Yes, I will.]
            > So you write something...<
            * .<
            * ..<
            * ...<
            * "something"<<
        2.[No, GO TO HELL.]
            >[I] I'm a teapot.<
            ((gameover))<<<
```

是不是还不如 python3？笑死。

顺带一提最后一行中的 `((gameover))` 其实是 scheme，一种离死谱语言的方言。选择这一语言的原因是其足够短小精悍（r7rs 的规范只有 88 页），容易实现。虽说 Lisp 家族以其非人性化而被大众冷落，不过绝大多数 galgame 本身也不太需要太复杂的逻辑（或者你想开发一款毒瘤游戏），r7rs 足以胜任，最多不过必要时翻一下文档。

## Afterword

这次更的不多，主要是因为写下来以后才发现现在的思路是完全混乱的。等哪天整理好了思路再重新写一篇吧。
