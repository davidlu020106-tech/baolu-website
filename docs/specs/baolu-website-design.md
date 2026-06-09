# Baolu Tech 外贸官网设计文档

## 项目概述
济南宝路科技有限公司（Jinan Baolu Technology Co., Ltd.）外贸官网
专注于反无人机与低空空域安全解决方案的 B2B 英文展示站

## 公司信息
- 成立时间：2015年
- 团队规模：120人
- 总部：山东济南
- 认证资质：CE / FCC / ISO
- 产品属性：自主研发生产

## 品牌定位
Radar-Centric Anti-Drone Solutions（以雷达为核心的反无人机解决方案提供商）
核心差异化：相比竞品 Argustecn（光电为主）、Bonway（仅雷达）、Radardo（地面/近海），宝路覆盖雷达+干扰+频谱+单兵全链条

## 产品线（按优先级）
1. Radar Systems（雷达系统）— 核心主打
2. Countermeasure Systems（干扰反制系统）
3. Spectrum Detection（频谱探测系统）
4. Individual Gear（单兵装备）
5. Electro-Optical（光电，最低优先级）

## 目标市场
全球外贸市场，重点区域：中东、东南亚、非洲、南美

## 信息架构
Home → Products（Radar / Jammer / Spectrum / Individual Gear）→ Solutions（Airports / Border / Military / Infrastructure / VIP / Correctional）→ About Us → Contact

## 技术栈
- 框架：Astro v6（静态站点生成）
- CSS：Tailwind CSS v4
- 品牌色：#0a1628（深色底）/ #e67e22（橙色强调）/ #1a5276（蓝色辅助）
- 字体：Inter
- 部署：GitHub + Vercel（全球 CDN）

## 页面清单（已完成）
1. / — 首页（Hero + 产品快照 + 行业应用 + CTA）
2. /products — 产品总览
3. /products/radar — 雷达产品线
4. /products/jammer — 干扰产品线
5. /products/spectrum — 频谱探测
6. /products/individual-gear — 单兵装备
7. /solutions — 行业方案
8. /about — 关于我们
9. /contact — 联系/询盘

## 待完成
- [ ] 产品详情页填入真实型号与参数
- [ ] 多语言国际化（英文为主，扩展阿语/西语/法语）
- [ ] SEO 配置（sitemap / structured data / meta tags）
- [ ] Google Analytics 埋点
- [ ] 询盘表单后端对接（邮件通知）
- [ ] 产品图片上传
