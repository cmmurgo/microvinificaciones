<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "vinedo".
 *
 * @property int $id
 * @property string|null $sistema_conduccion
 * @property string|null $estado_sanitario
 * @property string|null $tipo_suelo
 * @property string|null $tipo_riego
 * @property string|null $provincia
 * @property string|null $localidad
 * @property float|null $latitud
 * @property float|null $longitud
 * @property string|null $observaciones
 * @property int|null $created_at
 * @property int|null $updated_at
 *
 * @property Muestra[] $muestras
 */
class Vinedo extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'vinedo';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['latitud', 'longitud'], 'number'],
            [['observaciones'], 'string'],
            [['created_at', 'updated_at'], 'integer'],
            [['sistema_conduccion', 'estado_sanitario', 'tipo_suelo', 'tipo_riego', 'provincia', 'localidad'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'sistema_conduccion' => 'Sistema Conduccion',
            'estado_sanitario' => 'Estado Sanitario',
            'tipo_suelo' => 'Tipo Suelo',
            'tipo_riego' => 'Tipo Riego',
            'provincia' => 'Provincia',
            'localidad' => 'Localidad',
            'latitud' => 'Latitud',
            'longitud' => 'Longitud',
            'observaciones' => 'Observaciones',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[Muestras]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMuestras()
    {
        return $this->hasMany(Muestra::class, ['vinedo_id' => 'id']);
    }
}
