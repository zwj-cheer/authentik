# 08 用户和用户组：Directory

## Directory 是什么

Directory 是身份目录模块。它管理用户、用户组、角色、外部身份源、令牌和邀请。

当前后台中 Directory 包含：

- Users
- Groups
- Roles
- Initial Permissions
- Federation and Social login
- Tokens and App passwords
- Invitations

## Users

Users 是用户账号列表。

用户代表一个可以登录 authentik 的身份。

常见管理动作：

- 创建用户。
- 修改用户资料。
- 设置或重置密码。
- 加入或移出用户组。
- 查看用户事件。
- 管理用户 MFA。
- 禁用异常用户。

## Groups

Groups 是用户组。

建议把权限尽量给组，而不是给单个用户。

例子：

| 用户组 | 用途 |
| --- | --- |
| 全员 | 所有员工都能访问的应用 |
| 研发部 | 研发系统、代码仓库、CI/CD |
| 运维组 | 监控、日志、堡垒机 |
| 财务组 | 财务和报销系统 |
| 管理员 | 管理后台权限 |

## Roles

Roles 是角色，通常用于管理后台权限。

可以理解为“后台能做什么”的权限集合。

用户或组拥有某个 Role 后，就能获得该 Role 中包含的权限。

## Initial Permissions

Initial Permissions 是初始权限配置。

它用于定义某些对象创建后默认授予哪些权限。新手一般不需要一开始深入修改。

## Federation and Social login

这个页面对应 Sources，也就是外部身份源和社交登录。

常见用途：

- 用 LDAP/AD 作为用户来源。
- 用外部 OAuth 登录。
- 用 SAML 身份源登录。
- 用 SCIM 同步用户。

## Tokens and App passwords

Tokens 和 App passwords 用于程序化访问或特殊登录场景。

管理时注意：

- Token 要当作密码看待。
- 不使用的 Token 要及时删除。
- 尽量限制 Token 权限和有效期。

## Invitations

Invitations 用于邀请用户注册或加入。

适合场景：

- 给新员工发邀请。
- 让外部协作者自己完成注册流程。
- 控制邀请有效期和可用次数。

## 新手推荐管理方式

1. 先规划用户组。
2. 创建用户。
3. 把用户加入用户组。
4. 应用访问权限绑定用户组。
5. 后台管理权限通过 Role 分配。
6. 特殊账号单独记录用途。

## 常见错误

| 错误 | 后果 | 正确做法 |
| --- | --- | --- |
| 所有权限都给个人用户 | 后期难维护 | 按组授权 |
| 管理员组成员太多 | 安全风险高 | 最小化管理员人数 |
| 离职用户只从某个应用删 | 其他应用仍可访问 | 在 authentik 中禁用或删除 |
| Token 长期不清理 | 凭据泄漏风险 | 定期审计 Token |
