# authentik 小白管理白皮书

这套文档面向完全没有接触过 authentik 的使用者。它按当前项目后台的真实功能分类来写，目标是让你看完后能独立完成日常管理：登录后台、创建用户、接入应用、配置权限、查看日志、排查常见问题。

## 建议阅读顺序

1. [00-阅读说明.md](00-阅读说明.md)
2. [01-项目总览.md](01-项目总览.md)
3. [02-核心概念白话解释.md](02-核心概念白话解释.md)
4. [03-登录与用户门户-Flow和User.md](03-登录与用户门户-Flow和User.md)
5. [04-管理后台总览.md](04-管理后台总览.md)
6. [05-应用程序-Applications.md](05-应用程序-Applications.md)
7. [06-提供程序-Providers.md](06-提供程序-Providers.md)
8. [07-应用创建向导逐页说明.md](07-应用创建向导逐页说明.md)
9. [08-用户和用户组-Directory.md](08-用户和用户组-Directory.md)
10. [09-权限和策略-Policies.md](09-权限和策略-Policies.md)
11. [10-流程和阶段-Flows-and-Stages.md](10-流程和阶段-Flows-and-Stages.md)
12. [11-外部身份源-Sources.md](11-外部身份源-Sources.md)
13. [12-事件日志和排查-Events.md](12-事件日志和排查-Events.md)
14. [13-系统设置-Brands-Certificates-Settings.md](13-系统设置-Brands-Certificates-Settings.md)
15. [14-Outposts和端点设备.md](14-Outposts和端点设备.md)
16. [15-Blueprints批量配置.md](15-Blueprints批量配置.md)
17. [16-日常管理操作手册.md](16-日常管理操作手册.md)
18. [17-常见问题排查手册.md](17-常见问题排查手册.md)
19. [18-管理员上手路线图.md](18-管理员上手路线图.md)

## 文档依据

本文档依据当前项目文件整理，重点参考：

- `README.md`
- `web/README.md`
- `Makefile`
- `web/src/admin/navigation/sidebar.ts`
- `web/src/admin/Routes.ts`
- `web/src/user/Routes.ts`
- `web/src/admin/applications/ApplicationForm.ts`
- `web/src/admin/applications/wizard/steps/*`
- `authentik/policies/models.py`

## 一句话总览

authentik 是统一登录和身份管理系统。用户先通过 authentik 登录，authentik 再根据应用、协议、流程、策略和用户身份，决定用户能不能进入目标应用。
