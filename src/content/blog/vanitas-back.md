---
title: vanitas 重启计划及架构设计
tags: [vanitas]
draft: false
publishDate: 2023-07-31
description: 重启了一下 2021 初做过的一个小项目
---

## Foreword

最近听闻我的一名高中同学竞赛失利，正好我对于竞赛也颇有微词，两人便开始讨论起竞赛的十宗罪，其中就包括占用课余时间啥的，顺口便提及了搭 oj 和 vanitas 的事——原本是想说继续之前一直在咕咕的 foj 项目，不过他却建议我换个方向（毕竟现在已经有 UOJ、LOJ 这样的优秀开源在线评测系统了），我便想起了两年前做过的 vanitas，一个视觉小说的简单引擎。加之最近玩 lb 有点入迷，也想自己来做一个 galgame 之类的游戏，便有了这篇博客来梳理思路。

## Introduction

vanitas 是一款用于制作视觉小说及所谓的 galgame 的游戏引擎。初代版本的 vanitas 的设计基于网页前端，而新架构则致力于前后端分离，将游戏的底层逻辑引擎（平台无关）和前端 UI（平台相关）分离，从而尽可能做到跨平台。vanitas 还应该是一款国际化的游戏引擎，支持游戏内语言切换，且提供友好的翻译校对界面。此外，vanitas 还应该保留一定的拓展性和可定制性，方便加入各种新场景及动态更新。

## New Game Plus - Global conTeXt

许多单机游戏中都有 N 周目的设定，在视觉小说中这也不例外。但和其他游戏最大的不同在于相当一部分 galgame （尤其是 2010 年以前的作品）中之前通关的周目会对新周目产生影响——小则出现之前没有的选项，大则包括人物性格、故事环境之类的剧情设定大改。（如果你玩过 key 社的早期作品或者「心跳文学社」的话应该对此感悟较深）为了友好地支持上述功能，vanitas 提出了一个不同于传统游戏上下文的新概念——Global conTeXt，或者简称为 gtx。与之对应的和周目无关上下文则称为 ConTeXt，或者简称为 ctx。

事实上，就我的浅浅的视觉小说阅历而言，除去游戏中可能会插入的一些小游戏系统（如~~战斗排位赛~~），ctx 中所需要记录的东西其实往往很少，大不了记录下我们的主角身上有几盒火柴、几只打火机，有爆竹没有。且 ctx 越复杂，流程往往越复杂，在无攻略游玩时的难度越大，在此建议慎重使用，尤其是和 gtx 结合使用。（[极简模式](#minimal)下不允许使用 ctx）gtx 通常也不是很复杂，但是有助于塑造游戏的轮回感（点名某前翼社作品），且也增加了反复攻略时的趣味，但也忌滥用。（[极简模式](#minimal)下 gtx 不能用于改变剧情）

对于 gtx 的修改一般而言都是在游戏达到某个结局时，而有些隐藏剧情可能需要某些特定 gtx 满足条件才可开启，这使得玩家想要开启这一隐藏剧情就必须先打通特定的结局。不过这也有个漏洞：如果玩家在隐藏剧情前存档，在打完其他线后读档，就可以在一周目存档中体验所有剧情。为此有一个解决方案是 Locked Global conTeXt（abbr. lgtx），即每次新开始游戏时将 gtx 归一份档，在当前周目时以此 lgtx 为准。这样可以很大程度上避免不同周目非顺序攻略带来的影响。不过这对于玩家而言可能不太友好，因此建议仅在对于游戏剧情的严谨性有严格要求时使用 lgtx。（[极简模式](#minimal)下不允许使用 lgtx）

## Supporting Types

vanitas 计划支持以下三种视觉小说模式。

### 文艺模式

这一模式不允许任何 ctx 和 gtx 的使用，也不允许有任何与玩家的互动，包括选项，仅仅将游戏引擎作为展示剧情画面的载体，功能受限，游戏性也最差。（但有些作品反而在文艺模式观感更好，如「魔法史之夜」）<span id="minimal">

### 极简模式

极简模式不允许使用 ctx 和 lgtx，且不能使用 gtx 来修改剧情（如文本、插图等）。现阶段 gtx 只能改变游戏的流程，即通过隐藏一些选项，强制玩家必须先攻略其他的线，再回过头攻略被隐藏的线。这样做的好处在于使得剧情跳转变得方便起来。即使 gtx 发生改变，每一处的剧情在任何周目，任何时候都是一样的，在快速跳转（如常见的跳至前一/后一选项）时不会跳过**未读文本**。更进一步的说，极简模式下的的整个游戏的剧情可以被表示为一个自动机，玩家从初始状态（或者其中某一个已读状态）出发，通过选项在不同的节点状态间更改。每个节点处的剧情内容都是一样的，不会随 gtx 的改变而变化。gtx 唯一的作用是暂时限制玩家的部分选项，使得某些内容比另一些内容先被攻略。在极简模式下，还可以导出一张流程图，供玩家快速跳转剧情使用。

理论上，极简模式也可以插入小游戏，但是你需要确保小游戏的结果不会对游戏剧情造成干扰。（允许使用 gtx 更改小游戏的内容，不过不建议这么做）

显然，文艺模式是极简模式的一个子集，故而也支持上述功能。

### 传统模式

没有任何限制的模式，传统的视觉小说大都是这一模式。相较于以上两者游戏性更强，但是难度（无论是剧情层面还是操作层面）也会相应增大。建议即使选用传统模式也尽可能避免 ctx、gtx 的滥用。

## Overview of Architecture

vanitas 的前后端分离，后端用于处理剧情脚本、图片、音乐等资源，并传输指令给前端，教导前端如何展示这些内容；前端则负责展示内容以及和用户的交互，并将展示结果及用户的操作反馈给后端进行处理。这样，我们可以很大程度上在保持后端和资源不变的情况下，只需编写支持不同平台的前端即可实现跨平台。

<span class="text-gray-300">今天先更到这里，我困了，先咕咕。</span>