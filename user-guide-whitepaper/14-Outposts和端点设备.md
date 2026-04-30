# 14 Outposts 和端点设备

## Outpost 是什么

Outpost 是运行在 authentik 外部环境里的组件。

它可以把 authentik 的能力带到其他网络、集群或服务旁边。

常见场景：

- Proxy Provider 保护内部应用。
- LDAP Provider 提供目录协议。
- RADIUS Provider 给网络设备认证。
- RAC 远程访问资源。

## 为什么需要 Outpost

有些协议或代理能力不能只靠核心 Web 服务完成。

例如：

- 代理应用流量。
- 监听 LDAP 协议。
- 监听 RADIUS 协议。
- 连接远程资源。

这时就需要 Outpost 作为外部执行点。

## Outposts 页面

`Applications -> Outposts` 用于管理 Outpost。

常见管理内容：

- 查看 Outpost 列表。
- 查看健康状态。
- 查看绑定的 Provider。
- 更新配置。
- 排查连接问题。

## Outpost Integrations

`System -> Outpost Integrations` 用于配置 Outpost 与运行环境的连接。

常见类型：

- Docker。
- Kubernetes。

## Endpoint Devices

Endpoint Devices 是端点设备模块。

它包含：

- Devices。
- Device access groups。
- Connectors。

## Devices

Devices 表示端点设备。

适合场景：

- 管理远程访问设备。
- 查看设备绑定用户。
- 排查设备访问事件。

## Device access groups

Device access groups 是设备访问组。

它用于把设备按访问范围分组。

## Connectors

Connectors 是连接器。

它用于连接外部端点资源或网络资源。

## 常见排查

| 问题 | 检查 |
| --- | --- |
| Outpost 离线 | Outpost 健康状态、网络、Token、Service Connection |
| Proxy 应用打不开 | Provider、Outpost、External Host、Internal Host |
| LDAP/RADIUS 无响应 | Outpost 是否运行、端口是否暴露、Provider 是否绑定 |
| 端点设备不可用 | Device、Connector、Access Group、事件日志 |

## 新手建议

如果你只是接入普通 OIDC 或 SAML 应用，暂时不需要深入 Outpost。

如果你使用 Proxy、LDAP、RADIUS、RAC，就必须理解 Outpost。
