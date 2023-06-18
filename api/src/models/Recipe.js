const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      // "id"
      // type: DataTypes.INTEGER,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      // "title"
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      // "image"
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      // summary
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_score: {
      // "healthScore"
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    steps: {
      // "analyzedInstructions"
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false, // maybe it can be null
    },
  });
};
