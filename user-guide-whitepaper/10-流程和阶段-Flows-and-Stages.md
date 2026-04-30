# 10 流程和阶段：Flows and Stages

## Flow 是什么

Flow 是流程。

它定义用户完成某件事情时要经过哪些步骤。

常见 Flow：

- 登录流程。
- 授权流程。
- 登出流程。
- 用户设置流程。
- 找回密码流程。
- 注册流程。

## Stage 是什么

Stage 是流程中的一个步骤。

一个 Flow 通常由多个 Stage 组成。

例如登录流程：

1. Identification Stage：识别用户。
2. Password Stage：输入密码。
3. Authenticator Stage：MFA 验证。
4. User Login Stage：完成登录。

## Flows 页面

`Flows and Stages -> Flows` 用于管理流程本身。

你可以在这里：

- 查看已有 Flow。
- 创建 Flow。
- 查看 Flow 详情。
- 调整 Flow 中绑定的 Stage。
- 查看 Flow 图。
- 修改流程名称、标题、兼容模式等。

## Stages 页面

`Flows and Stages -> Stages` 用于管理流程步骤。

常见 Stage 类型：

| Stage | 作用 |
| --- | --- |
| Identification | 识别用户身份 |
| Password | 用户输入密码 |
| Authenticator TOTP | TOTP MFA |
| Authenticator WebAuthn | WebAuthn MFA |
| Authenticator Email | 邮箱 MFA |
| Authenticator Static | 静态恢复码 |
| Consent | 授权同意 |
| Email | 发送邮件 |
| Prompt | 自定义表单 |
| Redirect | 跳转 |
| Deny | 拒绝访问 |
| User Login | 完成用户登录 |
| User Write | 写入用户信息 |
| Invitation | 邀请注册 |

## Prompts 页面

`Flows and Stages -> Prompts` 用于管理自定义表单字段。

适合场景：

- 注册时收集手机号。
- 让用户补充部门。
- 让用户输入额外验证码。
- 收集审批所需信息。

## Stage Binding 是什么

Stage Binding 是把 Stage 放进 Flow 的关系。

它决定：

- 这个 Stage 属于哪个 Flow。
- 执行顺序是什么。
- 是否有策略控制。
- 用户不满足条件时怎么处理。

## 修改登录流程的正确方式

新手不要直接大改默认 Flow。

建议：

1. 复制或创建一个测试 Flow。
2. 在测试 Brand 或测试应用上使用。
3. 加入或调整 Stage。
4. 用测试用户验证。
5. 确认没问题后再替换到正式 Brand 或 Provider。

## 常见配置示例

### 增加 MFA

1. 找到认证 Flow。
2. 创建或选择 Authenticator 相关 Stage。
3. 绑定到 Flow。
4. 设置顺序在密码之后。
5. 用测试用户登录验证。

### 增加授权同意页

1. 找到 Provider 的 Authorization Flow。
2. 添加 Consent Stage。
3. 配置显示内容。
4. 用户访问应用时确认是否出现同意页。

### 注册流程收集字段

1. 创建 Prompt。
2. 创建 Prompt Stage。
3. 加入注册 Flow。
4. 后续用 User Write Stage 写入用户属性。

## 常见错误

| 错误 | 后果 | 处理 |
| --- | --- | --- |
| 直接改默认登录 Flow | 可能所有人无法登录 | 先复制测试 |
| Stage 顺序错误 | 流程卡住或逻辑不对 | 查看 Flow 图 |
| 缺少 User Login Stage | 登录无法完成 | 检查流程末尾 |
| MFA Stage 放错位置 | 验证体验异常 | 一般放在密码后 |
| Policy 配错 | 某些用户进不了流程 | 查 Events 和绑定策略 |
