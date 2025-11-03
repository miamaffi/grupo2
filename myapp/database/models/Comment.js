module.exports = function (sequelize, dataTypes) {
    //alias
    let alias = "Comment";

    //columnas
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        productId: {
            type: dataTypes.INTEGER
        },
        userId: {
            type: dataTypes.INTEGER
        },
        body: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };

    //conf de la tabla
    let config = {
        tableName: "comments",
        timestamps: true,
        underscored: false // camelCase en DB
    };

    //definimos los modelos
    const Comment = sequelize.define(alias, cols, config);

    //relaciones
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            as: "comentarioUsuario", // alias de relación
            foreignKey: "userId"
        });

        Comment.belongsTo(models.Product, {
            as: "comentarioPosteo", // alias de relación
            foreignKey: "productId"
        });
    };

    //retorno del modelo
    return Comment;
};

