<?php
use yii\bootstrap5\Html;
$this->title = "Muestras";
?>
<div class="muestra-index">
    <div class="d-flex justify-content-between mb-4"><h1>Muestras</h1><?= Html::a("Nueva", ["create"], ["class" => "btn btn-primary"]) ?></div>
    <table class="table card">
        <thead><tr><th>Fecha</th><th>Viñedo</th><th>Variedad</th></tr></thead>
        <tbody>
            <?php foreach ($muestras as $m): ?>
                <tr>
                    <td><?= $m->fecha_hora_muestreo ?></td>
                    <td><?= $m->vinedo->localidad ?? "" ?></td>
                    <td><?= $m->variedad_uva ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
