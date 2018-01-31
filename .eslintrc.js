module.exports = {
    "extends": ["airbnb", "prettier"],
    "plugins": [
        "react",
        "import",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "react/jsx-filename-extension": "off",      
        "import/no-extraneous-dependencies": "off",
        "jsx-a11y/anchor-is-valid": "off"  
    }
};