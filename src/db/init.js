const Database = require('./config')


const sqlUser = `CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    password INT
);`

const sqlProfile = `CREATE TABLE profile(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        avatar TEXT, 
                        monthly_budget  INT, 
                        days_per_week INT,
                        hours_per_day INT,
                        vacation_per_year INT,
                        value_hour INT
    );`
const sqlJob = `CREATE TABLE jobs(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    daily_hours INT, 
                    total_hours  INT, 
                    created_at DATETIME
    );`

let insertusers = (`INSERT INTO users(
        name,
        password
        ) VALUES (
            "felipe.f3rreira@gmail.com",
            123456      
            );`
)

let insertProfile = (`INSERT INTO profile(
                        name,
                        avatar,
                        monthly_budget,
                        days_per_week,
                        hours_per_day,
                        vacation_per_year,
                        value_hour) VALUES (
                            "Felipe Ferreira",
                            "https://github.com/FelipebFerreira.png",
                            3000,  5, 10, 4, 74        
                            );`
)
let insertJobGuloso = (`INSERT INTO jobs(
                    name,              
                    daily_hours,
                    total_hours,
                    created_at ) VALUES ( "Pizzaria Guloso", 2, 60, 1617514376018 );`
)
let insertJobProject = (`INSERT INTO jobs(
                    name,                
                    daily_hours,
                    total_hours,
                    created_at ) VALUES ( "OneTwo Project", 3, 47, 1617514376018 );`
)

const initDb = {
       async init(){

                const db = await Database()
                /**Criação das Tables no banco de dados */
                await db.exec(sqlProfile);
                await db.exec(sqlJob);
                await db.exec(sqlUser);
                /**Criação da estrutura inserindo os registro no banco de dados*/
                await db.run(insertusers);
                await db.run(insertProfile);
                await db.run(insertJobGuloso)
                await db.run(insertJobProject)

                await db.close()
            } 
          
        }

        initDb.init();