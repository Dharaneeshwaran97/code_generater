

const fs = require('fs');

class SQLGenerater {
    constructor() {

    }

    async getAllTable(data) {
        let content = "";
        for (let tableObj of data) {
            let result = await this.getTableData(tableObj);
            content += result;
            content += "\n";
        }
        return content;
    }

    async  getTableData(tableObj) {
        let content = "";
        let i = 1;
        content += `create table ${tableObj.tableName} ( \n`
        for (let fieldObj of tableObj.fields) {

            content += ` ${fieldObj.fieldName}`
            // content += ` ${tableObj.type}`
            let dataType = await this.getDataType(fieldObj.type);
            content += ` ${dataType}`;
            // console.log("dataType", dataType);
            content += `(${fieldObj.size})`;

            if (fieldObj.auto_generate == true) {
                content += " auto_increment "
            }
            if (fieldObj.constraints.includes("mandatory")) {
                content += " not null"
            }
            if (fieldObj.default) {
                if (fieldObj.type == "number") {
                    content += ` default ${fieldObj.default} `
                } else if (fieldObj.type == "text") {
                    content += ` default '${fieldObj.default}' `
                }
            }


            // if (i != tableObj.fields.length) {
            content += `,`;
            // }
            // i++;

        }
        content += `\n`;
        // var result = 
        content += await this.getConstraintsForAllFields(tableObj.fields);
        content = content.substr(0, content.length - 2);
        content += `\n);`

        return content;
        // for (let tableDataValues of tableData){}

    }

    async  getConstraintsForAllFields(fields) {
        let content = "";
        // console.log("fieldsValues", fields);
        for (let fieldObj of fields) {
            // console.log("constraints", values.constraints);
            let constraintsContent = await this.getContrainsTable(fieldObj);
            if (constraintsContent.length > 0) {
                content += constraintsContent;
                content += ",\n"

            }

        }
        return content;
    }
    async getCheckConstraints(field) {
        let content = "";

        if (field.minLength) {
            content += `CHECK(LENGTH(${field.fieldName}) >= ${field.minLength})`
        }
        return content;

    }

    async getContrainsTable(fieldObj) {
        let content = "";
        // console.log("values", fieldObj);
        let constraints = fieldObj.constraints;

        if (constraints) {
            for (let constraint of constraints) {
                switch (constraint) {
                    case "primarykey":
                        content += `primary key (${fieldObj.fieldName})`;
                        break;
                    case "unique":
                        content += `unique (${fieldObj.fieldName})`;
                        break;
                    case "foreignkey":
                        content += `foreign key (${fieldObj.fieldName}) references ${fieldObj.references.tableName}(${fieldObj.references.columnName})`
                        break;
                    case "check":
                        content += await this.getCheckConstraints(fieldObj);
                        break;
                }

            }

        }
        return content;
    }

    getDataType(type) {
        let dataType = null;

        switch (type) {
            case "number":
                dataType = "int";
                break;
            case "text":
                dataType = "varchar"
                break;
            default:
                dataType = type;
        }
        return dataType;

    }


    async  getSQLScript(inputData) {
        let content = await this.getAllTable(inputData);
        return content;
    }


    async  generateSQLScriptFile(inputData) {
        let content = await this.getAllTable(inputData);
        fs.writeFile("output.sql", content, function (err, resp) {
            if (err) throw err;
            // console.log("File updated", resp);

        });

    }

};

exports.SQLGenerater = SQLGenerater;



// // let content = getAllTable(data);
// fs.readFile("input.json", (error, data) => {
//     // console.log(data.toString());
//     let inputData = JSON.parse(data.toString())


// })



