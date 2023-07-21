---
title: GSACA 简介
tags: [note]
draft: true
publishDate: 2023-07-01
description: 对于 GSACA 的一个简单介绍
---

## Foreword

GSACA 是第一个非递归式线性后缀排序算法，其由 Baier 在其博士论文中提出。不过正如 Baier 所言，GSACA 更像是 2003 年“后缀排序时代”的晚产儿，而不是最先进的技术。GSACA 在实际测试中运行效率并不高，大概和 DC3 一个水平，且需要很多额外空间。但是，这一算法中所运用的数学模型却很有意思。比如，<b>虽然原论文中通篇都没有出现 <q>Lyndon</q> 一词，Baier 的算法是第一个利用 Lyndon 数组来进行后缀排序的算法。</b>且这一算法本身也是后缀数组和 Lyndon 数组可以在 $O(n)$ 的时间内相互推出的一个证明。此外，这一算法中提出的 $\text{pss}$ 和 $\text{nss}$ 数组（这两个名称是后人取的）也由很多比较有趣的性质。因此本人认为还是有必要写个简单(?)的介绍。

## Definition 1-16

1. 字符串是由多个字符（元素）组成的序列，下标从 $1$ 开始。组成字符串的所有（可能出现的）字符组成的集合称为字符集，记为 $\Sigma$。
2. 空串 $\epsilon$ 是长度为 $0$ 的字符串。
3. $S[i]$ 表示字符串 $S$ 下表为 $i$ 的字符。特别的，若 $i=0$ 或 $i>|S|$，则有 $S[i]=\#\notin\Sigma$。
4. 定义字符串 $S=T\Longleftrightarrow \forall{i\isin N},\ S[i]=T[i]$。
5. 定义字符串的子串 $S[l\dots r]$ 为将 $S$ 下标从 $l$ 到 $r$ 的字符抽出所组成的字符串。如 $S=\texttt{abbaa}$，$S[2\dots 4]=\texttt{bba}$。特别的，若 $l>r$，则定义 $S[l\dots r]=\epsilon$。此外，定义 $S[i\dots j]=S[i, j+1)=S(i-1,j]=S(i-1,j+1)$。
6. 定义字符串的前缀 $\text{Prefix}(S,i)=S[1\dots i]$。
7. 定义字符串的后缀 $\text{Suffix}(S,i)=S_i=S[i\dots |S|]$。
8. 定义 $\text{Border}(S)=\{k\in[1,|S|]\cap\N\ |\ \text{Prefix}(S,k)=\text{Suffix}(S,|S|-k+1)\}$。
9. 称 $q\in[1,|S|)\cap \N$ 为 $S$ 的周期当且仅当 $\forall i\isin[1,|S|-q],\ S[i]=S[i+q]$。
10. 定义字符串的拼接 $ST$ 为将 $S$ 和 $T$ 首尾相接所形成的新字符串。

在这里，我们不妨规定字符间存在着大小关系且唯一，如可以按照字母表顺序比较字符的大小。特别的，$\#$ 是最小的字符。则可以马上得到字典序、后缀数组及 Lyndon 串的定义

11. 定义两个不同的字符串 $S<T$ 当且仅当 $S[1]<T[1]$，或者 $S[1]=T[1]$ 且 $S_2<T_2$。
12.  定义一个字符串 $S$ 的后缀数组 $\text{SA}[\ ]$ 是一个长度为 $|S|$，下标从 $1$ 开始的数组。其中的元素为 $1\sim n$ 的一个排列，且满足
    $$
        \forall i \in [1,|S|)\cap\N ,\ S_{\text{SA}[i]}<S_{\text{SA}[i+1]}
    $$
13.  定义一个字符串 $S$ 为 Lyndon 串当且仅当其对应的后缀数组满足 $\text{SA}[1]=1$。

以及三个全新的概念

14.  定义字符串 $S$ 的 $\text{pss}$ 数组是一个长度为 $|S|$，下标从 $1$ 开始的数组，且满足
    $$
        \text{pss}[i]=\max \{ k\in[0,i)\cap\N\ |\ S_k< S_i\}
    $$
15.  定义字符串 $S$ 的 $\text{nss}$ 数组是一个长度为 $|S|$，下标从 $1$ 开始的数组，且满足
    $$
        \text{nss}[i]=\min \{ k\in(i,|S|+1]\cap\N\ |\ S_k< S_i\}
    $$
16.  定义字符串 $S$ 的 Lyndon 数组（记作 $\lambda[\ ]$）是一个长度为 $|S|$，下标从 $1$ 开始的数组，且满足
    $$
        \lambda[i]=\max \{ k\in\N_+\ |\ S[i,i+k) \text{ is a Lyndon word.}\}
    $$
