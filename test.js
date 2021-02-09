
const { SQLGenerater } = require("./index");
const inputData = [

    {
        "tableName": "users",
        "fields": [{ "fieldName": "id", "type": "number", "size": 10, "auto_generate": true, "constraints": ["primarykey"] },
        { "fieldName": "user_name", "type": "text", "size": 50, "constraints": ["mandatory", "unique"] },
        { "fieldName": "email", "type": "text", "size": 50, "constraints": ["unique", "mandatory"] },
        { "fieldName": "password", "type": "text", "size": 50, "constraints": ["mandatory", "check"], "minLength": 8 },
        ]
    }, {
        "tableName": "products",
        "fields": [
            { "fieldName": "id", "type": "number", "size": 10, "auto_generate": true, "constraints": ["primarykey"] },
            { "fieldName": "name", "type": "text", "size": 10, "constraints": ["mandatory", "unique"] },
            { "fieldName": "brand_name", "type": "text", "size": 50, "constraints": ["mandatory"] }]
    },
    {
        "tableName": "orders",
        "fields": [
            { "fieldName": "id", "type": "number", "size": 10, "auto_generate": true, "constraints": ["primarykey"] },
            { "fieldName": "user_id", "type": "number", "size": 10, "constraints": ["foreignkey", "mandatory"], "references": { "tableName": "users", "columnName": "id" } },
            { "fieldName": "product_id", "type": "number", "size": 50, "constraints": ["foreignkey", "mandatory"], "references": { "tableName": "products", "columnName": "id" } },
            { "fieldName": "qty", "type": "number", "size": 3, "constraints": ["mandatory"], "default": 1 },
            { "fieldName": "total_amount", "type": "number", "size": 10, "constraints": ["mandatory"] },
            { "fieldName": "status", "type": "text", "size": 10, "constraints": ["mandatory"], "default": "ORDERED" },

        ]

    }

];

var sqlGenerater = new SQLGenerater();
//let inputData = JSON.parse(data.toString())
sqlGenerater.getSQLScript(inputData).then(response => {
    return response;
}).catch(err => {
    throw err;
});

// sqlGenerater.generateSQLScriptFile(inputData).then(response => {
//     console.log(response);
// });
// console.log("content", content);
