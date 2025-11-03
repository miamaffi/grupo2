module.exports = function (sequelize, dataTypes) {
    //alias
    let alias = "Product";

    //columnas
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        userId: {
            type: dataTypes.INTEGER
        },
        imageFilename: {
            type: dataTypes.STRING
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
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
        tableName: "products",
        timestamps: true,
        underscored: false
    };

    //definimos los modelos
    const Product = sequelize.define(alias, cols, config);

    //relaciones
    Product.associate = function (models) {
        Product.belongsTo(models.User, {
            as: "usuarioProducto",
            foreignKey: "userId"
        });

        Product.hasMany(models.Comment, {
            as: "comentariosProducto",
            foreignKey: "productId"
        });
    };

    //retorno del modelo
    return Product;
};
