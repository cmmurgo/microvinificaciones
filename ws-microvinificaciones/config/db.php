<?php

return [
    'class' => 'yii\db\Connection',
    //'dsn' => 'pgsql:host=localhost;port=5432;dbname=microvinificaciones',
    //'dsn' => 'pgsql:host=appmdz.duckdns.org;port=5432;dbname=microvinificaciones',
    'dsn' => 'pgsql:host=159.112.141.134;port=5432;dbname=microvinificaciones',
    'username' => 'postgres',
    'password' => 'postgres',
    'charset' => 'utf8',

    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
