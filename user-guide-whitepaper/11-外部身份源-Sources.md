# 11 外部身份源：Sources

## Source 是什么

Source 是外部身份来源。

如果用户不是直接在 authentik 本地创建，而是来自外部系统，就会用到 Source。

常见外部系统：

- LDAP / Active Directory。
- Google。
- SAML 身份提供商。
- OAuth2 社交登录。
- SCIM。
- Telegram。
- Plex。

## Source 和 Provider 的区别

这是新手常混淆的点。

| 对象 | 方向 | 白话解释 |
| --- | --- | --- |
| Source | 外部身份进入 authentik | 让用户从外部登录或同步进来 |
| Provider | authentik 给外部应用登录 | 让业务应用使用 authentik 登录 |

一句话：

- Source 是“人从哪里来”。
- Provider 是“应用怎么接入 authentik”。

## LDAP Source

适合从 LDAP 或 AD 同步用户和组。

常见关注点：

- Server URI。
- Bind DN。
- Bind Password。
- Base DN。
- User object filter。
- Group object filter。
- 用户属性映射。
- 组属性映射。
- 是否同步组。

新手重点：

- 先确认网络连通。
- 先用小范围 Base DN 测试。
- 先同步少量测试用户。
- 再扩大范围。

## OAuth Source

适合让用户用外部 OAuth 服务登录。

常见关注点：

- Client ID。
- Client Secret。
- Authorization URL。
- Token URL。
- Profile URL。
- Scopes。
- 属性映射。

## SAML Source

适合接入外部 SAML IdP。

常见关注点：

- 对方的 Entity ID。
- SSO URL。
- 证书。
- NameID。
- 属性映射。
- 登录 Flow。

## SCIM Source

适合外部系统把用户和组同步到 authentik。

常见关注点：

- Token。
- 用户匹配模式。
- 组匹配模式。
- 属性映射。
- 删除策略。

## 属性映射

Source 经常需要 Property Mapping。

它负责把外部系统里的字段转换成 authentik 里的用户或组属性。

例子：

| 外部字段 | authentik 字段 |
| --- | --- |
| mail | email |
| cn | name |
| sAMAccountName | username |
| department | attributes.department |

## 常见错误

| 错误 | 后果 | 处理 |
| --- | --- | --- |
| Source 和 Provider 搞反 | 配置方向错误 | 先判断是用户进来还是应用出去 |
| Base DN 范围太大 | 同步大量无关对象 | 先小范围测试 |
| 属性映射错误 | 用户名、邮箱不对 | 检查 Property Mapping |
| 组匹配策略不当 | 组重复或无法关联 | 先确定匹配字段 |
| 删除策略太激进 | 用户被误删 | 测试稳定后再启用删除 |
