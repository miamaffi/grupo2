module.exports = function (sequelize, dataTypes) {
    //alias
    let alias = "User";

    //columnas
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING
        },
        username: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        profilePhoto: {
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
        tableName: "users",
        timestamps: true,
        underscored: false
    };

    //definimos los modelos
    const User = sequelize.define(alias, cols, config);

    //relaciones
    User.associate = function (models) {
        User.hasMany(models.Product, {
            as: "productosUsuario",
            foreignKey: "userId"
        });

        User.hasMany(models.Comment, {
            as: "comentariosUsuario",
            foreignKey: "userId"
        });
    };

    //retorno del modelo
    return User;
};
