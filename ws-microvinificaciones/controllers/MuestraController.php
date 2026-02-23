<?php

namespace app\controllers;

use yii\rest\ActiveController;

class MuestraController extends ActiveController
{
    public $modelClass = 'app\models\Muestra';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];
        return $behaviors;
    }
}
