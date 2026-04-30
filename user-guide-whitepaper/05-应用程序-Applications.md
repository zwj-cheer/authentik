# 05 应用程序：Applications

## Applications 是什么

Application 是用户在应用库里看到的“应用入口”。

它不是业务系统本身，而是 authentik 中用来代表业务系统的对象。

例如：

- GitLab 可以是一个 Application。
- Grafana 可以是一个 Application。
- 内部 OA 可以是一个 Application。
- 测试系统可以是一个 Application。

## Application 负责什么

Application 主要负责：

- 在用户应用库中展示名称。
- 展示图标。
- 展示描述。
- 决定点击后打开哪里。
- 关联一个 Provider。
- 绑定访问规则。

## Application 和 Provider 的区别

这是新手最容易混淆的地方。

| 对象 | 作用 | 白话解释 |
| --- | --- | --- |
| Application | 展示入口 | 用户看到的应用卡片 |
| Provider | 协议配置 | authentik 怎么和目标应用登录对接 |

举例：

你要接入 GitLab：

- Application 叫 `GitLab`，用户在应用库里看到它。
- Provider 可能是 `GitLab OIDC Provider`，负责 OAuth2/OIDC 参数。

## Application 常见字段

| 字段 | 作用 | 建议 |
| --- | --- | --- |
| Application Name | 应用显示名称 | 写用户看得懂的中文或业务名 |
| Slug | URL 中的内部标识 | 用英文小写和短横线 |
| Group | 应用展示分组 | 例如协作、内部、运维 |
| Provider | 关联的协议配置 | 选择对应 Provider |
| Backchannel Providers | 辅助 Provider | 新手一般先不配置 |
| Policy engine mode | 多个访问条件如何合并 | 普通应用 ANY，高敏感应用 ALL |
| Launch URL | 点击应用打开的地址 | 不填时系统会尝试从 Provider 推断 |
| Open in new tab | 是否新标签页打开 | 用户体验需要时开启 |
| Icon | 应用图标 | 可用上传文件、Font Awesome 图标或 URL |
| Publisher | 发布者 | 可写公司或系统归属部门 |
| Description | 应用描述 | 简单说明这个应用做什么 |

## Group 字段的真实作用

Application 的 `Group` 是展示分组，不是用户组权限。

它只影响用户应用库里的排列方式。

例如：

| Group 填写 | 效果 |
| --- | --- |
| 协作 | Wiki、GitLab、项目管理放一起 |
| 沟通 | 邮件、聊天、会议系统放一起 |
| 内部 | OA、HR、审批系统放一起 |
| 运维 | 监控、日志、堡垒机放一起 |

如果你想控制谁能访问应用，不是在这里填，而是在绑定页面绑定 User、Group 或 Policy。

## Policy engine mode 的真实作用

策略引擎模式决定多个绑定条件怎么计算。

| 模式 | 作用 |
| --- | --- |
| ANY | 任意一个条件通过，就允许访问 |
| ALL | 所有条件都通过，才允许访问 |

例子：

应用绑定了两个条件：

1. 用户属于研发组。
2. 用户来自公司内网。

如果是 `ANY`：满足任意一个即可访问。

如果是 `ALL`：两个都满足才可以访问。

## 新手推荐配置

普通内部应用：

- Application Name：业务名称。
- Slug：英文短名称。
- Group：内部或协作。
- Policy engine mode：ANY。
- 绑定：对应用户组。

高敏感应用：

- Group：运维、安全或财务。
- Policy engine mode：ALL。
- 绑定：管理员组 + MFA 策略 + 网络策略。

## 常见错误

| 错误 | 后果 | 正确做法 |
| --- | --- | --- |
| 把 Application 的 Group 当成权限组 | 用户权限不会变化 | 到绑定页面绑定用户组 |
| Slug 随便写中文或特殊符号 | URL 不稳定或校验失败 | 用英文小写短横线 |
| Application 没有关联 Provider | 应用入口无法完成登录 | 创建或选择 Provider |
| 绑定过宽 | 不该访问的人也能看到应用 | 按组授权并检查策略 |
| ALL 条件太多 | 用户都访问不了 | 先用 ANY 排查，再收紧 |
