# 12 事件日志和排查：Events

## Events 是什么

Events 是事件和审计模块。

它记录系统里发生了什么，包括：

- 用户登录。
- 登录失败。
- 应用授权。
- 管理员操作。
- 后台任务。
- 通知发送。
- 策略判断。
- 外部身份源同步。

## Logs

`Events -> Logs` 是最重要的排查入口。

遇到问题时，先看这里。

常用排查方式：

- 按用户名搜索。
- 按应用搜索。
- 按时间范围搜索。
- 按事件类型搜索。
- 查看失败原因。
- 查看 IP 和 User-Agent。

## Notification Rules

Notification Rules 是通知规则。

它决定什么事件需要通知。

例子：

- 管理员登录失败时通知。
- 高风险登录时通知。
- 系统任务失败时通知。
- 用户被禁用时通知。

## Notification Transports

Notification Transports 是通知渠道。

它决定通知通过什么方式发出去。

常见渠道可能包括：

- Email。
- Webhook。
- 其他项目支持的通知方式。

配置顺序：

1. 先创建 Transport。
2. 再创建 Rule。
3. Rule 选择 Transport。
4. 触发事件测试。

## Data Exports

Data Exports 用于导出数据，通常属于更高级或企业能力。

适合：

- 安全审计。
- 合规检查。
- 离线分析。

## Lifecycle Rules 和 Reviews

Lifecycle Rules 和 Reviews 用于对象生命周期管理和审查。

适合：

- 定期审查用户权限。
- 审批访问权。
- 管理对象过期或续期。

## 常见排查路径

### 用户登录失败

1. 进入 `Events -> Logs`。
2. 搜索用户名。
3. 找到失败事件。
4. 看失败发生在哪个 Flow 或 Stage。
5. 检查密码、MFA、Source、Policy。

### 用户看不到应用

1. 搜索该用户最近事件。
2. 检查应用绑定。
3. 检查用户是否属于对应 Group。
4. 检查策略引擎模式。

### 应用跳转失败

1. 看 Events 中 Provider 相关错误。
2. 检查 Redirect URI、ACS URL、证书。
3. 对照目标应用配置。

## 新手原则

不要凭感觉猜。authentik 大多数关键动作都会留下事件。先看事件，再改配置。
