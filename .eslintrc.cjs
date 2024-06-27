module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh", "react-hooks", "@typescript-eslint", "prettier"],
	rules: {
		"react-refresh/only-export-components": ["", { allowConstantExport: true }],
		"no-var": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
	},
};
