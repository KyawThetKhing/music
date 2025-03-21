# 📚 NOTES

## 📌 Table of Contents

1. [PostCSS](#postcss)
2. [PurgeCSS](#purgecss)
3. [VSCode Tailwind Warning Tips](#vscode-tailwind-warning-tips)
4. [Placing Assets: `public` vs `src`](#placing-assets-public-vs-src)
5. [VeeValidate Form Tips](#in-veevalidate-form)

---

## 🧩 PostCSS [Tool]

PostCSS is a tool for transforming CSS with JavaScript plugins. It takes your CSS file and applies a series of plugins to it, transforming it into a final optimized CSS file. It’s widely used for the following purposes:

- **Autoprefixing:** Adding vendor prefixes to CSS rules where needed for cross-browser compatibility.
- **Minifying CSS:** Making CSS files smaller and faster to load.
- **Using Future CSS Features:** Plugins that allow you to use CSS features that aren’t yet widely supported.

---

## 🧩 PurgeCSS [Tool]

Tailwind CSS has a large file size (~300KB) by default. Using **PurgeCSS** with Tailwind helps reduce the final CSS file size by **removing unused styles**.

---

## 🧩 VSCode Tailwind Warning Tips [Tip]

To prevent linting errors related to Tailwind CSS directives like `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`, add the following to `.vscode/settings.json`:

```json
{
  "css.lint.unknownAtRules": "ignore"
}
```

---

## 🧩 Placing Assets: `public` vs `src` [Best Practice]

### 📁 `public/` Folder

- **Static Assets:** Served as-is without processing.
- **Access:** Direct URL (e.g., `/logo.png`).
- **Use Case:** Files like `favicon.ico`, `robots.txt`, and large static images.

### 📁 `src/` Folder

- **Processed Assets:** Managed by the build tool (e.g., Vite/Webpack).
- **Access:** Imported via module system (e.g., `import logo from '@/assets/logo.png'`).
- **Use Case:** Assets used by components (images, styles) and bundled during the build.

---

## 🧩 VeeValidate Form Tips

### 📁 No Need for `@submit.prevent`

VeeValidate automatically applies `@submit.prevent` to handle form submission, so you don't need to add it manually.

### 📁 Checkbox Validation

To make checkbox validation work properly with VeeValidate, you need to add `value="1"` to the `<VeeField>` element. Without it, the checkbox returns `true` or `false` instead of a value the `required` rule expects.

Example:

```html
<div class="mb-3 pl-6">
  <VeeField name="tos" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" value="1" />
  <label class="inline-block">Accept terms of service</label>
  <ErrorMessage name="tos" class="text-red-600 block" />
</div>
```
