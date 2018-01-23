module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                len: [1]
            }
        },
        short_desc: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        user_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        company_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        create_date: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        price: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        createdAt: {
            type: DataTypes.TEXT,
            field: 'beginTime',
            defaultValue: sequelize.literal('NOW()'),
        },
        updatedAt: {
            type: DataTypes.TEXT,
            field: 'beginTime',
            defaultValue: sequelize.literal('NOW()'),
        }
    });
return Order;
};