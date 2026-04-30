# 15 Blueprints 批量配置

## Blueprint 是什么

Blueprint 是用 YAML 描述 authentik 配置的方式。

你可以把它理解为“配置脚本”。

它可以声明：

- Flow。
- Stage。
- Provider。
- Source。
- Policy。
- Brand。
- 其他对象。

## 为什么需要 Blueprint

手动点后台适合少量配置。

Blueprint 适合：

- 初始化默认配置。
- 批量导入配置。
- 在不同环境复用配置。
- 把配置纳入版本管理。
- 自动创建复杂流程。

## 当前项目中的 Blueprint

当前仓库有多个 blueprint 目录：

- `blueprints/default`
- `blueprints/example`
- `blueprints/system`
- `blueprints/testing`
- `blueprints/migrations`

其中：

- default：默认配置。
- example：示例配置。
- system：系统级配置。
- testing：测试配置。
- migrations：配置迁移。

## Blueprints 页面

`Customization -> Blueprints` 用于查看和管理 Blueprint 实例。

常见操作：

- 查看已应用 Blueprint。
- 导入 Blueprint。
- 检查应用状态。
- 排查导入错误。

## 小白什么时候用 Blueprint

建议场景：

- 你要重复创建同一套配置。
- 你需要把配置从测试环境迁移到正式环境。
- 你要批量创建 Flow、Stage、Policy。
- 你要复用项目里的默认配置。

不建议场景：

- 只创建一个简单应用。
- 还没理解对象关系。
- 不确定 YAML 中每个对象的含义。

## 常见错误

| 错误 | 后果 | 处理 |
| --- | --- | --- |
| 直接套用不理解的 Blueprint | 创建大量不明配置 | 先在测试环境导入 |
| 修改默认 Blueprint 不验证 | 影响初始化行为 | 小范围测试 |
| 对象引用写错 | 导入失败 | 看 Events 或 Blueprint 错误 |
| 手动配置和 Blueprint 冲突 | 配置被覆盖或重复 | 明确谁是配置来源 |

## 新手建议

先通过后台手动创建一遍，理解 Application、Provider、Flow、Policy 的关系，再用 Blueprint 做批量化。
