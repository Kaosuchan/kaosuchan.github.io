---
title: 关于 ECNA 2021 C
tags: [solution]
draft: false
publishDate: 2023-08-10
description: 难得写一次题解
---

> 2023.8.23 UPD
> 
> 本文中所谓的“正三十面体”应为“棱面三十面体”。事实上也不存在正三十面体。（本人立体几何水平有限，如有错误，还请诸君指教）

## Foreword

我本人不是特别爱写题解，不像我的队友，每次打完比赛都要写一篇。不过[这道题](https://codeforces.com/gym/104196/problem/C)比较有意思，且网上题解寥寥无几，就不由自主地补了一篇。

## Solution

题目让我们尝试拼一个正三十面体，我们固定第一个零件，难点在于如何不漏地遍历另外两个零件的所有可能放置位置，这需要求出正三十面体的旋转置换群。正三十面体有 $31$ 根对称轴，直接枚举不大可能。不过通过~~打表~~观察可以发现只需其中两个对称轴的置换即可张成整个置换群，故找出两个即可。

这一结论的证明较为繁琐，此处仅提思路：从正三十面体的中心向其中一个顶点引出一个有向线段，通过围绕其中两个对称轴做旋转变换，可以使得该有向线段的终点变到 $30$ 个顶点中的任意一个。

## Code

```cpp
#include <set>
#include <cstdio>
#include <iostream>
#include <cstring>
#include <vector>
#include <algorithm>

constexpr int rot[2][31] = {
	{  0,  2,  3,  4,  5,  1,  7,  8,  9, 10,  6,\
          13, 14, 15, 16, 17, 18, 19, 20, 11, 12,\
          22, 23, 24, 25, 21, 27, 28, 29, 30, 26 },
	{  0,  3,  7, 13, 14,  8,  2, 12, 22, 15,  4,\
       6, 11, 21, 27, 28, 23, 16,  9,  5,  1, 20,\
       26, 29, 17, 10, 19, 25, 30, 24, 18 },
//  {  0,  7, 13, 14,  8,  3, 12, 22, 15,  4,  2,\
      21, 27, 28, 23, 16,  9,  5,  1,  6, 11, 26,\
      29, 17, 10, 20, 25, 30, 24, 18, 19 }
};

using std::cin, std::cout;

std::set<int> *st[2];

void dfs(int now, const std::vector<int> &v, int t) {
	int vvv = 0;
	for(int v: v) vvv |= 1 << (v - 1);
	if(st[t]->find(vvv) != st[t]->end()) return ;
	st[t]->insert(vvv);
	for(int i = 0; i < 2; ++i) {
		int nn = rot[i][now];
		std::vector<int> nv;
		for(auto v: v) nv.push_back(rot[i][v]);
		dfs(nn, nv, t);
	}
}

int main() {
	int n, s, t;
	cin >> n; while(n--) cin >> t, s |= 1 << (t - 1);
	memset(st, -1, sizeof st);
	for(t = 0; t < 2; ++t) {
		st[t] = new std::set<int>();
		cin >> n;
		std::vector<int> v(n);
		for(auto &v: v) cin >> v;
		dfs(1, v, t);
	}
	for(auto ii: *st[0]) for(auto jj: *st[1])
		if((ii & jj) == 0 && (ii & s) == 0 &&
			(jj & s) == 0 && (ii | jj | s) == (1 << 30) - 1) return puts("Yes"), 0;
	return puts("No"), 0;
}
```

## Afterword

上述结论出了可以帮忙解决这一问题外，似乎还有很多用途。我已经有了一个毒瘤的点子，可惜现在我困了，不想写了。晚安。
