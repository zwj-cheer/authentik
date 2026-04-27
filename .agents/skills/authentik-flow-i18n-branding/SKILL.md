---
name: authentik-flow-i18n-branding
description: Use when changing authentik flow blueprints, flow name/title/description/prompt copy, Chinese localization, branding display, or placeholder behavior. Covers default flow YAML files, Flow admin pages, OOBE prompts, database re-apply/verification, and avoiding hardcoded authentik display text.
---

# authentik Flow 国际化与品牌占位符

## 核心规则

先分清三类动态文本：

1. **品牌名显示**
   - 不要新增 `%(brand)s` 这类自定义占位符。
   - 项目已有前端品牌替换：数据里保留默认品牌源词 `authentik`，显示层调用 `brandingMessage(...)` 或 `globalBrandingMessage(...)`。
   - 相关实现：`web/src/elements/mixins/branding.ts`。
   - 修改 admin flow 页面时，所有用户可见的 `flow.name`、`flow.title`、按钮 `aria-label`、页面 header/description 都要用 `brandingMessage(...)`。
   - 编辑表单里如果用户没有改动品牌替换后的 name/title，提交前要还原成数据库原值，避免把当前品牌名写死进数据库。

2. **Flow 后端运行时占位符**
   - 只使用项目已有后端占位符，例如 `%(app)s`、`%(user)s`。
   - 不要为了品牌名扩展 `authentik/flows/stage.py`。
   - `%(app)s` 用于 provider/app 场景，例如“正在重定向到 %(app)s”。

3. **Prompt 表达式**
   - Prompt 字段支持表达式时，优先使用已有上下文动态取值。
   - OOBE 说明文本需要品牌名时，用 `request.brand.branding_title`，例如：

```yaml
initial_value:
  return f"欢迎使用 {request.brand.branding_title}！请为默认管理员用户 akadmin 设置密码和邮箱地址。"
initial_value_expression: true
```

## 修改流程

1. 先查现状，不凭记忆改：

```bash
rg -n "Welcome|Please|Password|Username|Email|Setup|Access the|authentik|%\\(brand\\)s" blueprints/default/flow-*.yaml web/src/admin/flows authentik/flows
```

2. 修改默认 flow blueprint 时，优先覆盖这些文件：

```text
blueprints/default/flow-default-authentication-flow.yaml
blueprints/default/flow-default-source-authentication.yaml
blueprints/default/flow-default-source-enrollment.yaml
blueprints/default/flow-oobe.yaml
blueprints/default/flow-password-change.yaml
blueprints/default/flow-default-invalidation-flow.yaml
blueprints/default/flow-default-provider-authorization-explicit-consent.yaml
blueprints/default/flow-default-provider-authorization-implicit-consent.yaml
blueprints/default/flow-default-provider-invalidation.yaml
blueprints/default/flow-default-user-settings-flow.yaml
blueprints/default/flow-default-authenticator-*-setup.yaml
```

3. 不要翻译或改动内部标识：
   - `slug`
   - `id`
   - `identifiers.name`
   - `model: authentik_*`
   - `authentik.core.*`
   - `goauthentik.io/*`
   - 策略代码里的变量名、函数名、导入路径

4. 可以翻译用户可见内容：
   - `metadata.name`
   - `attrs.name`
   - `attrs.title`
   - `label`
   - `placeholder`
   - `initial_value`
   - `ak_message(...)`
   - YAML 里的说明注释

## 品牌替换检查

改 admin flow UI 时重点查：

```bash
rg -n "flow\\.name|flow\\.title|item\\.name|item\\.title|aria-label" web/src/admin/flows
```

需要确认这些显示位置使用已有品牌机制：

```ts
this.brandingMessage(flow.name)
this.brandingMessage(flow.title)
globalBrandingMessage(msg("... authentik ..."))
```

不要出现：

```text
%(brand)s
request.brand...   # 除 Prompt 表达式这类后端执行文本外，不要塞进前端或普通 title 字段
```

## 应用与验证

改完 blueprint 后，要重新应用对应 blueprint 或手动更新数据库里的现有 flow。

常用命令：

```bash
export PATH="$PWD/.venv/bin:$PATH"
.venv/bin/ak apply_blueprint default/flow-default-authentication-flow.yaml
.venv/bin/ak apply_blueprint default/flow-default-source-authentication.yaml
.venv/bin/ak apply_blueprint default/flow-default-source-enrollment.yaml
.venv/bin/ak apply_blueprint default/flow-oobe.yaml
```

查文件不能有自造品牌占位符：

```bash
rg -n "%\\(brand\\)s|Welcome to authentik|欢迎使用 %\\(brand\\)s" blueprints/default/flow-*.yaml authentik/flows web/src/admin/flows web/src/elements/mixins/branding.ts
```

查数据库现有 flow：

```bash
docker exec postgres psql -U postgres -d authentik -c "select slug, name, title from authentik_flows_flow where slug in ('default-authentication-flow','default-source-authentication','default-source-enrollment','initial-setup') order by slug;"
```

查 OOBE/注册 prompt：

```bash
docker exec postgres psql -U postgres -d authentik -c "select name, label, placeholder, initial_value, initial_value_expression from authentik_stages_prompt_prompt where name in ('initial-setup-field-header','initial-setup-field-email','initial-setup-field-password','initial-setup-field-password-repeat','default-source-enrollment-field-username') order by name;"
```

前端验证优先在 `web` 目录跑：

```bash
npm run lint:types
npx eslint --max-warnings 0 src/admin/flows/FlowListPage.ts src/admin/flows/FlowViewPage.ts src/admin/flows/FlowForm.ts
```

如果页面仍显示旧文本，先考虑 dev server bundle 或浏览器缓存，再重新刷新页面。
