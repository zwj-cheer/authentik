# 06 提供程序：Providers

## Provider 是什么

Provider 是 authentik 和目标应用之间的“协议连接器”。

目标应用支持什么登录协议，authentik 就需要配置对应类型的 Provider。

Application 负责展示，Provider 负责协议。

## Provider 类型总览

当前应用创建向导支持这些 Provider 类型：

| 类型 | 适合场景 | 新手理解 |
| --- | --- | --- |
| OAuth2/OIDC | 现代 Web 应用 | 最常见的单点登录协议 |
| SAML | 企业 SaaS、传统商业系统 | 企业软件常见 SSO 协议 |
| SAML Metadata Import | 对方提供 SAML 元数据文件 | 用文件快速导入配置 |
| Proxy | 应用不支持 SSO | authentik 在前面做代理保护 |
| LDAP | 需要 LDAP 协议的应用 | 把 authentik 当目录服务 |
| RADIUS | VPN、网络设备、无线认证 | 网络设备认证 |
| SCIM | 用户和组同步 | 自动把用户推给应用 |
| RAC | 远程访问 | 管远程应用或资源访问 |
| WS-Fed | 支持 WS-Federation 的系统 | 部分微软生态或旧系统 |

## OAuth2/OIDC Provider

适合现代 Web 应用。很多系统都支持 OIDC。

常见字段：

| 字段 | 作用 | 新手建议 |
| --- | --- | --- |
| Provider Name | Provider 名称 | 写清楚对应应用 |
| Authorization Flow | 授权时使用的流程 | 默认先选系统已有授权 Flow |
| Client Type | 客户端类型 | 后端服务选 Confidential，纯前端选 Public |
| Client ID | 应用 ID | 可使用系统生成值 |
| Client Secret | 应用密钥 | Confidential 类型需要保密 |
| Redirect URIs | 登录成功后的回调地址 | 必须和目标应用配置一致 |
| Logout URI | 登出通知地址 | 目标应用支持 OIDC Logout 时填写 |
| Signing Key | 签发令牌的密钥 | 没有特殊需求可用默认/现有证书 |
| Authentication Flow | 用户未登录时走的认证流程 | 一般用默认认证流程 |
| Invalidation Flow | 登出流程 | 一般用默认 provider invalidation flow |
| Access Code Validity | 授权码有效期 | 默认短时间即可 |
| Access Token Validity | 访问令牌有效期 | 时间越长风险越高 |
| Refresh Token Validity | 刷新令牌有效期 | 根据应用需要设置 |

重点：

- Redirect URI 最容易填错。
- Client Secret 不要泄漏。
- Public Client 通常需要 PKCE。
- Scope 和 Property Mapping 决定应用能拿到哪些用户信息。

## SAML Provider

适合企业 SaaS 和传统系统。

常见字段：

| 字段 | 作用 | 新手建议 |
| --- | --- | --- |
| ACS URL | SAML 响应回调地址 | 从目标应用复制 |
| Issuer / Entity ID | 应用唯一标识 | 与目标应用保持一致 |
| Audience | 受众限制 | 目标应用要求时填写 |
| SLS URL | 单点登出地址 | 目标应用支持时填写 |
| Signing Certificate | 签名证书 | 推荐配置，避免信任问题 |
| Verification Certificate | 校验传入请求签名 | 对方会签名请求时配置 |
| Encryption Certificate | 加密断言 | 对方要求加密时配置 |
| Property mappings | 传给应用的用户字段 | 按应用要求选择 |
| NameID Property Mapping | 用户唯一标识 | 常用邮箱或用户名 |
| Assertion validity | 断言有效时间 | 默认几分钟，避免时间漂移问题 |

重点：

- ACS URL 和 Entity ID 必须匹配。
- 证书过期会导致登录失败。
- NameID 是很多 SAML 应用识别用户的关键。

## Proxy Provider

适合目标应用本身不支持 SSO 的情况。

它有三种模式：

| 模式 | 作用 |
| --- | --- |
| Proxy | authentik 像透明反向代理一样保护应用 |
| Forward auth single application | 每个应用单独配置 forward auth |
| Forward auth domain level | 一个根域下多个应用共用认证 |

常见字段：

| 字段 | 作用 |
| --- | --- |
| External host | 用户访问的外部地址 |
| Internal host | authentik 转发到的内部地址 |
| Internal host SSL Validation | 是否校验上游 SSL 证书 |
| Cookie domain | 认证 Cookie 生效域名 |
| Token validity | 代理令牌有效期 |
| Unauthenticated Paths/URLs | 不需要认证的路径或 URL |
| Intercept header authentication | 是否拦截 Authorization 头 |
| Send HTTP-Basic Authentication | 是否向上游发送 Basic Auth |

重点：

- External host 是用户看到的地址。
- Internal host 是真实应用地址。
- Forward auth domain 模式中 Cookie domain 很关键。

## 新手怎么选 Provider

优先级建议：

1. 目标应用支持 OIDC：选 OAuth2/OIDC。
2. 目标应用只支持 SAML：选 SAML。
3. 目标应用不支持任何 SSO：选 Proxy。
4. 目标应用要同步用户：看 SCIM。
5. VPN 或网络设备认证：看 RADIUS。
6. 旧系统需要 LDAP：看 LDAP。

## 常见错误

| 错误 | 表现 | 处理 |
| --- | --- | --- |
| Provider 类型选错 | 目标应用无法对接 | 先看目标应用支持协议 |
| 回调地址不一致 | 登录后失败 | 对照目标应用配置 |
| 证书配置错误 | SAML 或 TLS 失败 | 检查 Certificates |
| Token 有效期过长 | 安全风险变高 | 按需缩短 |
| Proxy 内外地址混淆 | 页面打不开或跳转错 | 明确 External 和 Internal |
