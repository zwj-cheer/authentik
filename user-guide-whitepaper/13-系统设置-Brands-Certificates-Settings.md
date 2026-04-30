# 13 系统设置：Brands、Certificates、Settings

## System 是什么

System 是系统级配置模块。

它包含：

- Brands。
- Certificates。
- Outpost Integrations。
- Settings。

这些配置通常影响范围较大，新手修改前要谨慎。

## Brands

Brand 是品牌和域名配置。

它决定：

- 哪个域名使用哪个品牌。
- 登录页标题。
- Logo。
- Favicon。
- 默认认证 Flow。
- 默认登出 Flow。
- 默认用户设置 Flow。

小白可以这样理解：

Brand 是“用户看到的门面”和“这个域名走哪套默认流程”。

常见操作：

- 修改登录页名称。
- 修改 Logo。
- 设置默认认证流程。
- 设置默认用户设置流程。
- 为不同域名设置不同品牌。

注意：

如果改错 Brand 的认证 Flow，可能影响用户登录。

## Certificates

Certificates 管理证书和密钥对。

常见用途：

- SAML 签名。
- SAML 加密。
- TLS。
- Token 签名。
- Provider 或 Source 信任关系。

新手要知道：

- 证书过期会导致登录失败。
- SAML 很依赖证书。
- 删除证书前要确认有没有 Provider 正在使用。

## Outpost Integrations

Outpost Integrations 管理 Outpost 的服务连接。

常用于：

- Docker Outpost。
- Kubernetes Outpost。
- Proxy、LDAP、RADIUS、RAC 等外部组件连接。

## Settings

Settings 是全局设置。

通常包括系统行为、默认配置、页脚链接、全局参数等。

新手建议：

- 不确定字段作用时不要随意修改。
- 修改后用测试用户验证登录、应用库、授权和登出。

## 常见错误

| 错误 | 后果 | 处理 |
| --- | --- | --- |
| 改错 Brand 默认认证 Flow | 用户无法登录 | 恢复原 Flow 或切换测试 Brand |
| 删除正在使用的证书 | SAML/OIDC/Proxy 失败 | 先检查引用关系 |
| 证书过期没更新 | 登录或签名失败 | 提前检查证书有效期 |
| 全局设置随意改 | 影响所有用户 | 小范围测试后再改 |
