---
title: fauvessoj-ui 开发日志-02
tags: [ devlog ]
publishDate: 2023-03-06
description: Tailwind 真香
---

由于第一次做的前端样式我并不是很满意，所以重开了一次，这一次集成了
Tailwind。虽然 Tailwind 还是有很多问题，但还是可以用。

在重开的时候还考虑过使用一个和 Fresh 很像的前端框架 Fresh，但是
由于 Fresh 在 deno v0.13.1 版本的 Language Server 不太友好
所以还是最终决定使用 Astro。虽然 Astro 可能对于搭建 OJ 这样的网
站可能不太友好，但使用 Javascript 还是可以勉强糊弄过去。（但这样
一来 fauvessoj-ui 可能还要作为网关工作了）

现在我在使用 Deno 作为后端，今天尝试了一下 Deno 官方的 Deploy。
体验还不错，尤其是国内访问时，就算没有梯子也上的飞快。但毕竟这只是
一个 Serverless 的环境，之后还是要迁移到服务器上去的。

![](/imgs/foj-snapshot-01.png)

背景图 pid：[78740382](https://www.pixiv.net/artworks/78740382)，
此处仅为测试用途，不是最终效果。