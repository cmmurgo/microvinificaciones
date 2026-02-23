<?php

use yii\db\Migration;

class m260221_185258_create_tables extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%vinedo}}', [
            'id' => $this->primaryKey(),
            'sistema_conduccion' => $this->string(),
            'estado_sanitario' => $this->string(),
            'tipo_suelo' => $this->string(),
            'tipo_riego' => $this->string(),
            'provincia' => $this->string(),
            'localidad' => $this->string(),
            'latitud' => $this->decimal(10, 8),
            'longitud' => $this->decimal(11, 8),
            'observaciones' => $this->text(),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ]);

        $this->createTable('{{%muestra}}', [
            'id' => $this->primaryKey(),
            'vinedo_id' => $this->integer(),
            'variedad_uva' => $this->string(),
            'grados_brix' => $this->decimal(5, 2),
            'temperatura' => $this->decimal(5, 2),
            'ph' => $this->decimal(4, 2),
            'fecha_hora_muestreo' => $this->dateTime(),
            'peso_muestra' => $this->decimal(10, 2),
            'observaciones' => $this->text(),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ]);

        $this->addForeignKey(
            'fk-muestra-vinedo_id',
            '{{%muestra}}',
            'vinedo_id',
            '{{%vinedo}}',
            'id',
            'CASCADE'
        );
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk-muestra-vinedo_id', '{{%muestra}}');
        $this->dropTable('{{%muestra}}');
        $this->dropTable('{{%vinedo}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m260221_185258_create_tables cannot be reverted.\n";

        return false;
    }
    */
}
