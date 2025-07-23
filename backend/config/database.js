import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('cv_builder','root','654759921',{
host:'localhost',
dialect:'mysql',
logging: false

});
export default sequelize;